"use client";

import { sidebarGenerator } from "@/utils/SidebarGenerator";
import { sidebarTasks } from "@/constant/sidebar.constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import "./drawer.css";
import { signOut } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";

const Drawer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col">
        {/* Navbar */}
        <div className="navbar  lg:hidden  px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
        {/* Page content here */}
        <div className="p-4 w-screen lg:w-full">{children}</div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu min-h-[90vh] bg-[#F2F4F7]  w-52 p-4 border-e">
          <div className="md:flex justify-start   hidden border-e">
            <Link
              href="/"
              className="btn btn-ghost hover:bg-transparent normal-case  font-[800] text-xl text-[#004E7C] "
            >
              Bit<span className="text-gray-700">Todo</span>
            </Link>
          </div>
          <div className="flex justify-start mb-3 md:hidden border-b">
            <Link
              href="/"
              className="btn btn-ghost hover:bg-transparent normal-case  font-[800] text-xl text-[#004E7C] "
            >
              Bit<span className="text-gray-700">Todo</span>
            </Link>
          </div>
          {/* Sidebar content here */}
          <li className="text-xs text-gray-600 font-semibold mb-1">TASKS</li>
          {sidebarGenerator(sidebarTasks, pathname)}
        </ul>
        <div className="flex justify-center items-center gap-2 cursor-pointer text-sm btn" onClick={() => signOut()}><PiSignOutBold />Log out</div>
      </div>

    </div>
  );
};

export default Drawer;
