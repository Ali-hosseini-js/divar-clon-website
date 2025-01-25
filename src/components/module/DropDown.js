"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown relative inline-block">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-400"
      >
        <Image alt="profile" src={"profile.svg"} width={20} height={20} />
        <p className="mr-1 text-sm">دیوار من</p>
      </button>

      {/* Dropdown Content */}
      <div
        className={`dropdown-content mt-3 absolute bg-gray-100 min-w-40 shadow-lg z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {session ? (
          <>
            <Link
              href="/dashboard"
              className="text-black py-3 px-4 no-underline block hover:bg-gray-200"
            >
              پروفایل شخصی
            </Link>

            <button
              onClick={signOut}
              className="flex gap-2 text-main p-4 font-normal"
            >
              <Image alt="log out" src={"logOut.svg"} width={25} height={25} />
              خروج
            </button>
          </>
        ) : (
          <Link
            href="/signin"
            className="flex gap-2 text-black p-4 font-normal"
          >
            <Image alt="log in" src={"logIn.svg"} width={25} height={25} />
            ورود
          </Link>
        )}
      </div>
    </div>
  );
}
