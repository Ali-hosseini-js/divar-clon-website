import connectDB from "@/utils/connectDB";
import DivarProfile from "@/models/DivarProfile";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const profiles = await DivarProfile.find({ published: false });

    return NextResponse.json({ data: profiles });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
