import { auth } from "@/auth";

const dashboard = async () => {
  const session = await auth();

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto py-6 p-4">
      <h1 className="text-2xl font-bold ">Dashboard</h1>
      <h2 className="text-xl">
        Welcome Back, <span>{session?.user?.name}</span>
      </h2>
    </div>
  );
};

export default dashboard;
