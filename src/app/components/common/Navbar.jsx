"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CommonButton from "./CommonButton";

const Navbar = () => {
  const router = useRouter();
  const [userPresent, setUserPresent] = useState(false); // Initialize with a default value

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHour(now.getHours().toString().padStart(2, "0"));
      setMinute(now.getMinutes().toString().padStart(2, "0"));
      setSecond(now.getSeconds().toString().padStart(2, "0"));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Check localStorage when component mounts
    const defineUser = localStorage.getItem("isUserPresent");
    if (defineUser) setUserPresent(defineUser);
  }, []);
  return (
    <div className="fixed w-full h-20 flex items-center">
      <div
        ref={menuRef}
        className="container mx-auto flex items-center justify-between relative px-4 lg:px-0"
      >
        <Image
          className="h-16 w-auto mr-4"
          src="/logo.png"
          height={100}
          width={100}
          alt="Logo"
        />

        <div className="flex items-end w-40 justify-center text-white">
          <span className="text-3xl font-bold">{hour}:</span>
          <span className="text-3xl font-bold">{minute}</span>
          <span className="text-base font-bold">:{second}</span>
        </div>
        {userPresent ? (
          <div
            onMouseEnter={() => setIsProfileMenuOpen(true)}
            onMouseLeave={() => setIsProfileMenuOpen(false)}
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="h-10 w-10 rounded-full bg-red-500"
          ></div>
        ) : (
          <div className="w-24">
            {" "}
            <CommonButton href="/login">Login</CommonButton>
          </div>
        )}
        {isProfileMenuOpen && (
          <div
            onMouseEnter={() => setIsProfileMenuOpen(true)}
            onMouseLeave={() => setIsProfileMenuOpen(false)}
            className="absolute top-10 right-0 pt-10"
          >
            <div className="h-96 w-60 bg-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
