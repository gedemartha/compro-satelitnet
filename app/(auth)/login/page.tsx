import FormLogin from "@/components/auth/form-login";

const Login = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-primary">
        Sign in to your Account
      </h1>
      <FormLogin />
    </div>
  );
};

export default Login;
