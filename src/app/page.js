import Sidebar from "@/template/Sidebar";
import Main from "@/template/Main";
import Pagination from "@/module/Pagination";
import allPost from "@/actions/main";

export default async function Home({ searchParams }) {
  const { finalData, isNext } = await allPost(searchParams);

  return (
    <div className="flex justify-between min-h-[1000px]">
      <Sidebar />
      <div className="flex flex-col justify-between items-center w-full">
        {!finalData || finalData.length === 0 ? (
          <p className="bg-main text-white py-2 px-6 text-center rounded mr-[40px]">
            کالایی در این دسته بندی وجود ندارد
          </p>
        ) : (
          <>
            <Main data={finalData} />
            <Pagination
              pageNumber={searchParams?.page ? +searchParams.page : 1}
              isNext={isNext}
            />
          </>
        )}
      </div>
    </div>
  );
}
