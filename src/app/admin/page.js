import CategoryForm from "@/template/CategoryForm";
import CategoryList from "@/template/CategoryList";
import React from "react";

function Admin() {
  return (
    <div>
      <CategoryList />
      <CategoryForm />
    </div>
  );
}

export default Admin;
