import React, { useEffect, useState } from "react";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Pagination,
  Button,
  IconButton,
  Menu,
  OutlinedInput,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import "./Allorders.css";
import { DatePicker } from "antd";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import {
  MoreVertOutlined,
  // EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import ReplayIcon from "@mui/icons-material/Replay";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import PrintIcon from "@mui/icons-material/Print";
//import ProductImg from "?.?./?.?./?.?./?.?./?.?./?.?./assets/products/spray-product?.jpg";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";

const { RangePicker } = DatePicker;

const OrdersPerCustomer = () => {
  const search = useParams();

  const [listItems, setListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingValue, setShippingValue] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const [sourceValue, setSourceValue] = useState("");
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const [showStaffNotePopup, setShowStaffNotePopup] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [staffNote, setStaffNote] = useState("");

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window?.history?.go(-1);
  };

  const processDatesArray = (datesArray) => {
    if (datesArray?.length !== 2) {
      //console?.error("Invalid array length?. Expected 2 dates?.");
      return;
    }
    const startDate = moment(datesArray[0]?.$d)?.format("DD-MM-YYYY");
    const endDate = moment(datesArray[1]?.$d)?.format("DD-MM-YYYY");

    // Perform your desired operations with the start and end dates
    //console?.log("Start Date:", startDate);
    //console?.log("End Date:", endDate);
  };

  const handleDateRangeChange = (selectedDates) => {
    if (!selectedDates) {
      //console?.error("Selected dates array is null?.");
      return;
    }
    processDatesArray(selectedDates);
    setSelectedDates(selectedDates);
    //console?.log(selectedDates);
    // Other logic for handling the date range
  };

  const [expandedRow, setExpandedRow] = React?.useState("");

  const handleRowClick = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow("");
    } else {
      setExpandedRow(rowId);
    }
  };

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handlePageChange = (event) => {
    setRowsPerPage(event?.target?.value);
    setPage(1);
  };

  const handleMenuOpen = (event, rowId) => {
    setOpenMenuId(rowId);
    setAnchorEl(event?.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const pageCount = 5; // Replace with the actual number of pages

  const shippingOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "pending", label: "Pending Order" },
    { value: "confirm", label: "Ready for Collection" },
    { value: "collected", label: "Collected" },
    { value: "pickedup", label: "Shipped" },
    { value: "delivered", label: "Delivered Orders" },
  ];

  const paymentOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Unpaid" },
  ];

  const userOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "16", label: "a1 a1" },
    // Add more options here
  ];

  const sourceOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "authorized?.net", label: "Authorized?.net" },
    { value: "offline", label: "Offline" },
    { value: "cash", label: "Cash" },
  ];

  const subscriptionOptions = [
    { value: "subscription", label: "Subscriptions" },
    // Add more options here
  ];

  useEffect(() => {
    const getOrderDetail = async () => {
      setIsLoading(true);
      try {
        const res = await axios?.get(
          `${APIBASE}admin/get-customer-order/${search?.id}`
        );
        setListItems(res?.data?.data);
        setTotalItems(res?.data?.data?.length);
        setIsLoading(false);
      } catch (error) {
        //console?.log(error);
        setIsLoading(false);
      }
    };

    getOrderDetail();
  }, []);

  //console?.log(listItems);

  function getNormalDateAndTime(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject?.getFullYear();
    const month = dateObject?.getMonth() + 1;
    const day = dateObject?.getDate();
    const hours = dateObject?.getHours();
    const minutes = dateObject?.getMinutes();
    const seconds = dateObject?.getSeconds();

    const normalDate = `${year}-${month}-${day}`;
    const normalTime = `${hours}:${minutes}:${seconds}`;

    return {
      normalDate,
      normalTime,
    };
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Sales - Customer Orders</h6>
        </div>

        <button
          className="back-button"
          onClick={handleGoBack}
          style={{ background: "#EEF2F6", fontWeight: "500" }}
        >
          <span className="back-arrow" style={{ fontWeight: "500" }}>
            &larr;
          </span>{" "}
          Back
        </button>
      </div>

      <br />
      <div>
        <div className="all-orders">
          {/*   <section className="filter-section">
            <div className="filter-head">
              <Typography variant="h1">Filter</Typography>
            </div>
            <div className="filter-container">
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography htmlFor="shipping">Shipping Status:</Typography>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="shipping">All</InputLabel>
                    <Select
                      id="shipping"
                      name="shipping"
                      value={shippingValue}
                      onChange={(e) => setShippingValue(e?.target?.value)}
                    >
                      {shippingOptions?.map((option) => (
                        <MenuItem
                          key={option?.value}
                          value={option?.value}
                          disabled={option?.value === ""}
                        >
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography htmlFor="payment">Payment Status:</Typography>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="shipping">All</InputLabel>
                    <Select
                      id="payment"
                      name="payment"
                      value={paymentValue}
                      onChange={(e) => setPaymentValue(e?.target?.value)}
                    >
                      {paymentOptions?.map((option) => (
                        <MenuItem
                          key={option?.value}
                          value={option?.value}
                          disabled={option?.value === ""}
                        >
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography htmlFor="user">Customer:</Typography>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="shipping">All</InputLabel>
                    <Select
                      id="user"
                      name="user"
                      value={userValue}
                      onChange={(e) => setUserValue(e?.target?.value)}
                    >
                      {userOptions?.map((option) => (
                        <MenuItem
                          key={option?.value}
                          value={option?.value}
                          disabled={option?.value === ""}
                        >
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <Typography htmlFor="daterange">Date Range:</Typography>
                    <RangePicker
                      className="date-picker"
                      name="daterange"
                      onChange={handleDateRangeChange}
                    />
                    {selectedDates?.length > 0 && (
                      <span className="show-dates">
                        Selected Dates: {selectedDates?.join(" -to- ")}
                      </span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormGroup>
                    {subscriptionOptions?.map((option) => (
                      <FormControlLabel
                        key={option?.value}
                        control={
                          <Checkbox
                            id={option?.value}
                            name={option?.value}
                            value={option?.value}
                            checked={subscriptionChecked}
                            onChange={(e) =>
                              setSubscriptionChecked(e?.target?.checked)
                            }
                          />
                        }
                        label={option?.label}
                      />
                    ))}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography htmlFor="source">Sources:</Typography>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="shipping">All</InputLabel>
                    <Select
                      id="source"
                      name="source"
                      value={sourceValue}
                      onChange={(e) => setSourceValue(e?.target?.value)}
                    >
                      {sourceOptions?.map((option) => (
                        <MenuItem
                          key={option?.value}
                          value={option?.value}
                          disabled={option?.value === ""}
                        >
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </section> */}

          {/* End Filter */}
          <br />
          <div className="orders-section">
            {/* Orders Start*/}
            <div className="order-head">
              <Typography variant="h1">
                All Orders (Total:-{totalItems})
              </Typography>

              {/* <div className="search-orders">
                <div className="search-in-table">
                  <OutlinedInput
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
                    }}
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="start">
                        {/* Search?.?.?. 
                      </InputAdornment>
                    }
                  />
                </div>
                <Button variant="contained" className="search-btn">
                  search
                </Button>
              </div> */}
            </div>
            <div className="orders-container">
              <div className="order-entries">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Inv. No.</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Order Details</TableCell>
                        <TableCell>Total Items</TableCell>

                        <TableCell>Customer Details</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Shipping Status</TableCell>
                        <TableCell>Pay Status</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Agent/Sales Person</TableCell>
                        <TableCell>
                          <SettingsIcon />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listItems?.map((row, index) => (
                        <>
                          <TableRow>
                            <TableCell>
                              <IconButton
                                onClick={() => handleRowClick(row?.id)}
                                variant="outlined"
                                // size="small"
                              >
                                {expandedRow === row?.id ? (
                                  <i>
                                    <FaAngleUp />
                                  </i>
                                ) : (
                                  <span className="fa fa-chevron-down">
                                    <FaAngleDown />
                                  </span>
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                <a
                                  href={`${IMAGEURL}${row?.invoice_pdf}`}
                                  target="_black"
                                >
                                  {row?.invoice_no}
                                </a>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                {
                                  getNormalDateAndTime(row?.created_at)
                                    ?.normalDate
                                }
                                <br />
                                {
                                  getNormalDateAndTime(row?.created_at)
                                    ?.normalTime
                                }
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {!row.pickup_order ? (
                                !row.in_store ? (
                                  <Typography variant="body1">
                                    <small>
                                      {JSON.parse(row?.shipping_address)?.name
                                        ? JSON.parse(row?.shipping_address)
                                            ?.name
                                        : JSON.parse(row?.shipping_address)
                                            ?.first_name +
                                          " " +
                                          JSON.parse(row?.shipping_address)
                                            ?.last_name}
                                    </small>
                                    <br />
                                    <small>
                                      {JSON.parse(row?.shipping_address)?.email}
                                    </small>
                                    <br />
                                    <small>
                                      {JSON.parse(row?.shipping_address)?.phone}
                                    </small>
                                    <br />
                                    <small>
                                      {JSON.parse(row?.shipping_address)?.zip}
                                    </small>
                                    <br />
                                    <small>
                                      {
                                        JSON.parse(row?.shipping_address)
                                          .address
                                      }
                                    </small>
                                    <br />
                                  </Typography>
                                ) : (
                                  "In Store"
                                )
                              ) : (
                                <span>Pickup Order</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                {row?.items?.length}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body1">
                                <small>
                                  {JSON.parse(row?.billing_address)?.name
                                    ? JSON.parse(row?.billing_address)?.name
                                    : JSON.parse(row?.billing_address)
                                        ?.first_name +
                                      " " +
                                      JSON.parse(row?.billing_address)
                                        ?.last_name}
                                </small>
                                <br />
                                <small>
                                  {JSON.parse(row?.billing_address)?.email}
                                </small>
                                <br />
                                <small>
                                  {JSON.parse(row?.billing_address)?.phone}
                                </small>
                                <br />
                                <small>
                                  {JSON.parse(row?.billing_address)?.zip}
                                </small>
                                <br />
                                <small>
                                  {JSON.parse(row?.billing_address).address}
                                </small>
                                <br />
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                <b>Paid Amount:</b> ${row.grand_total}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                <b>Coupon:</b>$
                                {row.coupon_discount ? row?.coupon_discount : 0}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <span
                                className={
                                  row.order_status === "Pending"
                                    ? "pending"
                                    : "success"
                                }
                              >
                                {" "}
                                {row?.order_status}
                              </span>
                              <br /> <b>Shipping Charge:</b> $
                              {row?.shipping_charge}
                            </TableCell>
                            <TableCell>{row?.payment_method}</TableCell>
                            <TableCell>
                              <span style={{ fontSize: "10px" }}>
                                {" "}
                                <b>Agent: </b> {row?.agent?.name ?? "-"}{" "}
                              </span>
                              <br />
                              <span style={{ fontSize: "10px" }}>
                                {" "}
                                <b>Sales Person: </b> {row?.added_by ?? "-"}
                              </span>
                            </TableCell>
                            {/* <TableCell>NO</TableCell> */}
                            <TableCell>
                              <IconButton
                                onClick={(event) =>
                                  handleMenuOpen(event, row?.id)
                                }
                                size="small"
                              >
                                <MoreVertOutlined />
                              </IconButton>
                              <Menu
                                anchorEl={anchorEl}
                                open={openMenuId === row?.id}
                                onClose={handleMenuClose}
                              >
                                {/* <MenuItem onClick={handleMenuClose}>
                              <EditOutlined sx={{ marginRight: 1 }} />
                              Edit
                            </MenuItem> */}

                                <MenuItem aria-label="View order details">
                                  <Link
                                    to={`/admin/Admin/view-order-details/${row?.id}`}
                                    onClick={handleMenuClose}
                                    style={{ color: "black" }}
                                  >
                                    <small>
                                      <VisibilityOutlinedIcon
                                        sx={{ marginRight: 1 }}
                                      />
                                      View
                                    </small>
                                  </Link>
                                </MenuItem>

                                <MenuItem onClick={handleMenuClose}>
                                  <small>
                                    <NotificationsActiveIcon
                                      sx={{ marginRight: 1 }}
                                    />
                                    Review Alert
                                  </small>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                  <small>
                                    <DeleteOutlined sx={{ marginRight: 1 }} />
                                    Delete
                                  </small>
                                </MenuItem>
                                {/* <MenuItem onClick={handleMenuClose}>
                              <ReplayIcon sx={{ marginRight: 1 }} />
                              Return Sales order
                            </MenuItem> */}
                                <MenuItem
                                  onClick={() => {
                                    handleMenuClose();
                                    setShowStaffNotePopup(true);
                                  }}
                                >
                                  <small>
                                    <EditNoteIcon sx={{ marginRight: 1 }} />
                                    Staff Note
                                  </small>
                                </MenuItem>

                                <MenuItem onClick={handleMenuClose}>
                                  <small>
                                    <MailOutlineIcon sx={{ marginRight: 1 }} />
                                    Mail
                                  </small>
                                </MenuItem>
                                {/* <MenuItem onClick={handleMenuClose}>
                              <PrintIcon sx={{ marginRight: 1 }} />
                              Print
                            </MenuItem> */}
                              </Menu>
                              {/* Staff Note Popup */}
                              {showStaffNotePopup && (
                                <div className="popup">
                                  <div className="popup-content">
                                    <label className="popup-label">
                                      Staff note:
                                    </label>
                                    <textarea
                                      className="popup-textarea"
                                      value={staffNote}
                                      onChange={(event) =>
                                        setStaffNote(event?.target?.value)
                                      }
                                    />
                                    <div className="popup-buttons">
                                      <button
                                        className="popup-button"
                                        onClick={() => {
                                          // Perform any necessary action with the staff note value
                                          //console?.log(staffNote);

                                          // Hide the popup
                                          setShowStaffNotePopup(false);
                                        }}
                                      >
                                        Save
                                      </button>
                                      <button
                                        className="popup-button"
                                        onClick={() =>
                                          setShowStaffNotePopup(false)
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* Staff Note Popup end*/}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              colSpan={12}
                              className="hiddenRow pc-padding"
                              style={{ padding: "0px" }}
                            >
                              <Collapse
                                in={expandedRow === row?.id}
                                timeout="auto"
                                unmountOnExit
                              >
                                <div className="accordian-body" id="order">
                                  <Typography
                                    variant="h4"
                                    className="sub-table-heading"
                                  >
                                    <p style={{ padding: "1rem", margin: "0" }}>
                                      Sales Order Items
                                    </p>
                                  </Typography>
                                  {/* <hr /> */}
                                  <TableContainer>
                                    <Table>
                                      <TableHead className="orders-table-head-row">
                                        <TableRow className="info">
                                          <TableCell>Product Name</TableCell>
                                          <TableCell>Unit</TableCell>

                                          <TableCell>Qty</TableCell>

                                          <TableCell>Price</TableCell>

                                          <TableCell>
                                              {row.pickup_order
                                                ? "Pickup Details"
                                                : row.in_store == 1
                                                ? "In Store Order"
                                                : "Shipping Details"}
                                            </TableCell>

                                          <TableCell>Seller</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {row?.items?.map((elem, index) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              <img
                                                alt="user"
                                                src={`https://api?.shopnmac?.com/${elem?.product?.thumbnail}`}
                                                style={{
                                                  width: "40px",
                                                  height: "auto",
                                                }}
                                              />
                                            </TableCell>
                                            <TableCell>{elem?.unit}</TableCell>
                                            <TableCell>
                                              {elem?.quantity}
                                            </TableCell>

                                            <TableCell>
                                              ${elem?.product?.selling_price}
                                            </TableCell>
                                            <TableCell>
                                            {!row.pickup_order ? (
                                                  !row.in_store ? (
                                                    <Typography>
                                                      {
                                                        JSON.parse(
                                                          row?.shipping_address
                                                        )?.address
                                                      }
                                                      ,
                                                      {
                                                        JSON.parse(
                                                          row?.shipping_address
                                                        )?.city
                                                      }
                                                      ,
                                                      {
                                                        JSON.parse(
                                                          row?.shipping_address
                                                        )?.country
                                                      }
                                                      ,
                                                      {
                                                        JSON.parse(
                                                          row?.shipping_address
                                                        )?.zip
                                                      }
                                                    </Typography>
                                                  ) : (
                                                    "In store"
                                                  )
                                                ) : (
                                                  <Typography>
                                                    {row.pickup_address ?? "-"}{" "}
                                                  </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                              {elem?.product?.supplier?.name}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </div>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <br />
            {/* Orders End */}
            {/* <Pagination
              count={pageCount}
              value={rowsPerPage}
              page={page}
              onChange={handlePageChange}
              className="pagination-style"
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "right",
              }}
            /> */}
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default OrdersPerCustomer;
