"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface SalesData {
  date: string;
  sales: number;
}

const ChartTwo: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  useEffect(() => {
    const getSalesData = async () => {
      try {
        const { data } = await axios.get<SalesData[]>(
          "http://localhost:8000/api/v1/checkout/getSalesData",
          { withCredentials: true },
        );
        setSalesData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSalesData();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: salesData.map((day) => day.date),
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Total Sales",
      },
    },
    title: {
      text: "Sales for the Last 5 Days",
      align: "left",
      style: {
        color: "white",
      },
    },
  };

  const chartSeries = [
    {
      name: "Sales",
      data: salesData.map((day) => day.sales),
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Profit this week
          </h4>
        </div>
      </div>
      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
