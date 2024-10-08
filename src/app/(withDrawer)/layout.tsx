import AuthProvider from "@/providers/AuthProvider";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <AuthProvider session={session}>
      {children}
    </AuthProvider>
  );
};

export default HomeLayout;
