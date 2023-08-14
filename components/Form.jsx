"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Image,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import Login from "./Login";
import SignUp from "./SignUp";
import ThemeButton from "./ThemeButton";
import { Logo } from "./Logo";
import { useTheme } from "next-themes";

export default function Form() {
  const [selected, setSelected] = React.useState("login");

  return (
    <>
      <div className="fixed right-5 top-5 z-10">
        <ThemeButton />
      </div>
      <Card className="flex flex-col items-center justify-center h-screen w-full shadow-none px-5 rounded-none">
        <CardBody className="overflow-hidden justify-center rounded-none">
          <div className="flex items-center justify-center w-full mb-10 gap-3">
            <Logo theme={useTheme().theme} />
            <h1 className="text-2xl font-bold">
              Social <span className="text-[#0084FF]">Hub</span>
            </h1>
          </div>
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="sign-in" title="Sign In">
              <Login />
            </Tab>
            <Tab key="create-account" title="Create Account">
              <SignUp />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
