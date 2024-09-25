import { ApexOptions } from "apexcharts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface CategoryPercentage {
  category: string;
  percentage: string;
}

const ChartThree: React.FC = () => {
  const [categoryPercentages, setCategoryPercentages] = useState<CategoryPercentage[]>([]);

  useEffect(()=> {
    const getCategoryPercentages = async () => {
      try {
        const { data } = await axios.get<CategoryPercentage[]>("http://localhost:8000/api/v1/checkout/getProductCategory", {withCredentials: true})
        setCategoryPercentages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryPercentages();
  }, []);

  const chartOptions : ApexOptions = {
    chart: {
        type: 'pie'
    },
    // colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
    labels: categoryPercentages.map((categoryPercentage) => categoryPercentage.category),
    plotOptions: {
      pie: {
        donut: {
          size: "40%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const chartSeries = categoryPercentages.map((categoryPercentage) => parseFloat(categoryPercentage.percentage))

  useEffect(()=>{
    console.log(chartSeries);
  })

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Product Category
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={350} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
