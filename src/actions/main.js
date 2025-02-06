"use server";

import DivarProfile from "@/models/DivarProfile";
import connectDB from "@/utils/connectDB";

async function allPost(searchParams) {
  await connectDB();
  const page = (await searchParams.page) ? +searchParams.page : 1;
  const pageSize = 12;
  const skipAmount = (page - 1) * pageSize;

  let query = DivarProfile.find({ published: true }).select("-userId");

  if (await searchParams?.category) {
    query = query.where("category").equals(searchParams.category);
  }

  const finalData = await query.skip(skipAmount).limit(pageSize).exec();
  if (!finalData || finalData.length === 0)
    return {
      message: " کالایی در این دسته بندی وجود ندارد",
    };

  const totalProfile = await DivarProfile.countDocuments(
    searchParams?.category
      ? { published: true, category: searchParams.category }
      : { published: true }
  );

  const isNext = totalProfile > skipAmount + finalData.length;

  return { finalData, isNext };
}

export default allPost;
