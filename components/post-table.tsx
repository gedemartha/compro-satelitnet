import React from "react";
import { getPosts } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { DeletePostButton } from "./crud/post/delete-post-button";
import { EditPostModal } from "./crud/post/edit-post-modal";

export const PostTable = async () => {
  const posts = await getPosts();

  if (!posts?.length) {
    return <h1 className="text-2xl text-center">No Posts found!</h1>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="border-2 border-border dark:border-white">
        <TableCaption>A list of your posts.</TableCaption>
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead className="w-12 text-center font-bold text-foreground">
              No.
            </TableHead>
            <TableHead className="w-40 text-center font-bold text-foreground">
              Title
            </TableHead>
            <TableHead className="w-60 font-bold text-foreground">
              Content
            </TableHead>
            <TableHead className="w-40 text-center font-bold text-foreground">
              Image
            </TableHead>
            <TableHead className="w-40 text-center font-bold text-foreground">
              Author
            </TableHead>
            <TableHead className="w-32 text-center font-bold text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow key={post.id}>
              <TableCell className="text-center text-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="text-center font-medium text-foreground">
                {post.title}
              </TableCell>
              <TableCell className="text-justify">{post.content}</TableCell>
              <TableCell className="flex justify-center">
                {post.image && post.image.startsWith("/") ? (
                  <Image
                    src={post.image}
                    alt={post.title || "Post image"}
                    width={200}
                    height={200}
                    className="rounded-md object-cover mx-auto"
                  />
                ) : (
                  <span className="text-gray-500 italic">No image</span>
                )}
              </TableCell>
              <TableCell className="text-center text-foreground">
                {post.author.name}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <EditPostModal
                    post={post}
                    className="px-3 py-2 text-sm bg-orange-500 hover:bg-orange-950"
                  />
                  <DeletePostButton postId={post.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostTable;
