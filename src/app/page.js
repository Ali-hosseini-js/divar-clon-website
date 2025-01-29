import Sidebar from "@/template/Sidebar";
import Main from "@/template/Main";
import DivarProfile from "@/models/DivarProfile";
import connectDB from "@/utils/connectDB";
import Pagination from "@/module/Pagination";

export default async function Home({ searchParams }) {
  await connectDB();

  const page = (await searchParams.page) ? +searchParams.page : 1;
  const pageSize = 12;
  const skipAmount = (page - 1) * pageSize;

  let query = DivarProfile.find({ published: true }).select("-userId");

  if (await searchParams?.category) {
    query = query.where("category").equals(searchParams.category);
  }

  const finalData = await query.skip(skipAmount).limit(pageSize).exec();

  if (!finalData || finalData.length === 0) return <h3>مشکلی پیش آمده است</h3>;

  const totalProfile = await DivarProfile.countDocuments(
    searchParams?.category
      ? { published: true, category: searchParams.category }
      : { published: true }
  );

  const isNext = totalProfile > skipAmount + finalData.length;

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex flex-col items-center w-full">
        <Main data={finalData} />
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={isNext}
          />
        </div>
      </div>
    </div>
  );
}
