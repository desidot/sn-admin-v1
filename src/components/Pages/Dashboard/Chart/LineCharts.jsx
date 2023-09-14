import React, { useEffect, useState } from "react";
import "./LineCharts.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { APIBASE } from "../../../auth/apiConfig";

const data = [
  { name: "Jan", sales: 0 },
  { name: "Feb", sales: 0 },
  { name: "Mar", sales: 0 },
  { name: "Apr", sales: 0 },
  { name: "May", sales: 0 },
  { name: "Jun", sales: 0 },
  { name: "Jul", sales: 0 },
  { name: "Aug", sales: 0 },
  { name: "Sep", sales: 0 },
  { name: "Oct", sales: 0 },
  { name: "Nov", sales: 0 },
  { name: "Dec", sales: 0 },
];

const LineCharts = () => {
  const [newData, setNewData] = useState(data);
  const [list, setList] = useState([]);

  const getGraphData = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-month-sale-count`);
      setList(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getGraphData();
  }, []);
  const getMonth = (num) => {
    if (num === 1) {
      return "Jan";
    } else if (num === 2) {
      return "Fev";
    } else if (num === 3) {
      return "Mar";
    } else if (num === 4) {
      return "Apr";
    } else if (num === 5) {
      return "May";
    } else if (num === 6) {
      return "Jun";
    } else if (num === 7) {
      return "Jul";
    } else if (num === 8) {
      return "Aug";
    } else if (num === 9) {
      return "Sep";
    } else if (num === 10) {
      return "Oct";
    } else if (num === 11) {
      return "Nov";
    } else if (num === 12) {
      return "Dec";
    }
  };
  useEffect(() => {
    // const fil = list?.map((elem, index) => ({
    //   name: getMonth(elem.month),
    //   sales: elem.total_sales,
    // }));
    // setNewData(fil);

    let n = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < list.length; j++) {
        if (getMonth(list[j].month) == data[i].name) {
          data[i].sales = +list[j].total_sales;
        }
      }
      n.push(data[i]);
    }

    setNewData(n);
  }, [list]);

  return (
    <>
      <div className="chart-bg p-3">
        <h3 className="card-title">Sale Monthly</h3>
        <hr />
        <div style={{ marginLeft: "-25px" }}>
          {" "}
          {/* Apply the marginLeft style here */}
          <ResponsiveContainer height={350} width="100%">
            <LineChart width={100} height={100} data={newData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#008000"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default LineCharts;
