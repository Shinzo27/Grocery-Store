import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="flex items-center mb-4">
              <div className="h-20 w-20 rounded-full bg-gray-200"></div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Alice Johnson</h3>
                <p className="text-gray-500">alice@example.com</p>
              </div>
            </div>
            <div className="mb-2 flex items-center">
              <span className="text-gray-500 mr-2">📍</span>
              <p>123 Main St, Anytown, USA</p>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">📅</span>
              <p>Member since January 2023</p>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">My Orders</h2>
            <p className="text-gray-600 mb-4">View your order history</p>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm font-semibold py-1 px-2 bg-gray-200 rounded">
                All Orders
              </p>
            </div>
            <OrderItem
              orderNumber="1"
              date="2023-06-15"
              status="Delivered"
              amount="75.99"
            />
            <OrderItem
              orderNumber="2"
              date="2023-06-22"
              status="Processing"
              amount="45.50"
            />
            <OrderItem
              orderNumber="3"
              date="2023-06-30"
              status="Shipped"
              amount="120.75"
            />
            <OrderItem
              orderNumber="3"
              date="2023-06-30"
              status="Shipped"
              amount="120.75"
            />
            <OrderItem
              orderNumber="3"
              date="2023-06-30"
              status="Shipped"
              amount="120.75"
            />
            <OrderItem
              orderNumber="5"
              date="2023-06-30"
              status="Shipped"
              amount="120.75"
            />
            <OrderItem
              orderNumber="3"
              date="2023-06-30"
              status="Shipped"
              amount="120.75"
            />
          </div>

          <div className="flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Add New Address</h2>
              <form className="space-y-6">
                {/* Street Address */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* City, State/Province */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Zip/Postal Code, Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Zip/Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Add Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderItem = ({ orderNumber, date, status, amount }) => {
  const navigate = useNavigate();
  const statusClass =
    status === "Delivered"
      ? "bg-green-500"
      : status === "Processing"
      ? "bg-yellow-500"
      : "bg-blue-500";
  return (
    <div className="flex justify-between items-center border-t border-gray-200 py-4">
      <div>
        <h4 className="font-semibold">Order #{orderNumber}</h4>
        <p className="text-gray-500">{date}</p>
      </div>
      <div className="flex items-center">
        <span
          className={`text-sm font-semibold py-1 px-2 text-white rounded-full ${statusClass}`}
        >
          {status}
        </span>
        <p className="ml-4 font-semibold">${amount}</p>
        <button className="ml-4 text-sm text-blue-500 font-semibold" onClick={() => navigate(`/orderDetail/${orderNumber}`)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default Profile;
