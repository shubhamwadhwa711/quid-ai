import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, MapPin, Pencil, Share2, X } from "lucide-react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile, Profile } from "@/reducers/profile/profileSlice";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import ConnectDrawer from "@/components/ConnectDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAIProfile } from "@/reducers/ai-talent/ai-talent";
import { fetchUSProfile } from "@/reducers/us-talent/us-talentSlice";

// Main Profile Component
const Talent = () => {
  const dispatch = useAppDispatch();
  const { aiprofile, loading, error } = useAppSelector(
    (state) => state.AIProfile
  );
  const { usprofile } = useAppSelector((state) => state.USProfile);
  const router = useRouter();
  // const { talenttype, id } = router.query;
  const talenttype = router.query.index[0];
  const id = router.query.index[1];

  console.log("talenttype", talenttype);
  console.log("id", id);
  // console.log("Router query",router.query)
  useEffect(() => {
    // console.log("dispatching profile...");
    if (talenttype === "AI") {
      dispatch(fetchAIProfile(id));
    } else {
      dispatch(fetchUSProfile(id));
    }
  }, [dispatch]);
  // console.log("profile", profile);
  const [userData, setUserData] = useState<Profile | null>(null);
  console.log("userData", userData);
  console.log("aiprofile", aiprofile);
  console.log("usprofile", usprofile);
  // State for controlling which popup is currently open
  // useEffect(() => {
  //   setUserData(profile);
  // }, [profile]);
  const [showConnectForm, setShowConnectForm] = useState();
  const handleConnectForm = (talent) => {
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
              <Avatar className="h-full w-full">
                <AvatarImage src={aiprofile?.image || usprofile?.image} />
                <AvatarFallback>{aiprofile?.user?.username}</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-4">
              <div className="flex justify-between">
                <h1 className="text-2xl proxima-medium">
                  {aiprofile?.user?.first_name || usprofile?.user?.first_name}{" "}
                  {aiprofile?.user?.last_name || usprofile?.user?.last_name}
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
                  {aiprofile?.country.name || usprofile?.country.name}
                </span>
              </div>
              <div className="mt-2 w-full pr-2">
                <p className=" w-full text-xs font-semibold">
                  {aiprofile?.headline}
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
                  <img src="/Icons/linkdein.png" alt="" />
                  <span className=" text-xs mt-2 font-bold  text-nowrap">
                    {/* {aiprofile?.linkedin_url?.slice(7)} */}
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
                ? aiprofile?.skill.map((s, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                    >
                      {s.name}
                    </span>
                  ))
                : usprofile?.skill.map((s, index) => (
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
              {aiprofile?.summary?.length || usprofile?.summary?.length > 200
                ? `${aiprofile?.summary?.substring(0, 200)}... Read More`
                : aiprofile?.summary}
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
            ? aiprofile?.language?.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                >
                  {lang.name}
                </span>
              ))
            : usprofile?.language?.map((lang, index) => (
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
            ? aiprofile?.education.map((edu, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                >
                  {edu.degree}
                </span>
              ))
            : usprofile?.education.map((edu, index) => (
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
            ? aiprofile?.available_to?.map((aval) => (
                <span
                  key={aval.id}
                  className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                >
                  {aval.name}
                </span>
              ))
            : usprofile?.available_to?.map((aval) => (
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
            ? aiprofile?.client.map((cli) => (
                <span
                  key={cli.id}
                  className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                >
                  {cli.name}
                </span>
              ))
            : usprofile?.client.map((cli) => (
                <span
                  key={cli.id}
                  className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
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
            ? aiprofile?.projects.map((project, index) => (
                <Card
                  onClick={() =>
                    router.push(
                      `/talent/${aiprofile?.id}/project/${project.id}`
                    )
                  }
                  key={index}
                  className=" hover:shadow-md border-none relative bg-gray-800  transition flex-shrink-0 w-44 h-48"
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
              ))
            : usprofile?.projects.map((project, index) => (
                <Card
                  onClick={() =>
                    router.push(
                      `/talent/${usprofile?.id}/project/${project.id}`
                    )
                  }
                  key={index}
                  className=" hover:shadow-md border-none relative bg-gray-800  transition flex-shrink-0 w-44 h-48"
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
          talentId={aiprofile?.id}
          showConnectForm={showConnectForm}
          setShowConnectForm={setShowConnectForm}
        />
      )}
    </div>
  );
};

export default Talent;
