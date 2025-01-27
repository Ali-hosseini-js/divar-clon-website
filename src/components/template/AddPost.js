"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddPost() {
  const [data, setData] = useState({});

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: null,
    images: null,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/admin");
      const data = await res.json();
      setData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const addHandler = async (event) => {
    event.preventDefault();
    //while we have file for uploading to database we can not use json format we must use FormData
    //formData for frontend and multer for backend
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    console.log(form);
    console.log(formData);
    if (
      !form.title ||
      !form.content ||
      !form.category ||
      !form.city ||
      !form.amount ||
      !form.images
    )
      return toast.error("لطفا تمام موارد را تکمیل کنید.");

    const res = await fetch("/api/user", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
    }
    router.refresh();
  };

  return (
    <form onChange={changeHandler}>
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
        {data.data?.map((i) => (
          <option key={i._id} value={i._id}>
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
        onClick={addHandler}
        className="bg-main text-white border-none py-2 px-6 rounded text-sm cursor-pointer"
      >
        ایجاد
      </button>
      <Toaster />
    </form>
  );
}

export default AddPost;
