import { ArrowRight, Linkedin } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
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
import Image from "next/image";

const TalentCard = ({
  talent,
  talentType,
}: {
  talent: Profile;
  talentType: string;
}) => {
  const clientsScrollRef = useHorizontalScroll<HTMLDivElement>();
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const router = useRouter();

  const handleConnectForm = (talent?: any) => {
    setSelectedTalent(talent);
    setShowConnectForm(true);
  };

  // console.log("talent", talent);
  // console.log("talentType", talentType);

  return (
    <Card
      key={talent?.id}
      className="bg-white/20   h-96 w-80 flex flex-col border-none relative text-white mt-20"
    >
      <div className="absolute -top-14  left-1/2 transform -translate-x-1/2 z-50">
        <Avatar className="w-24 h-24 shadow-lg ">
          <Image
            src={talent?.image || talent?.linkedin_profile_url || '/default-avatar.jpg'}
            alt={talent?.user?.username || 'User'}
            className="object-cover border"
            width={100}
            height={100}
          />
        </Avatar>
      </div>

      <div className="flex flex-col h-full">
        {/* Top section */}
        <CardHeader className="flex flex-col items-center gap-y-2 mt-14 px-6 py-0">
          <CardTitle
            className="cursor-pointer"
            onClick={() => router.push(`/talent/${talentType}/${talent.id}`)}
          >
            {talent?.user?.first_name} {talent?.user?.last_name}
          </CardTitle>
          <CardDescription className="text-xs">
            {talent?.country?.name}
          </CardDescription>
          <span className="text-sm proxima-FAQ">{talent?.headline}</span>
        </CardHeader>

        {/* Middle section (will grow/shrink as needed) */}
        <CardContent className="text-center px-6 py-2 flex-grow">
          <div className="flex flex-wrap justify-center gap-2 overflow-y-auto max-h-full">
            {talent?.skill?.slice(0, 5).map((s, index) => (
              <Badge
                variant="none"
                key={index}
                className="h-5 text-xs rounded-full border-none font-medium bg-white/20 transition-all duration-300"
              >
                {s?.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Bottom section (always at bottom) */}
        <CardFooter className="px-6 py-3 mt-auto">
          <div className="w-full flex gap-y-4 flex-col">
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={() => handleConnectForm()}
                className="rounded-3xl proxima-bold text-white px-14 py-6 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] flex items-center gap-2"
              >
                Connect
                <ArrowRight />
              </Button>
              <Link
                className="rounded-full h-12 w-12 border flex items-center justify-center bg-[#0a66c2] text-white hover:bg-[#084d91] transition"
                href={talent?.linkedin_url || "#"}
              >
                <Linkedin />
              </Link>
            </div>
            <div className="flex flex-nowrap items-center">
              <h3 className="text-xs text-nowrap">Featured Clients</h3>
              <Separator orientation="vertical" className="h-4 mx-2 " />
              <div ref={clientsScrollRef} className="w-full overflow-x-auto hide-scrollbar">
                <div className="w-full relative">
                  <div className="flex items-center">
                    {talent?.client?.slice(0, 2)?.map((cli, index) =>
                      cli.logo ? (
                        <img
                          key={index}
                          src={cli.logo}
                          alt={cli.name}
                          className="h-8 w-20 object-contain inline-block ms-2"
                        />
                      ) : (
                        <span key={index} className=" text-xs font-bold">
                          {cli.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ConnectDialog
            talentId={talent?.id}
            showConnectForm={showConnectForm}
            setShowConnectForm={setShowConnectForm}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export default TalentCard;
