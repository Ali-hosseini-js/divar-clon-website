import connectDB from "@/utils/connectDB";
import DivarAdmin from "@/models/DivarAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { form } = await req.json();
    console.log({ form });
    const { name, icon, slug } = form;

    const existingCategory = await DivarAdmin.findOne({ name });

    if (!existingCategory) {
      await DivarAdmin.create({
        name: name,
        slug: slug,
        icon: icon,
      });
    } else {
      return NextResponse.json(
        { error: "دسته بندی ایجاد شده تکراری می باشد" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "دسته بندی جدید با موفقیت ایجاد شد." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const category = await DivarAdmin.find();

    if (!category) {
      return NextResponse.json(
        { error: "دسته بندی وجود ندارد" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: category,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      {
        status: 500,
      }
    );
  }
}
