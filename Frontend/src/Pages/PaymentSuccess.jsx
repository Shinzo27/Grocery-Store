import React from 'react'
import PaymentSuccessImage from '../assets/PaymentSuccessful.jpg'

const PaymentSuccess = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const fulldate = (day + 2) + "-" + month + "-" + year

  return (
    <>
      <div className='flex flex-col justify-center items-center pt-16'>
        <div className='w-1/3 '>
          <img src={PaymentSuccessImage} alt=""/>
        </div>
        <div className='flex flex-col justify-center items-center font-Dosis font-semibold pt-5 text-3xl'>
          <h1>Payment Successful</h1>
          <h2 className='pt-5'>Your order will be recieved on { fulldate }</h2>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess