"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Order } from "@/types/orders";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  const fetchOrders = async() => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/checkout/allOrders', {withCredentials: true})
      console.log(data.orders.status);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchOrders();
  }, [])
  return (
    <DefaultLayout>
      <div className="h-screen">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Recent Orders
            </h4>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Order ID
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Amount
                </h5>
              </div>
              <div className="hidden p-2.5 text-center xl:p-5 sm:block">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Order Date
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status
                </h5>
              </div>
              <div className="p-2.5 xl:p-5 text-center sm:block">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  View
                </h5>
              </div>
            </div>

            {orders.map((order, key) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 ${
                  key === orders.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="overflow-hidden text-ellipsis whitespace-pre-line break-words text-black dark:text-white sm:block">
                    {order.orderId}
                  </p>
                </div>

                <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    ₹{order.total}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{order.pincode}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{order.status}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5">
                  <button className="text-black dark:text-white" onClick={() => router.push(`/view_order?orderId=${order.orderId}`)}>View Order</button>
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