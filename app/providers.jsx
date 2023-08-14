"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children, session }) => {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};

export default Providers;
