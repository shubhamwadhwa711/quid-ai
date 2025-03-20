"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log("Profile", session?.user?.image);
  return (
    <nav className="fixed left-0 right-0 z-50 h-16">
      <div className="p-2 bg-gradient-to-br from-[#01060e] via-[#021127] to-[#01060e]">
        <div className="flex items-center h-full px-4">
          {/* Brand Logo */}
          <div className="flex-none mr-4">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src="https://s3-alpha-sig.figma.com/img/f49d/44cd/5d2865096140652ea8113bb936d7d9b1?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sIbmoHUggucq8whNkByMzf07tRl0PuBAIkWVRbZBHjmAsYvqp75Y6xjVHoqfw8oOrL1L1QseAdpDmkv8CceMJOPcOWbPgBNiNOiZUqk-YzTQrNm7EDRi6ZueCEMq6OKgzBZ-oa4gH-3CXv6nDF1ShVtTJAQ3VxHZjT3e7S3VRwSqLtRGf-DA5PW-1GCH9FsFv9als46JHZJq8Jni1zxo18yg4orcCWc37wrUGYLpQ~FWgnvQm~SgOlnLd2mi6sYdhdFurCsSmn2FyTP8K3lRTj-HxDvEQRe-yaMpb8aPNLJ9u0VwyTl-lUjrjd2mEfozUu-nbF64FpcDChdWE32LGA__"
                  alt="Brand Logo"
                  className="h-10 object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Items - Only hidden on small screens */}
          <div className="hidden sm:flex flex-grow justify-center">
            <div className="grid grid-cols-5 h-full">
              {menuItems.map(({ icon, label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-3 border-b-2 border-transparent transition-colors duration-300",
                      isActive ? "border-primary text-white" : "text-white"
                    )}
                  >
                    {icon}
                    <span className="text-sm">{label}</span>
                  </Link>
                );
              })}

              {/* Add Menu Button inside the same grid */}
              {/* <Drawer>
                <DrawerTrigger asChild>
                  <button className="flex gap-2 items-center justify-center text-white">
                    <Menu className="w-6 h-6" />
                    <span className="text-sm">Menu</span>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="bg-gray-900 text-white">
                  <DrawerHeader>
                    <DrawerTitle className="text-white">Menu</DrawerTitle>
                  </DrawerHeader>
                  <ul className="p-4 space-y-2">
                    <li>
                      <a href="/settings" className="block text-white">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="/profile" className="block text-white">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="/logout" className="block text-white">
                        Logout
                      </a>
                    </li>
                  </ul>
                  <DrawerClose>
                    <Button variant="outline" className="w-full mt-4">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerContent>
              </Drawer> */}
            </div>
          </div>

          {/* Drawer for the Menu */}
          <div className="flex-none ml-auto">
            {session ? (
              <div>
                <Button variant="none">
                  <Image
                    className="rounded-full"
                    src={session?.user?.image!}
                    alt=""
                    width={40}
                    height={40}
                  />
                </Button>
              </div>
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
