import { Linkedin } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Profile } from "@/reducers/profile/profileSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConnectDialog from "./ConnectDialog";
import Link from "next/link";
interface TalentCard {
  id: number;
  user: Profile["user"];
  skill: Profile["skill"];
  client: Profile["client"];
  image: string;
  headline: string;
  summary?: string;
  location: string;
  linkedin_url: string;
}
const TalentCard = ({ talent }: { talent: TalentCard }) => {
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const router = useRouter();
  const handleConnectForm = (talent) => {
    setSelectedTalent(talent);
    setShowConnectForm(true);
  };
  console.log("talent image", talent.image);
  return (
    <Card
      key={talent.id}
      className="bg-white/10 h-96 w-80 flex flex-col gap-y-4 border-none  relative text-white mt-20"
    >
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-10">
        <Avatar className="w-24 h-24 shadow-lg ">
          <AvatarImage
            src={talent?.image}
            alt={talent?.user?.username}
            className="object-cover border"
          />
        </Avatar>
      </div>
      <CardHeader className=" flex flex-col items-center gap-y-2 mt-14 px-6 py-0">
        <CardTitle
          className="cursor-pointer "
          onClick={() => router.push(`/talent/${talent.id}`)}
        >
          {talent?.user?.first_name} {talent?.user?.last_name}
        </CardTitle>
        <CardDescription className="text-xs">
          {talent?.location}
        </CardDescription>
        <span className="text-sm proxima-FAQ">{talent.headline}</span>
      </CardHeader>
      <CardContent className="text-center px-6 py-0">
        <div className="flex flex-wrap overflow-hidden max-h-[5rem] justify-center gap-2 ">
          {talent?.skill?.map((s, index) => (
            <Badge
              key={index}
              className="h-5 text-xs rounded-full font-medium  bg-white/20  transition-all duration-300"
            >
              {s.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-0 text-center">
        <div className="w-full flex gap-y-4 flex-col">
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => handleConnectForm()}
              className="rounded-3xl proxima-bold px-14 py-6 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] flex items-center gap-2"
            >
              Connect
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7H17M17 7L11 1M17 7L11 13"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
            <Link
              className="rounded-full h-12 w-12 border flex items-center justify-center"
              href={talent.linkedin_url}
            >
              <Linkedin />
            </Link>
          </div>
          <div className="flex flex-nowrap items-center ">
            <h3 className="text-xs text-nowrap">Featured Clients</h3>
            <Separator orientation="vertical" className="h-4 ml-2" />
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div className="w-full relative">
                <div className="flex items-center">
                  {talent?.client?.map((cli, index) => (
                    <img
                      key={index}
                      src={cli.name}
                      alt={cli.name}
                      className="h-8 w-20 object-contain inline-block ms-2"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ConnectDialog
          talentId={talent.id}
          showConnectForm={showConnectForm}
          setShowConnectForm={setShowConnectForm}
        />
      </CardFooter>
    </Card>
  );
};

export default TalentCard;
