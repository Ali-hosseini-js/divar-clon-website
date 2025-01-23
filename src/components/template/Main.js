"use client";

import Loader from "@/module/Loader";
import { useState, useEffect } from "react";
import Image from "next/image";
import { sp } from "@/utils/replaceNumber";

function Main() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/main");
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center flex-wrap justify-between mt-5 w-full mx-[100px]">
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.data.map((post) => (
            <div
              key={post._id}
              className="w-[330px] flex justify-between border border-solid border-[#eaeaea] m-3 p-4 rounded-xl"
            >
              <div className="flex flex-col justify-between">
                <p>{post.title}</p>
                <div className="text-gray-500 text-sm">
                  <p>{sp(post.amount)} تومان</p>
                  <span>{post.city}</span>
                </div>
              </div>
              <Image
                className="w-[150px] h-[130px] rounded-lg"
                alt={post.title}
                src={post.image}
                width={400}
                height={400}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Main;
