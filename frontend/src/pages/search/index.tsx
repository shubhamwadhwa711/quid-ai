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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FilterDrawer from "@/components/FilterDrawer";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

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
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    location: "",
    specialization: "",
  });
  const [connectForm, setConnectForm] = useState({
    name: "",
    email: "",
    message: "",
    project: "",
  });
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleConnectForm = (talent) => {
    setSelectedTalent(talent);
    setShowConnectForm(!showConnectForm);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setConnectForm({
      ...connectForm,
      [name]: value,
    });
  };
  const handleSubmitConnect = () => {
    // Here you would typically handle the form submission to your backend
    console.log("Form submitted:", connectForm);

    // Show thank you message
    setFormSubmitted(true);

    // Optional: Reset form
    setConnectForm({ name: "", email: "", message: "" });
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
          ></Button>
          <SlidersHorizontal
            strokeWidth={1}
            className="text-white w-12 h-10 p-2 m-2 bg-[#425BFF] rounded-full"
          />
        </label>

        {showFilters && (
          <FilterDrawer
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            handleFilterToggle={handleFilterToggle}
          />
        )}
      </div>

      {/* <div className="absolute top-10 left-50 w-full  flex justify-center">
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
          alt="Spiral Background"
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className=" w-full overflow-x-auto hide-scrollbar px-4">
        <div className="mx-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          <h1 className="proxima-medium text-xl">Top AI Talents</h1>
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
              <CardHeader className="mt-8  flex flex-col items-center">
                <CardTitle className="proxima-medium">{talent.name}</CardTitle>
                <CardDescription className="proxima-small">
                  {talent.location}
                </CardDescription>
                <p className="proxima-medium">{talent.role}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Object.values(talent.skills)
                      .flat()
                      .map((skill, index) => (
                        <Badge
                          key={index}
                          className="h-5 text-sm rounded-full bg-white/20 proxima-small transition-all duration-300"
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
                    <Button
                      onClick={handleConnectForm}
                      className="rounded-3xl proxima-large px-14 py-6 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] flex items-center gap-2"
                    >
                      Connect <MoveRight />
                    </Button>
                    <Button
                      className="rounded-full h-12 w-12 border flex items-center justify-center"
                      onClick={() =>
                        window.open(talent.socialLinks.linkedin, "_blank")
                      }
                      variant="none"
                    >
                      <Linkedin />
                    </Button>
                  </div>
                  <div className="flex items-center mt-2">
                    <h3 className="text-sm proxima-medium">Featured Clients</h3>
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
        <div className="mt-10 mb-20">
          <div className="mx-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <h1 className="font-bold text-xl">AI Talents from US</h1>
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
        <Dialog open={showConnectForm} onOpenChange={setShowConnectForm}>
          <DialogContent className="sm:max-w-md bg-gradient-to-t  from-black  via-blue-950  to-black  border-white/20 text-white">
            {!formSubmitted ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl text-center font-semibold">
                    Connect Now
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Send a message to start collaborating with this AI talent.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                  <Separator className="bg-white/20" />

                  <div className="grid gap-4">
                    <div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={connectForm.name}
                          onChange={handleFormChange}
                          className="bg-white/5 border-white/10 rounded-3xl focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={connectForm.email}
                        onChange={handleFormChange}
                        className="bg-white/5 border-white/10 rounded-3xl focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={connectForm.message}
                        onChange={handleFormChange}
                        placeholder="Describe your project or what you'd like to collaborate on..."
                        className="bg-white/5 border-white/10 focus:border-purple-500 min-h-24"
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-center mt-4">
                  <Button
                    onClick={handleSubmitConnect}
                    className="rounded-3xl px-8 py-3 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] w-full"
                  >
                    Send Request <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </>
            ) : (
              // Thank you message after submission
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="relative flex justify-center items-center">
                  <div className="h-16 w-16 flex justify-center items-center rounded-full bg-gradient-to-b from-[#7C2BD3] to-[#075AA8] relative z-10">
                    <Check className="h-6 w-8 text-white" />
                  </div>
                  <div className="absolute h-24 w-24 rounded-full bg-[#7C2BD3]/30 z-0"></div>
                  <div className="absolute h-32 w-32 rounded-full bg-[#7C2BD3]/20 z-[-1]"></div>
                </div>

                <DialogTitle className="text-xl font-semibold mb-2 mt-14">
                  Thank You!
                </DialogTitle>
                <DialogDescription className="text-white max-w-xs mx-auto">
                  Your message has been sent successfully. <br />
                  AI expert will get back to you soon.
                </DialogDescription>
                <DialogFooter className="mt-4">
                  <Button className="rounded-3xl px-8 py-3 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] w-full">
                    Continue Searching <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Search;
