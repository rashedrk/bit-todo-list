'use client'

import Drawer from "@/components/Drawer/Drawer";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { ReactNode } from "react";

const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  const router = useRouter()
  if(session)
  {return (
    <SessionProvider session={session}>
      <Drawer>{children}</Drawer>
    </SessionProvider>
  );}

  router.push('/login')
};

export default AuthProvider;
