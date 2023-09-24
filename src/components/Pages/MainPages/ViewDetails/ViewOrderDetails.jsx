import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  FormControl,
  TableCell,
  //   Typography,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";

import "./OrderDetails.css";

import PrintIcon from "@mui/icons-material/Print";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";

const ViewOrderDetails = () => {
  const search = useParams();
  const [order, setOrder] = useState({});
  const [billAdd, setBillAdd] = useState({});
  const [shipAdd, setShipAdd] = useState({});
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const res = await axios.get(
          `${APIBASE}admin/get-order-by-id/${search?.id}`
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

  const [brandValue, setShippingValue] = useState("");
  const [supplierValue, setPaymentValue] = useState("");

  // Define dynamic menu items
  const shippingOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "pending", label: "Pending Order" },
    { value: "confirm", label: "Ready for Collection" },
    { value: "collected", label: "Collected" },
    { value: "pickedup", label: "Shipped" },
    { value: "delivered", label: "Delivered Orders" },
  ];

  const supplierOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Unpaid" },
  ];

  ////console.log(order);

  ////console.log(billAdd, shipAdd);
  const generatePrint = () => {
    if (order.invoice_pdf) {
      let pdfWindow = window.open(`${IMAGEURL}${order?.invoice_pdf}`, "_blank");
      pdfWindow.onload = () => {
        pdfWindow.print();
        pdfWindow.close();
      };
    }
  };
  return (
    <>
      <div className="order-details-main-container">
        <div className="card-header">
          <h3 className="card-title">
            Order <span style={{ color: "#0000FF" }}>{order?.order_no}</span>
          </h3>
          {/* Buttons */}
          <div className="tabs-butons">
            <Button variant="contained" style={{ backgroundColor: "#1976d2" }}>
              Details
            </Button>
            <Link to={`/admin/Admin/view-invoice-details/${search?.id}`}>
              <Button variant="contained">Invoice</Button>
            </Link>
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
            {/* <Grid item xs={12} md={3}>
              <InputLabel htmlFor="">Fulfilment status :</InputLabel>
              <FormControl fullWidth>
                <TextField placeholder="Fulfilment status" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="">Payment status:</InputLabel>
              <FormControl fullWidth>
                <TextField placeholder="Payment status" />
              </FormControl>
            </Grid> */}
            {/* <Grid item xs={12} md={3}> */}
            {/* <InputLabel>Payment Method :</InputLabel> */}
            {/* <FormControl fullWidth>
                <InputLabel htmlFor="shipping">
                  Select Payment Method
                </InputLabel>
                <Select
                  id="shipping"
                  name="shipping"
                  value={brandValue}
                  onChange={(e) => setShippingValue(e.target.value)}
                >
                  {shippingOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            {/* <div className="view-payment-details">
                <br />
                <span>
                  <h6>Payment By: </h6> <p> Authorize.net</p>
                </span>
                <span>
                  <h6>Transaction ID: </h6> <p> 49684984</p>
                </span>
                <span>
                  <h6> Amount: </h6> <p> $ 15</p>
                </span>
                <span>
                  <h6>Date: </h6> <p> JUl 01, 2023</p>
                </span>
              </div> */}
            {/* </Grid> */}
            {/* <br /> <br /> */}
            {/* <Grid item xs={12} md={3}> */}
            {/* <InputLabel htmlFor="">Shipping Method :</InputLabel> */}
            {/* <FormControl fullWidth>
                <InputLabel htmlFor="">Select Shipping Method</InputLabel>
                <Select
                  id="supplier"
                  name="supplier"
                  value={supplierValue}
                  onChange={(e) => setPaymentValue(e.target.value)}
                >
                  {supplierOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            {/* <div className="view-payment-details">
                <br />
                <span>
                  <h6>Tracking Code: </h6>
                  <p> </p>
                </span>
                <span>
                  <h6>Picked Up By: </h6>
                  <p> </p>
                </span>
                <span>
                  <h6> Expected Date: </h6>
                  <p> </p>
                </span>
              </div> */}
            {/* </Grid> */}
            {/* <div className="partition">
              <br /> <br />
            </div> */}
            <Grid item xs={12} md={3}>
              <br /> <br />
              <div className="view-payment-details2">
                <span>
                  <h6> Order :</h6>
                  <p id="order-id"> {order?.order_no}</p>
                </span>
                <span>
                  <h6> Order Type :</h6>
                  <p id="order-id"> {order?.order_type}</p>
                </span>
                <span>
                  <h6> Order status :</h6>
                  <p id="test-orange"> {order?.order_status}</p>
                </span>
                <span>
                  <h6> Order date :</h6>
                  <p>
                    {getNormalDateAndTime(order?.created_at).normalDate} ,
                    {getNormalDateAndTime(order?.created_at).normalTime}
                  </p>
                </span>
                <span>
                  <h6> Total amount : </h6>
                  <p> $ {order?.grand_total}</p>
                </span>
                <span>
                  <h6> Payment method : </h6>
                  <p> {order?.payment_method}</p>
                </span>
                <span>
                  <h6> Back Order : </h6>
                  <p>{order?.back_order == 2 ? "Yes" : "No"}</p>
                </span>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <br /> <br />
              <div className="view-payment-details">
                <h5>Billing: </h5>
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
                    {billAdd?.flat_apartment
                      ? "," + billAdd?.flat_apartment
                      : ""}{" "}
                    {billAdd?.street ? "," + billAdd?.street : ""}{" "}
                    {billAdd?.zip ? "," + billAdd?.zip : ""}{" "}
                    {billAdd?.city ? "," + billAdd?.city : ""}{" "}
                    {billAdd?.state ? "," + billAdd?.state : ""}
                  </p>
                </span>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <br /> <br />
              {!order?.pickup_order ? (
                !order?.in_store ? (
                  <div className="view-payment-details">
                    <h5>Shipping: </h5>
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
            <Grid item xs={12} md={3}>
              <div className="view-payment-details">
                {/* <h5>Billing: </h5> */}
                <br /> <br />
                <span>
                  <p>
                    <strong>Added by : </strong>
                    {order?.added_by}
                  </p>
                </span>
                <span>
                  <p>
                    <strong>Agent : </strong> {order?.agent?.name}
                  </p>
                </span>
                <br />
                <span>
                  <p>
                    <strong>Note : </strong> {order?.note}
                  </p>
                </span>
              </div>
            </Grid>
            {/* <div className="partition"></div> */}
            <br /> <br />
          </Grid>
          <br />
          <div className="orders-container2">
            <div className="order-entries">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Photo</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Total</TableCell>
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
                      <TableCell style={{ fontWeight: "bold", width: "50%" }}>
                        Sub Total:
                      </TableCell>
                      <TableCell style={{ width: "50%" }}>
                        ${order?.sub_total}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", width: "50%" }}>
                        Shipping:
                      </TableCell>
                      <TableCell style={{ width: "50%" }}>
                        ${order?.shipping_charge}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", width: "50%" }}>
                        Coupon:
                      </TableCell>
                      <TableCell style={{ width: "50%" }}>
                        ${order?.coupon_discount}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", width: "50%" }}>
                        Total:
                      </TableCell>
                      <TableCell style={{ width: "50%" }}>
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
        <div className="add-product-save-btn" style={{ padding: "1rem" }}>
          <div
            className="print-btn-view-invoice"
            variant="contained"
            style={{ cursor: "pointer" }}
            onClick={() => generatePrint()}
          >
            <PrintIcon />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ViewOrderDetails;

// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Select,
//   Button,
//   InputLabel,
//   MenuItem,
//   Grid,
//   FormControl,
//   TableCell,
//   //   Typography,
//   Table,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableContainer,
// } from "@mui/material";

// import "./OrderDetails.css";

// import PrintIcon from "@mui/icons-material/Print";

// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";

// const ViewOrderDetails = () => {
//   const search = useParams();
//   const [order, setOrder] = useState({});
//   const [billAdd, setBillAdd] = useState({});
//   const [shipAdd, setShipAdd] = useState({});
//   const [listItems, setListItems] = useState([]);
//   useEffect(() => {
//     const getOrderDetail = async () => {
//       try {
//         const res = await axios.get(
//           `${APIBASE}admin/get-order-by-id/${search?.id}`
//         );
//         setOrder(res.data.data);
//       } catch (error) {
//         //console.log(error);
//       }
//     };

//     getOrderDetail();
//   }, []);
//   function getNormalDateAndTime(dateString) {
//     const dateObject = new Date(dateString);

//     const year = dateObject.getFullYear();
//     const month = dateObject.getMonth() + 1;
//     const day = dateObject.getDate();
//     const hours = dateObject.getHours();
//     const minutes = dateObject.getMinutes();
//     const seconds = dateObject.getSeconds();

//     const normalDate = `${year}-${month}-${day}`;
//     const normalTime = `${hours}:${minutes}:${seconds}`;

//     return {
//       normalDate,
//       normalTime,
//     };
//   }
//   useEffect(() => {
//     if (order?.billing_address && order?.shipping_address) {
//       setBillAdd(JSON.parse(order?.billing_address));
//       setShipAdd(JSON.parse(order?.shipping_address));
//       setListItems(order?.items);
//     }
//   }, [order]);

//   const [brandValue, setShippingValue] = useState("");
//   const [supplierValue, setPaymentValue] = useState("");

//   // Define dynamic menu items
//   const shippingOptions = [
//     { value: "", label: "Select One" },
//     { value: "all", label: "All" },
//     { value: "pending", label: "Pending Order" },
//     { value: "confirm", label: "Ready for Collection" },
//     { value: "collected", label: "Collected" },
//     { value: "pickedup", label: "Shipped" },
//     { value: "delivered", label: "Delivered Orders" },
//   ];

//   const supplierOptions = [
//     { value: "", label: "Select One" },
//     { value: "all", label: "All" },
//     { value: "Paid", label: "Paid" },
//     { value: "Pending", label: "Unpaid" },
//   ];

//   ////console.log(order);

//   ////console.log(billAdd, shipAdd);
//   const generatePrint = () => {
//     if (order.invoice_pdf) {
//       let pdfWindow = window.open(`${IMAGEURL}${order?.invoice_pdf}`, "_blank");
//       pdfWindow.onload = () => {
//         pdfWindow.print();
//         pdfWindow.close();
//       };
//     }
//   };
//   return (
//     <>
//       <div className="order-details-main-container">
//         <div className="card-header">
//           <h3 className="card-title">
//             Order <span style={{ color: "#0000FF" }}>{order?.order_no}</span>
//           </h3>
//           {/* Buttons */}
//           <div className="tabs-butons">
//             <Button variant="contained" style={{ backgroundColor: "#1976d2" }}>
//               Details
//             </Button>
//             <Link to={`/admin/Admin/view-invoice-details/${search?.id}`}>
//               <Button variant="contained">Invoice</Button>
//             </Link>
//             <Link to={`/admin/Admin/view-and-update-status/${search?.id}`}>
//               <Button variant="contained">Status</Button>
//             </Link>
//             <Link to={`/admin/Admin/view-and-take-notes/${search?.id}`}>
//               <Button variant="contained">Notes</Button>
//             </Link>
//             {/* <Button variant="contained">Notes</Button> */}
//           </div>
//           {/* Buttons End*/}
//         </div>
//         <br />
//         <div className="filter-container">
//           <Grid container spacing={2}>
//             {/* <Grid item xs={12} md={3}>
//               <InputLabel htmlFor="">Fulfilment status :</InputLabel>
//               <FormControl fullWidth>
//                 <TextField placeholder="Fulfilment status" />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <InputLabel htmlFor="">Payment status:</InputLabel>
//               <FormControl fullWidth>
//                 <TextField placeholder="Payment status" />
//               </FormControl>
//             </Grid> */}
//             <Grid item xs={12} md={3}>
//               {/* <InputLabel>Payment Method :</InputLabel> */}
//               {/* <FormControl fullWidth>
//                 <InputLabel htmlFor="shipping">
//                   Select Payment Method
//                 </InputLabel>
//                 <Select
//                   id="shipping"
//                   name="shipping"
//                   value={brandValue}
//                   onChange={(e) => setShippingValue(e.target.value)}
//                 >
//                   {shippingOptions.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl> */}

//               {/* <div className="view-payment-details">
//                 <br />
//                 <span>
//                   <h6>Payment By: </h6> <p> Authorize.net</p>
//                 </span>
//                 <span>
//                   <h6>Transaction ID: </h6> <p> 49684984</p>
//                 </span>
//                 <span>
//                   <h6> Amount: </h6> <p> $ 15</p>
//                 </span>
//                 <span>
//                   <h6>Date: </h6> <p> JUl 01, 2023</p>
//                 </span>
//               </div> */}
//             </Grid>
//             <br /> <br />
//             <Grid item xs={12} md={3}>
//               {/* <InputLabel htmlFor="">Shipping Method :</InputLabel> */}
//               {/* <FormControl fullWidth>
//                 <InputLabel htmlFor="">Select Shipping Method</InputLabel>
//                 <Select
//                   id="supplier"
//                   name="supplier"
//                   value={supplierValue}
//                   onChange={(e) => setPaymentValue(e.target.value)}
//                 >
//                   {supplierOptions.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl> */}
//               {/* <div className="view-payment-details">
//                 <br />
//                 <span>
//                   <h6>Tracking Code: </h6>
//                   <p> </p>
//                 </span>
//                 <span>
//                   <h6>Picked Up By: </h6>
//                   <p> </p>
//                 </span>
//                 <span>
//                   <h6> Expected Date: </h6>
//                   <p> </p>
//                 </span>
//               </div> */}
//             </Grid>
//             <div className="partition">
//               <br /> <br />
//             </div>
//             <Grid item xs={12} md={4}>
//               <br /> <br />
//               <div className="view-payment-details2">
//                 <span>
//                   <h6> Order :</h6>
//                   <p id="order-id"> {order?.order_no}</p>
//                 </span>
//                 <span>
//                   <h6> Order Type :</h6>
//                   <p id="order-id"> {order?.order_type}</p>
//                 </span>
//                 <span>
//                   <h6> Order status :</h6>
//                   <p id="test-orange"> {order?.order_status}</p>
//                 </span>
//                 <span>
//                   <h6> Order date :</h6>
//                   <p>
//                     {getNormalDateAndTime(order?.created_at).normalDate} ,
//                     {getNormalDateAndTime(order?.created_at).normalTime}
//                   </p>
//                 </span>
//                 <span>
//                   <h6> Total amount : </h6>
//                   <p> $ {order?.grand_total}</p>
//                 </span>
//                 <span>
//                   <h6> Payment method : </h6>
//                   <p> {order?.payment_method}</p>
//                 </span>
//                 <span>
//                   <h6> Back Order : </h6>
//                   <p>{order?.back_order == 2 ? "Yes" : "No"}</p>
//                 </span>
//               </div>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <br /> <br />
//               <div className="view-payment-details">
//                 <h5>Billing: </h5>
//                 <span>
//                   <p>
//                     Name:{" "}
//                     {billAdd?.name
//                       ? billAdd?.name
//                       : billAdd?.first_name + " " + billAdd?.last_name}
//                   </p>
//                 </span>
//                 <span>
//                   <p>Email: {billAdd?.email}</p>
//                 </span>
//                 <span>
//                   <p>Phone: {billAdd?.phone}</p>
//                 </span>
//                 <span>
//                   <p>
//                     Address: {billAdd?.address ? billAdd?.address : ""}{" "}
//                     {billAdd?.flat_apartment
//                       ? "," + billAdd?.flat_apartment
//                       : ""}{" "}
//                     {billAdd?.street ? "," + billAdd?.street : ""}{" "}
//                     {billAdd?.zip ? "," + billAdd?.zip : ""}{" "}
//                     {billAdd?.city ? "," + billAdd?.city : ""}{" "}
//                     {billAdd?.state ? "," + billAdd?.state : ""}
//                   </p>
//                 </span>
//               </div>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <br /> <br />
//               {!order?.pickup_order ? (
//                 !order?.in_store ? (
//                   <div className="view-payment-details">
//                     <h5>Shipping: </h5>
//                     <span>
//                       <p>
//                         Name:{" "}
//                         {shipAdd?.name
//                           ? shipAdd?.name
//                           : shipAdd?.first_name + " " + shipAdd?.last_name}
//                       </p>
//                     </span>
//                     <span>
//                       <p>Email: {shipAdd?.email}</p>
//                     </span>
//                     <span>
//                       <p>Phone: {shipAdd?.phone}</p>
//                     </span>
//                     <span>
//                       <p>
//                         Address: {shipAdd?.address ? shipAdd?.address : ""}{" "}
//                         {shipAdd?.flat_apartment
//                           ? "," + shipAdd?.flat_apartment
//                           : ""}{" "}
//                         {shipAdd?.street ? "," + shipAdd?.street : ""}{" "}
//                         {shipAdd?.zip ? "," + shipAdd?.zip : ""}{" "}
//                         {shipAdd?.city ? "," + shipAdd?.city : ""}{" "}
//                         {shipAdd?.state ? "," + shipAdd?.state : ""}
//                       </p>
//                     </span>
//                   </div>
//                 ) : (
//                   <div>
//                     <h5>In Store Order </h5>
//                   </div>
//                 )
//               ) : (
//                 <div>
//                   <h5>Pickup Order </h5>
//                   <span>{order?.pickup_address} </span>
//                 </div>
//               )}
//               <br /> <br />
//             </Grid>
//             <div className="partition"></div>
//           </Grid>
//           <br />
//           <div className="orders-container2">
//             <div className="order-entries">
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Photo</TableCell>
//                       <TableCell>Product</TableCell>
//                       <TableCell>Category</TableCell>
//                       <TableCell>Brand</TableCell>
//                       <TableCell>Price</TableCell>
//                       <TableCell>Qty</TableCell>
//                       <TableCell>Total</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {listItems?.map((row, index) => (
//                       <TableRow>
//                         <TableCell>
//                           <div className="blog-img">
//                             <img
//                               src={`${IMAGEURL}${row?.product?.thumbnail}`}
//                               alt="ProductImage"
//                             />
//                           </div>
//                         </TableCell>
//                         <TableCell>{row?.product?.product_name}</TableCell>
//                         <TableCell>{row?.product?.category?.name}</TableCell>
//                         <TableCell>{row?.product?.brand?.name}</TableCell>
//                         <TableCell>${row?.price}</TableCell>
//                         <TableCell>{row?.quantity}</TableCell>
//                         <TableCell>${row?.sub_total}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </div>
//             <br />
//             <div className="order-entries3">
//               <TableContainer>
//                 <Table style={{ width: "100%" }}>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell style={{ fontWeight: "bold", width: "50%" }}>
//                         Sub Total:
//                       </TableCell>
//                       <TableCell style={{ width: "50%" }}>
//                         ${order?.sub_total}
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell style={{ fontWeight: "bold", width: "50%" }}>
//                         Shipping:
//                       </TableCell>
//                       <TableCell style={{ width: "50%" }}>
//                         ${order?.shipping_charge}
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell style={{ fontWeight: "bold", width: "50%" }}>
//                         Coupon:
//                       </TableCell>
//                       <TableCell style={{ width: "50%" }}>
//                         ${order?.coupon_discount}
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell style={{ fontWeight: "bold", width: "50%" }}>
//                         Total:
//                       </TableCell>
//                       <TableCell style={{ width: "50%" }}>
//                         ${order?.grand_total}
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </div>
//           </div>
//         </div>
//         {/* Submit button */}
//         <div className="add-product-save-btn" style={{ padding: "1rem" }}>
//           <div
//             className="print-btn-view-invoice"
//             variant="contained"
//             style={{ cursor: "pointer" }}
//             onClick={() => generatePrint()}
//           >
//             <PrintIcon />
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//     </>
//   );
// };

// export default ViewOrderDetails;
