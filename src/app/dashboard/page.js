import AddPost from "@/template/AddPost";
import PostList from "@/template/PostList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div>
      <AddPost />
      <PostList />
    </div>
  );
}

export default page;
