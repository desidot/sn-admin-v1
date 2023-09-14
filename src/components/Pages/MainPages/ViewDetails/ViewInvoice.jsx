import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid,
  TableCell,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css";
// import ProductImage from "../../../../assets/products/sample-product-bone.png";
import CompanyLogo from "../../../../assets/shopnmac-logo.png";

// import { useReactToPrint } from "react-to-print";
import InvoicePreview from "./InvoicePreview/InvoincePreview";
import axios from "axios";
import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";

const ViewInvoiceDetails = () => {
  const search = useParams();
  const [order, setOrder] = useState({});
  const [billAdd, setBillAdd] = useState({});
  const [shipAdd, setShipAdd] = useState({});
  const [listItems, setListItems] = useState([]);

  // const generatePrint = useReactToPrint({
  //   // content: () => PrintInv.current,
  //   // documentTitle: "INVOICE",
  //   // onAfterPrint: () => "Invoice generated",

  // });
  const generatePrint = () => {
    if (order?.invoice_pdf) {
      let pdfWindow = window.open(`${IMAGEURL}${order?.invoice_pdf}`, "_blank");
      pdfWindow.onload = () => {
        pdfWindow.print();
        pdfWindow.close();
      };
    }
  };

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const res = await axios.get(
          `${APIBASE}admin/get-order-by-id/${search.id}`
        );
        setOrder(res.data.data);
      } catch (error) {
        //console.log(error);
      }
    };

    getOrderDetail();
  }, []);
  function getNormalDateAndTime(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const normalDate = `${year}-${month}-${day}`;
    const normalTime = `${hours}:${minutes}:${seconds}`;

    return {
      normalDate,
      normalTime,
    };
  }
  useEffect(() => {
    if (order?.billing_address && order?.shipping_address) {
      setBillAdd(JSON.parse(order?.billing_address));
      setShipAdd(JSON.parse(order?.shipping_address));
      setListItems(order?.items);
    }
  }, [order]);

  return (
    <div className="order-details-main-container">
      <div className="card-header">
        <h4 className="card-title">
          Invoice <span style={{ color: "#0000FF" }}>{order?.order_no}</span>
        </h4>
        {/* Buttons */}
        <div className="tabs-butons">
          <Link to={`/admin/Admin/view-order-details/${search?.id}`}>
            <Button variant="contained">Details</Button>
          </Link>
          <Button variant="contained" style={{ backgroundColor: "#1976d2" }}>
            Invoice
          </Button>
          <Link to={`/admin/Admin/view-and-update-status/${search?.id}`}>
            <Button variant="contained">Status</Button>
          </Link>
          <Link to={`/admin/Admin/view-and-take-notes/${search?.id}`}>
            <Button variant="contained">Notes</Button>
          </Link>
          {/* <Button variant="contained">Notes</Button> */}
        </div>
        {/* Buttons End*/}
      </div>
      <br />
      <div className="filter-container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div className="company-logo">
              <img src={CompanyLogo} alt="MainLogo" />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="view-payment-details">
              <p>
                Northshore Medical & Aesthetics Center, P.O. Box HM1839,
                Hamilton HMGX, Bermuda, info@nmac.bm, +1(441)293-5476,
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              Invoice Date :{" "}
              {getNormalDateAndTime(order?.invoice_date)?.normalDate}
            </p>
            <p>Terms : Due on Receipt</p>
          </Grid>
          <Grid item xs={12} md={4}>
            <br />
            <div className="view-payment-details">
              <h5>Bill to: </h5>
              <span>
                <p>
                  Name:{" "}
                  {billAdd?.name
                    ? billAdd?.name
                    : billAdd?.first_name + " " + billAdd?.last_name}
                </p>
              </span>
              <span>
                <p>Email: {billAdd?.email}</p>
              </span>
              <span>
                <p>Phone: {billAdd?.phone}</p>
              </span>
              <span>
                <p>
                  Address: {billAdd?.address ? billAdd?.address : ""}{" "}
                  {billAdd?.flat_apartment ? "," + billAdd?.flat_apartment : ""}{" "}
                  {billAdd?.street ? "," + billAdd?.street : ""}{" "}
                  {billAdd?.zip ? "," + billAdd?.zip : ""}{" "}
                  {billAdd?.city ? "," + billAdd?.city : ""}{" "}
                  {billAdd?.state ? "," + billAdd?.state : ""}
                </p>
              </span>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <br />
            {!order?.pickup_order ? (
              !order.in_store ? (
                <div className="view-payment-details">
                  <h5>Ship to: </h5>
                  <span>
                    <p>
                      Name:{" "}
                      {shipAdd?.name
                        ? shipAdd?.name
                        : shipAdd?.first_name + " " + shipAdd?.last_name}
                    </p>
                  </span>
                  <span>
                    <p>Email: {shipAdd?.email}</p>
                  </span>
                  <span>
                    <p>Phone: {shipAdd?.phone}</p>
                  </span>
                  <span>
                    <p>
                      Address: {shipAdd?.address ? shipAdd?.address : ""}{" "}
                      {shipAdd?.flat_apartment
                        ? "," + shipAdd?.flat_apartment
                        : ""}{" "}
                      {shipAdd?.street ? "," + shipAdd?.street : ""}{" "}
                      {shipAdd?.zip ? "," + shipAdd?.zip : ""}{" "}
                      {shipAdd?.city ? "," + shipAdd?.city : ""}{" "}
                      {shipAdd?.state ? "," + shipAdd?.state : ""}
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  <h5>In Store Order </h5>
                </div>
              )
            ) : (
              <div>
                <h5>Pickup Order </h5>
                <span>{order?.pickup_address} </span>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <br />
            <p>Invoice: {order?.invoice_no}</p>
            <p>Order No.: {order?.order_no}</p>
          </Grid>
          <div>
            <br /> <br />
          </div>
        </Grid>
        <br />
        <div className="orders-container2">
          <div className="order-entries">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="apply-border">Photo</TableCell>
                    <TableCell className="apply-border">Product</TableCell>
                    <TableCell className="apply-border">Category</TableCell>
                    <TableCell className="apply-border">Brand</TableCell>
                    <TableCell className="apply-border">Price</TableCell>
                    <TableCell className="apply-border">Qty</TableCell>
                    <TableCell className="apply-border">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listItems?.map((row, index) => (
                    <TableRow>
                      <TableCell>
                        <div className="blog-img">
                          <img
                            src={`${IMAGEURL}${row?.product?.thumbnail}`}
                            alt="ProductImage"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{row?.product?.product_name}</TableCell>
                      <TableCell>{row?.product?.category?.name}</TableCell>
                      <TableCell>{row?.product?.brand?.name}</TableCell>
                      <TableCell>${row?.price}</TableCell>
                      <TableCell>{row?.quantity}</TableCell>
                      <TableCell>${row?.sub_total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <br />
          <div className="order-entries3">
            <TableContainer>
              <Table style={{ width: "100%" }}>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: "bold", width: "50%" }}
                      className="apply-border"
                    >
                      Sub Total:
                    </TableCell>
                    <TableCell
                      style={{ width: "50%" }}
                      className="apply-border"
                    >
                      ${order?.sub_total}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: "bold", width: "50%" }}
                      className="apply-border"
                    >
                      Shipping:
                    </TableCell>
                    <TableCell
                      style={{ width: "50%" }}
                      className="apply-border"
                    >
                      ${order?.shipping_charge}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: "bold", width: "50%" }}
                      className="apply-border"
                    >
                      Coupon:
                    </TableCell>
                    <TableCell
                      style={{ width: "50%" }}
                      className="apply-border"
                    >
                      ${order?.coupon_discount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: "bold", width: "50%" }}
                      className="apply-border"
                    >
                      Total:
                    </TableCell>
                    <TableCell
                      style={{ width: "50%" }}
                      className="apply-border"
                    >
                      ${order?.grand_total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      {/* Submit button */}
      <div className="button-div-invoice">
        <div
          className="add-product-save-btn2"
          style={{ padding: "1rem", cursor: "pointer" }}
          variant="contained"
          onClick={generatePrint}
        >
          Print
        </div>
      </div>
      <div className="invoice-print-preview">
        <InvoicePreview />
      </div>
    </div>
  );
};

export default ViewInvoiceDetails;
