"use client"

import DefaultLayout from '@/components/Layouts/DefaultLayout'
import axios from 'axios'
import { NextPage } from 'next'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const getOrderDetails = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/v1/checkout/singleOrder/${orderId}`, {withCredentials: true});
    console.log(data.order);
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <DefaultLayout>
        <div className="h-screen">
            Hello
        </div>
    </DefaultLayout>
  )
}

export default Page