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
import { fetchClient, postClient } from "@/reducers/filter/client/clientSlice";
import { useAppSelector, useAppDispatch } from "@/store/store";

const ClientSearch = ({
  selectedClients = [],
  onChange,
  onRemoveClient,
  icon = <User size={18} />,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageFile, setImageFile] = useState(null); // 🆕 file state
  const [previewUrl, setPreviewUrl] = useState(null); // 🆕 preview state
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.Client);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(fetchClient({ search: debouncedSearchTerm }));
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
    if (!selectedClients.some((c) => c.id === client.id)) {
      onChange([...selectedClients, client]);
    }
    setSearchTerm("");
    setShowDropdown(false);
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleClearSelection = () => {
    setSearchTerm("");
    setShowDropdown(false);
    setImageFile(null);
    setPreviewUrl(null);
    inputRef.current.focus();
  };

  // Add new client (with image)
  const handleAddClient = () => {
    const formData = new FormData();
    formData.append("name", searchTerm);
    if (imageFile) formData.append("image", imageFile);
    console.log("formData", formData);
    dispatch(postClient(formData));
    setSearchTerm("");
    setShowDropdown(false);
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const clientExists = clients?.some(
    (c) => c.name.toLowerCase() === searchTerm.toLowerCase()
  );

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
        />

        {/* {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearSelection}
            className="absolute inset-y-0 right-12 flex items-center text-white h-8 w-8 p-0 my-auto"
          >
            <X size={16} />
          </Button>
        )} */}

        {/* Add Button */}
        {searchTerm && !clientExists && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleAddClient}
            className="absolute inset-y-0 right-2 flex items-center bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] rounded-full h-8 w-8 p-0 my-auto"
            title={`Add "${searchTerm}"`}
          >
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        )}

        {/* <Button
          type="button"
          variant="ghost"
          onClick={() => setShowDropdown(!showDropdown)}
          className="absolute inset-y-0 right-0 flex items-center text-white h-8 w-8 p-0 my-auto"
        >
          <ChevronDown
            size={18}
            className={`transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </Button> */}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-[#1E1E38] rounded-xl shadow-lg border border-[#3A3A5A]"
        >
          {clients?.length > 0 ? (
            clients.map((cli) => (
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
                onClick={() => onRemoveClient(client)}
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
    </div>
  );
};

export default ClientSearch;
