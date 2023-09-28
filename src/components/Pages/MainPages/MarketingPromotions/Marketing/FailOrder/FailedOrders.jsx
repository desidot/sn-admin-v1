import React, { useEffect, useState } from "react";
import {
  Typography,
  // Grid,
  // FormControl,
  // Select,
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
  OutlinedInput,
  InputAdornment,
  InputLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import "./FailedOrder.css";
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
// import ProductImg from "../../../../../../assets/products/spray-product.jpg";
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

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const { RangePicker } = DatePicker;
const initialNote = {
  order_id: "",
  title: "Staff Notes",
  note: "",
  added_by: "",
};
const FailedOrders = () => {
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

  const dispatch = useDispatch();
  const [user_id, setUser_id] = useState("");
  const allCustomers = useSelector((state) => state.cart.allCustomers);
  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

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
      const res = await axios.get(`${APIBASE}admin/failed-orders?page=${page}`);
      setPageCount(Math.ceil(res.data.data.total / res.data.data.per_page));
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
    if (user_id) {
      obj.user = user_id;
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
    user_id,
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
          <h6 style={{ margin: "5px" }}>
            Promotion - Marketing - All Failed Orders
          </h6>
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
          {/* End Filter */}
          <br />
          <div className="orders-section">
            {/* Orders Start*/}
            <div className="order-head">
              <Typography variant="h1">All Failed Orders</Typography>

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
                                <div variant="body1">
                                  <Link to="">{row.invoice_no}</Link>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "80px" }} variant="body1">
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
                                <div
                                  style={{
                                    width: "150px",
                                    textAlign: "center",
                                  }}
                                  className="mt-2"
                                >
                                  <p>{row?.order_no}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div variant="body1">{row?.items.length}</div>
                              </TableCell>
                              <TableCell>
                                {JSON.parse(row?.shipping_address).phone ? (
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
                                  <span>Pickup Order</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <b variant="body1">${row?.grand_total}</b>
                              </TableCell>
                              <TableCell>
                                <div variant="body1" style={{ width: "140px" }}>
                                  <b>
                                    Coupon: $
                                    {row.coupon ? row?.coupon_discount : 0}
                                  </b>
                                  <br />
                                  <b>Discounted: $ {row.grand_total}</b>
                                </div>
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
                              </TableCell>
                              <TableCell>
                                <div variant="body1" style={{ width: "80px" }}>
                                  <span
                                    style={{ width: "120px" }}
                                    className={
                                      row?.payment_status === "Un-Paid"
                                        ? "pending"
                                        : "success"
                                    }
                                  >
                                    {" "}
                                    {row?.payment_status}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div style={{ width: "100px" }}>
                                  {row?.payment_method} <br /> <br />{" "}
                                  {row?.transaction_id ?? ""}
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
                                        <TableHead className="orders-table-head-row font-weight-bold">
                                          <TableRow className="info">
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Unit</TableCell>

                                            <TableCell>Qty</TableCell>

                                            <TableCell>Price</TableCell>

                                            <TableCell>
                                              Shipping Details
                                            </TableCell>

                                            <TableCell>Supplier</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {row.items.map((elem, index) => (
                                            <TableRow key={index}>
                                              <TableCell>
                                                <img
                                                  alt="user"
                                                  src={`${IMAGEURL}${elem?.product?.thumbnail}`}
                                                  style={{
                                                    width: "40px",
                                                    height: "auto",

                                                    marginRight: "15px",
                                                  }}
                                                />
                                                {elem?.product?.product_name}
                                              </TableCell>
                                              <TableCell>
                                                {elem.unit ? elem.unit : "-"}
                                              </TableCell>
                                              <TableCell>
                                                {elem.quantity}
                                              </TableCell>

                                              <TableCell>
                                                ${elem.product?.selling_price}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  JSON.parse(
                                                    row?.shipping_address
                                                  ).address
                                                }
                                                ,
                                                {
                                                  JSON.parse(
                                                    row?.shipping_address
                                                  ).city
                                                }
                                                ,
                                                {
                                                  JSON.parse(
                                                    row?.shipping_address
                                                  ).flat_apartment
                                                }
                                                ,
                                                {
                                                  JSON.parse(
                                                    row?.shipping_address
                                                  ).street
                                                }
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

export default FailedOrders;
