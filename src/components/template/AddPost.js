"use client";

import { uploadPost } from "@/actions/personalPost";
import { useRef } from "react";
import adminCategory from "@/actions/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

function AddPost() {
  const ref = useRef(null);
  const queryClient = useQueryClient();

  const { data: getData } = useQuery({
    queryKey: ["adminCategory"],
    queryFn: async () => adminCategory(),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate } = useMutation({
    mutationFn: uploadPost,
    onSuccess: () => {
      toast.success("آگهی منتشر شد");
      queryClient.invalidateQueries({ queryKey: ["personalPost"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <form
      ref={ref}
      action={async (formData) => {
        mutate(formData);
      }}
    >
      <h3 className="mb-[30px] border-b-4 border-solid border-main w-fit pb-1">
        افزودن آگهی
      </h3>
      <label htmlFor="title" className="block text-sm mb-[10px]">
        عنوان
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <label htmlFor="content" className="block text-sm mb-[10px]">
        توضیحات
      </label>
      <textarea
        name="content"
        id="content"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8 h-[100px]"
      />
      <label htmlFor="amount" className="block text-sm mb-[10px]">
        قیمت
      </label>
      <input
        type="number"
        name="amount"
        id="amount"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <label htmlFor="city" className="block text-sm mb-[10px]">
        شهر
      </label>
      <input
        type="text"
        name="city"
        id="city"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <label htmlFor="category" className="block text-sm mb-[10px]">
        دسته بندی
      </label>
      <select
        name="category"
        id="category"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      >
        {getData?.data?.map((i) => (
          <option key={i._id} value={i.slug}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images" className="block text-sm mb-[10px]">
        عکس
      </label>
      <input
        type="file"
        name="images"
        id="images"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-8"
      />
      <button
        type="submit"
        className="bg-main text-white border-none py-2 px-6 rounded text-sm cursor-pointer"
      >
        ایجاد
      </button>
      <Toaster />
    </form>
  );
}

export default AddPost;
