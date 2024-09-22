"use client";
import Loader from '@/components/common/Loader';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import axios from 'axios';
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddAdmin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8000/api/v1/user/admin/signup', {username, email, password}, {withCredentials: true})
      if (data.success) {
        toast.success("Admin Added Successfully!");
        router.push('/admins');
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (loading ? <Loader /> :
    <DefaultLayout>
      <div className="h-screen">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:dark:text-white">
              Add Admin
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center pt-15">
          {/* name
            description
            price
            quantity
            category
            img
          */}

          <form
            className="mx-auto w-96 max-w-sm font-normal text-black"
          >
            <div className="mb-5">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium  dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Admin Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium  dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Admin email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                placeholder="Admin Password"
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="font rounded-lg bg-blue-700 px-5 py-2.5 text-center text-lg font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddAdmin}
            >
              Add Admin
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Page