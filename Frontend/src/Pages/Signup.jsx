import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const [username, setUsername]= useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigateTo = useNavigate()
    const handleRegister = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "/api/v1/user/signup",
          { username, email, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        toast.success(response.data.message)
        navigateTo("/")
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  return (
    <>
      <div className="container flex justify-center items-center font-[sans-serif] text-[#333] pt-10">
        <div className="grid justify-center max-w-md mx-auto ">
          <div>
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full object-cover rounded-lg"
              alt="login-image"
            />
          </div>
          <form className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]" onSubmit={handleRegister}>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold text-blue-600">Sign Up</h3>
            </div>
            <div>
              <div className="relative flex items-center pb-8">
                <input
                  name="email"
                  type="text"
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10">
              <input
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                value={"Sign up"}
              />
              <p className="text-sm text-center mt-6">
                Already logged in?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Login here
                </Link>
              </p>
            </div>
            {/* vacation */}
          </form>
        </div>
      </div>
    </>

  )
}

export default Signup