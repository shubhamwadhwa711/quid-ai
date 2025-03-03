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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const talentData = [
  {
    id: 1,
    name: "Sophia Chris",
    location: "United States",
    avatar:
      "https://s3-alpha-sig.figma.com/img/62f2/9fb8/c20f7bac95d577ddcab770a7f8841303?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tNjvOMdq8NalM5x8Q94PUCz~pdH1zcdoqCbx6TZF~7obMlU7JAC~f436a-NtLE5HpsCaMshcZuC5XN9JOcfdn7zjzI168bUhSpy1HIC-HzcNyesB6Ad0~FPxx2Ms6ROuiYXYAoFKb3CFVWOx4i1QgcDSDdyrAiqpHAI1DAyvUhRHlZX6F2qhu-ZP47peL5ejE8RTD9u39ULymoJtXQF6bChQqrtihKivumFLWgJPn5Io6iQT~t40AzdjKC9kkfZuYD-IsBtVUmCPvzMlZvqqRkR4HaaHELAFVRbtVm3I1rAbvj9CDf9mvmVErZn1JkOizIeu3V--yqWXPM6lhUczgQ__",
    role: "Mathematician and Statistician",
    skills: {
      technical: [
        "Mathematics",
        "Statistics",
        "Data Analysis",
        "R",
        "Python",
        "Machine Learning",
      ],
      softSkills: [
        // "Problem Solving",
        // "Research",
        // "Critical Thinking",
        // "Communication",
      ],
      tools: ["MATLAB", "SPSS", "Tableau", "SQL", "Excel"],
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/sophiachris",
    },
    featuredClients: [
      {
        name: "discord",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/r3lkfnldpgbpmzxfx8fy.png",
      },
      {
        name: "meta",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/lm7tk69xjecwryeozuum.png",
      },
      {
        name: "netflix",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ol7ht5zbzvwfmxttw7yy.png",
      },
      {
        name: "intel",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/pfan7ykyt117mulrg3iq.png",
      },
      {
        name: "google",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/fktdz4tzrgz3ontonz69.png",
      },
      {
        name: "amazon",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ngzmyrjzatvjwsvn0wdb.png",
      },
      {
        name: "microsoft",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/i8prphmo6qg6rnliopeh.png",
      },
      {
        name: "lakme",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/beujzp1m5a11fblem753.png",
      },
      {
        name: "samsung",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/y4r3yorp7jdcrvg3vrxy.png",
      },
    ],
  },
  {
    id: 2,
    name: "Sophia Chris",
    location: "United States",
    avatar:
      "https://s3-alpha-sig.figma.com/img/62f2/9fb8/c20f7bac95d577ddcab770a7f8841303?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tNjvOMdq8NalM5x8Q94PUCz~pdH1zcdoqCbx6TZF~7obMlU7JAC~f436a-NtLE5HpsCaMshcZuC5XN9JOcfdn7zjzI168bUhSpy1HIC-HzcNyesB6Ad0~FPxx2Ms6ROuiYXYAoFKb3CFVWOx4i1QgcDSDdyrAiqpHAI1DAyvUhRHlZX6F2qhu-ZP47peL5ejE8RTD9u39ULymoJtXQF6bChQqrtihKivumFLWgJPn5Io6iQT~t40AzdjKC9kkfZuYD-IsBtVUmCPvzMlZvqqRkR4HaaHELAFVRbtVm3I1rAbvj9CDf9mvmVErZn1JkOizIeu3V--yqWXPM6lhUczgQ__",
    role: "Mathematician and Statistician",
    skills: {
      technical: [
        "Mathematics",
        "Statistics",
        "Data Analysis",
        "R",
        "Python",
        "Machine Learning",
      ],
      softSkills: [
        // "Problem Solving",
        // "Research",
        // "Critical Thinking",
        // "Communication",
      ],
      tools: ["MATLAB", "SPSS", "Tableau", "SQL", "Excel"],
    },

    socialLinks: {
      linkedin: "https://linkedin.com/in/sophiachris",
    },
    featuredClients: [
      {
        name: "discord",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/r3lkfnldpgbpmzxfx8fy.png",
      },
      {
        name: "meta",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/lm7tk69xjecwryeozuum.png",
      },
      {
        name: "netflix",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ol7ht5zbzvwfmxttw7yy.png",
      },
      {
        name: "intel",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/pfan7ykyt117mulrg3iq.png",
      },
      {
        name: "google",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/fktdz4tzrgz3ontonz69.png",
      },
      {
        name: "amazon",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ngzmyrjzatvjwsvn0wdb.png",
      },
      {
        name: "microsoft",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/i8prphmo6qg6rnliopeh.png",
      },
      {
        name: "lakme",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/beujzp1m5a11fblem753.png",
      },
      {
        name: "samsung",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/y4r3yorp7jdcrvg3vrxy.png",
      },
    ],
  },
  {
    id: 3,
    name: "Sophia Chris",
    location: "United States",
    avatar:
      "https://s3-alpha-sig.figma.com/img/62f2/9fb8/c20f7bac95d577ddcab770a7f8841303?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tNjvOMdq8NalM5x8Q94PUCz~pdH1zcdoqCbx6TZF~7obMlU7JAC~f436a-NtLE5HpsCaMshcZuC5XN9JOcfdn7zjzI168bUhSpy1HIC-HzcNyesB6Ad0~FPxx2Ms6ROuiYXYAoFKb3CFVWOx4i1QgcDSDdyrAiqpHAI1DAyvUhRHlZX6F2qhu-ZP47peL5ejE8RTD9u39ULymoJtXQF6bChQqrtihKivumFLWgJPn5Io6iQT~t40AzdjKC9kkfZuYD-IsBtVUmCPvzMlZvqqRkR4HaaHELAFVRbtVm3I1rAbvj9CDf9mvmVErZn1JkOizIeu3V--yqWXPM6lhUczgQ__",
    role: "Mathematician and Statistician",
    skills: {
      technical: [
        "Mathematics",
        "Statistics",
        "Data Analysis",
        "R",
        "Python",
        "Machine Learning",
      ],
      softSkills: [
        // "Problem Solving",
        // "Research",
        // "Critical Thinking",
        // "Communication",
      ],
      tools: ["MATLAB", "SPSS", "Tableau", "SQL", "Excel"],
    },

    socialLinks: {
      linkedin: "https://linkedin.com/in/sophiachris",
    },
    featuredClients: [
      {
        name: "discord",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/r3lkfnldpgbpmzxfx8fy.png",
      },
      {
        name: "meta",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/lm7tk69xjecwryeozuum.png",
      },
      {
        name: "netflix",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ol7ht5zbzvwfmxttw7yy.png",
      },
      {
        name: "intel",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/pfan7ykyt117mulrg3iq.png",
      },
      {
        name: "google",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/fktdz4tzrgz3ontonz69.png",
      },
      {
        name: "amazon",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ngzmyrjzatvjwsvn0wdb.png",
      },
      {
        name: "microsoft",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/i8prphmo6qg6rnliopeh.png",
      },
      {
        name: "lakme",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/beujzp1m5a11fblem753.png",
      },
      {
        name: "samsung",
        image:
          "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/y4r3yorp7jdcrvg3vrxy.png",
      },
    ],
  },
];
const solutions = [
  {
    id: 1,
    label: "Healthcare & Pharma",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/xbnlyaxtqa1lqdlsag3u.png",
  },
  {
    id: 2,
    label: "Hospitality Management",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/zfa2mfxyhuqmd4tfrno8.png",
  },
  {
    id: 3,
    label: "Banks & Fintech",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/ebvdoqqr1boilamfsqwn.png",
  },
  {
    id: 4,
    label: "Marketing Experts",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/qmkwqvruzkvpgsz9pbnz.png",
  },
  {
    id: 5,
    label: "Corporate World",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/oachy0hnhep4hly7kyfe.png",
  },
  {
    id: 6,
    label: "Events & Training",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/rx5tv3bg7ow1jwyhdp1v.png",
  },
];
// Extract all unique skills from talent data
const getAllSkills = () => {
  const allSkills = new Set();
  talentData.forEach((talent) => {
    Object.values(talent.skills)
      .flat()
      .forEach((skill) => {
        allSkills.add(skill);
      });
  });
  return Array.from(allSkills);
};

// Extract all unique locations
const getAllLocations = () => {
  const locations = new Set();
  talentData.forEach((talent) => {
    locations.add(talent.location);
  });
  return Array.from(locations);
};

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    location: "",
    specialization: "",
  });

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleSkillSelect = (skill) => {
    if (selectedFilters.skills.includes(skill)) {
      setSelectedFilters({
        ...selectedFilters,
        skills: selectedFilters.skills.filter((s) => s !== skill),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        skills: [...selectedFilters.skills, skill],
      });
    }
  };

  const handleLocationChange = (location) => {
    setSelectedFilters({
      ...selectedFilters,
      location,
    });
  };

  const handleRoleChange = (specialization) => {
    setSelectedFilters({
      ...selectedFilters,
      specialization,
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      skills: [],
      location: "",
      specialization: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-11/12 my-20 flex flex-col gap-4">
        <label className="relative flex items-center gap-3 px-4 py-2 rounded-3xl">
          <SearchIcon className="absolute left-4 text-gray-400 mx-2" />
          <Input
            type="text"
            placeholder="Search talent..."
            className="pl-10 pr-4 py-2 w-full outline-none border bg-transparent focus:ring-2 focus:ring-blue-500 rounded-3xl"
          />
          <Button
            onClick={handleFilterToggle}
            className="absolute right-4 rounded-full p-2 bg-transparent hover:bg-gray-700/20"
          >
            <Filter
              className={`h-5 w-5 ${
                showFilters ? "text-blue-500" : "text-gray-400"
              }`}
            />
          </Button>
        </label>

        {showFilters && (
          <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-xs text-gray-300 hover:text-white"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  variant="ghost"
                  className="p-1 hover:bg-gray-700/20 rounded-full"
                  onClick={handleFilterToggle}
                >
                  <X className="h-4 w-4 text-gray-300" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Specialization Sector
              </label>

              <div className="flex gap-2 overflow-x-auto">
                {solutions.map((solution) => (
                  <Card
                    key={solution.id}
                    className={`h-28 w-32 p-2  transition-all duration-200 hover:border-gray-500 ${
                      selectedFilters.specialization === solution.label
                        ? "border-[#7C2BD3] bg-gradient-to-r from-[#7C2BD3]/10 to-[#075AA8]/10"
                        : "bg-white/5 border-gray-700"
                    }`}
                  >
                    <Button
                      variant="ghost"
                      className="w-full h-full p-3 flex flex-col items-center justify-center text-sm text-white font-medium"
                      onClick={() =>
                        handleRoleChange(
                          solution.label === selectedFilters.specialization
                            ? "all"
                            : solution.label
                        )
                      }
                    >
                      <img src={solution.image} alt="" />
                      {solution.label}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-12 mx-2 my-4">
              <div className="col-span-4 flex flex-col">
                <h1 className="mx-2">Filters By</h1>
                {["Country", "Studies", "Client", "Project"].map(
                  (filter, index) => (
                    <Badge
                      key={index}
                      className="w-28 bg-[#545C6C] p-2 rounded-3xl m-1"
                    >
                      {filter}
                    </Badge>
                  )
                )}
              </div>
              <div className="col-span-8 my-4">
                <label className="relative flex items-center gap-3 px-4 py-2 rounded-3xl">
                  <SearchIcon className="absolute left-4 text-gray-400 mx-2" />
                  <Input
                    type="text"
                    placeholder="Search Country"
                    className="pl-10 pr-4 py-2 w-full outline-none border bg-transparent focus:ring-2 focus:ring-blue-500 rounded-3xl"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="rounded-3xl px-6 py-2 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8]">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* <div className="absolute top-40 left-50 w-full  flex justify-center">
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
          alt="Spiral Background"
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className="h-screen w-full overflow-x-auto hide-scrollbar px-4">
        <div className="mx-4">
          <div className="rounded-full bg-orange-500"></div>
          <h1 className="text-bold text-xl">Top AI Talents</h1>
        </div>
        <div className="w-full overflow-x-auto hide-scrollbar px-4 grid grid-flow-col auto-cols-max gap-2">
          {talentData.map((talent) => (
            <Card
              key={talent.id}
              className="bg-white/10 h-96 w-80 border-none max-w-md relative text-white mt-20"
            >
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-10">
                <Avatar className="w-24 h-24 shadow-lg ">
                  <AvatarImage
                    src={talent.avatar}
                    alt={talent.name}
                    className="object-cover"
                  />
                </Avatar>
              </div>
              <CardHeader className="mt-8 flex flex-col items-center">
                <CardTitle>{talent.name}</CardTitle>
                <CardDescription>{talent.location}</CardDescription>
                <p>{talent.role}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Object.values(talent.skills)
                      .flat()
                      .map((skill, index) => (
                        <Badge
                          key={index}
                          className="h-5 text-sm rounded-full bg-white/20 font-medium transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex -mt-2 flex-col">
                  <div className="flex justify-center items-center gap-4">
                    <Button className="rounded-3xl px-14 py-6 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] flex items-center gap-2">
                      Connect <MoveRight />
                    </Button>
                    <Button
                      className="rounded-full h-12 w-12 border flex items-center justify-center"
                      onClick={() =>
                        window.open(talent.socialLinks.linkedin, "_blank")
                      }
                    >
                      <Linkedin />
                    </Button>
                  </div>
                  <div className="flex items-center mt-2">
                    <h3 className="text-sm ">Featured Clients</h3>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="w-full overflow-x-auto hide-scrollbar">
                      <div className="w-full relative">
                        <div className="flex items-center">
                          {talent.featuredClients.map((client, index) => (
                            <img
                              key={index}
                              src={client.image}
                              alt={client.name}
                              className="h-8 w-20 object-contain inline-block ms-2"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
