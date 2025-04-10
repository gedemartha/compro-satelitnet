// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getSlugPost } from "@/lib/actions";
import Image from "next/image";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const post = await getSlugPost(params.slug);

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 ">
      {post.image && (
        <div className="w-full h-[300px] relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-muted-foreground text-sm mb-6">
        Dipublikasikan pada{" "}
        {new Date(post.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        oleh{" "}
        <span className="font-semibold">{post.author?.name ?? "Admin"}</span>
      </p>

      <article className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
};

export default BlogDetailPage;
