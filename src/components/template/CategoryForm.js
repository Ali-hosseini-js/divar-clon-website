"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = async () => {
    if (!form.name || !form.slug || !form.icon)
      return toast.error("لطفا تمام موارد را تکمیل کنید.");

    const res = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify({ form }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
    }
  };
  return (
    <form onChange={changeHandler} onSubmit={submitHandler}>
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
        type="submit"
        className="bg-main text-white border-none py-2 px-6 rounded text-sm cursor-pointer"
      >
        ایجاد
      </button>
      <Toaster />
    </form>
  );
}

export default CategoryForm;
