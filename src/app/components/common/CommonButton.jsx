// CommonButton.js

import Link from "next/link";

const CommonButton = ({ type, href, onClick, className, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`w-full flex items-center justify-center rounded-md bg-transparent px-2 py-1 md:px-2 lg:px-3 text-center text-xs lg:text-sm font-semibold text-primary shadow-sm hover:bg-primary hover:text-white border lg:border-2 border-primary duration-500 ${className}`}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        onClick={handleClick}
        className={`w-full flex items-center justify-center rounded-md bg-transparent px-2 py-1 md:px-2 lg:px-3 text-center text-xs lg:text-sm font-semibold text-primary shadow-sm hover:bg-primary hover:text-white border lg:border-2 border-primary duration-500 ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default CommonButton;
