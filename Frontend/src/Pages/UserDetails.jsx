import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../public/razorpay_logo.png";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { authState } from "../State/Atom";
import Loader from "../Components/Loader";

const UserDetails = () => {
  const location = useLocation();
  const total = location.state || "";
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const navigateTo = useNavigate();
  const auth = useRecoilValue(authState);
  const user = auth.user;
  const [isLoading, setIsLoading] = useState(false);

  const userDetails = {
    address,
    city,
    state,
    pincode,
  };

  const checkoutHandler = async () => {
    try {
      const {
        data: { order },
      } = await axios.post(
        "http://localhost:8000/api/v1/checkout/createOrder",
        { amount: total },
        { withCredentials: true }
      );

      const options = {
        key: "rzp_test_ObIKOxkah2XMbc",
        amount: order.amount,
        currency: "INR",
        name: "Patel's Dryfruit and Masala",
        description: "Grocery store",
        image: { logo },
        order_id: order.id,
        handler: function (response) {
          handlePaymentSuccess(response, userDetails);
        },
        prefill: {
          name: user.username,
        },
        notes: {
          address: userDetails.address,
          city: userDetails.city,
          state: userDetails.state,
          pincode: userDetails.pincode,
        },
        theme: {
          color: "#5e30eb",
        },
      };
      const razor = new window.Razorpay(options);
      razor.on("payment.error", function (response) {
        toast.error("Payment Failed");
        console.error(response.error);
      });
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = async (response, userDetails) => {
    setIsLoading(true);
    const paymentData = {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      userDetails: userDetails,
    };

    try {
      const verifyResponse = await axios.post(
        "http://localhost:8000/api/v1/checkout/verifyPayment",
        paymentData
      );
      const verifyData = verifyResponse.data;
      if (verifyData.success) {
        const res = await axios.post(
          "http://localhost:8000/api/v1/checkout/complete",
          {
            userDetails,
            razorpay_order_id: paymentData.razorpay_order_id,
            total,
          },
          { withCredentials: true }
        );
        if (res.data.success) {
          console.log(res.data);
          toast.success("Your order is placed!");
          navigateTo("/paymentSuccess", { state: res.data.order });
        }
      } else {
        console.log("Payment Verification Failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (total === "") return <Navigate to={"/cart"} />;
  return (
    isLoading ? <Loader /> : 
    <>
      <div className="flex justify-center items-start">
        <div className="w-96">
          <div className="pt-40">
            <div className="flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900 ">
              <span className="">Enter User Details</span>
            </div>
            <div className="mt-5 bg-white rounded-lg shadow">
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <h1 className="inline text-2xl font-semibold leading-none">
                    Details
                  </h1>
                </div>
              </div>
              <div className="px-5 pb-5">
                <input
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <div className="flex">
                  <div className="flex-grow">
                    <input
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-grow">
                    <input
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-grow">
                    <input
                      placeholder="Pincode"
                      value={pincode}
                      maxLength={6}
                      onChange={(e) => setPincode(e.target.value)}
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-4" />
              <div className="flex flex-row-reverse p-3">
                <div className="flex-initial pl-3">
                  <button
                    type="button"
                    className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
                    onClick={checkoutHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path
                        d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                        opacity=".3"
                      ></path>
                      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                    </svg>
                    <span className="pl-2 mx-1">Proceed</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
