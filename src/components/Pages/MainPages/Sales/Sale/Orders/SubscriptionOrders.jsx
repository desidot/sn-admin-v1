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
  TextField,
  Autocomplete,
} from "@mui/material";
import "./Allorders.css";
import { DatePicker } from "antd";
import moment from "moment";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import ProductImg from "../../../../../../assets/products/spray-product.jpg";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  getAllOrders,
} from "../../../../../../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
const { RangePicker } = DatePicker;
const initialNote = {
  order_id: "",
  title: "Staff Notes",
  note: "",
  added_by: "",
};
const SubscriptionOrders = () => {
  const [listItems, setListItems] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [isLoading, SetIsLoading] = useState(false);

  const [shippingValue, setShippingValue] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const [sourceValue, setSourceValue] = useState("");
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const [showStaffNotePopup, setShowStaffNotePopup] = useState(false);
  const [staffNote, setStaffNote] = useState("");
  const [cusName, setCusName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const params = useLocation();
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [pageCount, setPageCount] = useState(1);

  const [searchOrder, setSearchOrder] = useState("");
  const [note, setNote] = useState(initialNote);
  const auth = useSelector((state) => state.auth.user.data?.name);
  const [totalItems, setTotalItems] = useState(0);

  const dispatch = useDispatch();
  const [user_id, setUser_id] = useState("");
  const allCustomers = useSelector((state) => state.cart.allCustomers);
  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  const [userId, setUserId] = useState(0);
  const [flag, setFlag] = useState(false);
  const [currentCustomers, setCurrentCustomers] = useState([]);
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
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
    const startDate = moment(datesArray[0].$d).format("DD-MM-YYYY");
    const endDate = moment(datesArray[1].$d).format("DD-MM-YYYY");

    // Perform your desired operations with the start and end dates
    //console.log("Start Date:", startDate);
    //console.log("End Date:", endDate);
  };

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
    setOpenMenuId(rowId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
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

  const userOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "16", label: "a1 a1" },
    // Add more options here
  ];

  const sourceOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "AUTHORIZED.NET", label: "Authorized.net" },
    { value: "OFFLINE", label: "Offline" },
    { value: "CASH", label: "Cash" },
  ];

  const subscriptionOptions = [
    { value: "subscription", label: "Subscriptions" },
  ];

  const getFilteredOrders = async () => {
    setListItems([]);
    SetIsLoading(true);
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-all-subsription-orders?page=${page}${params.search.replace(
          /\?/g,
          "&"
        )}`
      );
      setPageCount(Math.ceil(res.data.data.total / res.data.data.per_page));
      setTotalItems(res.data.data.total);
      SetIsLoading(false);
      setListItems(res.data.data.data);
    } catch (error) {
      SetIsLoading(false);
    }
  };
  useEffect(() => {
    getFilteredOrders();
  }, [page]);
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
  ]);

  useEffect(() => {
    getFilteredOrders();
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
  const handleAddCustomer = (e, value) => {
    const id = value?.split(". ")[0];
    setUser_id(id);
    setCusName(value);
    //
  };

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
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Sales - Subscription Orders</h6>
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
              </Grid>
              {/* <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormGroup>
                    {subscriptionOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        control={
                          <Checkbox
                            id={option.value}
                            name={option.value}
                            value={option.value}
                            checked={subscriptionChecked}
                            onChange={(e) =>
                              setSubscriptionChecked(e.target.checked)
                            }
                          />
                        }
                        label={option.label}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </Grid> */}
            </div>
          </section>
          {/* End Filter */}
          <br />
          <div className="orders-section">
            {/* Orders Start*/}
            <div className="order-head">
              <Typography variant="h1">
                Subscription Orders (Total:- {totalItems}){" "}
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

                      {isLoading ? (
                        <TableRow>
                          <TableCell>Loading...</TableCell>
                        </TableRow>
                      ) : (
                        listItems?.map((row, index) => (
                          <>
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
                                  <a
                                    className="text-info font-weight-bold"
                                    href={`${IMAGEURL}${row?.invoice_pdf}`}
                                    target="_black"
                                  >
                                    {row?.invoice_no}
                                  </a>

                                  <p className="mb-1">{row.order_type}</p>

                                  {row.back_order == 2 && (
                                    <p className="mb-1">Back order</p>
                                  )}

                                  {row.pickup_order == 1 && (
                                    <p className="mb-1">Pickup order</p>
                                  )}

                                  {row.in_store == 1 && (
                                    <p className="mb-1">In Store order</p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "100px" }}>
                                  {
                                    getNormalDateAndTime(row.created_at)
                                      .normalDate
                                  }
                                  <br />
                                  {
                                    getNormalDateAndTime(row.created_at)
                                      .normalTime
                                  }
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "100px" }}>
                                  <p className="mb-1"> {row.order_no}</p>
                                </div>
                                {row?.subscription_no && (
                                  <>
                                    {" "}
                                    Subs No.{" "}
                                    {row.subscription_no
                                      ? row.subscription_no
                                      : "-"}
                                  </>
                                )}
                              </TableCell>
                              <TableCell>
                                <div>{row.items.length}</div>
                              </TableCell>

                              <TableCell>
                                <div
                                  style={{
                                    width: "180px",
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
                              <TableCell>
                                <div style={{ width: "150px" }}>
                                  <span
                                    className={
                                      row.order_status === "Pending"
                                        ? "pending"
                                        : "success"
                                    }
                                  >
                                    {row?.order_status}
                                  </span>
                                  <br></br>
                                  <p className="mb-1 mt-1">
                                    <b>Shipping Charge:</b> $
                                    {row?.shipping_charge}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "100px" }}>
                                  <span
                                    className={
                                      row?.payment_status == "Un-Paid"
                                        ? "pending"
                                        : "success"
                                    }
                                  >
                                    {row?.payment_status}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
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
                                  open={openMenuId === row.id}
                                  onClose={handleMenuClose}
                                  // PaperProps={{
                                  //   style: {
                                  //     maxHeight: 120,
                                  //   },
                                  // }}
                                >
                                  {/* <MenuItem onClick={handleMenuClose}>
                              <EditOutlined sx={{ marginRight: 1 }} />
                              Edit
                            </MenuItem> */}

                                  <MenuItem aria-label="View order details">
                                    <Link
                                      to={`/admin/Admin/view-order-details/${row.id}`}
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

                                  <MenuItem
                                    onClick={() => reviewAlertMail(row)}
                                  >
                                    <small>
                                      <NotificationsActiveIcon
                                        sx={{ marginRight: 1 }}
                                      />
                                      Review Alert
                                    </small>
                                  </MenuItem>
                                  <MenuItem onClick={() => deleteOrder(row.id)}>
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
                                      setNote({
                                        ...note,
                                        order_id: row.id,
                                        added_by: auth,
                                      });
                                    }}
                                  >
                                    <small>
                                      <EditNoteIcon sx={{ marginRight: 1 }} />
                                      Staff Note
                                    </small>
                                  </MenuItem>

                                  <MenuItem onClick={() => orderMail(row)}>
                                    <small>
                                      <MailOutlineIcon
                                        sx={{ marginRight: 1 }}
                                      />
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
                                          setStaffNote(event.target.value)
                                        }
                                      />
                                      <div className="popup-buttons">
                                        <button
                                          className="popup-button"
                                          onClick={() => {
                                            // Perform any necessary action with the staff note value

                                            handleSaveNoteClick();
                                            // Hide the popup
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
                                                : row.in_store == 1
                                                ? "In Store Order"
                                                : "Shipping Details"}
                                            </TableCell>

                                            <TableCell>Supplier</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {row.items.map((elem, index) => (
                                            <TableRow key={index}>
                                              <TableCell>
                                                {row?.items
                                                  ?.thumbnail_compress ? (
                                                  <img
                                                    src={
                                                      JSON.parse(
                                                        row?.items
                                                          ?.thumbnail_compress
                                                      ).image_urls["100px"]
                                                    }
                                                    alt="User"
                                                  />
                                                ) : (
                                                  <div className="default-user-image">
                                                    <img
                                                      src={`${IMAGEURL}${elem?.product?.thumbnail}`}
                                                      alt="Default User"
                                                      style={{
                                                        width: "40px",
                                                        height: "auto",

                                                        marginRight: "15px",
                                                      }}
                                                    />
                                                  </div>
                                                )}
                                                {elem?.product?.product_name}
                                              </TableCell>
                                              <TableCell>
                                                {elem.unit ? elem.unit : "-"}
                                              </TableCell>
                                              <TableCell>
                                                {elem.quantity}
                                              </TableCell>

                                              <TableCell>
                                                <span
                                                  style={{
                                                    textDecorationLine:
                                                      elem?.price &&
                                                      "line-through",
                                                    marginRight: "15px",
                                                  }}
                                                >
                                                  $
                                                  {elem?.product?.selling_price}
                                                </span>
                                                {elem?.price && (
                                                  <span> ${elem?.price}</span>
                                                )}
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
                                                    {row.pickup_address ?? "-"}{" "}
                                                  </div>
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

export default SubscriptionOrders;
