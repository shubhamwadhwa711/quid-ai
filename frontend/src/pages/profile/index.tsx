import { useRouter } from "next/router";
import ProfileScreen from "./profileScreen";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only sign out if user is not authenticated at all
    if (status === "unauthenticated") {
      signOut({ redirect: false }).then(() => {
        router.push("/");
      });
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If no session, show redirecting message
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to main page...</p>
      </div>
    );
  }

  // If we have a session, render the profile screen
  // The ProfileScreen component will handle fetching and displaying profile data
  return <ProfileScreen />;
};

export default Profile;
