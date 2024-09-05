import React from "react";
import Slider from "react-slick";
import Image1 from '../assets/home-slide-1.png';
import Image2 from '../assets/home-slide-2.png';
import Image3 from '../assets/home-slide-3.png';
import Button from "./Shared/Button";

const heroData = [
    {
        id:1,
        img: Image1,
        subtitle: "Healthy Dryfruit",
        title: "Makes Life",
        title2: "Wealthy",
    },
    {
        id:2,
        img: Image2,
        subtitle: "Need Spices?",
        title: "We Have",
        title2: "It Too!",
    },
    {
        id:3,
        img: Image3,
        subtitle: "Morning Breakfast?",
        title: "Have A",
        title2: "Namkeen!",
    },
]

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true
  };
  return (
    <div className="container">
        <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] bg-gray-300 flex justify-center items-center">
            <div className="container pb-8 sm:pb-0">
            <Slider {...settings}>
                {
                    heroData.map(data=>(
                        <div key={data.id}>
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <div className="flex flex-col justify-center pt-12 gap-4 sm:pl-3 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                                    <h1 className="text-2xl sm:text-xl lg:text-3xl font-bold">{data.subtitle}</h1>
                                    <h1 className="text-5xl sm:text-6xl lg:text-5xl font-bold">{data.title}</h1>
                                    <h1 className="text-5xl uppercase text-white sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold">{data.title2}</h1>
                                    <div>
                                        <Button text={"Shop Now"} to={"/products"}/>
                                    </div>
                                </div>
                                <div className="order-1 sm:order-2">
                                    <div>
                                        <img src={data.img} alt="image1" className="w-[400px] sm:w-[450px] h-[400px] sm:h-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            </div>
        </div>
    </div>
  );
}

export default Hero