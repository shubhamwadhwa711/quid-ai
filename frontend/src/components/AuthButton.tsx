import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/home' });
};
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => handleSocialLogin("linkedin")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign In with LinkedIn
        </button>
      )}
    </div>
  );
}
