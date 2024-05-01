"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import CommonButton from "../components/common/CommonButton";
import InputField from "../components/common/InputField";
import SectionTitle from "../components/common/SectionTitle";

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("isUserPresent", "true");
    }
    router.push("/");
    Swal.fire({
      icon: "success",
      title: "Sign Up Successful",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <SectionTitle
        title={"Sign Up"}
        subtitle={"Create an account to get started"}
      />

      <form
        onSubmit={handleFormSubmit}
        className="w-full md:w-2/3 lg:w-1/3 mx-auto px-4 md:px-0 mt-6 md:mt-8 lg:mt-10"
      >
        <div className="mb-4">
          <InputField
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 relative">
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-2 text-primary"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="mt-6 md:mt-10">
          <CommonButton type="submit">Sign Up</CommonButton>
        </div>
      </form>

      <div className="flex items-center justify-center mt-4">
        <h1 className="text-primary">Already have an account?</h1>
        <Link className="ml-1 font-bold text-primary" href="login">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
