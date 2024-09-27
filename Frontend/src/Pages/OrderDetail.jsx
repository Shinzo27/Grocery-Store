import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  
  const params = useParams()
  const [status, setStatus] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/v1/checkout/singleOrder/${params.id}`, {
        withCredentials: true,
      });
      console.log(data.order);
      setOrderItems(data.order.products);
      setOrderDetails(data.order);
      setStatus(data.order.status);
    };
    fetchData();
  }, []);

  const statusClass =
    status === "Delivered"
      ? "bg-green-500"
      : status === "Processing"
      ? "bg-yellow-500"
      : "bg-blue-500";

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <div>
            <span
              className={`text-sm font-semibold py-1 px-2 text-white rounded-full ${statusClass}`}
            >
              {status}
            </span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Order ID {params.id}</p>
          <p className="text-sm text-gray-500">Placed on {orderDetails.createdAt}</p>
          {/* Order Table */}
          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="text-left font-semibold text-gray-500">
                  <th className='pb-4'>Item</th>
                  <th className="text-center pb-4">Quantity</th>
                  <th className="text-right pb-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className='pt-5 capitalize'>{item.name}</td>
                    <td className="text-center pt-5">{item.quantity}</td>
                    <td className="text-right pt-5">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6">
              <span className="font-semibold">Delivered to: {orderDetails.address + " " + orderDetails.city + " " + orderDetails.state + ", " + orderDetails.pincode}</span>
            </div>
            <div className="mt-6 flex justify-end">
              <span className="font-semibold">Total: ₹{orderDetails.total}</span>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail