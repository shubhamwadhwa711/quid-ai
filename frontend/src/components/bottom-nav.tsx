"use client";
import {
  Home,
  Search,
  Menu,
  LayoutPanelTop,
  LogOut,
  ChevronRight,
  UserCircle2,
  Linkedin,
  X,
} from "lucide-react";
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
import { Card } from "./ui/card";

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

  // Non-auth menu content
  const renderNonAuthContent = () => (
    <div className="p-4">
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-2">
          <UserCircle2 className="w-6 h-6" />
        </div>
        <p className="text-center text-white/70 proxima-regular mb-2">
          Sign in to access all features
        </p>
        <Button
          onClick={() => signIn("linkedin")}
          className="w-full py-2 bg-[#0077B5] proxima-regular hover:bg-[#006099] flex items-center justify-center gap-2"
        >
          <Linkedin className="w-5 h-5" />
          Continue with LinkedIn
        </Button>
      </div>

      {/* Navigation Links for non-auth users */}
      <Separator className="my-4 bg-white/10" />

      <div className="mb-6">
        <h3 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
          Navigation
        </h3>
        <div className="space-y-2">
          {menuItems
            .filter((item) => item.label !== "Menu")
            .map((item) => (
              <DrawerClose key={item.label} asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-lg transition-colors w-full"
                >
                  <span className="text-white/80">
                    {item.icon}
                  </span>
                  <span className="proxima-regular">
                    {item.label}
                  </span>
                </Link>
              </DrawerClose>
            ))}
        </div>
      </div>
    </div>
  );

  // Auth menu content
  const renderAuthContent = () => (
    <div className="p-4">
      {/* User Profile Section - Fixed with DrawerClose and proper navigation */}
      <DrawerClose asChild>
        <div
          onClick={() => router.push("/profile")}
          className="flex items-center gap-4 mb-6 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
        >
          {session?.user?.image ? (
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
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )}
          <div className="flex-1 proxima-FAQ">
            <h3 className="font-semibold text-lg">
              {session?.provider?.profile?.given_name}{" "}
              {session?.provider?.profile?.family_name}
            </h3>
            <p className="text-sm text-white/70">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </DrawerClose>

      {/* Insights Categories Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
          Insight Categories
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {insightsCategory.map((category) => (
            <DrawerClose key={category.id} asChild>
              <button
                onClick={() => router.push(`/insights/${category.id}`)}
                className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/15 rounded-lg transition-colors"
              >
                <span className="text-left proxima-regular">
                  {category.title}
                </span>
                <ChevronRight size={16} className="text-white/60" />
              </button>
            </DrawerClose>
          ))}
        </div>
      </div>

      <Separator className="my-4 bg-white/10" />

      {/* Navigation Links */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
          Navigation
        </h3>
        <div className="space-y-2">
          {menuItems
            .filter((item) => item.label !== "Menu")
            .map((item) => (
              <DrawerClose key={item.label} asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-lg transition-colors w-full"
                >
                  <span className="text-white/80">
                    {item.icon}
                  </span>
                  <span className="proxima-regular">
                    {item.label}
                  </span>
                </Link>
              </DrawerClose>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 h-16 max-w-md w-11/12 mx-auto border rounded-full bg-gradient-to-r from-[#063373] to-[#041D3F]">
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
                    <DrawerTitle className="text-xl font-semibold text-white">
                      Menu
                    </DrawerTitle>
                    <DrawerClose>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <span className="sr-only">Close</span>
                        <X className="w-4 h-4" />
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerHeader>

                {session ? renderAuthContent() : renderNonAuthContent()}

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