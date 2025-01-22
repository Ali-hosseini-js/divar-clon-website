import Image from "next/image";
import Link from "next/link";
import divar from "@/public/divar.svg";
import location from "@/public/location.svg";
import profile from "@/public/profile.svg";

function Header() {
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
      <div className="flex items-center">
        <Link href="/signin">
          <span className="flex items-center text-gray-400">
            <Image alt="profile" src={profile} width={20} height={20} />
            <p className="mr-1 text-sm">دیوار من</p>
          </span>
        </Link>
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
