import Drawer from "@/components/Drawer/Drawer";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: {children: ReactNode}) => {
  return <Drawer>{children}</Drawer>;
};

export default HomeLayout;
