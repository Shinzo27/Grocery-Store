import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import driedFruit2 from "../assets/driedfruit2.jpg";
import driedFruit1 from "../assets/driedfruit1.jpg";
import CartItem from "../Components/CartItem";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import io from 'socket.io-client'

const socket = io('http://localhost:8000')

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState();

  const getCartItems = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/cart/display",
      { withCredentials: true }
    );
    if (data) {
      setCartItems(data.cartItems);
      calculateTotal(data.cartItems);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    socket.on('cartUpdated', (updatedCart) => {
      setCartItems(updatedCart.cartItems);
      calculateTotal(updatedCart.cartItems);
    })

    return () => {
      socket.off('cartUpdated')
    }
  }, [])

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    setTotal(total);
  };
  const navigateTo = useNavigate()

  const handleQuantityChange = (updatedProduct) => {
    const updatedCart = cartItems.map((item) =>
      item._id === updatedProduct._id ? { ...item, quantity: updatedProduct.quantity } : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const handleDelete = (id) => {
    socket.emit('deleteSingleProduct', { _id: id });
    toast.success("Item removed successfully!")
  }

  const checkoutHandler = () =>{
    navigateTo('/userdetails', { state: total})
    // <Navigate to={'/userdetails'} state={total}/>
  }

  

  return (
    <>
      <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black pt-6">
        Shopping Cart
      </h2>
      {cartItems.length > 0 ? (
        <section className=" py-6 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <div className="hidden lg:grid grid-cols-2 py-6">
              <div className="font-normal text-xl leading-8 text-gray-500">
                Product
              </div>
              <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                <span className="w-full max-w-[260px] lg:pl-44 text-center">
                  Quantity
                </span>
                <span className="w-full max-w-[200px] text-center">Total</span>
              </p>
            </div>
            {cartItems.map((item) => (
              <div key={item._id}>
                <CartItem product={item} onQuantityChange={handleQuantityChange} onDelete={handleDelete} />
              </div>
            ))}
            <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
              <div className="flex items-center justify-between w-full mb-6">
                <p className="font-normal text-xl leading-8 text-gray-400">
                  Sub Total
                </p>
                <h6 className="font-semibold text-xl leading-8 text-gray-900">
                  ₹{total}
                </h6>
              </div>
              <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200"></div>
              <div className="flex items-center justify-between w-full py-6">
                <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                  Total
                </p>
                <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                  ₹{total}
                </h6>
              </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
              <button className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                <Link
                  className="px-2 font-semibold text-lg leading-8 text-indigo-600"
                  to={"/products"}
                >
                  Continue Shopping
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                    stroke="#4F46E5"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700" onClick={checkoutHandler}>
                Checkout Order
                <svg
                  className="ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                >
                  <path
                    d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className=" h-screen pt-10">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            No Items Found In Cart
          </h2>
        </div>
      )}
    </>
  );
};

export default Cart;
