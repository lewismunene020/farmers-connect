import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import SideBar from "./SideBar";
import ReportService from "../../services/ReportService";
import OrderService from "../../services/OrderService";

const DemandByMonth = () => {
  const [chartData, setChartData] = useState([]);
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(3);

  // lets load  the  products

  useEffect(() => {
    OrderService.getProducts()
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (productId === null || productId === "" || productId === undefined) {
      console.log("No product selected");
      return;
    }
    ReportService.getDemandByMonthOfTheYear(productId).then((res) => {
      let data = res.data;
      if (data) {
        let chartSeriesData = data.map((item) => item.count);
        setSeries({
          name: "Orders",
          data: chartSeriesData,
        });

        let chartOptions = {
          chart: {
            type: "bar",
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        };
        setOptions(chartOptions);
      }
    });
  }, [productId]);

  useEffect(() => {
    console.log("Chart series data", series);
    console.log("Chart options", options);
  }, [series, options]);
  const handleProductChange = (productId) => {
    // const selectedProduct = products.filter(
    //   (product) => product.product_id === productId
    // );
    // console.log(selectedProduct);
    setProductId(productId);
  };

  const handleOnSubmit = () => {};

  return (
    <div id="content">
      <div className="container">
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Demand By Month</li>
          </ul>
        </div>
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <div className="box">
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label htmlFor="product_id">Select Product</label>
                <select
                  className="form-control"
                  id="product_id"
                  name="product_id"
                  value={productId}
                  onChange={(e) => {
                    handleProductChange(e.target.value);
                  }}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.product_name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="box">
            <h3>Demand By Month of the Year</h3>
            {series && (
              <Chart
                options={options}
                series={series}
                type="bar"
                height={350}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandByMonth;
