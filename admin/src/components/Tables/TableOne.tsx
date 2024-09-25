import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrderData {
  orderId: string;
  date: string;
  status: string;
  total: string;
}

const TableOne = () => {
  const [orderData, setOrderData] = useState<OrderData[]>([]);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/checkout/getLastFiveOrders",
          { withCredentials: true },
        );
        setOrderData(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderData();
  },[]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Recent Orders
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
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
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Order Date
            </h5>
          </div>
        </div>

        {orderData.map((order, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === orderData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <p className="text-black dark:text-white">{order.orderId}</p>
              </div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{order.total}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{order.status}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{order.date.trim().slice(0,10)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
