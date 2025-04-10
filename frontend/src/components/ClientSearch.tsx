import { useState, useEffect, useRef } from "react";
import {
  Check,
  ChevronDown,
  User,
  X,
  Plus,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  deleteClient,
  fetchClient,
  postClient,
  updateClient,
} from "@/reducers/filter/client/clientSlice";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { fetchAllCompanies } from "@/reducers/company/companySlice";
import { fetchCompanySectors } from "@/reducers/company-sector/company-sector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fetchProfile } from "@/reducers/profile/profileSlice";

const ClientSearch = ({
  profileID,
  selectedClients = [],
  onChange,
  onRemoveClient,
  icon = <User size={18} />,
}) => {
  const [formData, setFormData] = useState({
    category: 1,
    name: "",
    logo: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sectorSearch, setSectorSearch] = useState("");
  const [debouncedSectorSearch, setDebouncedSectorSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [companyID, setCompanyID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useAppSelector((state) => state.Client);
  const { companies } = useAppSelector((state) => state.company);
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

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedSectorSearch(sectorSearch),
      400
    );
    return () => clearTimeout(handler);
  }, [sectorSearch]);

  // Initial data fetching
  useEffect(() => {
    // Fetch initial data when component mounts
    dispatch(fetchCompanySectors({}));
    dispatch(fetchClient());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(fetchAllCompanies({ search: debouncedSearchTerm }));
    }
  }, [debouncedSearchTerm, dispatch]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Select client
  const handleSelectClient = (client) => {
    console.log("Selected client:", client);
    if (!selectedClients.some((c) => c.id === client.id)) {
      onChange([...selectedClients, client]);
    }

    // Update formData with selected client
    setFormData({
      category: client.category || 1,
      name: client.name || "",
      logo: client.logo || null,
    });
    setCompanyID(client.id);
    setSearchTerm(client.name || "");
    setShowDropdown(false);

    if (client.logo) {
      setImageFile(client.logo);
      // Create preview URL if logo is a file
      if (client.logo instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(client.logo);
      }
    }
  };

  const handleClearSelection = () => {
    setFormData({
      category: 1,
      name: "",
      logo: null,
    });
    setSearchTerm("");
    setShowDropdown(false);
    setImageFile(null);
    setPreviewUrl(null);
    inputRef.current.focus();
  };
  const handleResetClient = () => {
    setFormData({
      category: 1,
      name: "",
      logo: null,
    });
    setSearchTerm("");
    setShowDropdown(false);
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleAddClient = () => {
    setIsLoading(true);
    try {
      // Create a FormData object from the state
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name || searchTerm);
      submitFormData.append("category", formData.category);

      if (formData.logo || imageFile) {
        submitFormData.append("logo", formData.logo || imageFile);
      }

      // Log the form data entries for debugging
      console.log("FormData entries:");
      for (let pair of submitFormData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Dispatch the action with the formData and wait for it to complete
      dispatch(postClient(submitFormData))
        .unwrap()
        .then((result) => {
          onChange([...selectedClients, result]);
          dispatch(fetchProfile());
        })
        .catch((error) => {
          console.error("Error adding client:", error);
        });

      handleResetClient();
    } catch (err) {
      console.error("Failed to add client:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update both the image file state and the formData state
    setImageFile(file);
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (value) => {
    const categoryId = Number(value);
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const clientExists = clients?.some(
    (c) => c.company_name?.toLowerCase() === searchTerm.toLowerCase()
  );

  const handleClientUpdate =  () => {
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

  const handleRemoveClient = async (clientID) => {
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
      onChange(selectedClients.filter((client) => client.id !== clientID));

      // Refresh client list after deletion
    } catch (error) {
      console.error("Remove failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("Selected clients:", selectedClients);
  return (
    <div className="relative w-full">
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
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for a client"
          className="w-full p-2 pl-10 pr-16 bg-[#262640] text-white rounded-3xl border focus:ring-2 focus:ring-[#7C2BD3]"
          disabled={isLoading}
        />

        {searchTerm && !clientExists && (
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15M1 8H15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-[#1E1E38] rounded-xl shadow-lg border border-[#3A3A5A]"
        >
          {companies?.length > 0 ? (
            companies.map((cli) => (
              <div
                key={cli.id}
                onClick={() => handleSelectClient(cli)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#2A2A4A] transition"
              >
                <span className="text-white">{cli.name}</span>
                {selectedClients.some((c) => c.id === cli.id) && (
                  <Check size={16} className="text-[#7C2BD3]" />
                )}
              </div>
            ))
          ) : debouncedSearchTerm ? (
            <div className="px-4 py-2 text-gray-400">No clients found</div>
          ) : (
            <div className="px-4 py-2 text-gray-400">
              Type to search clients
            </div>
          )}
        </div>
      )}

      {/* Selected Clients */}
      {selectedClients.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center bg-[#2A2A4A] text-white px-3 py-1 rounded-full"
            >
              <span className="mr-2 text-sm">{client.name}</span>
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => handleRemoveClient(client.id)}
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
      )}

      {/* Image Upload */}
      {searchTerm && !clientExists && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-white mb-2">
            Upload Client Image
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
                {imageFile ? imageFile.name : "Click or drag to upload image"}
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
              <span className="text-sm text-white">{imageFile?.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Company Sector Selection */}
      <div className="relative mt-4">
        <Select
          value={String(formData.category)}
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
      <Button
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H20M20 12L14 6M20 12L14 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </Button>
    </div>
  );
};

export default ClientSearch;
