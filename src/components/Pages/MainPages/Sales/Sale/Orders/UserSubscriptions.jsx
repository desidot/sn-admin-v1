import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  // Checkbox,
  // FormGroup,
  // FormControlLabel,
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
  // OutlinedInput,
  // InputAdornment,
  InputLabel,
  TextField,
  // Autocomplete,
} from "@mui/material";
import "./Allorders.css";
// import { DatePicker } from "antd";
// import moment from "moment";
import {
  // Link,
  useLocation,
  // useParams,
  useSearchParams,
} from "react-router-dom";
import {
  MoreVertOutlined,
  // EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import ReplayIcon from "@mui/icons-material/Replay";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import PrintIcon from "@mui/icons-material/Print";
// import ProductImg from "../../../../../../assets/products/spray-product.jpg";
import HomeIcon from "@mui/icons-material/Home";
// import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  // getAllOrders,
} from "../../../../../../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
// import CloseIcon from "@mui/icons-material/Close";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
// const { RangePicker } = DatePicker;
const initialNote = {
  order_id: "",
  title: "Staff Notes",
  note: "",
  added_by: "",
};
const UserSubscriptions = () => {
  const [listItems, setListItems] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [isLoading, SetIsLoading] = useState(false);

  const [shippingValue, setShippingValue] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userValue, setUserValue] = useState("");
  const [sourceValue, setSourceValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [showStaffNotePopup, setShowStaffNotePopup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [staffNote, setStaffNote] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const params = useLocation();
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [openMenuId, setOpenMenuId] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [cusName, setCusName] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [note, setNote] = useState(initialNote);
  // eslint-disable-next-line no-unused-vars
  const auth = useSelector((state) => state.auth.user.data?.name);

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [user_id, setUser_id] = useState("");
  // eslint-disable-next-line no-unused-vars
  const allCustomers = useSelector((state) => state.cart.allCustomers);
  useEffect(() => {
    dispatch(getAllCustomers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userId, setUserId] = useState(0);
  const [flag, setFlag] = useState(false);
  const [currentCustomers, setCurrentCustomers] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const [showSubsCancel, setShowShowSubsCancel] = useState(null);
  const [currentRow, setCurrentRow] = useState({});

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleShowCancelSubs = (row) => {
    setShowShowSubsCancel(row.id);
    handleMenuClose();
    // console.log("myId", row);
    setCurrentRow(row);
    // console.log("current row", currentRow);
  };

  const token = useSelector((state) => state.auth.user._token);
  const fetchCustomers = async (val) => {
    const apiUrl = `${APIBASE}admin/search-customer-details/${val}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentCustomers([]);
      setCurrentCustomers(response.data.data);
    } catch (error) {
      //console.error("Error fetching customers:", error);
    }
  };
  const handleCustomerInputChange = (event) => {
    const val = event.target.value;

    if (val.trim() !== "" && val?.length >= 2) {
      setCurrentCustomers([]);
      setFlag(true);
      fetchCustomers(val);
    } else {
      setCurrentCustomers([]);
      setUserId(0);
      // Clear searchResults when searchQuery is empty
    }
    // Perform your logic here with the updated value
    // This function will be called after the specified delay (debounce time)
  };
  const handleCustomerSearch = debounce(handleCustomerInputChange, 1200);

  const handleCustomeClick = (elem) => {
    document.getElementById("customer").value =
      elem.first_name + " " + elem.last_name;
    setUserId(elem.id);
    setFlag(false);
  };

  useEffect(() => {
    setNote({ ...note, note: staffNote });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffNote]);

  const addNote = async () => {
    try {
      await axios.post(`${APIBASE}admin/ordernotes`, note);
      toast.success("Note added.");
      setNote(initialNote);
    } catch (error) {
      //console.log(error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleSaveNoteClick = () => {
    addNote();
    setShowStaffNotePopup(false);
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const processDatesArray = (datesArray) => {
    if (datesArray.length !== 2) {
      //console.error("Invalid array length. Expected 2 dates.");
      return;
    }
    // const startDate = moment(datesArray[0].$d).format("DD-MM-YYYY");
    // const endDate = moment(datesArray[1].$d).format("DD-MM-YYYY");

    // Perform your desired operations with the start and end dates
    //console.log("Start Date:", startDate);
    //console.log("End Date:", endDate);
  };

  // eslint-disable-next-line no-unused-vars
  const handleDateRangeChange = (selectedDates) => {
    if (!selectedDates) {
      //console.error("Selected dates array is null.");
      return;
    }
    processDatesArray(selectedDates);
    setSelectedDates(selectedDates);
    //console.log(selectedDates);
    // Other logic for handling the date range
  };

  const [expandedRow, setExpandedRow] = React.useState("");

  const handleRowClick = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow("");
    } else {
      setExpandedRow(rowId);
    }
  };

  const handlePageChange = (event, value) => {
    setRowsPerPage(event.target.value);
    setPage(value);
  };

  const handleMenuOpen = (event, rowId) => {
    setSelectedMenuItem((prevSelectedMenuItem) => ({
      ...prevSelectedMenuItem,
      [rowId]: true,
    }));

    // console.log("clicked");
    // setSelectedMenuItem({});

    setOpenMenuId(rowId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedMenuItem({});
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const shippingOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "Pending", label: "Pending Order" },
    { value: "Confirm", label: "Ready for Collection" },
    { value: "Collected", label: "Collected" },
    { value: "Pickedup", label: "Shipped" },
    { value: "Delivered", label: "Delivered Orders" },
  ];

  const paymentOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "Fully Paid", label: "Paid" },
    { value: "Un-Paid", label: "Unpaid" },
  ];

  const sourceOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "AUTHORIZED.NET", label: "Authorized.net" },
    { value: "OFFLINE", label: "Offline" },
    { value: "CASH", label: "Cash" },
  ];

  const getFilteredOrders = async () => {
    setListItems([]);
    SetIsLoading(true);
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-subsription-orders?page=${page}${params.search.replace(
          /\?/g,
          "&"
        )}`
      );
      setPageCount(Math.ceil(res.data.data.total / res.data.data.per_page));
      setTotalItems(res.data.data.total);
      SetIsLoading(false);
      setListItems(res.data.data.data);
      //console.log("data", res.data.data.data);
    } catch (error) {
      SetIsLoading(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const deleteOrder = async (id) => {
    handleMenuClose();
    try {
      await axios.delete(`${APIBASE}admin/orders/${id}`);
      toast.success("Order deleted Successfully");
      getFilteredOrders();
    } catch (error) {
      //console.log(error);
    }
  };

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

  // useEffect(() => {
  //   getOrders();
  // }, [page]);

  useEffect(() => {
    const obj = {};
    if (shippingValue) {
      obj.shipping = shippingValue;
    }
    if (paymentValue) {
      obj.payment = paymentValue;
    }
    if (sourceValue) {
      obj.source = sourceValue;
    }
    if (userId) {
      obj.user = userId;
    }
    setSearchParam(obj);
  }, [
    shippingValue,
    paymentValue,
    userValue,
    sourceValue,
    subscriptionChecked,
    selectedDates,
    page,
    userId,
    setSearchParam,
  ]);

  useEffect(() => {
    getFilteredOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  const getSingleOrder = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-all-orders?search=${searchOrder}`
      );
      setListItems(res.data.data.data);
      //console.log(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };

  const handleSearch = () => {
    getSingleOrder();
  };
  // eslint-disable-next-line no-unused-vars
  const handleAddCustomer = (e, value) => {
    const id = value?.split(". ")[0];
    // eslint-disable-next-line no-unused-vars
    const name = value?.split(". ")[1];
    setUser_id(id);
    setCusName(value);
    //
  };
  useEffect(() => {
    getFilteredOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // eslint-disable-next-line no-unused-vars
  const reviewAlertMail = async (row) => {
    handleMenuClose();
    const payload = {
      name:
        JSON.parse(row?.shipping_address)?.first_name +
        " " +
        JSON.parse(row?.shipping_address)?.last_name,
      email: JSON.parse(row?.shipping_address)?.email,
    };
    try {
      await axios.post(`${APIBASE}admin/send-review-mail`, payload);
      toast.success("Review alert sent via mail successfully.");
    } catch (error) {
      toast.error("Error!");
    }
  };

  // eslint-disable-next-line no-unused-vars
  const orderMail = async (row) => {
    handleMenuClose();
    const payload = {
      order_id: row.id,
      user_email: JSON.parse(row?.shipping_address)?.email,
    };
    try {
      await axios.post(`${APIBASE}admin/send-order-mail`, payload);
      toast.success(" mail sent successfully.");
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleCancelSubscription = async (event, subscriptionId, user_id) => {
    // console.log("cancel subs id", subscriptionId);
    // console.log("USER_ID", user_id);
    try {
      const payload = {
        subscription_id: subscriptionId,
        // , user_id: user_id
      };
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `${APIBASE}admin/cancel-user-subscription`,
        payload
      );
      // console.log(response);
      // setSelectedMenuItem({});
      getFilteredOrders();
      setShowShowSubsCancel();
      // handleMenuClose()
      toast.success("Subscription canceled successfully");
    } catch (error) {
      toast.error("Failed to cancel subscription");
      // console.error("Error canceling subscription:", error);
      setShowShowSubsCancel();
      // handleMenuClose();
    }
  };

  //console.log(listItems);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Sale - User Subscriptions</h6>
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
          <section className="filter-section">
            {/* <div className="filter-head">
              <Typography variant="h1">Filter</Typography>
            </div> */}
            <div className="filter-container">
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <label htmlFor="shipping">Shipping Status:</label>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="shipping"
                      className="input-labels-options"
                    >
                      All
                    </InputLabel>
                    <Select
                      id="shipping"
                      name="shipping"
                      value={shippingValue}
                      onChange={(e) => setShippingValue(e.target.value)}
                    >
                      {shippingOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={option.value === ""}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <label htmlFor="payment">Payment Status:</label>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="payment"
                      className="input-labels-options"
                    >
                      All
                    </InputLabel>
                    <Select
                      id="payment"
                      name="payment"
                      value={paymentValue}
                      onChange={(e) => setPaymentValue(e.target.value)}
                    >
                      {paymentOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={option.value === ""}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <label htmlFor="user">Customer:</label>
                  <FormControl fullWidth>
                    <TextField
                      id="customer"
                      placeholder="All"
                      onChange={(e) => handleCustomerSearch(e)}
                    />
                    {currentCustomers?.length > 0 && flag && (
                      <div
                        className="input-field-results"
                        style={{ zIndex: "1000", maxHeight: "250px" }}
                      >
                        {currentCustomers?.map((elem, index) => (
                          <div
                            key={index}
                            onClick={() => handleCustomeClick(elem)}
                          >
                            {elem?.first_name} {elem?.last_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <Typography htmlFor="daterange">Date Range:</Typography>
                    <RangePicker
                      className="date-picker"
                      name="daterange"
                      onChange={handleDateRangeChange}
                    />
                    {selectedDates.length > 0 && (
                      <span className="show-dates">
                        Selected Dates: {selectedDates.join(" -to- ")}
                      </span>
                    )}
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} md={3}>
                  <label htmlFor="source">Sources:</label>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="source"
                      className="input-labels-options"
                    >
                      All
                    </InputLabel>
                    <Select
                      id="source"
                      name="source"
                      value={sourceValue}
                      onChange={(e) => setSourceValue(e.target.value)}
                    >
                      {sourceOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={option.value === ""}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </section>
          {/* End Filter */}
          <br />
          <div className="orders-section">
            {/* Orders Start*/}
            <div className="order-head">
              <Typography variant="h1">
                User Subscriptions (Total:-{totalItems})
              </Typography>

              <div className="search-orders">
                <div className="search-in-table">
                  <TextField
                    position="start"
                    value={searchOrder}
                    onChange={(e) => setSearchOrder(e.target.value)}
                  />
                  {/* Search... */}
                </div>
                <Button
                  variant="contained"
                  onClick={() => handleSearch()}
                  className="search-btn"
                >
                  search
                </Button>
              </div>
            </div>
            <div className="orders-container">
              <div className="order-entries" style={{ textAlign: "center" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Subs. No.</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Order Details</TableCell>
                        <TableCell>Total Items</TableCell>

                        <TableCell>Customer Details</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Discount</TableCell>
                        {/* <TableCell>Shipping Status</TableCell> */}
                        {/* <TableCell>Pay Status</TableCell> */}
                        <TableCell>Source</TableCell>
                        <TableCell>Agent/Sales Person</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                        {/* <TableCell>
                          <SettingsIcon />
                        </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {isLoading && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin:"auto",
                            width:"100%"
                          }}
                        >
                          <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                          </div>
                          <div
                            style={{
                              fontSize: "20px",
                              color: "gray",
                              marginTop: "20px",
                            }}
                          >
                            Loading...
                          </div>
                        </div>
                      )} */}

                      {showSubsCancel && (
                        <div className="popup">
                          <div className="card-header">
                            <div className="main-body2">
                              <h3 className="card-title">
                                Cancel Subscription
                              </h3>
                              <div
                                className="card"
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  alignItems: "flex-start",
                                }}
                                // productId={selectedProductId}
                              >
                                <div>
                                  <span
                                  // style={{ marginRight: "4rem" }}
                                  >
                                    <br />
                                    Are You Sure, <br />
                                    You want to Cancel this Subscription ?
                                  </span>
                                  <br />
                                  <br />
                                  <Button
                                    onClick={(event) =>
                                      handleCancelSubscription(
                                        event,
                                        currentRow.subscription_no,
                                        currentRow.user_id
                                      )
                                    }
                                    style={{
                                      background: "#FF4961",
                                      color: "#FFFFFF",
                                      fontSize: "14px",
                                      textTransform: "capitalize",
                                      borderRadius: "20px",
                                      height: "2.2rem",
                                      width: "100px",
                                    }}
                                  >
                                    Conform
                                  </Button>
                                </div>
                              </div>
                              <hr />
                              <button
                                onClick={() => setShowShowSubsCancel()}
                                style={{ justifySelf: "center" }}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {isLoading ? (
                        <TableRow>
                          <TableCell>Loading...</TableCell>
                        </TableRow>
                      ) : (
                        listItems?.map((row, index) => (
                          <React.Fragment key={index}>
                            <TableRow>
                              <TableCell>
                                <IconButton
                                  onClick={() => handleRowClick(row.id)}
                                  variant="outlined"
                                  // size="small"
                                >
                                  {expandedRow === row.id ? (
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
                                <div style={{ width: "130px" }}>
                                  {row?.subscription_no}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "100px" }}>
                                  {
                                    getNormalDateAndTime(row?.created_at)
                                      .normalDate
                                  }
                                  <br />
                                  {
                                    getNormalDateAndTime(row?.created_at)
                                      .normalTime
                                  }
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "100px" }}>
                                  <p className="mb-1"> {row.order_no}</p>
                                </div>
                                {row?.month && (
                                  <>
                                    {row.month ? row.month : "-"}
                                    {row.month === 1 ? " month" : " months"}
                                  </>
                                )}
                              </TableCell>
                              <TableCell>
                                <div>{JSON.parse(row?.items).length}</div>
                              </TableCell>

                              <TableCell>
                                <div
                                  style={{
                                    width: "auto",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                  }}
                                >
                                  <p className="mb-1 font-14">
                                    {JSON.parse(row?.billing_address)?.name
                                      ? JSON.parse(row?.billing_address)?.name
                                      : JSON.parse(row?.billing_address)
                                          ?.first_name +
                                        " " +
                                        JSON.parse(row?.billing_address)
                                          ?.last_name}
                                  </p>

                                  <p className="mb-1">
                                    {JSON.parse(row?.billing_address)?.email}
                                  </p>

                                  <p className="mb-1">
                                    {JSON.parse(row?.billing_address)?.phone}
                                  </p>

                                  <p className="mb-1">
                                    {JSON.parse(row?.billing_address)?.zip}
                                  </p>

                                  <p className="mb-1">
                                    {JSON.parse(row?.billing_address).address}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "150px" }}>
                                  <b>Paid Amount:</b> ${row.grand_total}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="mb-1">
                                    {" "}
                                    <b>Coupon: </b> $
                                    {row.coupon_discount
                                      ? row?.coupon_discount
                                      : 0}
                                  </p>
                                </div>
                              </TableCell>
                              {/* <TableCell>
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
                              </TableCell> */}
                              {/* <TableCell>
                                <span
                                  className={
                                    row.payment_status == "Un-Paid"
                                      ? "pending"
                                      : "success"
                                  }
                                >
                                  {" "}
                                  {row.payment_status}
                                </span>
                              </TableCell> */}
                              <TableCell>
                                <p>{row?.order_type}</p>
                                <div style={{ width: "150px" }}>
                                  <p className="mb-1"> {row?.payment_method}</p>
                                  <p className="mb-1">
                                    {row?.transaction_id ?? ""}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "150px" }}>
                                  <p className="mb-1">
                                    <b> Agent: </b> {row?.agent?.name ?? "-"}
                                  </p>

                                  <p className="mb-1">
                                    <b> Sales Person: </b>{" "}
                                    {row?.added_by ?? "-"}
                                  </p>
                                </div>
                              </TableCell>
                              {/* <TableCell>NO</TableCell> */}
                              {/* cancel subscription */}
                              {/* <TableCell>{row?.subscription_status}</TableCell> */}
                              <TableCell
                                className={
                                  +row.subscription_status === 1
                                    ? "active-status"
                                    : "inactive-status"
                                }
                              >
                                <span>
                                  {+row.subscription_status === 1
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </TableCell>

                              <TableCell>
                                <IconButton
                                  onClick={(event) =>
                                    handleMenuOpen(event, row.id)
                                  }
                                  size="small"
                                >
                                  <MoreVertOutlined />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={Boolean(selectedMenuItem[row.id])} // Check if the current menu item is selected
                                  onClose={handleMenuClose}
                                  className="no-border-shadow-menu"
                                >
                                  <MenuItem
                                    onClick={() => handleShowCancelSubs(row)}
                                  >
                                    <small>
                                      <DeleteOutlined sx={{ marginRight: 1 }} />
                                      Cancel Subscription
                                    </small>
                                  </MenuItem>
                                </Menu>
                              </TableCell>
                              {/* cancel subscription end*/}
                            </TableRow>

                            <TableRow>
                              <TableCell
                                colSpan={12}
                                className="hiddenRow pc-padding"
                                style={{ padding: "0px" }}
                              >
                                <Collapse
                                  in={expandedRow === row.id}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <div className="accordian-body" id="order">
                                    <Typography
                                      variant="h4"
                                      className="sub-table-heading"
                                    >
                                      <p
                                        style={{ padding: "1rem", margin: "0" }}
                                      >
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
                                                : row.in_store === 1
                                                ? "In Store Order"
                                                : "Shipping Details"}
                                            </TableCell>

                                            <TableCell>Category</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {JSON.parse(row?.items)?.map(
                                            (elem, index) => (
                                              <TableRow key={index}>
                                                <TableCell>
                                                  <img
                                                    alt="user"
                                                    src={`${IMAGEURL}${elem?.image}`}
                                                    style={{
                                                      width: "40px",
                                                      height: "auto",

                                                      marginRight: "15px",
                                                    }}
                                                  />
                                                  {elem?.name}
                                                </TableCell>
                                                <TableCell>
                                                  {elem.unit ? elem.unit : "-"}
                                                </TableCell>
                                                <TableCell>
                                                  {elem.qty}
                                                </TableCell>

                                                <TableCell>
                                                  $ {elem?.price}
                                                </TableCell>
                                                <TableCell>
                                                  {!row.pickup_order ? (
                                                    !row.in_store ? (
                                                      <div>
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
                                                      </div>
                                                    ) : (
                                                      "In store"
                                                    )
                                                  ) : (
                                                    <div>
                                                      {row.pickup_address ??
                                                        "-"}{" "}
                                                    </div>
                                                  )}
                                                </TableCell>
                                                <TableCell>
                                                  {elem?.category}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            {/* <br /> */}
            {/* Orders End */}
            <Pagination
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
            />
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default UserSubscriptions;
