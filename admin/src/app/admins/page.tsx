"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Admin } from "@/types/admin";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/user/admin/getAdmins', {withCredentials: true})
      setAdmins(data.admin);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAdmins();
  },[]);

  return (
    <DefaultLayout>
      <div className="h-screen">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Admins
            </h4>
            <div>
              <button className="btn btn-primary btn-sm mb-5 rounded-lg bg-zinc-600 p-3 font-semibold text-white dark:bg-blue-800">
                Add Admin
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Admin Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Email
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Edit
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Delete
                </h5>
              </div>
            </div>

            {admins.map((admin, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-4 ${
                  key === admins.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block">
                    {admin.username}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {admin.email}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5 cursor-pointer">
                  <p className="text-meta-3">Edit</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer">
                  <p className="text-black dark:text-white">Delete</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
