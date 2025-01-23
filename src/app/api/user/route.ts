import connectDB from "@/utils/connectDB";
import { NextResponse, NextRequest } from "next/server";
import DivarProfile from "@/models/DivarProfile";
import DivarUser from "@/models/DivarUser";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Types } from "mongoose";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  //request: NextRequest is neccessary for formData req and it should be in typescript format

  try {
    await connectDB();

    const data = await request.formData();
    console.log("api:", data);
    const file: File | null = data.get("images") as unknown as File;
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const category = data.get("category") as string;
    const city = data.get("city") as string;
    const amount = data.get("amount") as string;

    const randomKey = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    if (!file || !title || !content || !category || !city || !amount) {
      return NextResponse.json({ error: "فایلی وجود ندارد" }, { status: 401 });
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
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    // // Find the user
    const user = await DivarUser.findOne({ mobile: session.user.mobile });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    const userId = user._id.toString();

    // Create a new profile
    const newProfile = await DivarProfile.create({
      title,
      content,
      category,
      city,
      amount: +amount,
      image: imagePath, // Save the file path
      userId: Types.ObjectId.createFromHexString(userId),
    });

    return NextResponse.json(
      { message: "آگهی جدید اضافه شد" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    // Find the user
    const user = await DivarUser.findOne({ mobile: session.user.mobile });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    const userIdentifier = user._id;

    const profiles = await DivarProfile.find({ userId: userIdentifier });

    return NextResponse.json({ data: profiles });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
