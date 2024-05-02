"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskTable from "./components/common/TaskTable";
import TopSideBar from "./components/common/TopSideBar";

export default function Home() {
  const router = useRouter();
  const [userPresent, setUserPresent] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isUserPresent") === "true";
    setUserPresent(isLoggedIn);

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);
  return (
    <main className="z-20 container mx-auto pt-24 px-4 lg:px-0">
      <TopSideBar />
      <div className="mt-6 md:mt-10">
        <TaskTable />
      </div>
    </main>
  );
}
