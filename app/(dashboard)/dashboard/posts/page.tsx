import PostTable from "@/components/post-table";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

const PostsPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-lg mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground pb-5">Post List</h1>
        </div>
        <PostTable />
      </div>
    </div>
  );
};

export default PostsPage;
