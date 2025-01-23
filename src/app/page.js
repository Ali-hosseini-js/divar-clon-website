import Sidebar from "@/template/Sidebar";
import Main from "@/template/Main";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
}
