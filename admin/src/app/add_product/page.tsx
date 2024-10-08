"use client";
import Loader from "@/components/common/Loader";
import { NextPage } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { EventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.error("Please upload a valid image file (jpg, png, jpeg).");
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const productData = {
    name: name,
    description: description,
    quantity: quantity,
    price: price,
    category: category,
    img: image,
  };

  const handleProductUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image)
      return toast.error("Please upload a valid image file (jpg, png, jpeg).");
    
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/addProduct",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (data.success) {
        toast.success("Product Added Successfully!");
        router.push("/products");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? <Loader /> : 
    <DefaultLayout>
      <div className="h-screen">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:dark:text-white">
              Add Product
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center pt-15">
          {/* name
            description
            price
            quantity
            category
            img
          */}

          <form
            className="mx-auto w-96 max-w-sm font-normal text-black"
            onSubmit={handleProductUpload}
          >
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium  dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium  dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Product Price
              </label>
              <input
                type="number"
                id="productPrice"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Total Quantity
              </label>
              <input
                type="number"
                id="productPrice"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                placeholder="Total Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Category
              </label>
              <select
                id="productPrice"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                value={category}
                onChange={handleCategoryChange}
              >
                <option value={""} disabled>Select Category</option>
                <option value={"Dryfruit"}>Dryfruit</option>
                <option value={"ColdDrink"}>ColdDrink</option>
                <option value={"Fruit"}>Fruit</option>
                <option value={"Vegetable"}>Vegetable</option>
                <option value={"Snacks"}>Snacks</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="productImage"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="productImage"
                className=" bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <button
              type="submit"
              className="font rounded-lg bg-blue-700 px-5 py-2.5 text-center text-lg font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
