"use client";
import { api } from "@/trpc/client";
import { useEffect } from "react";

export default function Home() {

  const {data: greeting} =  api.hello.useQuery();

  useEffect(() => {
    console.log(greeting);
  }, [greeting]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {greeting && <h1>{greeting.greeting}</h1>}
    </div>
  );
}
