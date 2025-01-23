"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "@/module/Loader";

function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/admin");
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-[30px] w-[200px]">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h4 className="font-medium">دسته ها</h4>
          <ul>
            {data.data.map((category) => (
              <li key={category._id} className="flex my-5">
                <Image
                  alt=""
                  src={`${category.icon}.svg`}
                  width={20}
                  height={20}
                />
                <p className="font-light mr-3 text-gray-500">{category.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Sidebar;
