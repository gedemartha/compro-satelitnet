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
    return <h1 className="text-2xl">No Posts found!</h1>;
  }

  return (
    <Table className="border-2 rounded-full border-border dark:border-white">
      <TableCaption>A list of your posts.</TableCaption>
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead className="w-[50px] font-bold text-foreground">
            No.
          </TableHead>
          <TableHead className="w-[100px] font-bold text-center text-foreground hidden">
            Post ID
          </TableHead>
          <TableHead className="w-[200px] font-bold text-center text-foreground">
            Title
          </TableHead>
          <TableHead className="w-[250px] font-bold text-foreground">
            Content
          </TableHead>
          <TableHead className="w-[150px] font-bold text-foreground text-center">
            Image
          </TableHead>
          <TableHead className="w-[200px] text-center font-bold text-foreground">
            Author
          </TableHead>
          <TableHead className="w-[100px] px-10 text-center font-bold text-foreground">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="text-foreground">
              {posts.indexOf(post) + 1}
            </TableCell>
            <TableCell className="w-[100px] font-bold text-foreground break-words overflow-hidden text-justify hidden">
              <span className="block max-w-[100px] break-words overflow-hidden">
                {post.id}
              </span>
            </TableCell>
            <TableCell className="font-medium text-center text-foreground">
              {post.title}
            </TableCell>
            <TableCell className="text-justify">{post.content}</TableCell>
            <TableCell className="flex justify-center">
              <Image
                src="/avatar.png"
                alt={post.title}
                width={64}
                height={64}
              />
            </TableCell>
            <TableCell className="text-center text-foreground">
              {post.author.name}
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-between gap-3">
                <EditPostModal
                  post={post}
                  className="px-4 py-2 text-sm max-w-md w-full bg-orange-500 hover:bg-orange-950"
                />

                <DeletePostButton postId={post.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTable;
