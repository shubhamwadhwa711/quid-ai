import ProfileScreen from "./profileScreen";
import { useSession } from "next-auth/react";
const Profile = () => {
  const {data : session} = useSession();
  if(!session){
    return;
  } 
  return <ProfileScreen />;
};

export default Profile;
