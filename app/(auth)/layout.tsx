import ThemeButton from "@/components/theme-button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background">
      <div className="absolute top-3 right-5">
        <ThemeButton />
      </div>
      <div className="flex flex-col items-center justify-between py-10 mx-auto  h-screen overflow-scroll">
        <div className="w-full bg-primary-foreground rounded-lg shadow mt-0 max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
