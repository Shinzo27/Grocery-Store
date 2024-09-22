"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import { NextPage } from "next";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {}

interface Product {
  name: string;
  quantity: string;
  price: string;
  _id: string;
}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");

  const getOrderDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/checkout/singleOrder/${orderId}`,
      { withCredentials: true },
    );
    console.log(data.order);
    setUsername(data.order.user.username);
    setEmail(data.order.user.email);
    setAddress(data.order.address);
    setCity(data.order.city);
    setState(data.order.state);
    setPincode(data.order.pincode);
    setTotal(data.order.total);
    setStatus(data.order.status);
    setProducts(data.order.products);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <DefaultLayout>
      <div className="bg-gray-900 flex h-screen">
        <div className="bg-gray-800 w-full rounded-lg p-6 dark:text-white">
          {/* User and Order Details */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{username}</h1>
              <p className="text-gray-400">{email}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Order ID : {orderId}</p>
              <button className="mt-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-black">
                {status}
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-gray-700 mb-6 rounded-lg p-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-gray-600 border-b text-left">
                  <th className="py-2">Product Name</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product, key: number) => (
                  <tr key={key} className="border-gray-600 border-b">
                    <td className="py-2">{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>₹{product.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-gray-600 border-t">
                  <td className="py-2">Total Amount</td>
                  <td></td>
                  <td>₹{total}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Location Section */}
          <div className="">
            <div className="bg-gray-700 w-1/3 rounded-lg p-4">
              <h2 className="mb-4 text-lg font-semibold">Location</h2>
              <p>
                <span className="font-bold">Address:</span> {address}
              </p>
              <p>
                <span className="font-bold">City:</span> {city}
              </p>
              <p>
                <span className="font-bold">State:</span> {state}
              </p>
              <p>
                <span className="font-bold">Pincode:</span> {pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
