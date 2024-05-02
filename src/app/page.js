"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TopSideBar from "./components/common/TopSideBar";
import TaskTable from "./components/common/TaskTable";

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
    <main className="container mx-auto pt-20 px-4 lg:px-0">
      <TopSideBar />
      <TaskTable />
    </main>
  );
}
