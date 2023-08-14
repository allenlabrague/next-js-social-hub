"use client";

import SkeletonPage from "@/components/SkeletonPage";
import User from "@/components/User";
import { useSession } from "next-auth/react";

const Feed = () => {
  const { data: session } = useSession();

  return <div>{session ? <User /> : <SkeletonPage />}</div>;
};

export default Feed;
