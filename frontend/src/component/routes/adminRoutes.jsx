import React from "react";
import { Route } from "react-router-dom";
import ListUsers from "../admin/ListUsers";
import Dashboard from "../admin/Dashboard";
import ListProducts from "../admin/ListProducts";
import NewProduct from "../admin/NewProduct";
 import UpdateProduct from "../admin/UpdateProduct";
import UploadImages from "../admin/UploadImages";
const adminRoutes = () => {
  return (
    <>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<ListProducts />} />
      <Route path="/admin/product/new" element={<NewProduct />} />
      <Route
        path="/admin/products/:id"
        element={
         
            <UpdateProduct />
          
        }
      />
      <Route path="/admin/products/:id/upload_images" element={<UploadImages />}  /> 
      <Route path="/admin/users" element={<ListUsers/>}/>
    </>
  );
};

export default adminRoutes;
