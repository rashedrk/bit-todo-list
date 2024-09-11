'use client'

import Drawer from "@/components/Drawer/Drawer";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      <Drawer>{children}</Drawer>
    </SessionProvider>
  );
};

export default AuthProvider;
