"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();
  const [userPresent, setUserPresent] = useState(null);

  useEffect(() => {
    // Check if user is logged in on initial load or navigation
    const isLoggedIn = localStorage.getItem("isUserPresent") === "true";
    setUserPresent(isLoggedIn);

    // Redirect if user isn't logged in (after initial check)
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login page
    }
  }, [router]); 
  return (
    <main className="container mx-auto pt-20 px-4 lg:px-0">
      hello
    </main>
  );
}
