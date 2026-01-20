"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Harsha" }));

  return (
    <div className="max-w-sm mx-auto mt-20">
      {data?.greeting}
      </div>
    );
  }
