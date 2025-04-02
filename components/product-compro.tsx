import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Produk 1",
    description: "Deskripsi singkat produk 1.",
    image: "/warnet-draft.jpg",
    version: "v1.0",
  },
  {
    id: 2,
    name: "Produk 2",
    description: "Deskripsi singkat produk 2.",
    image: "/warnet-draft.jpg",
    version: "v2.1",
  },
  {
    id: 3,
    name: "Produk 3",
    description: "Deskripsi singkat produk 3.",
    image: "/warnet-draft.jpg",
    version: "v3.2",
  },
  {
    id: 4,
    name: "Produk 4",
    description: "Deskripsi singkat produk 4.",
    image: "/warnet-draft.jpg",
    version: "v4.0",
  },
];

const ProductCompro = () => {
  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-toned to-purple-satelit"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-main text-5xl font-bold text-center mb-10">
          Produk Kami
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-main">
                {product.name}
              </h3>
              <p className="text-sm  mt-2">{product.description}</p>
              <p className="text-sm  mt-1">Versi: {product.version}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCompro;
