import React from "react";
import blogImg1 from "../assets/blog-img-1.jpg";
import blogImg2 from "../assets/blog-img-2.jpg";
import blogImg3 from "../assets/blog-img-3.jpeg";

const reviewData = [
  {
    id: 1,
    img: blogImg1,
    customerName: "Pratham Patel",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut hic voluptates labore quod perferendis dolores nobis veniam, praesentium quaerat quam, libero dolorem temporibus nihil natus facere deleniti nam excepturi modi.",
  },
  {
    id: 2,
    img: blogImg2,
    customerName: "Het Desai",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut hic voluptates labore quod perferendis dolores nobis veniam, praesentium quaerat quam, libero dolorem temporibus nihil natus facere deleniti nam excepturi modi.",
  },
  {
    id: 3,
    img: blogImg3,
    customerName: "Praveen Prajapati",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut hic voluptates labore quod perferendis dolores nobis veniam, praesentium quaerat quam, libero dolorem temporibus nihil natus facere deleniti nam excepturi modi.",
  },
];

const Reviews = () => {
  return (
    <>
      <div className="container pt-16">
        <div className="">
          <div className="flex justify-center items-center">
            <h1 className=" text-3xl font-semibold font-Dosis">Reviews</h1>
          </div>
          <div className="lg:flex lg:items-center lg:justify-center gap-10 p-5">
            {reviewData.map((data) => (
              <div key={data.id}>
                <div className="flex items-center justify-center gap-16 font-Dosis pt-5">
                  <div className="p-5 rounded-lg bg-gray-200 text-black">
                    <div className="flex justify-center items-center w-80 h-60">
                      <img src={data.img} alt="" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="text-lg pt-4 flex justify-center items-center font-semibold">
                      {data.customerName}
                    </div>
                    <div className="text-md text-clip w-80 font-medium flex justify-center items-center pt-3 text-justify text-gray-700">
                      {data.review}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
