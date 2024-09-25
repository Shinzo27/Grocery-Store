import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";
import { useEffect, useState } from "react";
import axios from "axios";

interface OrderData {
  name: string;
  quantity: string;
}

const ChatCard = () => {
  const [productData, setProductData] = useState<OrderData[]>([]);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/checkout/getLessQuantityProducts",
          { withCredentials: true },
        );
        setProductData(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderData();
  },[]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Low Quantity Products
      </h4>
      <div className=" capitalize">
        <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Product Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quantity
            </h5>
          </div>
        </div>

        {productData.map((product, key) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-2 ${
              key === productData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white">{product.name}</p>
              </div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;