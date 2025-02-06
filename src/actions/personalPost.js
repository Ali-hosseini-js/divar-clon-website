"use server";

import connectDB from "@/utils/connectDB";
import DivarProfile from "@/models/DivarProfile";
import DivarUser from "@/models/DivarUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path";
import { Types } from "mongoose";

async function personalPost() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("لطفا وارد حساب کاربری خود شوید.");
  }

  // Find the user
  const user = await DivarUser.findOne({ mobile: session.user.mobile });
  if (!user) {
    throw new Error("کاربر یافت نشد.");
  }

  const userIdentifier = user._id;

  const profiles = await DivarProfile.find({ userId: userIdentifier });
  if (!profiles || profiles.length === 0)
    return {
      message: "آگهی وجود ندارد",
    };

  return { data: JSON.parse(JSON.stringify(profiles)) };
}

export async function deletePost(id) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("لطفا وارد حساب کاربری خود شوید.");
  }

  const user = await DivarUser.findOne({ mobile: session.user.mobile });
  if (!user) {
    throw new Error("کاربر یافت نشد.");
  }

  const profile = await DivarProfile.findOne({ _id: id });

  if (!user._id.equals(profile.userId)) {
    throw new Error("دستری شما به این آگهی محدود شده است");
  }

  await DivarProfile.deleteOne({ _id: id });
}

export async function uploadPost(formData) {
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
    throw new Error("لطفا تمام موارد را تکمیل کنید.");
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
  return { message: "آگهی منتشر شد" };
}

export default personalPost;
