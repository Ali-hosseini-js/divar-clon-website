import Sidebar from "@/template/Sidebar";
import Main from "@/template/Main";
import DivarProfile from "@/models/DivarProfile";
import connectDB from "@/utils/connectDB";
import Pagination from "@/module/Pagination";
import toast, { Toaster } from "react-hot-toast";

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
        {!finalData || finalData.length === 0 ? (
          <p className="bg-main text-white py-2 px-6 text-center rounded mr-[40px]">
            کالایی در این دسته بندی وجود ندارد
          </p>
        ) : (
          <>
            <Main data={finalData} />
            <div className="mt-10">
              <Pagination
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={isNext}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
