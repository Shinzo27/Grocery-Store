import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const fulldate = (day + 2) + "-" + month + "-" + year
  const location = useLocation()
  const orderDetails = location.state || "";
  const navigateTo = useNavigate()

  if(!orderDetails) return <Navigate to={'/'}/>
  return (
    <>
      <div className="min-h-screen  dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Order Detail
        </h1>

        {/* Order Information */}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <p className="text-lg text-gray-600 dark:text-gray-300">Order ID: <span className="font-semibold">#{orderDetails.orderId}</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Placed On: <span className="font-semibold">{orderDetails.createdAt.toString().slice(0,10)}</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Address: <span className="font-semibold">{orderDetails.address}</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">City: <span className="font-semibold">{orderDetails.city}</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">State: <span className="font-semibold">{orderDetails.state}</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Pincode: <span className="font-semibold">{orderDetails.pincode}</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Contact No.: <span className="font-semibold">1234567890</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Username: <span className="font-semibold">{orderDetails.user.username}</span></p>
          </div>
          <div className="text-right">
            <p className="text-lg text-gray-600 dark:text-gray-300">Estimated Arrival: <span className="font-semibold">{fulldate}</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Delivered in: <span className="font-semibold">2 Days</span></p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Status</h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
            <p className="text-gray-600 dark:text-gray-300">{orderDetails.status}</p>
          </div>
        </div>

        {/* Items */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Items</h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            {orderDetails.products.map((item) => (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex-1 capitalize" key={item._id}>
                <p className="text-gray-900 dark:text-gray-100">{item.name}</p>
                <p className="text-gray-600 dark:text-gray-300">₹ {item.price}</p>
                <p className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
            <p className="font-bold text-gray-900 dark:text-gray-100">Total: ₹{orderDetails.total}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={()=>navigateTo('/')}>Home</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default PaymentSuccess