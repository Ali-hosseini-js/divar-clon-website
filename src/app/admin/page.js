import CategoryForm from "@/template/CategoryForm";
import CategoryList from "@/template/CategoryList";
import ConfirmationList from "@/template/ConfirmationList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div>
      <CategoryList />
      <CategoryForm />
      <ConfirmationList />
    </div>
  );
}

export default Admin;
