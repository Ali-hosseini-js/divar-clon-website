"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/utils/url";
import { useEffect, useState } from "react";
import Loader from "@/module/Loader";

function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/admin");
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCategory = (i) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "category",
      value: i,
    });

    router.push(newUrl);
  };

  return (
    <div className="mt-[30px] w-[200px]">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h4 className="font-medium ">دسته ها</h4>
          <Link className="flex my-5" href="/">
            همه
          </Link>
          {data.data?.map((category) => (
            <button
              onClick={() => handleCategory(category.slug)}
              key={category._id}
              className="flex my-5"
            >
              <Image
                alt=""
                src={`${category.icon}.svg`}
                width={20}
                height={20}
              />
              <p className="font-light mr-3 text-gray-500">{category.name}</p>
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default Sidebar;
