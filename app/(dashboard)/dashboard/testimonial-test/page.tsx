import { Testimonial, columns } from "@/components/columns";
import { TestimonialTableNew } from "@/components/testimonial-table-new";
import { getTestimonials } from "@/lib/data";

async function getData(): Promise<Testimonial[]> {
  const data = await getTestimonials(); // Fetch data from your API here.
  return data ?? [];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <TestimonialTableNew columns={columns} data={data} />
    </div>
  );
}
