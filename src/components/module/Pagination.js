"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/utils/url";

function Pagination({ pageNumber, isNext }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="bg-main text-white text-center rounded"
      >
        <Image alt="" src="arrowRight.svg" width={30} height={30} />
      </button>
      <div className="flex items-center justify-center border border-main rounded px-3 py-1">
        <p className="text-main">{pageNumber}</p>
      </div>
      <button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="bg-main text-white text-center rounded"
      >
        <Image alt="" src="arrowLeft.svg" width={30} height={30} />
      </button>
    </div>
  );
}

export default Pagination;
