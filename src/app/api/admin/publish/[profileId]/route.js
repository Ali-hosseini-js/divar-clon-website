import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/utils/connectDB";
import DivarProfile from "@/models/DivarProfile";
import DivarUser from "@/models/DivarUser";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, context) {
  try {
    await connectDB();

    const id = context.params.profileId;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          error: "لطفا وارد حساب کاربری خود شوید",
        },
        { status: 401 }
      );
    }

    console.log("session", session.user);
    const user = await DivarUser.findOne({ mobile: session.user.mobile });
    if (!user) {
      return NextResponse.json(
        {
          error: "حساب کاربری یافت نشد",
        },
        { status: 404 }
      );
    }
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "دسترسی محدود" },
        {
          status: 403,
        }
      );
    }

    const profile = await DivarProfile.findOne({ _id: id });
    profile.published = true;
    profile.save();

    return NextResponse.json({ message: "آگهی منتشر شد" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
