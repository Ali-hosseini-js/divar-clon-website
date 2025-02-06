"use client";

import Loader from "@/module/Loader";
import Image from "next/image";
import { sp } from "@/utils/replaceNumber";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { publishPost, unpublishedPost } from "@/actions/admin";
import { deletePost } from "@/actions/personalPost";

function ConfirmationList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["unpublishedPost"],
    queryFn: async () => unpublishedPost(),
    onError: (error) => {
      toast.error(error.message);
    },
    refetchInterval: 6000,
  });

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("آگهی مورد نظر حذف گردید.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteHandler = async (id) => {
    mutate(id, {
      onSuccess: refetch,
    });
  };

  const { mutate: publish } = useMutation({
    mutationFn: publishPost,
    onSuccess: () => {
      toast.success("آگهی مورد نظر منتشر گردید.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitHandler = async (id) => {
    publish(id, {
      onSuccess: refetch,
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="mt-[60px] mb-[30px] border-b-4 border-solid border-main w-fit pb-1">
            در انتظار تایید
          </h3>

          {data.data ? (
            data.data.map((post) => (
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
                    onClick={() => submitHandler(post._id)}
                    className="bg-white text-main border border-main  py-2 px-6 rounded text-sm cursor-pointer w-[80px]"
                  >
                    انتشار
                  </button>
                  <button
                    onClick={() => deleteHandler(post._id)}
                    className="bg-main text-white border-none py-2 px-6 rounded text-sm cursor-pointer w-[80px]"
                  >
                    حذف
                  </button>
                </div>
                <Toaster />
              </div>
            ))
          ) : (
            <p className="bg-main text-white py-2 px-6 text-center rounded mr-[40px]">
              {data.message}{" "}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ConfirmationList;
