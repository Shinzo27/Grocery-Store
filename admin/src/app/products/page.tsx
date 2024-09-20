"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const { data } = await axios.get('http://localhost:8000/api/v1/product/allProducts', {withCredentials: true})
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  },[]);

  const handleDeleteProduct = async (productId: string) => {
    const { data } = await axios.delete(`http://localhost:8000/api/v1/product/deleteProduct/${productId}`, {withCredentials: true});
    if (data.success) {
      toast.success("Product Deleted Successfully!");
      getProducts();
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <DefaultLayout>
      <div className="h-screen">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Products
            </h4>
            <div>
              <button className="btn btn-primary btn-sm mb-5 rounded-lg bg-zinc-600 p-3 font-semibold text-white dark:bg-blue-800" onClick={() => router.push("/add_product")}>
                Add Product
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Product Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Price
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Stock
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Category
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Description
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Edit
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Delete
                </h5>
              </div>
            </div>

            {products.map((product, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-7 ${key === products.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className=" text-black dark:text-white sm:block">
                    {product.name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    ₹{product.price}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{product.quantity}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{product.category.name}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white w-full h-16 overflow-hidden text-ellipsis whitespace-pre-line break-words">
                    {product.description}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <button className="text-black dark:text-white text-wrap" onClick={() => router.push(`/edit_product?productId=${product._id}`)}>
                    Edit
                  </button>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white text-wrap" onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
