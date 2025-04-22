"use client";
import { Home, Search, Menu, LayoutPanelTop, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { HomeIcon } from "./icons/HomeIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { LearnIcon } from "./icons/LearnIcon";
import { MenuIcon } from "./icons/MenuIcon";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchInsightCategory } from "@/reducers/insights/category/insightscategorySlice";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export const menuItems = [
  {
    icon: <HomeIcon />,
    label: "Home",
    href: "/",
  },
  {
    icon: <SearchIcon />,
    label: "Search",
    href: "/search",
  },
  {
    icon: <LearnIcon />,
    label: "Insights",
    href: "/insights",
  },
  {
    icon: <MenuIcon />,
    label: "Menu",
    href: "/menu",
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { insightsCategory, loading, error } = useAppSelector(
    (state) => state.insightsCategory
  );

  const {
    insights,
    loading: insightsLoading,
    error: insightsError,
  } = useAppSelector((state) => state.insights);

  useEffect(() => {
    dispatch(fetchInsightCategory());
  }, [dispatch]);

  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 h-16 w-11/12 max-w-md mx-auto border rounded-full bg-gradient-to-r from-[#063373] to-[#041D3F]">
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
              <DrawerContent className="bg-gradient-to-br from-black via-[#0F0F30] to-[#0F0F30] w-11/12 max-w-md mx-auto text-white">
                <DrawerHeader className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <DrawerTitle className="text-xl font-semibold text-white">Menu</DrawerTitle>
                    <DrawerClose>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <span className="sr-only">Close</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="white" fillRule="evenodd" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerHeader>

                <div className="p-4">
                  {session ? (
                    <>
                      {/* User Profile Section */}
                      <div className="flex items-center gap-4 mb-6 p-3 bg-white/5 rounded-lg">
                        {session.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-2 border-white/20"
                            width={56}
                            height={56}
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                              {session.user?.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{session.user?.name || "User"}</h3>
                          <p className="text-sm text-white/70">{session.user?.email}</p>
                        </div>
                      </div>

                      {/* Insights Categories Section */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Insight Categories</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {insightsCategory.map((category) => (
                            <DrawerClose key={category.id} asChild>
                              <button
                                onClick={() => router.push(`/insights/${category.id}`)}
                                className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/15 rounded-lg transition-colors"
                              >
                                <span className="text-left font-medium">{category.title}</span>
                                <ChevronRight size={16} className="text-white/60" />
                              </button>
                            </DrawerClose>
                          ))}
                        </div>
                      </div>

                      <Separator className="my-4 bg-white/10" />

                      {/* Navigation Links */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Navigation</h3>
                        <div className="space-y-2">
                          {menuItems.filter(item => item.label !== "Menu").map((item) => (
                            <DrawerClose key={item.label} asChild>
                              <Link 
                                href={item.href}
                                className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-lg transition-colors w-full"
                              >
                                <span className="text-white/80">{item.icon}</span>
                                <span>{item.label}</span>
                              </Link>
                            </DrawerClose>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4 py-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
                          <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="white"/>
                        </svg>
                      </div>
                      <p className="text-center text-white/70 mb-2">Sign in to access all features</p>
                      <Button
                        onClick={() => signIn("linkedin")}
                        className="w-full py-2 bg-[#0077B5] hover:bg-[#006099] flex items-center justify-center gap-2"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.47679 17.0833H1.20679V6.25H4.47679V17.0833ZM2.84012 4.79167C1.79179 4.79167 0.916626 3.90833 0.916626 2.86667C0.916626 1.825 1.79179 0.95 2.84012 0.95C3.88846 0.95 4.76346 1.825 4.76346 2.86667C4.76346 3.90833 3.88846 4.79167 2.84012 4.79167ZM17.9166 17.0833H14.6549V11.875C14.6549 10.6917 14.6332 9.16667 12.9999 9.16667C11.3449 9.16667 11.0933 10.4583 11.0933 11.7917V17.0833H7.82429V6.25H10.9499V7.70833H10.9916C11.4082 6.875 12.4832 6 14.0832 6C17.3966 6 17.9166 8.10833 17.9166 10.8333V17.0833Z" fill="white"/>
                        </svg>
                        Continue with LinkedIn
                      </Button>
                    </div>
                  )}
                </div>

                {session && (
                  <DrawerFooter className="border-t border-white/10 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => signOut()}
                      className="w-full flex items-center justify-center gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </Button>
                  </DrawerFooter>
                )}
              </DrawerContent>
            </Drawer>
          ) : (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-white",
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