import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      {/* No need for a nested `div` with `w-full` */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
