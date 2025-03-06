import React from "react";
import { getMeetings } from "@/lib/data";
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
import MeetingActions from "./crud/meeting/meeting-actions";

export const MeetingTable = async () => {
  const meetings = await getMeetings();

  if (!meetings?.length) {
    return <h1 className="text-2xl">No Meetings found!</h1>;
  }

  return (
    <Table className="border-2 rounded-full border-border dark:border-white">
      <TableCaption>A list of your meetings.</TableCaption>
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
          <TableHead className="w-[200px] font-bold text-foreground text-center ">
            Meeting Date
          </TableHead>
          <TableHead className="w-[500px] text-center font-bold text-foreground">
            Note
          </TableHead>
          <TableHead className="w-[100px] px-10 text-center font-bold text-foreground">
            Status
          </TableHead>
          <TableHead className="w-[100px] px-10 text-center font-bold text-foreground">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meetings.map((meeting) => (
          <TableRow key={meeting.id}>
            <TableCell className="text-foreground">
              {meetings.indexOf(meeting) + 1}
            </TableCell>
            <TableCell className="w-[100px] font-bold text-foreground break-words overflow-hidden text-justify hidden">
              <span className="block max-w-[100px] break-words overflow-hidden">
                {meeting.id}
              </span>
            </TableCell>
            <TableCell className="font-medium text-center text-foreground">
              {meeting.name}
            </TableCell>
            <TableCell className="text-justify">{meeting.email}</TableCell>
            <TableCell className="text-center text-foreground">
              {formatDateIndo(meeting.date)}
            </TableCell>
            <TableCell className="font-bold text-foreground text-left max-w-[250px] break-words whitespace-pre-line">
              {meeting.notes}
            </TableCell>

            <TableCell
              className={`font-medium text-center ${
                meeting.status === "Approved"
                  ? "text-green-500"
                  : meeting.status === "Rejected"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {meeting.status}
            </TableCell>
            <TableCell className="font-medium text-center text-foreground">
              <MeetingActions
                meetingId={meeting.id}
                initialStatus={meeting.status}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MeetingTable;
