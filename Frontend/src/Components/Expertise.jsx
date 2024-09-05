import React from "react";
import foodImg1 from "../assets/food-img-1.png";
import foodImg2 from "../assets/food-img-2.png";
import foodImg3 from "../assets/food-img-3.png";
import Slider from "react-slick";

const expertiseData = [
  {
    id: 1,
    img: foodImg1,
    title: "Cashew",
    price: "₹670/Kg",
  },
  {
    id: 2,
    img: foodImg2,
    title: "Walnuts",
    price: "₹670/Kg",
  },
  {
    id: 3,
    img: foodImg3,
    title: "Almonds",
    price: "₹670/Kg",
  },
];

const Expertise = () => {
  return (
    <>
      <div className="container pt-10">
        <div className="flex justify-center items-center pb-8">
          <h1 className="text-4xl font-semibold font-Dosis">Our Expertise!</h1>
        </div>
        <div className="lg:flex lg:items-center lg:justify-center gap-16 font-Dosis font-semibold">
          {
            expertiseData.map((data) => (
              <div key={data.id}>
                <div className="flex justify-center items-center gap-16 pt-8">
                  <div className="p-8 rounded-lg bg-gray-100 text-black">
                    <div className="flex justify-center items-center">
                      <img src={data.img} alt="" className=" w-52 rounded-lg" />
                    </div>
                    <div className="text-lg text-clip w-60 pt-4 flex justify-center items-center">
                      {data.title}
                    </div>
                    <div className="text-md font-medium flex justify-center items-center text-yellow-700">
                      {data.price}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Expertise;
