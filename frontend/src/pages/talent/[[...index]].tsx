import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, MapPin, Pencil, Share2, X } from "lucide-react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { Profile } from "@/reducers/profile/profileSlice";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import ConnectDrawer from "@/components/ConnectDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAIProfile } from "@/reducers/ai-talent/ai-talent";
import { fetchUSProfile } from "@/reducers/us-talent/us-talentSlice";
import Image from "next/image";

// Main Profile Component
const Talent = () => {
  const dispatch = useAppDispatch();
  const { aiProfile, loading, error } = useAppSelector(
    (state) => state.AIProfile
  );
  const { usProfile } = useAppSelector((state) => state.USProfile);
  const router = useRouter();
  // const { talenttype, id } = router.query;
  const talenttype = router.query.index?.[0] as string | undefined;
  const id = router.query.index?.[1] as string | undefined;

  console.log("talenttype", talenttype);
  console.log("id", id);
  // console.log("Router query",router.query)
  useEffect(() => {
    // console.log("dispatching profile...");
    if (!id) return;
    if (talenttype === "AI") {
      dispatch(fetchAIProfile(id));
    } else {
      dispatch(fetchUSProfile(id));
    }
  }, [dispatch, id, talenttype]);
  // console.log("profile", profile);
  const [userData, setUserData] = useState<Profile | null>(null);
  console.log("userData", userData);
  console.log("aiProfile", aiProfile);
  console.log("usProfile", usProfile);
  const summaryText = talenttype === "AI" ? aiProfile?.summary : usProfile?.summary;
  const talentId = talenttype === "AI" ? aiProfile?.id ?? null : usProfile?.id ?? null;
  // State for controlling which popup is currently open
  // useEffect(() => {
  //   setUserData(profile);
  // }, [profile]);
  const [showConnectForm, setShowConnectForm] = useState<boolean>(false);
  const [selectedTalent, setSelectedTalent] = useState<any>(null);
  const handleConnectForm = (talent: any) => {
    setSelectedTalent(talent);
    setShowConnectForm(true);
  };
  return (
    <div className="text-white flex flex-col items-center justify-center p-2 pb-20">
      {/* Main profile card */}
      <div className="w-full rounded-xl">
        {/* Cover photo area */}
        <div className="h-32"></div>

        {/* Profile content */}
        <div className="">
          {/* Profile header with image on left, name/location on right */}
          <div className="flex flex-row -mt-16">
            {/* Profile image (left) */}
            <div className="h-32 w-32 flex-shrink-0 rounded-full">

              {aiProfile ? (
                <Image
                  src={aiProfile.image || aiProfile.linkedin_profile_url || "/AI.jpg"}
                  alt="AI Profile"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-full"
                />
              ) : usProfile ? (
                <Image
                  src={usProfile.image || usProfile.linkedin_profile_url || "/AI.jpg"}
                  alt="US Profile"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-full"
                />
              ) : null}

            </div>
            <div className="ml-4">
              <div className="flex justify-between">
                <h1 className="text-2xl proxima-medium">
                  {aiProfile?.user?.first_name || usProfile?.user?.first_name}{" "}
                  {aiProfile?.user?.last_name || usProfile?.user?.last_name}
                </h1>
                {/* <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                ></Button> */}
              </div>
              <div className="flex items-center mt-1">
                <MapPin size={16} className="mr-1" />
                <span className="">
                  {aiProfile?.country.name || usProfile?.country.name}
                </span>
              </div>
              <div className="mt-2 w-full pr-2">
                <p className=" w-full text-xs font-semibold">
                  {aiProfile?.headline}
                </p>
              </div>
              <div className=" absolute top-24 right-0  flex justify-center">
                <img
                  src="/Icons/Spiral.png"
                  alt="Spiral Background"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="">
                <div className="flex  items-center gap-2 ">
                  {/* <img src="/Icons/linkdein.png" alt="" /> */}
                  <span className=" text-xs mt-2 font-bold  text-nowrap">
                    {/* {aiProfile?.linkedin_url?.slice(7)} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 mt-4  ">
            <Button
              onClick={() => setShowConnectForm(true)}
              className="w-full relative z-50 bg-gradient-to-r text-lg proxima-bold from-[#7C2BD3] to-[#075AA8] text-white rounded-full transition-colors space-x-2"
            >
              Connect
              {/* <Share2 size={40} className="ml-2" /> */}
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
                <h2 className="text-xl proxima-regular">EXPERTISE</h2>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
              ></Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {talenttype === "AI"
                ? aiProfile?.skill.map((s: any, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                  >
                    {s.name}
                  </span>
                ))
                : usProfile?.skill.map((s: any, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                  >
                    {s.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">BIO</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
        </div>
        <div className="space-y-4">
          <div className="pl-4">
            <p>
              {summaryText || ""}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">LANGUAGE</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {talenttype === "AI"
            ? aiProfile?.languages?.map((lang: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {lang.name}
              </span>
            ))
            : usProfile?.languages?.map((lang: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {lang.name}
              </span>
            ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">ACADEMICS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {talenttype === "AI"
            ? aiProfile?.education.map((edu: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {edu.degree}
              </span>
            ))
            : usProfile?.education.map((edu: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {edu.degree}
              </span>
            ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">AVAILABLE TO</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {talenttype === "AI"
            ? aiProfile?.available_to?.map((aval: any) => (
              <span
                key={aval.id}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {aval.name}
              </span>
            ))
            : usProfile?.available_to?.map((aval: any) => (
              <span
                key={aval.id}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {aval.name}
              </span>
            ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">FEATURED CLIENTS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {talenttype === "AI"
            ? aiProfile?.client.map((cli: any) => (
              <span
                key={cli.id}
                className="px-3 py-2  rounded-3xl bg-white/20 text-xs font-bold"
              >
                {cli.name}
              </span>
            ))
            : usProfile?.client.map((cli: any) => (
              <span
                key={cli.id}
                className="px-3 py-2  rounded-3xl bg-white/20 text-xs font-bold"
              >
                {cli.name}
              </span>
            ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">RECENT PROJECTS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
          {talenttype === "AI"
            ? aiProfile?.projects.map((project: any, index: number) => (
              <Card
                onClick={() =>
                  // Only allow navigation if linkedin_data is true
                  aiProfile?.linkedin_data && router.push(
                    `/talent/${aiProfile?.id}/project/${project.id}`
                  )
                }
                key={index}
                className={`hover:shadow-md border-none relative bg-gray-800 transition flex-shrink-0 w-44 h-48 ${!aiProfile?.linkedin_data ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                  }`}
              >
                <div className="relative h-4/5">
                  <img
                    src={project?.image || "/AI.jpg"}
                    alt={project.title}
                    className="w-full h-full object-fill rounded-t-lg"
                  />
                </div>

                <div className="h-1/5 flex  flex-col justify-between p-1">
                  <CardTitle className="text-xs text-center text-wrap text-white">
                    {project.title}
                  </CardTitle>
                </div>
              </Card>
            ))
            : usProfile?.projects.map((project: any, index: number) => (
              <Card
                onClick={() =>
                  // Only allow navigation if linkedin_data is true
                  usProfile?.linkedin_data && router.push(
                    `/talent/${usProfile?.id}/project/${project.id}`
                  )
                }
                key={index}
                className={`hover:shadow-md border-none relative bg-gray-800 transition flex-shrink-0 w-44 h-48 ${!usProfile?.linkedin_data ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                  }`}
              >
                <div className="relative h-4/5">
                  <img
                    src={project?.image}
                    alt={project.title}
                    className="w-full h-full object-fill rounded-t-lg"
                  />
                </div>

                <div className="h-1/5 flex  flex-col justify-between p-1">
                  <CardTitle className="text-xs text-center text-wrap text-white">
                    {project.title}
                  </CardTitle>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Responsive Edit Modal/Drawer */}
      {/* {activePopup && (
        <ResponsiveEdit
          isOpen={true}
          onClose={handleClosePopup}
          title={popupConfigs[activePopup].title}
          fields={popupConfigs[activePopup].fields}
          currentValues={userData}
          onSave={handleSaveData}
        />
      )} */}
      {showConnectForm && (
        <ConnectDrawer
          talentId={talentId}
          showConnectForm={showConnectForm}
          setShowConnectForm={setShowConnectForm}
        />
      )}
    </div>
  );
};

export default Talent;
