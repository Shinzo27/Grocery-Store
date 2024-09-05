import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

const Product = () => {
  const [product, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async (query) => {
    try {
      const response = query
      ? await axios.get(`http://localhost:8000/api/v1/product/filterProduct?filter=${searchQuery}`)
      : await axios.get('http://localhost:8000/api/v1/product/categoryProduct');
      setProducts(response.data.product);
    } catch (err) {
      console.error(err);
      setProducts([]);  // Ensure products state is reset on error
    }
  };

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div className="container pt-5">
        <div>
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Products"
                required
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
              />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>
        {searchQuery.trim() === '' ? (
          product.map((category) => (
            <div key={category._id} className="pt-6">
              <div className=" w-full h-16 bg-blue-500 flex items-center justify-center text-white rounded-xl">
                <h1 className="text-3xl">{category.categoryName}</h1>
              </div>
              <div className=" p-5 flex justify-center items-center gap-5 flex-wrap">
                {category.products.map((product) => (
                  <ProductCard
                    img={product.imgUrl}
                    ProductName={product.name}
                    ProductPrice={product.price}
                    id={product._id}
                    key={product._id}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          product.map((product)=>(
            <div key={product._id} className="pt-6 flex items-center justify-center">
              <ProductCard img={product.imgUrl} ProductName={product.username} ProductPrice={product.price} id={product._id} key={product._id}/>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Product;
