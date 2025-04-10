// app/blog/page.tsx
import { getAllPosts } from "@/lib/actions"; // kita buat fungsi ambil post
import Image from "next/image";
import Link from "next/link";

const BlogPage = async () => {
  const posts = await getAllPosts(); // ambil dari prisma

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Artikel Terbaru</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="bg-card rounded shadow-md hover:shadow-lg transition p-4">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="rounded-md object-cover w-full h-48"
                />
              )}
              <h2 className="text-xl font-bold mt-4">{post.title}</h2>
              <p className="text-md font-semibold truncate">{post.content}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
