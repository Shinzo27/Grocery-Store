import React from 'react'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import About from '../Components/About'
import Expertise from '../Components/Expertise'
import Reviews from '../Components/Reviews'

const Home = () => {
  return (
    <>
        <Hero/>
        <About/>
        <Expertise/>
        <Reviews/>
    </>

  )
}

export default Home