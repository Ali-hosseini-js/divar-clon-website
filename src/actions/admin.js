"use server";

import connectDB from "@/utils/connectDB";
import DivarAdmin from "@/models/DivarAdmin";
import DivarProfile from "@/models/DivarProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DivarUser from "@/models/DivarUser";

async function adminCategory() {
  await connectDB();

  const category = await DivarAdmin.find();
  if (!category) {
    throw new Error("دسته بندی یافت نشد.");
  }

  return { data: JSON.parse(JSON.stringify(category)) };
}

export async function postCategory({ name, slug, icon }) {
  await connectDB();

  if (!name || !slug || !icon) {
    throw new Error("لطفا تمام موارد را تکمیل کنید.");
  }

  const existingCategory = await DivarAdmin.findOne({ name });

  if (!existingCategory) {
    await DivarAdmin.create({
      name,
      slug,
      icon,
    });
  } else {
    throw new Error("دسته بندی ایجاد شده تکراری می باشد");
  }
}

export async function unpublishedPost() {
  await connectDB();

  const profiles = await DivarProfile.find({ published: false });
  if (!profiles || profiles.length === 0)
    return {
      message: "آگهی وجود ندارد",
    };

  return { data: JSON.parse(JSON.stringify(profiles)) };
}

export async function publishPost(id) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("لطفا وارد حساب کاربری خود شوید");
  }

  const user = await DivarUser.findOne({ mobile: session.user.mobile });
  if (!user) {
    throw new Error("حساب کاربری یافت نشد");
  }

  if (user.role !== "ADMIN") {
    {
      throw new Error("دسترسی محدود");
    }
  }

  const profile = await DivarProfile.findOne({ _id: id });
  profile.published = true;
  profile.save();
}

export default adminCategory;
