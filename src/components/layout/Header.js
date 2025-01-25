import Image from "next/image";
import Link from "next/link";
import divar from "@/public/divar.svg";
import location from "@/public/location.svg";
import DropDown from "@/module/DropDown";
import DivarUser from "@/models/DivarUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Header() {
  const session = await getServerSession(authOptions);
  const user = await DivarUser.findOne({ mobile: session?.user.mobile });

  return (
    <header className="flex justify-between items-center border-b-2 border-solid border-gray-300 py-3 mb-5">
      <div className="flex">
        <Link href="/">
          <Image
            className="ml-[45px]"
            alt="divar website"
            src={divar}
            width={45}
            height={45}
          />
        </Link>
        <span className="flex items-center text-gray-400">
          <Image alt="location" src={location} width={20} height={20} />
          <p className="mr-1 text-sm">تهران</p>
        </span>
      </div>
      <div className="flex items-center gap-14">
        {user?.role === "ADMIN" ? (
          <Link href="/admin" className="text-gray-400 text-sm">
            پنل ادمین
          </Link>
        ) : null}

        <DropDown />
        <Link
          href="/dashboard"
          className="bg-main text-white py-2 px-6 text-center rounded mr-[40px]"
        >
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
