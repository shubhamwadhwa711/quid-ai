"use client";
import { Home, Search, Menu, LayoutPanelTop } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: LayoutPanelTop, label: "Learn", href: "/learn" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 h-16 sm:hidden border rounded-full bg-gradient-to-r from-[#063373] to-[#041D3F]">
      <div className="grid h-full max-w-md grid-cols-4 mx-auto">
        {menuItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center px-3 transition-colors duration-300",
                isActive ? "border-primary text-white" : "text-white"
              )}
            >
              <div className="flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs mt-1">{label}</span>
            </Link>
          );
        })}

        {/* Drawer for the Menu */}
        <Drawer>
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center px-3 text-white">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="text-[10px] sm:text-xs mt-1">Menu</span>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            {/* <ul className="p-4 space-y-2">
              {session ? (
                <>
                  <div className="text-center text-sm flex flex-col items-center gap-2">
                    {session.user?.image ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                         src={session.user?.image}
                          alt="Profile"
                          className="w-full h-full"
                          width={16}
                          height={16}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xl">
                          {session.user?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <span>
                      Signed in as {session.user?.name || session.user?.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => signOut()}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => signIn("linkedin")}
                  className="w-full"
                >
                  Sign In | Sign Up
                </Button>
              )}
            </ul> */}
            <DrawerClose>
              <Button variant="outline" className="w-full mt-4">
                Close
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
