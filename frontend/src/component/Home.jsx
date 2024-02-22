import React from "react";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from "../redux/api/productsApi";
import ProductItem from "./products/ProductItem";
import Loader from "./layout/Loader";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";
const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  
  const params = { page, keyword };
  min!==null && (params.min=min)
  max!==null && (params.max=max)
  const { data, isLoading } = useGetProductsQuery(params);
  if (isLoading) return <Loader />;
  console.log(data);
  return (
    <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="filtered-heading">
            {keyword
              ? `${data?.products?.length} Products found with keyword: ${keyword} 😀😀` 
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} />
              ))}
            </div>
          </section>

          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
  );
};

export default Home;
