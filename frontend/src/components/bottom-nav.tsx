"use client";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { HomeIcon } from "./icons/HomeIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { LearnIcon } from "./icons/LearnIcon";
import { MenuIcon } from "./icons/MenuIcon";

export const menuItems = [
  { icon: <HomeIcon />, label: "Home", href: "/" },
  { icon: <SearchIcon />, label: "Search", href: "/search" },
  { icon: <LearnIcon />, label: "Insights", href: "/insights" },
  { icon: <MenuIcon />, label: "Menu", href: "/menu" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 h-16 w-full max-w-md border rounded-full bg-gradient-to-r from-[#063373] to-[#041D3F]">
      <div className="grid h-full grid-cols-4">
        {menuItems.map(({ icon, label, href }) => {
          const isActive = pathname === href;

          return label === "Menu" ? (
            <Drawer key={label}>
              <DrawerTrigger asChild>
                <button className="flex flex-col items-center gap-1 px-4 py-2 border-b-2 border-transparent transition-colors duration-300 text-white">
                  {icon}
                  <span className="text-sm">{label}</span>
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-gray-900 text-white">
                <DrawerHeader>
                  <DrawerTitle className="text-white">Menu</DrawerTitle>
                </DrawerHeader>
                <ul className="p-4 space-y-2">
                  <li>
                    <Link href="/profile" className="block text-white">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="block text-white">
                      Settings
                    </Link>
                  </li>
                  {session ? (
                    <li>
                      <Button
                        variant="outline"
                        onClick={() => signOut()}
                        className="w-full mt-2"
                      >
                        Sign Out
                      </Button>
                    </li>
                  ) : (
                    <li>
                      <Button
                        variant="outline"
                        onClick={() => signIn("linkedin")}
                        className="w-full"
                      >
                        Sign In | Sign Up
                      </Button>
                    </li>
                  )}
                </ul>
                <DrawerClose>
                  <Button variant="outline" className="w-full mt-4">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          ) : (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 text-white",
                isActive ? "border-primary" : ""
              )}
            >
              {icon}
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
