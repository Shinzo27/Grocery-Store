import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartItem = ({product, quantity, total, id}) => {
  const [singleProduct, setSingleProduct] = useState()
  const navigateTo = useNavigate()

  useEffect(()=>{
    setSingleProduct(product)
  }, [singleProduct])

  const deleteItem = async(id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/cart/removeItem/${id}`, {withCredentials: true}).then((res)=>{
        window.location.reload()
        toast.success(res.data.message)
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  async function increaseQuantity(id){
    const { data } = await axios.put(`http://localhost:8000/api/v1/cart/increaseQuantity/${id}`, {}, {withCredentials: true})
    window.location.reload()
    toast.success(data.message)
  }

  async function decreaseQuantity(id){
    try {
      const { data } = await axios.put(`http://localhost:8000/api/v1/cart/reduceQuantity/${id}`, {}, {withCredentials: true})
      window.location.reload()
      toast.success(data.message)
    } catch (error) {
      // toast.error(error)
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div className="img-box">
            <img
            src={product.productId.imgUrl}
            alt="perfume bottle image"
            className="xl:w-[140px] sm: w-72"
          />
        </div>
        <div className="pro-data w-full max-w-sm ">
          <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
            {product.productId.name}
          </h5>
          <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
            ₹{product.productId.price}
          </h6>
        </div>
      </div>
      <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        <div className="flex items-center w-full mx-auto justify-center">
          <button type="button" className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50" onClick={()=>decreaseQuantity(product._id)}>
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            type="text"
            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
            readOnly
            defaultValue={product.quantity}
          />
          <button className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50" onClick={()=>increaseQuantity(product._id)}>
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <h6 className="text-indigo-600 lg:pl-14 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          ₹{product.totalPrice}
        </h6>
        <button className="group rounded-r-full" onClick={()=>deleteItem(product._id)}>
          <MdDeleteForever className=" text-3xl text-red-500"/>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
