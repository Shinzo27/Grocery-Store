import { NextPage } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <DefaultLayout>
      <div className="h-screen">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:dark:text-white">
              Add Product
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

          <form className="mx-auto max-w-sm w-96 text-black font-normal">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium  dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium  dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                placeholder="Description"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Product Price
              </label>
              <input
                type="number"
                id="productPrice"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                placeholder="Product Price"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Total Quantity
              </label>
              <input
                type="number"
                id="productPrice"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                placeholder="Total Quantity"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Category
              </label>
              <select
                id="productPrice"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
              >
                <option value={'Dryfruit'}>Dryfruit</option>
                <option value={'ColdDrink'}>ColdDrink</option>
                <option value={'Fruit'}>Fruit</option>
                <option value={'Vegetable'}>Vegetable</option>
                <option value={'Snacks'}>Snacks</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="productImage"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="productImage"
                className=" dark:text-white bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light block w-full rounded-lg border p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-lg text-white font-bold text-lg bg-blue-700 px-5 py-2.5 text-center font hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register new account
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
