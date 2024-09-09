import React, { useContext } from 'react'
import Button from '../Components/Shared/Button'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { authState } from '../State/Atom'
import { useRecoilState } from 'recoil'

const ProductCard = ({ id, img, ProductName, ProductPrice}) => {
  const navigateTo = useNavigate()
  const [auth, setAuth] = useRecoilState(authState)

  async function addToCart(productId, quantity){
      try {
        const { data } = await axios.post(`http://localhost:8000/api/v1/cart/addToCart/${productId}`, {quantity}, {withCredentials: true})
        toast.success(data.message)
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }

  return (
    <>
      <div className=' w-96 h-44 bg-gray-200 flex items-center justify-between rounded-xl font-Dosis text-gray-600'>
        <div className='flex items-center justify-center flex-col text-xl pl-5'>
          <h1 className='font-semibold capitalize'>{ProductName}</h1>
          <h2 className=' font-medium pt-2'>₹{ProductPrice}</h2>
          <div className='pt-3 pl-4'>
            <button type='button' className="bg-blue-500 text-white font-semibold cursor-pointer hover:scale-105 py-2 px-8 rounded-full relative z-10" onClick={()=>addToCart(id, 1)}>Add to cart</button>
          </div>
        </div>
        <div className=' h-28 w-28 mr-4'>
        <img src={img} alt="" className='w-full h-full object-contain rounded-lg'/>
        </div>
      </div>
    </>
  )
}

export default ProductCard