import React from "react";
import { getFeedbacks } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateIndo } from "@/lib/utils";

export const FeedbackTable = async () => {
  const feedbacks = await getFeedbacks();

  if (!feedbacks?.length) {
    return <h1 className="text-2xl">No Feedbacks found!</h1>;
  }

  return (
    <Table className="border-2 rounded-full border-border dark:border-white">
      <TableCaption>A list of your feedbacks.</TableCaption>
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead className="w-[50px] font-bold text-foreground">
            No.
          </TableHead>
          <TableHead className="w-[100px] font-bold text-center text-foreground hidden">
            Meeting ID
          </TableHead>
          <TableHead className="w-[200px] font-bold text-center text-foreground">
            Name
          </TableHead>
          <TableHead className="w-[200px] font-bold text-foreground">
            Email
          </TableHead>
          <TableHead className="w-[500px] text-center font-bold text-foreground">
            Content
          </TableHead>
          <TableHead className="w-[100px] px-10 text-center font-bold text-foreground">
            Rating
          </TableHead>
          <TableHead className="w-[150px] px-0 text-center font-bold text-foreground ">
            Created At
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedbacks.map((feedback) => (
          <TableRow key={feedback.id}>
            <TableCell className="text-foreground">
              {feedbacks.indexOf(feedback) + 1}
            </TableCell>
            <TableCell className="w-[100px] font-bold text-foreground break-words overflow-hidden text-justify hidden">
              <span className="block max-w-[100px] break-words overflow-hidden">
                {feedback.id}
              </span>
            </TableCell>
            <TableCell className="font-medium text-center text-foreground">
              {feedback.name}
            </TableCell>
            <TableCell className="font-medium text-left text-foreground">
              {feedback.email}
            </TableCell>
            <TableCell className="font-bold text-foreground text-left max-w-[250px] break-words whitespace-pre-line">
              {feedback.content}
            </TableCell>
            <TableCell className="text-center text-foreground">
              {feedback.rating}/5 ⭐
            </TableCell>
            <TableCell className="text-center text-foreground">
              {formatDateIndo(feedback.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FeedbackTable;
