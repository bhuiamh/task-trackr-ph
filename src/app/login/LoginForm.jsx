"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import CommonButton from "../components/common/CommonButton";
import InputField from "../components/common/InputField";
import SectionTitle from "../components/common/SectionTitle";

const LoginForm = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.email === "user@tasktrackr.com" &&
      formData.password === "tasktrackr"
    ) {
      if (typeof window !== "undefined") {
        localStorage.setItem("isUserPresent", "true");
      }
      router.push("/");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid number of password",
      });
    }
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
    <SectionTitle title={"Login"} subtitle={"Please sign in to continue"} />

      <form onSubmit={handleFormSubmit} className="w-full md:w-2/3 lg:w-1/3 mx-auto px-4 md:px-0 mt-6 md:mt-8 lg:mt-10">
        <div className="flex justify-end">
          <div className="w-32 h-5">
            {" "}
            <CommonButton type="button" onClick={toggleModal}>
              Credentials
            </CommonButton>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-6 md:p-10 rounded-md">
              <h2 className="text-lg font-bold mb-4">Login Credentials</h2>
              <h1>For Student</h1>
              <p>Email: user@tasktrackr.com</p>
              <p>Password: tasktrackr</p>

              <CommonButton
                onClick={toggleModal}
                className="mt-6 bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-green-900"
              >
                Close
              </CommonButton>
            </div>
          </div>
        )}

        <div className="mb-4">
          <InputField
            type="email"
            name="email"
            id="email"
            placeholder="Type Your Email"
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
            placeholder="Type Your Password"
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
        
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-primary">New to Task Trackr ?</h1>
          <Link className="ml-1 font-bold text-primary" href="signup">
            Create an account
          </Link>
        </div>
        <div className="mt-6 md:mt-10">
          <CommonButton type="submit">Login</CommonButton>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
