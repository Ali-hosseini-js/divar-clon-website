"use client";
import Loader from "@/module/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";

function PostList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const res = await fetch("api/user");
  //       const data = await res.json();
  //       setData(data);
  //       setLoading(false);
  //       console.log("client:", data);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts?.map((post) => (
            <div key={post._id}>{/* <Image alt="" src={} /> */}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
