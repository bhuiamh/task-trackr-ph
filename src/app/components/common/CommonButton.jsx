// CommonButton.js

const CommonButton = ({ type, href, onClick, className, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={`w-full flex items-center justify-center rounded-md bg-transparent px-3.5 py-2.5 text-center text-sm font-semibold text-primary shadow-sm hover:bg-primary hover:text-white border-2 border-primary duration-500 ${className}`}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        type={type}
        onClick={handleClick}
        className={`w-full flex items-center justify-center rounded-md bg-transparent px-3.5 py-2.5 text-center text-sm font-semibold text-primary shadow-sm hover:bg-primary hover:text-white border-2 border-primary duration-500 ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default CommonButton;
