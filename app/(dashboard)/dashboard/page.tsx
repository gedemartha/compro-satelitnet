import { auth } from "@/auth";
import {
  FaBlog,
  FaBoxOpen,
  FaComments,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { getDashboardCounts } from "@/lib/actions";

const DashboardPage = async () => {
  const session = await auth();

  const isAdmin = session?.user?.role === "admin";

  let counts = null;

  if (isAdmin) {
    counts = await getDashboardCounts();
  }

  const cards = counts
    ? [
        {
          title: "Jumlah Blog",
          count: counts.postCount,
          icon: <FaBlog size={30} className="text-blue-500" />,
        },
        {
          title: "Jumlah Produk",
          count: counts.productCount,
          icon: <FaBoxOpen size={30} className="text-green-500" />,
        },
        {
          title: "Jumlah Testimoni",
          count: counts.testimonialCount,
          icon: <FaComments size={30} className="text-yellow-500" />,
        },
        {
          title: "Jumlah Permintaan Meeting",
          count: counts.meetingCount,
          icon: <FaCalendarAlt size={30} className="text-purple-500" />,
        },
        {
          title: "Jumlah Ulasan",
          count: counts.feedbackCount,
          icon: <FaEnvelope size={30} className="text-red-500" />,
        },
      ]
    : [];

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h2 className="text-xl mb-6">
        Selamat datang,{" "}
        <span className="font-semibold">{session?.user?.name}</span>
      </h2>

      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              count={card.count}
              icon={card.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardCard = ({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
}) => (
  <div className="p-6 rounded-lg shadow-md bg-secondary border-border flex items-center gap-4">
    <div>{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-1">{count}</p>
    </div>
  </div>
);

export default DashboardPage;
