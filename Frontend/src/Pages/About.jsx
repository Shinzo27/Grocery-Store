import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const About = () => {
  return (
    <>
        <div>
        <section class="bg-white dark:bg-gray-900">
            <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Very famous dryfruit seller for retail and wholesale!</h2>
                    <p class="mb-4">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
                    <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <img class="w-full rounded-lg" src="https://images.picxy.com/cache/2019/5/1/33a6231e0cee8d1a82c8caa49c81a9ba.jpg" alt="office content 1"/>
                    <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://media.istockphoto.com/id/183803376/photo/mixed-nuts-and-dried-fruits.jpg?s=612x612&w=0&k=20&c=C7BlDHRlNQMTCMrAWcCg59PaA18bAuGXVcU0estWhGY=" alt="office content 2"/>
                </div>
            </div>
        </section>
        </div>
    </>
  )
}

export default About