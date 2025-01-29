import connectDB from "@/utils/connectDB";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import DivarProfile from "@/models/DivarProfile";
import DivarUser from "@/models/DivarUser";
import DivarAdmin from "@/models/DivarAdmin";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

async function AddPost() {
  const upload = async (formData) => {
    "use server";

    await connectDB();

    const file = formData.get("images");
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const city = formData.get("city");
    const amount = formData.get("amount");

    const randomKey = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    if (!file || !title || !content || !category || !city || !amount) {
      throw new Error("تمام موارد را تکمیل کنید.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join("public", "uploads", `${randomKey}.jpg`);
    const imagePath = `/uploads/${randomKey}.jpg`;
    console.log("path:", imagePath);
    await writeFile(filePath, buffer);

    // Get the session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("لطفا وارد حساب کاربری خود شوید.");
    }

    // Find the user
    const user = await DivarUser.findOne({ mobile: session.user.mobile });
    if (!user) {
      throw new Error("حساب کاربری یافت نشد.");
    }

    const userId = user._id.toString();

    // Create a new profile
    await DivarProfile.create({
      title,
      content,
      category,
      city,
      amount: +amount,
      image: imagePath, // Save the file path
      userId: Types.ObjectId.createFromHexString(userId),
    });
    revalidatePath("/dashboard");
  };

  await connectDB();

  const category = await DivarAdmin.find();

  return (
    <form action={upload}>
      <h3 className="mb-[30px] border-b-4 border-solid border-main w-fit pb-1">
        افزودن آگهی
      </h3>
      <label htmlFor="title" className="block text-sm mb-[10px]">
        عنوان
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <label htmlFor="content" className="block text-sm mb-[10px]">
        توضیحات
      </label>
      <textarea
        name="content"
        id="content"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8 h-[100px]"
      />
      <label htmlFor="amount" className="block text-sm mb-[10px]">
        قیمت
      </label>
      <input
        type="number"
        name="amount"
        id="amount"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <label htmlFor="city" className="block text-sm mb-[10px]">
        شهر
      </label>
      <input
        type="text"
        name="city"
        id="city"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <label htmlFor="category" className="block text-sm mb-[10px]">
        دسته بندی
      </label>
      <select
        name="category"
        id="category"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      >
        {category.map((i) => (
          <option key={i._id} value={i.slug}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images" className="block text-sm mb-[10px]">
        عکس
      </label>
      <input
        type="file"
        name="images"
        id="images"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <button
        type="submit"
        className="bg-main text-white border-none py-2 px-6 rounded text-sm cursor-pointer"
      >
        ایجاد
      </button>
    </form>
  );
}

export default AddPost;
