import React from "react";
import { getTestimonials } from "@/lib/data";
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
import { EditTestimonialModal } from "./crud/testimonial/edit-testimonial-modal";
import { DeleteTestimonialButton } from "./crud/testimonial/delete-testimonial-button";

export const TestimonialTable = async () => {
  const testimonials = await getTestimonials();

  if (!testimonials?.length) {
    return <h1 className="text-2xl">No testimonial found!</h1>;
  }

  return (
    <Table className="border-2 rounded-full border-border dark:border-white">
      <TableCaption>A list of your testimonials.</TableCaption>
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead className="w-[50px] font-bold text-foreground">
            No.
          </TableHead>
          <TableHead className="w-[100px] font-bold text-center text-foreground hidden">
            Testimonial ID
          </TableHead>
          <TableHead className="w-[150px] font-bold text-foreground text-center">
            Logo
          </TableHead>
          <TableHead className="w-[200px] font-bold text-center text-foreground">
            Name
          </TableHead>
          <TableHead className="w-[250px] font-bold text-foreground">
            Content
          </TableHead>
          <TableHead className="w-[200px] text-center font-bold text-foreground">
            Rating
          </TableHead>
          <TableHead className="w-[100px] px-10 text-center font-bold text-foreground">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testimonials.map((testimonial) => (
          <TableRow key={testimonial.id}>
            <TableCell className="text-foreground">
              {testimonials.indexOf(testimonial) + 1}
            </TableCell>
            <TableCell className="w-[100px] font-bold text-foreground break-words overflow-hidden text-justify hidden">
              <span className="block max-w-[100px] break-words overflow-hidden">
                {testimonial.id}
              </span>
            </TableCell>
            <TableCell className="flex pt-3 justify-center">
              <Image
                src="/avatar.png"
                alt={testimonial.name}
                width={25}
                height={10}
              />
            </TableCell>
            <TableCell className="font-medium text-center text-foreground">
              {testimonial.name}
            </TableCell>
            <TableCell className="text-justify">
              {testimonial.content}
            </TableCell>
            <TableCell className="text-center text-foreground">
              {testimonial.rating}/5 ⭐
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-between gap-3">
                <EditTestimonialModal
                  testimonial={testimonial}
                  className="px-4 py-2 text-sm max-w-md w-full bg-orange-500 hover:bg-orange-950"
                />

                <DeleteTestimonialButton testimonialId={testimonial.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TestimonialTable;
