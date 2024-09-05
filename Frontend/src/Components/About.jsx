import React from 'react'
import about1 from '../assets/about-icon-1.png'
import about2 from '../assets/about-icon-2.png'
import about3 from '../assets/about-icon-3.png'
import about from '../assets/about-img.png'

const About = () => {
  return (
    <div className='container lg:pt-14'>
        <div className='lg:flex lg:justify-between lg:items-center gap-10'>
            <div className='w-full flex lg:justify-center lg:items-center'>
                <img className='w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] lg:scale-110 object-contain' src={about} alt="" />
            </div>
            <div className='font-Dosis flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-semibold'>Welcome to our store</h1>
                <p className='text-clip lg:pl-10 text-justify lg:text-xl pt-3 text-gray-500'>We Are Famous Seller In Adajan Area! Specially Known For Our Quality Dryfruit, And We Are Selling Bharat Masala Which Is Famous All Around Surat And All Types Of Namkeens And Chocolates.We Have Imported Chocolates And Gift Hampers Too!</p>
                <div className='pt-10 lg:flex lg:justify-center lg:items-center gap-4'>
                    <div className='w-56 h-36 bg-gray-100 flex flex-col justify-center items-center mb-2'>
                        <img src={about1} alt="" className='h-20 pt-2'/>
                        <p className='pt-3 text-lg text-gray-500'>Quality Dryfruit</p>
                    </div>
                    <div className=' w-56 h-36 bg-gray-100 flex flex-col justify-center items-center mb-2'>
                        <img src={about2} alt="" className='h-20 pt-2'/>
                        <p className='pt-3 text-lg text-gray-500'>Spices</p>
                    </div>
                    <div className=' w-56 h-36 bg-gray-100 flex flex-col justify-center items-center mb-2'>
                        <img src={about3} alt="" className='h-20 pt-2'/>
                        <p className='pt-3 text-lg text-gray-500'>Namkeen</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About