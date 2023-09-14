import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  TableContainer,
  Button,
  Grid,
  Paper,
  // Link,
} from "@mui/material";

import "./MainPopup.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import productImage from "../../../../assets/products/sample-product-bone.png";
import axios from "axios";
import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";
import { Link } from "react-router-dom";

const MainPopup = ({ onSave, onCancel }) => {
  const [reminders, setReminders] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  const [expiredStock, setExpiredStock] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [backOrders, setBackOrders] = useState([]);
  const [stockOutProducts, setStockOutProducts] = useState([]);
  const data = [
    { name: "Product 1", quantity: 10 },
    { name: "Product 2", quantity: 20 },
    { name: "Product 3", quantity: 15 },
    { name: "Product 1", quantity: 10 },
    { name: "Product 2", quantity: 20 },
    // Add more data as needed
  ];
  useEffect(() => {
    getReminders();
    getExpiringSoon();
    getExpiredStock();
    getLowStockProducts();
    getBackOrders();
    getStockOutProducts();
  }, []);

  const getStockOutProducts = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/getStockOutProducts`);
      setStockOutProducts(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };

  const getBackOrders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/getBackOrder`);
      setBackOrders(res.data.product_sales);
    } catch (error) {
      //console.log(error);
    }
  };

  const getLowStockProducts = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-low-stock-product`);
      setLowStockProducts(res.data.products);
      //console.log("low stocks",res.data.products);
    } catch (error) {
      //console.log(error);
    }
  };

  const getExpiredStock = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-expired-stock`);
      setExpiredStock(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  // get reminder

  const getReminders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-reminders`);
      setReminders(res.data);
    } catch (error) {
      //console.log(error);
    }
  };
  // get expiringSoon

  const getExpiringSoon = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-expiring-soon-product/5`
      );
      setExpiringSoon(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content3">
        <div className="filter-head">
          <Typography variant="h1">Quick Updates</Typography>
          <IconButton onClick={onCancel} varient="rounded">
            <CloseOutlinedIcon />
          </IconButton>
        </div>
        <div className="orders-container-main" style={{ overflowY: "auto" }}>
          <div className="order-entries-popup">
            <Grid container spacing={2}>
              {/* First Row */}
              <Grid item md={6} xs={12}>
                <div className="popup-headers-main">
                  <Typography variant="h6">Emergency / Low Stock</Typography>
                  {/* View All Link */}
                  <Link to="/admin/ProductManager/Inventory/low-stock">
                    <p>View All</p>
                  </Link>
                </div>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Qty</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lowStockProducts?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {/* <img
                                src={
                                  JSON.parse(item.thumbnail_compress)
                                    .image_urls["100px"]
                                }
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  marginRight: "10px",
                                }}
                                alt={item?.name}
                              /> */}
                              {item?.thumbnail_compress ? (
                                <img
                                  src={
                                    JSON.parse(item.thumbnail_compress)
                                      .image_urls["100px"]
                                  }
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "10px",
                                  }}
                                  alt="User"
                                />
                              ) : (
                                  <img
                                    src={`${IMAGEURL}${item.thumbnail}`}
                                    alt="Default User"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      marginRight: "10px",
                                    }}
                                  />
                              )}
                              {item.product_name}
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="popup-headers-main">
                  <Typography variant="h6">Expired Medicine </Typography>
                  {/* View All Link */}
                  <Link to="/admin/ProductManager/Inventory/expired-stocks">
                    <p>View All</p>
                  </Link>
                </div>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Qty</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {expiredStock?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <img
                                src={`${IMAGEURL}${item.thumbnail}`}
                                alt={item.name}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  marginRight: "10px",
                                }}
                              />
                              {item.product_name}
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>

              {/* Second Row */}
              <Grid item md={6} xs={12}>
                <div className="popup-headers-main">
                  <Typography variant="h6">Expiring Soon </Typography>
                  {/* View All Link */}
                  <Link to="/admin/ProductManager/Inventory/expiring-soon">
                    <p>View All</p>
                  </Link>
                </div>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Qty</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {expiringSoon?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <img
                                src={`${IMAGEURL}${item.thumbnail}`}
                                alt={item.name}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  marginRight: "10px",
                                }}
                              />
                              {item.product_name}
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>

              <Grid item md={6} xs={12}>
                <div className="popup-headers-main">
                  <Typography variant="h6">Stock Out</Typography>
                  {/* View All Link */}
                  <Link to="/admin/ProductManager/Inventory/stockout-products">
                    <p>View All</p>
                  </Link>
                </div>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stockOutProducts?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <img
                                src={`${IMAGEURL}${item.thumbnail}`}
                                alt={item.product_name}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  marginRight: "15px",
                                }}
                              />
                              {item.product_name}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>

              {/* Third Row */}
              <Grid item md={6} xs={12}>
                <div className="popup-headers-main">
                  <Typography variant="h6">Back Order</Typography>
                  {/* View All Link */}
                  <Link to="/admin/Sales/back-orders?page=1">
                    <p>View All</p>
                  </Link>
                </div>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Qty</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {backOrders.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <img
                                src={`${IMAGEURL}${item.thumbnail}`}
                                alt={item.name}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  marginRight: "10px",
                                }}
                              />
                              {item.product_name}
                            </TableCell>
                            <TableCell>{item.total_quantity_sold}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="popup-headers-main">
                  <Typography variant="h6"> Reminder </Typography>
                  {/* View All Link */}
                  <Link to="/admin/miscellaneous/tasks">
                    <p>View All</p>
                  </Link>
                </div>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reminders?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.task_name}</TableCell>
                            <TableCell>
                              {item.status ? "Completed" : "Process"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
            <div
              className="add-edit-stocks-button"
              style={{ justifyContent: "flex-end" }}
            >
              {/* <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button> */}
              <Button
                variant="contained"
                onClick={onCancel}
                style={{ background: "#FF4961", float: "right" }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPopup;
