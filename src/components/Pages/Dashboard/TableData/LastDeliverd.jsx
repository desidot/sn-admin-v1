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
import { Link } from "react-router-dom";

const LastDeliverd = ({lastDelivered}) => {
  //   const columns = ["Last Delivered"];

 
  function formatDateToDayMonthYear(dateString) {
    const dateObject = new Date(dateString);
  
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const year = dateObject.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  const mapped=lastDelivered?.map((elem)=>({name:JSON.parse(elem.shipping_address).first_name?(JSON.parse(elem.shipping_address).first_name+" "+JSON.parse(elem.shipping_address).last_name):(JSON.parse(elem.shipping_address).name),Date:formatDateToDayMonthYear(elem.invoice_date) ,Phone:JSON.parse(elem.shipping_address).phone,id:elem.id }))

  const data = [
    {
      image: UserImg,
      name: "Users Name",
      Date: "Jul 25 2023",
      Phone: "1984949984",
    },
    {
      image: UserImg,
      name: "Users Name",
      Date: "Jul 25 2023",
      Phone: "1984949984",
    },
    {
      image: UserImg,
      name: "Users Name",
      Date: "Jul 25 2023",
      Phone: "1984949984",
    },
    {
      image: UserImg,
      name: "Users Name",
      Date: "Jul 25 2023",
      Phone: "1984949984",
    },
    // Add more data rows here
  ];

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Last Delivered</h3>
          {/* <Button
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
          </Button> */}
        </div>
        <div className="main-body2">
          <TableContainer>
            <Table>
              <TableHead>
                {/* <TableRow
                >
                  <TableCell style={{ fontFamily: "Poppins" }}>#</TableCell>
                  {columns.map((column, index) => (
                    <TableCell key={index} style={{ fontFamily: "Poppins" }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow> */}
              </TableHead>
              <TableBody>
                {mapped?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    {/* <TableCell>
                      {row.product}
                      <img
                        src={row.image}
                        alt="user"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginLeft: "2rem",
                        }}
                      />
                    </TableCell> */}
                    <TableCell style={{ fontSize: "12px", color: "gray" }}>
                      Name: {row.name}
                      <br />
                      Phone:{row.Phone}
                      <br />
                      Date: {row.Date}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/admin/Admin/view-order-details/${row.id}`}
                        style={{
                          background: "#FFFFFF",
                          color: "lightgreen",
                          fontSize: "14px",
                          padding:"10px 15px",
                          textTransform: "capitalize",
                          borderRadius: "5px",
                        //   width: "80px",
                          border: "1px solid lightgreen",
                        }}
                      >
                        Order Details
                      </Link>
                    </TableCell>
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

export default LastDeliverd;
