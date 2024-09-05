import React from 'react'
import {Link} from 'react-router-dom'

const Button = ({text, to = () =>{}}) => {
  return (
    <button className='bg-blue-500 text-white font-semibold cursor-pointer hover:scale-105 py-2 px-8 rounded-full relative z-10'>
      <Link to={to}>{text}</Link>
    </button>
  )
}

export default Button