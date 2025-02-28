import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, MoveRight, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Image from "next/image";
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
        "Problem Solving",
        "Research",
        "Critical Thinking",
        "Communication",
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
        "Problem Solving",
        "Research",
        "Critical Thinking",
        "Communication",
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
        "Problem Solving",
        "Research",
        "Critical Thinking",
        "Communication",
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

const Search = () => {
  // Duplicate the clients array for seamless scrolling
  // const duplicatedClients = [...talentData[0].featuredClients];

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center ">
      <div className="w-96 flex items-center gap-3 border rounded-3xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 my-20">
        <SearchIcon className="text-gray-400" />
        <Input
          type="text"
          placeholder="Search talent..."
          className="flex-1 outline-none border-none bg-transparent"
        />
      </div>
      <div className="grid gap-y-20 gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {talentData.map((talent) => (
          <Card
            key={talent.id}
            className="bg-white/10 p-4  max-w-md relative text-white"
          >
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <Avatar className="w-28 h-1/5 shadow-lg ">
                <AvatarImage
                  src={talent.avatar}
                  alt={talent.name}
                  className="object-cover"
                />
              </Avatar>
            </div>
            <CardHeader className="pt-10 flex flex-col items-center">
              <CardTitle>{talent.name}</CardTitle>
              <CardDescription>{talent.location}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div>
                <p>{talent.role}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {Object.values(talent.skills)
                    .flat()
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-[#7C2BD3]/20 to-[#075AA8]/20 border border-[#7C2BD3]/30 hover:from-[#7C2BD3]/30 hover:to-[#075AA8]/30 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex flex-col space-y-10">
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
                <div className="flex flex-col md:flex-row items-center">
                  <h3 className="text-sm font-semibold ">Featured Clients</h3>
                  <Separator orientation="vertical" className="h-12" />
                  <div className="w-full overflow-x-auto scrollbar-none ">
                    <div className=""></div>
                    <div className="w-full relative">
                      <div className="flex flex-wrap w-max items-center">
                        {talent.featuredClients.map((client, index) => (
                          <img
                            key={index}
                            src={client.image}
                            alt={client.name}
                            className="h-8 w-20 object-contain inline-block mx-2"
                            
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
  );
};

export default Search;
