"use client";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("session", session);
  const { profile } = useAppSelector((state) => state.Profile);
  // console.log("profile", profile);
  return (
    <nav className="relative z-50 min-h-8 pt-2 max-w-md w-full justify-self-center snap-center">
      <div className="p-2 bg-gradient-to-br">
        <div className="flex items-center justify-between h-full px-4">
          {/* Brand Logo */}
          <div className="flex-none">
            <Link href="/">
              <img
                src="/quid-icon.png"
                alt="Brand Logo"
                className="h-10 object-cover"
              />
            </Link>
          </div>

          {/* User Profile / Authentication - Now at rightmost */}
          <div className="absolute right-0 flex items-center">
            {session ? (
              <Button
                variant="none"
                className="flex items-center gap-2"
                onClick={() => router.push("/profile")}
              >
                <Image
                  className="rounded-full"
                  src={session?.user?.image ?? profile?.image ?? "/default-avatar.jpg"}
                  alt="Profile"
                  width={40}
                  height={40}
                />
                <span className="text-white font-semibold">
                  {session?.provider?.profile?.given_name}{" "}
                  {session?.provider?.profile?.family_name}
                </span>
              </Button>
            ) : (
              <div className="flex items-center mx-2">
                <Button
                  variant="none"
                  onClick={() => signIn("linkedin", { callbackUrl: "/profile" })}
                  className="text-sm text-white font-semibold py-2 px-4 border border-white rounded-lg hover:bg-white hover:text-black transition"
                >
                  Login
                  {/* <span className="text-white">|</span>
                  Sign Up */}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
