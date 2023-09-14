import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";
import { Link } from "react-router-dom";

const TopLowStocks = ({ lowStockProducts }) => {
  const columns = ["Product", "Current Stock Qty"];

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Low Stocks Products(10)</h3>
          <Link to="/admin/ProductManager/Inventory/low-stock" className="bt">Low Stocks</Link>
        </div>
        <div className="main-body2">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ background: "#444444" }}>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#FFFFFF" }}
                  >
                    #
                  </TableCell>
                  {columns.map((column, index) => (
                    <TableCell
                      align="left"
                      key={index}
                      style={{ fontFamily: "Poppins", color: "#FFFFFF" }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {lowStockProducts?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">
                      <img
                        style={{
                          width: "50px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                        src={`${IMAGEURL}${row.thumbnail}`}
                      />
                      {row.product_name}
                    </TableCell>

                    <TableCell align="left">{row.quantity}</TableCell>
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

export default TopLowStocks;
