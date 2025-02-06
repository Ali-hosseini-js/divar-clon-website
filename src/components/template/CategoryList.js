"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import adminCategory from "@/actions/admin";

function CategoryList() {
  const { data } = useQuery({
    queryKey: ["adminCategory"],
    queryFn: async () => adminCategory(),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="mt-[50px] mb-[70px]">
      {data?.data?.map((i) => (
        <div
          key={i._id}
          className="flex my-[20px] p-4 border-2 border-solid border-[#eaeaea] rounded"
        >
          <Image alt={i.name} src={`${i.icon}.svg`} width={20} height={20} />
          <h5 className="mr-[10px] text-sm w-[120px]">{i.name}</h5>
          <p className="w-full text-left text-main">slug: {i.slug}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
