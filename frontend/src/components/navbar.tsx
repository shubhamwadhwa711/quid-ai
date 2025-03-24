"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { menuItems } from "./bottom-nav";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, Router } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="absolute left-0 right-0 z-50 h-8 max-w-md w-full justify-self-center">
      <div className="p-2 bg-gradient-to-br  ">
        <div className="flex items-center h-full px-4">
          {/* Brand Logo */}
          <div className="flex-none mr-4">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src="/quid-icon.png"
                  alt="Brand Logo"
                  className="h-10 object-cover"
                />
              </div>
            </Link>
          </div>

          {/* User Profile / Authentication */}
          <div className="flex-none ml-auto mt-2">
            {session ? (
              <Button variant="none" onClick={() => router.push("/profile")}>
                <Image
                  className="rounded-full"
                  src={session?.user?.image!}
                  alt="Profile"
                  width={40}
                  height={40}
                />
              
              </Button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
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
