"use client";

import Loader from "@/module/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sp } from "@/utils/replaceNumber";
import { useRouter } from "next/navigation";

function PostList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const router = useRouter();

  const fetchData = async () => {
    const res = await fetch("api/user");
    const data = await res.json();
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    const res = await fetch(`api/user/delete/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      router.refresh();
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="mt-[60px] mb-[30px] border-b-4 border-solid border-main w-fit pb-1">
            آگهی های شما
          </h3>

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
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => deleteHandler(post._id)}
                  className="bg-main text-white border-none py-2 px-6 rounded text-sm cursor-pointer w-[80px]"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
