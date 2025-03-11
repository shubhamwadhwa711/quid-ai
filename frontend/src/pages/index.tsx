import { useSession, signIn, signOut } from "next-auth/react";
import Home from "@/components/Home";
export default function Component() {
  const { data: session } = useSession();
  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/home" });
  };
  console.log("session index", session);
  if (!session) {
    return (
      <div className="flex justify-center flex-col items-center p-40">
        Not signed in <br />
        <button onClick={() => handleSocialLogin("linkedin")}>
          Sign in with LinkedIn
        </button>
      </div>
    );
  }
  return <Home />;
}
