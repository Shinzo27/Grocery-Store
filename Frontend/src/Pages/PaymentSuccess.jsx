import React from 'react'
import PaymentSuccessImage from '../assets/PaymentSuccessful.jpg'

const PaymentSuccess = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const fulldate = (day + 2) + "-" + month + "-" + year

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
            <p className="text-lg text-gray-600 dark:text-gray-300">Order ID: <span className="font-semibold">#8981786</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Shipment: <span className="font-semibold">Doordash Indonesia</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Recipient: <span className="font-semibold">Emir</span></p>
            <p className="text-lg text-gray-600 dark:text-gray-300">Tracking No: <span className="font-semibold">871291898212</span></p>
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
            <p className="text-gray-600 dark:text-gray-300">1 Jul - Order placed</p>
          </div>
        </div>

        {/* Items */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Items</h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex-1">
              <p className="text-gray-900 dark:text-gray-100">Nike Air Max SYSTM</p>
              <p className="text-gray-600 dark:text-gray-300">Rp 1,459,000</p>
              <p className="text-gray-600 dark:text-gray-300">Size: 24</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex-1">
              <p className="text-gray-900 dark:text-gray-100">Nike Air Max Pulse</p>
              <p className="text-gray-600 dark:text-gray-300">Rp 2,379,000</p>
              <p className="text-gray-600 dark:text-gray-300">Size: 24</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex-1">
              <p className="text-gray-900 dark:text-gray-100">Nike Air Rift</p>
              <p className="text-gray-600 dark:text-gray-300">Rp 1,909,000</p>
              <p className="text-gray-600 dark:text-gray-300">Size: 24</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex-1">
              <p className="text-gray-900 dark:text-gray-100">Nike Air Max Air</p>
              <p className="text-gray-600 dark:text-gray-300">Rp 2,379,000</p>
              <p className="text-gray-600 dark:text-gray-300">Size: 24</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
            <p className="font-bold text-gray-900 dark:text-gray-100">Total: Rp 7,890,000</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Home</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default PaymentSuccess