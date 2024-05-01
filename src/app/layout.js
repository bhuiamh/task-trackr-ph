import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Trackr",
  description: "Do IT First",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      style={{ backgroundImage: `url('/background.jpg')` }}
        className={`${inter.className}  bg-cover bg-no-repeat bg-center bg-fixed h-screen text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
