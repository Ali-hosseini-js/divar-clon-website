"use client";

import Loader from "@/module/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";

function CategoryList() {
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
    <div className="mt-[50px] mb-[70px]">
      {loading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div
            key={i._id}
            className="flex my-[20px] p-4 border-2 border-solid border-[#eaeaea] rounded"
          >
            <Image alt={i.name} src={`${i.icon}.svg`} width={20} height={20} />
            <h5 className="mr-[10px] text-sm w-[120px]">{i.name}</h5>
            <p className="w-full text-left text-main">slug: {i.slug}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
