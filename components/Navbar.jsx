"use client";

import { motion, useCycle, AnimatePresence } from "framer-motion";
import { NavLinks } from "@/constants";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import {
  Card,
  CardBody,
  Image,
  Avatar,
  Badge,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { variants, itemVariants } from "@/constants";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const Navbar = () => {
  const [open, cycleOpen] = useCycle(false, true);
  const { data: session } = useSession();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: "95%",
            }}
            exit={{
              transition: { delay: 0.7, duration: 0.7 },
            }}
            className="bg-[#141718] absolute top-0 left-0 h-screen p-5 rounded-r-2xl"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants}
              className="flex flex-col justify-between h-[100%]"
            >
              <div className="flex flex-col gap-16">
                <motion.div
                  className="flex items-center justify-between"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/white-smile-logo.png"
                      width={50}
                      height={50}
                      alt="smile-logo"
                    />
                    <h1 className="text-2xl font-bold text-white">
                      Social <span className="text-[#0084FF]">Hub</span>
                    </h1>
                  </div>
                  <div>
                    <button onClick={cycleOpen}>
                      <AiOutlineClose color="white" fontSize={25} />
                    </button>
                  </div>
                </motion.div>
                <motion.ul className="flex flex-col items-start gap-6 text-white">
                  {NavLinks.map((link) => (
                    <motion.a
                      variants={itemVariants}
                      href={link.href}
                      key={link.key}
                      className="flex items-center gap-3"
                    >
                      <Image
                        src={link.image}
                        width={30}
                        height={30}
                        alt={link.alt}
                        className="text-white"
                      />
                      {link.text}
                    </motion.a>
                  ))}
                </motion.ul>
              </div>
              <div className="flex flex-col gap-3">
                <motion.div variants={itemVariants}>
                  <Card className="p-5 bg-[#222627] rounded-xl">
                    <CardBody>
                      <div className="flex items-center gap-3">
                        <Badge
                          content=""
                          color="success"
                          shape="circle"
                          size="lg"
                          placement="bottom-right"
                          disableOutline
                        >
                          <Avatar size="lg" src={session?.user?.image} />
                        </Badge>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <h2 className="font-medium text-white">
                              {session?.user?.name}
                            </h2>
                            <h2 className="text-gray-400 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                              {session?.user?.email.length > 10
                                ? session?.user?.email.slice(0, 10) + "..."
                                : session?.user?.email}
                            </h2>
                          </div>
                          <div className="text-xs text-black font-semibold rounded-lg bg-[#3FDD78] p-2">
                            Online
                          </div>
                        </div>
                      </div>
                    </CardBody>
                    <button
                      onClick={() => signOut()}
                      className="border-1 border-[#343839] hover:bg-[#343839] rounded-xl p-3 text-white transition-all"
                    >
                      Log Out
                    </button>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ThemeButtonNav />
                </motion.div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div>
        <button onClick={cycleOpen}>
          <HiMenuAlt2 fontSize={30} />
        </button>
      </div>
    </>
  );
};

export default Navbar;

export const ThemeButtonNav = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={
        "flex w-full items-center bg-[#222627] justify-evenly p-1 rounded-xl"
      }
    >
      <div
        onClick={() => setTheme("light")}
        className={`flex w-full items-center justify-center rounded-xl p-4 gap-3 transition-all cursor-pointer ${
          resolvedTheme === "light"
            ? "text-white bg-[#141718]"
            : "text-gray-400"
        }`}
      >
        <BsFillSunFill size={20} />
        <h3>Light</h3>
      </div>
      <div
        onClick={() => setTheme("dark")}
        className={`flex w-full items-center justify-center rounded-xl p-4 gap-3 transition-all cursor-pointer ${
          resolvedTheme === "dark" ? "text-white bg-[#141718]" : "text-gray-400"
        }`}
      >
        <BsFillMoonFill size={20} />
        <h3>Dark</h3>
      </div>
    </div>
  );
};
