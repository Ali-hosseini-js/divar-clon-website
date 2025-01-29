import Image from "next/image";
import Link from "next/link";
import connectDB from "@/utils/connectDB";
import DivarAdmin from "@/models/DivarAdmin";

async function Sidebar() {
  await connectDB();

  const category = await DivarAdmin.find();

  return (
    <div className="mt-[30px] w-[200px]">
      <h4 className="font-medium ">دسته ها</h4>
      <Link className="flex my-5" href="/">
        همه
      </Link>
      {category.map((category) => (
        <Link
          key={category._id}
          className="flex my-5"
          href={{
            pathname: "/",
            query: { category: category.slug },
          }}
        >
          <Image alt="" src={`${category.icon}.svg`} width={20} height={20} />
          <p className="font-light mr-3 text-gray-500">{category.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
