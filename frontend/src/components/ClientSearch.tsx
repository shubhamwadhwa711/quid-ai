import { useState, useEffect, useRef } from "react";
import {
  Check,
  ChevronDown,
  User,
  X,
  Plus,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  deleteClient,
  fetchClient,
  postClient,
  updateClient,
  updateCompany,
} from "@/reducers/filter/client/clientSlice";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { fetchCompanySectors } from "@/reducers/company-sector/company-sector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fetchProfile } from "@/reducers/profile/profileSlice";
import React from "react";

interface Client {
  id: number;
  name: string;
  logo?: string;
  category?: number;
  company_name?: string;
}

interface ClientSearchProps {
  profileID: number;
  selectedClients: Client[];
  onSelectClients: (client: Client) => void;
  onRemoveClient: (clientId: number) => void;
  icon?: React.ReactNode;
}

const ClientSearch = ({
  profileID,
  selectedClients,
  onSelectClients,
  onRemoveClient,
  icon = <User size={18} />,
}: ClientSearchProps) => {
  const [formData, setFormData] = useState<{
    category: number | null;
    name: string;
    logo: File | null;
  }>({
    category: null,
    name: "",
    logo: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Client | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [companyID, setCompanyID] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useAppSelector((state) => state.Client);
  const { companySectors } = useAppSelector((state) => state.CompanySector);

  // Update formData when relevant states change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: searchTerm,
    }));
  }, [searchTerm]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Initial data fetching
  useEffect(() => {
    // Fetch initial data when component mounts
    dispatch(fetchCompanySectors({}));
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() || formData.category) {
      const params: Record<string, any> = {};
      if (debouncedSearchTerm.trim()) {
        params.search = debouncedSearchTerm;
      }
      if (formData.category) {
        params.category = formData.category;
      }
      dispatch(fetchClient(params));
    }
  }, [debouncedSearchTerm, formData.category, dispatch]);

  const handleAddClient = () => {
    try {
      if (!formData.category) {
        alert("Please select a category first");
        return;
      }
      // Create a FormData object from the state
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name || searchTerm);
      submitFormData.append("category", formData.category.toString());

      if (formData.logo || imageFile) {
        submitFormData.append("logo", formData.logo || imageFile as File);
      }
      // Dispatch the action with the formData and wait for it to complete
      dispatch(postClient(submitFormData as any));
      // handleResetClient();
    } catch (err) {
      console.error("Failed to add client:", err);
    }
  };

  // Select client - now just sets it for editing instead of immediately adding
  const handleSelectClient = (client: Client) => {
    if (selectedClients.some((c: Client) => c.id === client.id)) {
      // If already selected, do nothing
      return;
    }
    
    // Set the selected company for editing
    setSelectedCompany(client);
    setSearchTerm(client.name);
    
    // Set preview if logo exists
    if (client.logo) {
      setPreviewUrl(client.logo);
    }
  };

  // Add selected company to featured clients
  const handleAddToFeatured = async () => {
    if (!selectedCompany) return;
    
    setIsLoading(true);
    try {
      // If there's a new image, update the company first
      if (imageFile) {
        const updateFormData = new FormData();
        updateFormData.append("logo", imageFile);
        
        await dispatch(
          updateCompany({ id: selectedCompany.id, data: updateFormData })
        ).unwrap();
      }

      // Then add to featured clients
      await dispatch(
        updateClient({
          profile: profileID,
          company: selectedCompany.id,
          isFeatured: false,
        })
      ).unwrap();

      onSelectClients(selectedCompany);
      await dispatch(fetchProfile());
      handleClearSelection();
    } catch (error) {
      console.error("Failed to add client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSelection = () => {
    setFormData({
      category: null,
      name: "",
      logo: null,
    });
    setSearchTerm("");
    setImageFile(null);
    setPreviewUrl(null);
    setSelectedCompany(null);
    // inputRef.current.focus();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Update both the image file state and the formData state
    setImageFile(file);
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (value: string) => {
    const categoryId = Number(value);
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const clientExists = clients?.some(
    (c: Client) => c.name?.toLowerCase() === searchTerm.toLowerCase()
  );

  const handleClientUpdate = () => {
    // if (!companyID || !profileID) {
    //   toast({
    //     title: "Error",
    //     description: "Please select a client first",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsLoading(true);
    try {
      // Dispatch update and await completion
      dispatch(
        updateClient({
          profile: profileID,
          company: companyID,
          isFeatured: false,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchProfile());
        })
        .catch((error) => {
          console.error("Error removing project:", error);
        });

      // Handle success with UI update before refetching
      // toast({
      //   title: "Success",
      //   description: "Client updated successfully",
      // });

      // Fetch updated data immediately after successful update

      // Clear form after successful update
      handleClearSelection();
    } catch (error) {
      console.error("Update failed", error);
      // toast({
      //   title: "Update Failed",
      //   description: error.message || "Failed to update client",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClient = async (clientID: number) => {
    setIsLoading(true);
    try {
      // Delete client and wait for completion
      await dispatch(deleteClient({ id: clientID }))
        .unwrap()
        .then(() => {
          dispatch(fetchProfile());
        })
        .catch((error) => {
          console.error("Error removing project:", error);
        });

      // Immediately update UI by calling parent callback
      // onRemoveClient(clientID);

      // Optimistically remove from local state before refetching
      onRemoveClient(clientID);

      // Refresh client list after deletion
    } catch (error) {
      console.error("Remove failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">{/* Company Sector Selection - MOVED TO TOP */}
      <div className="relative mb-4">
        <Select
          value={formData.category ? String(formData.category) : ""}
          onValueChange={handleCategoryChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full p-2 pl-4 pr-4 bg-[#262640] text-white rounded-3xl border focus:ring-2 focus:ring-[#7C2BD3]">
            <SelectValue placeholder="Select a company sector" />
          </SelectTrigger>
          <SelectContent className="bg-[#262640] text-white rounded-xl border border-[#3A3A5A]">
            {companySectors && companySectors.length > 0 ? (
              companySectors.map((sector) => (
                <SelectItem key={sector.id} value={String(sector.id)}>
                  {sector.title}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="loading" disabled>
                No sectors available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <div className="absolute z-50 inset-y-0 left-3 -mt-0 flex items-center text-white">
          {icon}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedCompany(null); // Clear selection when typing
            // setShowDropdown(true);
          }}
          // onFocus={() => setShowDropdown(true)}
          placeholder={selectedCompany ? selectedCompany.name : "Search for a client"}
          className="w-full p-2 pl-10 pr-16 bg-[#262640] text-white rounded-3xl border focus:ring-2 focus:ring-[#7C2BD3]"
          disabled={isLoading || !!selectedCompany}
        />

        {selectedCompany && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearSelection}
            className="absolute inset-y-0 right-2 flex items-center rounded-full h-8 w-8 p-0 my-auto"
            title="Clear selection"
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        {searchTerm && !clientExists && !selectedCompany && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleAddClient}
            className="absolute inset-y-0 right-2 flex items-center bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] rounded-full h-8 w-8 p-0 my-auto"
            title={`Add "${searchTerm}"`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Available Companies - Show as cards below search */}
      {!selectedCompany && (debouncedSearchTerm || formData.category) && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            {debouncedSearchTerm ? 'Search Results' : 'Available Companies'}
          </h3>
          <div className="max-h-64 overflow-y-auto hide-scrollbar space-y-2">
            {clients?.length > 0 ? (
              clients.map((cli: Client) => (
                <div
                  key={cli.id}
                  onClick={() => handleSelectClient(cli)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition ${
                    selectedClients.some((c: Client) => c.id === cli.id)
                      ? 'bg-[#2A2A4A] border border-[#7C2BD3]'
                      : 'bg-[#1E1E38] hover:bg-[#2A2A4A] border border-[#3A3A5A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {cli.logo ? (
                      <img 
                        src={cli.logo} 
                        alt={cli.name || 'Company'} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] flex items-center justify-center text-white font-bold">
                        {cli.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                    <span className="text-white font-medium">{cli.name || 'Unknown'}</span>
                  </div>
                  {selectedClients.some((c: Client) => c.id === cli.id) && (
                    <Check size={18} className="text-[#7C2BD3]" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-400 bg-[#1E1E38] rounded-xl">
                No clients found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Upload - Show for new companies or selected companies */}
      {(searchTerm && !clientExists) || selectedCompany ? (
        <div className="mt-4">
          <label className="block text-sm font-medium text-white mb-2">
            {selectedCompany ? "Update Client Logo (Optional)" : "Upload Client Image"}
          </label>

          <div className="relative border-2 border-dashed border-[#7C2BD3] rounded-lg p-4 bg-[#2A2A4A] hover:bg-[#363658] transition-colors duration-200 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            <div className="flex items-center justify-center gap-3 text-white">
              <ImageIcon size={20} />
              <span className="text-sm">
                {imageFile ? imageFile.name : previewUrl ? "Click to change logo" : "Click or drag to upload image"}
              </span>
            </div>
          </div>

          {previewUrl && (
            <div className="mt-3 flex items-center gap-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-12 h-12 rounded-full object-cover border border-[#7C2BD3]"
              />
              <span className="text-sm text-white">
                {imageFile?.name || "Current logo"}
              </span>
              {(imageFile || selectedCompany) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setImageFile(null);
                    setPreviewUrl(selectedCompany?.logo || null);
                  }}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Reset
                </Button>
              )}
            </div>
          )}
        </div>
      ) : null}

      {/* Add to Featured Button - Show when company is selected */}
      {selectedCompany && (
        <div className="mt-4 flex gap-2">
          <Button
            onClick={handleAddToFeatured}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] text-white rounded-full transition-colors"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>Add to Featured Clients</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          <Button
            onClick={handleClearSelection}
            disabled={isLoading}
            variant="outline"
            className="px-4 rounded-full"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Selected/Featured Clients - Show at bottom */}
      {selectedClients.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[#3A3A5A]">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            Featured Clients ({selectedClients.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedClients.map((client: Client) => (
              <div
                key={client.id}
                className="flex items-center bg-gradient-to-r from-[#2A2A4A] to-[#1E1E38] text-white px-3 py-2 rounded-full gap-2 border border-[#3A3A5A]"
              >
                {client.logo && (
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium">{client.name}</span>
                <X
                  size={14}
                  className="cursor-pointer hover:text-red-400 transition"
                  onClick={() => handleRemoveClient(client.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <Button
        onClick={handleClientUpdate}
        type="submit"
        className="w-11/12 bg-gradient-to-r proxima-bold fixed bottom-1 from-[#7C2BD3] to-[#075AA8] text-white rounded-full p-6"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="mr-2">Updating...</span>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </>
        ) : (
          <>
            Update Client
            <ArrowRight className="w-6 h-6" />
          </>
        )}
      </Button> */}
    </div>
  );
};

export default ClientSearch;
