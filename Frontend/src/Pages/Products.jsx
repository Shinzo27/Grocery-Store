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
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div className="container pt-5">
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
