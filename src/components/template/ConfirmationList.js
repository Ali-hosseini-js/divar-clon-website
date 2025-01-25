"use client";

import Loader from "@/module/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sp } from "@/utils/replaceNumber";
import toast, { Toaster } from "react-hot-toast";

function ConfirmationList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchData = async () => {
    const res = await fetch("api/admin/post");
    const data = await res.json();
    setData(data);
    console.log("data:", data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (i) => {
    const res = await fetch(`/api/admin/publish/${i}`, { method: "PATCH" });
    const result = await res.json();
    if (result.message) {
      toast.success(result.message);
      fetchData();
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="mt-[60px] mb-[30px] border-b-4 border-solid border-main w-fit pb-1">
            در انتظار تایید
          </h3>
          {data.data.length ? null : (
            <p className="bg-main text-white py-2 px-6 text-center rounded mr-[40px]">
              هیچ آگهی در انتظار تاییدی وجود ندارد
            </p>
          )}

          {data.data.map((post) => (
            <div
              key={post._id}
              className="flex items-center border-2 border-solid border-[#eaeaea] rounded-xl my-2 p-1"
            >
              <Image
                className="w-[100px] h-[70px] rounded-lg ml-[30px]"
                alt={post.title}
                src={post.image}
                width={400}
                height={400}
              />
              <div className="w-full">
                <p className="text-base">{post.title}</p>
                <span className="text-sm text-gray-500">{post.content}</span>
              </div>
              <div className="w-[150px] text-center">
                <p className="text-base">
                  {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                </p>
                <span className="text-sm text-gray-500">
                  {sp(post.amount)} تومان
                </span>
              </div>
              <button
                className="bg-main text-white py-2 px-6 text-center rounded mr-[40px]"
                onClick={() => submitHandler(post._id)}
              >
                انتشار
              </button>
              <Toaster />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ConfirmationList;
