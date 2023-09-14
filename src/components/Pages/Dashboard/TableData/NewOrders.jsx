import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  // Paper,
  // Button,
} from "@mui/material";
import UserImg from "../../../../assets/products/spray-product.jpg";
import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";
import { Link } from "react-router-dom";

const NewOrder = ({ newOrders }) => {
  const columns = ["Item", "Date", "Quantity", "Amount"];
  const data = [
    {
      image: UserImg,
      product: "Skin Refining Masque",
      Date: "Jul 25 2023",
      quantity: "1",
      Amount: "$60.05",
    },
    {
      image: UserImg,
      product: "Skin Refining Masque",
      Date: "Jul 25 2023",
      quantity: "1",
      Amount: "$60.05",
    },
    {
      image: UserImg,
      product: "Skin Refining Masque",
      Date: "Jul 25 2023",
      quantity: "1",
      Amount: "$60.05",
    },
    {
      image: UserImg,
      product: "Skin Refining Masque",
      Date: "Jul 25 2023",
      quantity: "1",
      Amount: "$60.05",
    },
    {
      image: UserImg,
      product: "Skin Refining Masque",
      Date: "Jul 25 2023",
      quantity: "1",
      Amount: "$60.05",
    },
    // Add more data rows here
  ];
  function formatDateToDayMonthYear(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">New Order</h3>
          <Link to="/admin/Sales/all-orders">
            <Button
              style={{
                background: "#FF4961",
                color: "#FFFFFF",
                fontSize: "14px",
                textTransform: "capitalize",
                borderRadius: "20px",
                height: "2rem",
                width: "100px",
              }}
            >
              View All
            </Button>
          </Link>
        </div>
        <div className="main-body2">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                // style={{ background: "#444444" }}
                >
                  <TableCell style={{ fontFamily: "Poppins" }}>#</TableCell>
                  {columns.map((column, index) => (
                    <TableCell key={index} style={{ fontFamily: "Poppins" }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {newOrders?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={`${IMAGEURL}${row.thumbnail}`}
                        alt="user"
                        style={{
                          width: "40px",
                          height: "40px",

                          marginRight: "2rem",
                        }}
                      />
                      {row.product_name}
                    </TableCell>
                    <TableCell>
                      {formatDateToDayMonthYear(row.created_at)}
                    </TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell>${row.sub_total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <br />
    </>
  );
};

export default NewOrder;
