import { NextPage } from 'next'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <DefaultLayout>
        <div className="h-screen">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Products
            </h4>
            <div>
              <button className="btn btn-primary btn-sm mb-5 rounded-lg bg-zinc-600 p-3 font-semibold text-white dark:bg-blue-800">
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  ) 
}

export default Page