import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NextPage } from "next";
import Image from "next/image";
import { BRAND } from "@/types/brand";

interface Props {}

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Twitter",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
];

const Page: NextPage<Props> = ({}) => {
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

            {brandData.map((brand, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-4 ${
                  key === brandData.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block">
                    {brand.name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {brand.visitors}K
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">Edit</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
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
