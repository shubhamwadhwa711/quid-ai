"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 h-16">
      <div className="max-w-4xl mx-auto rounded-full bg-gradient-to-r from-[#063373] to-[#041D3F]">
        <div className="flex items-center h-full px-4">
          {/* Brand Logo */}
          <div className="flex-none mr-4">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src="https://s3-alpha-sig.figma.com/img/f49d/44cd/5d2865096140652ea8113bb936d7d9b1?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OJ9K4IQHOKHbn2dVUDyQpZSYFuSUqneHxSc42hxOw39J5HxCvnGTGM~Mk8do8YWYM2X96M6~m2Ykd0HdRuvzMAjoK2KQSzgziwYG9gBGVcxPkDxjTXzAXmqTJLoAczwC2WVBvNuctcYDTfZMJtCtfXC3Tt4PWIwpBIkn~ICjbOEj-J0siXc9M~JhEUAwsZXaZY2c7~e8Hb6xFPV5KqrcaaYh67qm1CmCsRVXmM8eLp5UZzwDIH~KZIjouXdjho5T51Gq2Am1ARFaC0BR7PhVk~0JLQZQSJ1ly-AN1Xcch48j~7Dk7~8dm9T3p~m-rMbUH68Vtv3WdlYERhw31x4wWA__"
                  alt="Brand Logo"
                  className="h-10 object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Items - Only hidden on small screens */}
          <div className="hidden sm:flex flex-grow justify-center">
            <div className="grid grid-cols-5 h-full">
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

              {/* Add Menu Button inside the same grid */}
              <Drawer>
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
              </Drawer>
            </div>
          </div>

          {/* Drawer for the Menu */}
          <div className="hidden sm:flex ">
            {/* Login/Signup Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm text-white hover:text-gray-200"
              >
                Login
              </Link>
              <span className="text-white">|</span>
              <Link
                href="/signup"
                className="text-sm text-white hover:text-gray-200"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
