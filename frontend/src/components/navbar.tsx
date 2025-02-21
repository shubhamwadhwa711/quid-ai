"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuItems } from "./bottom-nav";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:block fixed top-3 left-0 right-0 z-50 h-16">
      <div className="max-w-4xl mx-auto rounded-full bg-gradient-to-r from-[#063373] to-[#041D3F]">
        <div className="grid h-full grid-cols-4">
          {menuItems.map(({ icon: Icon, label, href }) => {
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
                <Icon className="w-5 h-5 text-white" />
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;