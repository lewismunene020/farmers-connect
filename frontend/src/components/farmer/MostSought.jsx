import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import SideBar from "./SideBar";
import ReportService from "../../services/ReportService";

const MostSoughtProducts = () => {
  const [chartData, setChartData] = useState([]);
  const [options, setOptions] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    ReportService.getMostOrdered().then((res) => {
      let data = res.data;
      if (data) {
        let pieChartData = data.map((item) => ({
          x: item.product_name,
          y: item.count,
        }));
        setChartData(pieChartData);
        let chartOptions = {
          labels: pieChartData.map((item) => item.x),
        };
        // console.log(chartOptions);
        setOptions(chartOptions);
      }
    });
  }, []);

  return (
    <div id="content">
      <div className="container">
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Most Sought</li>
          </ul>
        </div>
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <div className="box">
            <h3>Most Sought Products</h3>
            {chartData.length > 0 && (
              <Chart
                options={options}
                series={chartData.map((item) => item.y)}
                type="pie"
                width="600"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostSoughtProducts;
