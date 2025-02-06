"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { postCategory } from "@/actions/admin";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      toast.success("دسته بندی منتشر شد");
      queryClient.invalidateQueries({ queryKey: ["adminCategory"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    mutate(form);
  };
  return (
    <form onChange={changeHandler}>
      <h3 className="mb-[30px] border-b-4 border-solid border-main w-fit pb-1">
        دسته بندی جدید
      </h3>
      <label htmlFor="name" className="block text-sm mb-3">
        اسم دسته بندی
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-[30px]"
      />
      <label htmlFor="slug" className="block text-sm mb-3">
        اسلاگ
      </label>
      <input
        type="text"
        name="slug"
        id="slug"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-[30px]"
      />
      <label htmlFor="icon" className="block text-sm mb-3">
        آیکون
      </label>
      <input
        type="text"
        name="icon"
        id="icon"
        className="block w-[300px] p-1 border border-solid border-gray-300 rounded mb-[30px]"
      />
      <button
        onClick={submitHandler}
        className="bg-main text-white border-none py-2 px-6 rounded text-sm cursor-pointer"
      >
        ایجاد
      </button>
      <Toaster />
    </form>
  );
}

export default CategoryForm;
