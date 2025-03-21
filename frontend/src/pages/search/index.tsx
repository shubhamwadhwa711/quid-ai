import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Linkedin,
  MoveRight,
  Search as SearchIcon,
  Filter,
  X,
  CheckCircle,
  Check,
  SlidersHorizontal,
  Router,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FilterDrawer from "@/components/FilterDrawer";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ExpertiseIcon } from "@/components/icons/ExpertiseIcon";
import { AcademicIcon } from "@/components/icons/AcademicIcon";
import { CountryIcon } from "@/components/icons/CountryIcon";
import { ClientsIcon } from "@/components/icons/ClientsIcon";
import { LanguagesIcon } from "@/components/icons/LanguagesIcon";
import { AvailableToIcon } from "@/components/icons/AvailableToIcon";
import { useRouter } from "next/navigation";
import TalentCard from "@/components/TalentCard";
import { profile } from "console";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile, Profile } from "@/reducers/profile/profileSlice";

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.Profile);
  useEffect(() => {
    // console.log("dispatching profile...");
    dispatch(fetchProfile());
  }, [dispatch]);
  // console.log("profile", profile);
  const [userData, setUserData] = useState<Profile[] | null>(null);
  console.log("userData", userData);
  console.log("userData", userData);
  // State for controlling which popup is currently open
  const [activePopup, setActivePopup] = useState(null);
  useEffect(() => {
    setUserData(profile);
  }, [profile]);
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    academics: [],
    countries: [],
    languages: [],
    clients: [],
    availability: [],
  });

  const router = useRouter();
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const QuickFilters = [
    {
      id: 1,
      icon: "/Icons/Expertise.png",
      label: "Expertise",
    },
    {
      id: 2,
      icon: "/Icons/Academic.png",
      label: "Academic",
    },
    {
      id: 3,
      icon: "/Icons/Country.png",
      label: "Country",
    },
    {
      id: 4,
      icon: "/Icons/Client.png",
      label: "Clients",
    },
    {
      id: 5,
      icon: "/Icons/Languages.png",
      label: "Languages",
    },
    {
      id: 6,
      icon: "/Icons/AvailableTo.png",
      label: "Available to",
    },
  ];
  const removeFilter = (key: string, value?: string) => {
    setSelectedFilters((prevFilters) => {
      if (key === "skills") {
        return {
          ...prevFilters,
          skills: prevFilters.skills.filter((skill) => skill !== value),
        };
      } else if (key === "languages") {
        return {
          ...prevFilters,
          languages: prevFilters.languages.filter(
            (language) => language !== value
          ),
        };
      } else if (key === "countries") {
        return {
          ...prevFilters,
          countries: prevFilters.countries.filter(
            (country) => country !== value
          ),
        };
      } else if (key === "availability") {
        return {
          ...prevFilters,
          availability: prevFilters.availability.filter(
            (aval) => aval !== value
          ),
        };
      } else if (key === "clients") {
        return {
          ...prevFilters,
          clients: prevFilters.clients.filter((cli) => cli !== value),
        };
      } else if (key === "academics") {
        return {
          ...prevFilters,
          academics: prevFilters.academics.filter((aca) => aca !== value),
        };
      } else {
        return {
          ...prevFilters,
          [key]: "",
        };
      }
    });
  };
  console.log("Filter selection", selectedFilters);
  console.log("userData", userData);
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="my-20 w-full flex flex-col gap-2">
        <div className="flex px-2 md:px-4 lg:px-6 max-w-xl gap-2">
          <div className=" border   flex w-full items-center rounded-3xl">
            <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              type="text"
              placeholder="Search talent..."
              className="flex h-10 w-full border-none focus-visible:ring-0 rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button
            size="icon"
            variant="none"
            onClick={handleFilterToggle}
            className="h-10 w-12  rounded-full bg-[#425BFF]"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "90%", width: "90%" }}
            >
              <path
                d="M25.5476 8.28571H10.3572M7.59525 8.28571H3.45239M25.5476 22.0952H10.3572M7.59525 22.0952H3.45239M18.6429 15.1905H3.45239M25.5476 15.1905H21.4048M8.9762 5.5238C9.34245 5.5238 9.6937 5.6693 9.95268 5.92828C10.2117 6.18725 10.3572 6.5385 10.3572 6.90476V9.66666C10.3572 10.0329 10.2117 10.3842 9.95268 10.6431C9.6937 10.9021 9.34245 11.0476 8.9762 11.0476C8.60995 11.0476 8.2587 10.9021 7.99972 10.6431C7.74074 10.3842 7.59525 10.0329 7.59525 9.66666V6.90476C7.59525 6.5385 7.74074 6.18725 7.99972 5.92828C8.2587 5.6693 8.60995 5.5238 8.9762 5.5238ZM8.9762 19.3333C9.34245 19.3333 9.6937 19.4788 9.95268 19.7378C10.2117 19.9968 10.3572 20.348 10.3572 20.7143V23.4762C10.3572 23.8424 10.2117 24.1937 9.95268 24.4527C9.6937 24.7116 9.34245 24.8571 8.9762 24.8571C8.60995 24.8571 8.2587 24.7116 7.99972 24.4527C7.74074 24.1937 7.59525 23.8424 7.59525 23.4762V20.7143C7.59525 20.348 7.74074 19.9968 7.99972 19.7378C8.2587 19.4788 8.60995 19.3333 8.9762 19.3333ZM20.0238 12.4286C20.3901 12.4286 20.7413 12.5741 21.0003 12.833C21.2593 13.092 21.4048 13.4433 21.4048 13.8095V16.5714C21.4048 16.9377 21.2593 17.2889 21.0003 17.5479C20.7413 17.8069 20.3901 17.9524 20.0238 17.9524C19.6576 17.9524 19.3063 17.8069 19.0473 17.5479C18.7884 17.2889 18.6429 16.9377 18.6429 16.5714V13.8095C18.6429 13.4433 18.7884 13.092 19.0473 12.833C19.3063 12.5741 19.6576 12.4286 20.0238 12.4286Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div className="">
          <div className="mx-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <h1 className="proxima-bold text-xl text-white">
              Quick filters by
            </h1>
          </div>
          <div className="w-full px-2 md:px-4 lg:px-6">
            <div className="grid grid-cols-2  sm:grid-cols-3    gap-2 hide-scrollbar">
              {QuickFilters.map(({ id, icon, label }) => (
                <Card
                  key={id}
                  className="min-h-16 min-w-28 flex flex-col align-middle justify-center items-center border-none bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]"
                >
                  <CardTitle>
                    <img src={icon} alt="" />
                  </CardTitle>
                  <CardDescription className="text-white proxima-bold">
                    {label}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 max-w-sm hide-scrollbar overflow-x-scroll mx-2">
          {/* <div className="flex flex-wrap gap-2 mt-4"> */}
          {selectedFilters?.skills?.map((skill) => (
            <Badge
              key={skill}
              className="flex bg-white/20 items-center text-nowrap rounded-3xl"
            >
              <span className="text-xs proxima-bold">{skill}</span>
              <button
                onClick={() => removeFilter("skills", skill)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
          {/* </div> */}
          {/* <div className="flex flex-wrap gap-2 mt-2"> */}
          {selectedFilters?.languages?.map((language) => (
            <Badge
              key={language}
              className="flex bg-white/20 items-center text-nowrap px-2 py-1 rounded-full"
            >
              <span className="text-xs proxima-bold">{language}</span>
              <button
                onClick={() => removeFilter("languages", language)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
          {/* </div> */}
          {/* <div className="flex flex-wrap gap-2 mt-2"> */}
          {selectedFilters?.countries?.map((country) => (
            <Badge
              key={country}
              className="flex bg-white/20 items-center text-nowrap px-2 py-1 rounded-full"
            >
              <span className="text-xs proxima-bold">{country}</span>
              <button
                onClick={() => removeFilter("countries", country)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
          {/* </div> */}
          {/* <div className="flex flex-wrap gap-2 mt-4"> */}
          {selectedFilters?.availability?.map((aval) => (
            <Badge
              key={aval}
              className="flex bg-white/20 items-center text-nowrap px-2 py-1 rounded-full"
            >
              <span className="text-xs proxima-bold">{aval}</span>
              <button
                onClick={() => removeFilter("availability", aval)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
          {/* </div> */}
          {/* <div className="flex flex-wrap gap-2 mt-4"> */}
          {selectedFilters?.clients?.map((cli) => (
            <Badge
              key={cli}
              className="flex bg-white/20 items-center text-nowrap px-2 py-1 rounded-full"
            >
              <span className="text-xs proxima-bold">{cli}</span>
              <button
                onClick={() => removeFilter("clients", cli)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
          {/* </div> */}
          {/* <div className="flex flex-wrap gap-2 mt-4"> */}
          {selectedFilters?.academics?.map((aca) => (
            <Badge
              key={aca}
              className="flex bg-white/20 items-center text-nowrap px-2 py-1 rounded-full"
            >
              <span className="text-xs proxima-bold">{aca}</span>
              <button
                onClick={() => removeFilter("academics", aca)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
          {/* </div> */}
        </div>
        {showFilters && (
          <Drawer open={showFilters} onOpenChange={setShowFilters}>
            <DrawerContent>
              <FilterDrawer
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                handleFilterToggle={handleFilterToggle}
                setSelectedFilters={setSelectedFilters}
              />
            </DrawerContent>
          </Drawer>
        )}
      </div>

      {/* <div className="absolute top-10 left-50 w-full  flex justify-center">
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
          alt="Spiral Background"
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className="-mt-10 w-full relative overflow-x-auto  hide-scrollbar px-4">
        <div className="mx-1 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          <h1 className="proxima-bold text-xl text-white">Top AI Talents</h1>
        </div>
        <div className=" absolute top-0 right-0  flex justify-center">
          <img
            src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
            alt="Spiral Background"
            className="w-full h-full object-fill"
          />
        </div>
        <div className="w-full overflow-x-auto hide-scrollbar px-4 grid grid-flow-col auto-cols-max gap-2">
          {userData?.map((talent) => (
            <TalentCard talent={talent} />
          ))}
        </div>
        <div className="mt-10 mb-20">
          <div className="mx-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <h1 className="proxima-bold text-xl text-white">
              AI Talents from US
            </h1>
          </div>
          <div className="w-full overflow-x-auto hide-scrollbar px-4 grid grid-flow-col auto-cols-max gap-2">
            {userData?.map((talent) => (
              <TalentCard talent={talent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
