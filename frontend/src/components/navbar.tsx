"use client";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile } from "@/reducers/profile/profileSlice";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("session", session);
  const dispatch = useAppDispatch();
  const {profile} = useAppSelector((state) => state.Profile);
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);
  console.log("profile", profile);
  return (
    <nav className="relative z-50 min-h-8 pt-2 max-w-md w-full justify-self-center">
      <div className="p-2 bg-gradient-to-br">
        <div className="flex items-center h-full px-4">
          {/* Brand Logo */}
          <div className="flex-none mr-4">
            <Link href="/">
              <img
                src="/quid-icon.png"
                alt="Brand Logo"
                className="h-10 object-cover"
              />
            </Link>
          </div>

          {/* User Profile / Authentication */}
          <div className="flex-none ml-auto mt-2">
            {session ? (
              <Button
                variant="none"
                className="flex "
                onClick={() => router.push("/profile")}
              >
                <img
                  className="rounded-full"
                  src={profile?.image}
                  alt="Profile"
                  width={40}
                  height={40}
                />
                <span className="ml-2 text-white">{session?.user?.name}</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="none"
                  onClick={() => signIn("linkedin")}
                  className="text-sm text-white hover:text-gray-200"
                >
                  Login
                </Button>
                <span className="text-white">|</span>
                <Link
                  href="/signup"
                  className="text-sm text-white hover:text-gray-200"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
