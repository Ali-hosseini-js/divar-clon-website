import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import DivarProfile from "@/models/DivarProfile";
import DivarUser from "@/models/DivarUser";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
