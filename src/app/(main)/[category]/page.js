import Sidebar from "@/template/Sidebar";
import Main from "@/template/Main";
import DivarProfile from "@/models/DivarProfile";
import connectDB from "@/utils/connectDB";

export default async function category({ params: { category } }) {
  await connectDB();
  const profile = await DivarProfile.find({
    category: category,
    published: true,
  }).select("-userId");

  if (!profile) return <h3>مشکلی پیش آمده است</h3>;
  return (
    <div className="flex">
      <Sidebar />
      <Main data={profile} />
    </div>
  );
}
