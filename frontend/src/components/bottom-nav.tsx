"use client";
import {
  Home,
  Search,
  Menu,
  LayoutPanelTop,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: LayoutPanelTop, label: "Learn", href: "/learn" },
  { icon: Menu, label: "Menu", href: "/menu" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 h-16 sm:hidden border rounded-full bg-gradient-to-r from-[#063373] to-[#041D3F]">
      <div className="grid h-full max-w-md grid-cols-4 mx-auto">
        {menuItems.map(({ icon: Icon, label, href }) => {
          const itemHref = href;
          const itemLabel = label;
          const ItemIcon = Icon;
          const isActive = pathname === href;

          return (
            <Link
              key={itemHref}
              href={itemHref}
              className={cn(
                "flex flex-col items-center justify-center px-3 transition-colors duration-300",
                isActive ? "border-primary text-white" : "text-white"
              )}
            >
              <div className="flex items-center justify-center ">
                <ItemIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs mt-1">{itemLabel}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
