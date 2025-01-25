import CategoryForm from "@/template/CategoryForm";
import CategoryList from "@/template/CategoryList";
import ConfirmationList from "@/template/ConfirmationList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DivarUser from "@/models/DivarUser";
import { redirect } from "next/navigation";

async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  const user = await DivarUser.findOne({ mobile: session.user.mobile });
  if (user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div>
      <CategoryList />
      <CategoryForm />
      <ConfirmationList />
    </div>
  );
}

export default Admin;
