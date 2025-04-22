"use client";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile } from "@/reducers/profile/profileSlice";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("session", session);
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.Profile);
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);
  console.log("profile", profile);
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
                  src={session?.user?.image ?? profile?.image}
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
                  onClick={() => signIn("linkedin")}
                  className="text-sm text-white font-semibold hover:text-gray-200 p-0"
                >
                  Login
                  <span className="text-white">|</span>
                  Sign Up
                </Button>
                {/* <Link
                  href="/signup"
                  className="text-sm text-white hover:text-gray-200"
                >
                  Signup
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
