"use client";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (localStorage.getItem("isUserPresent") === "true") {
      router.push("/");
    }
  }
  return (
    <div className="h-screen flex items-center justify-center">
      {/* No need for a nested `div` with `w-full` */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
