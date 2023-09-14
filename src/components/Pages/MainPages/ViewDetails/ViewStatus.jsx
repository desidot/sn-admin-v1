import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  FormControlLabel,
  Radio,
  FormControl,
  styled,
  Switch,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Modal,
  Box,
} from "@mui/material";

import TextArea from "antd/es/input/TextArea";
import "./OrderDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";

const initialState = {
  order_id: "",
  user_id: "",
  status: "",

  verify_code: "",
  picked_up: "",
  tracking_code: "",
  courier_name: "",
  expected_date: "",
  person_name: "",
  person_phone: "",
  tracking_code_d: "",
  expected_date_d: "",
  image: "",
  notify: "yes",

  received_by: "",
  recieved_person_id: "",
  received_date: "",
  customer_photo: "",

  notes: "",
  generate_by: "",
};

const ViewAndUpdateStatus = () => {
  const search = useParams();
  const auth = useSelector((state) => state.auth);
  const [state, setState] = useState(initialState);
  const [order, setOrder] = useState({});
  const [history, setHistory] = useState([]);
  const [img, setImg] = useState("");
  const navigate = useNavigate();
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = (record) => {
    setImg(record.customer_photo);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getLastUpdate = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-last-order-process-by-order-id/${search.id}`
      );

      setState({ ...state, status: res.data.data.status });
    } catch (error) {
      //console.log(error);
    }
  };

  //console.log(state);

  useEffect(() => {
    getLastUpdate();
    if (order.billing_address && order.shipping_address) {
      setState({
        ...state,
        user_id: order.user_id,
        order_id: order.id,
        generate_by: auth.user.data.name,
      });

      getHistory();
    }
  }, [order]);

  const [brandValue, setShippingValue] = useState("");
  const [radioValue1, setRadioValue1] = useState("");

  const handleRadioChange1 = (event) => {
    setRadioValue1(event.target.value);
  };

  const getHistory = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-order-process-by-order-id/${order.id}`
      );
      setHistory(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };

  const processOrder = async () => {
    if (state.status === "delivered") {
      const formData = new FormData();
      formData.append("received_by", state?.received_by);
      formData.append("recieved_person_id", state?.recieved_person_id);
      formData.append("received_date", state?.received_date);
      formData.append("customer_photo", state?.customer_photo);
      formData.append("order_id", state?.order_id);
      formData.append("generate_by", state?.generate_by);
      formData.append("user_id", state?.user_id);
      formData.append("status", state?.status);
      formData.append("notes", state?.notes);
      formData.append("notify", state?.notify);
      try {
        await axios.post(`${APIBASE}admin/orderprocess`, formData);
        toast.success("Order Processed Successfully.");
        getHistory();
        getLastUpdate();
      } catch (error) {
        //console.log(error);
        toast.error("Error !");
      }
    } else {
      try {
        await axios.post(`${APIBASE}admin/orderprocess`, state);
        toast.success("Order Processed Successfully.");
        getHistory();
        getLastUpdate();
      } catch (error) {
        //console.log(error);
        toast.error("Error !");
      }
    }
  };

  const handleAddOrderHistory = () => {
    if (state.status == "pending") {
      state.courier_name = "";
      state.expected_date = "";
      state.expected_date_d = "";
      state.person_name = "";
      state.person_phone = "";
      state.picked_up = "";
      state.received_by = "";
      state.received_date = "";
      state.recieved_person_id = "";
      state.tracking_code = "";
      state.tracking_code_d = "";
      state.verify_code = "";
    } else if (state.status == "confirm") {
      state.courier_name = "";
      state.expected_date = "";
      state.expected_date_d = "";
      state.person_name = "";
      state.person_phone = "";
      state.picked_up = "";
      state.received_by = "";
      state.received_date = "";
      state.recieved_person_id = "";
      state.tracking_code = "";
      state.tracking_code_d = "";
    } else if (state.status == "collected") {
      state.courier_name = "";
      state.expected_date = "";
      state.expected_date_d = "";
      state.person_name = "";
      state.person_phone = "";
      state.picked_up = "";
      state.received_by = "";
      state.received_date = "";
      state.recieved_person_id = "";
      state.tracking_code = "";
      state.tracking_code_d = "";
      state.verify_code = "";
    } else if (state.status == "pickedup") {
      if (radioValue1 == "courier") {
        state.tracking_code_d = "";
        state.verify_code = "";
        state.expected_date_d = "";
        state.person_name = "";
        state.person_phone = "";
        state.received_by = "";
        state.received_date = "";
        state.recieved_person_id = "";
      } else {
        state.courier_name = "";
        state.expected_date = "";

        state.received_by = "";
        state.received_date = "";
        state.recieved_person_id = "";
        state.tracking_code = "";

        state.verify_code = "";
      }
    } else if (state.status == "delivered") {
      state.courier_name = "";
      state.expected_date = "";
      state.expected_date_d = "";
      state.person_name = "";
      state.person_phone = "";
      state.picked_up = "";
      state.tracking_code = "";
      state.tracking_code_d = "";
      state.verify_code = "";
    }

    setState({
      ...state,
      user_id: order.user_id,
      order_id: order.id,
      generate_by: auth.user.data.name,
    });

    processOrder();
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform the upload logic here;
    setState({ ...state, customer_photo: file });
  };
  // Define dynamic menu items
  const shippingOptions = [
    { value: "", label: "Select One" },
    { value: "pending", label: "Pending" },
    { value: "confirm", label: "Ready for Collection" },
    { value: "collected", label: "Collected" },
    { value: "pickedup", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];

  useEffect(() => {
    setState({ ...state, status: brandValue });
  }, [brandValue]);
  useEffect(() => {
    setState({ ...state, picked_up: radioValue1 });
  }, [radioValue1]);

  const renderAdditionalFields = () => {
    if (brandValue === "confirm") {
      return (
        <div className="status-inputs">
          <InputLabel>Verify Code:</InputLabel>
          <TextField
            value={state.verify_code}
            onChange={(e) =>
              setState({ ...state, verify_code: e.target.value })
            }
          />
        </div>
      );
    } else if (brandValue === "pickedup") {
      return (
        <div className="delivery-type">
          <Radio
            checked={radioValue1 === "courier"}
            onChange={handleRadioChange1}
            value="courier"
          />
          <InputLabel>Courier:</InputLabel>

          <Radio
            checked={radioValue1 === "delivery"}
            onChange={handleRadioChange1}
            value="delivery"
          />
          <InputLabel>Delivery Boy:</InputLabel>
        </div>
      );
    } else if (brandValue === "delivered") {
      return (
        <div className="status-inputs">
          <InputLabel>Upload Image:</InputLabel>
          <TextField type="file" onChange={(e) => handleImageUpload(e)} />
          <InputLabel>Received By:</InputLabel>
          <TextField
            value={state.received_by}
            onChange={(e) =>
              setState({ ...state, received_by: e.target.value })
            }
          />
          <InputLabel>ID Proof:</InputLabel>
          <TextField
            value={state.recieved_person_id}
            onChange={(e) =>
              setState({ ...state, recieved_person_id: e.target.value })
            }
          />
          <InputLabel>Date:</InputLabel>
          <TextField
            type="date"
            onChange={(e) =>
              setState({ ...state, received_date: e.target.value })
            }
            value={state.received_date}
          />
        </div>
      );
    }
    return null;
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const handleNotiChange = (e) => {
    const newNotify = e.target.checked ? "yes" : "no";

    setState({ ...state, notify: newNotify });
  };
  //console.log(history);
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
  return (
    <>
      <div className="order-details-main-container">
        <div className="card-header">
          <h3 className="card-title">
            Order Status{" "}
            <span style={{ color: "#0000FF" }}>{order?.order_no}</span>
          </h3>

          {/* Buttons */}
          <div className="tabs-butons">
            <Link to={`/admin/Admin/view-order-details/${search.id}`}>
              <Button variant="contained">Details</Button>
            </Link>
            <Link to={`/admin/Admin/view-invoice-details/${search.id}`}>
              <Button variant="contained">Invoice</Button>
            </Link>
            <Button variant="contained" style={{ backgroundColor: "#1976d2" }}>
              Status
            </Button>
            {/* <Button variant="contained">Notes</Button> */}
            <Link to={`/admin/Admin/view-and-take-notes/${search.id}`}>
              <Button variant="contained">Notes</Button>
            </Link>
          </div>
          {/* Buttons End*/}
        </div>
        <div className="order-status-table">
          {/* Order Details Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>DATE ADDED</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell>CUSTOMER NOTIFIED</TableCell>
                  <TableCell>COMMENT</TableCell>
                  <TableCell>GENERATED BY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {getNormalDateAndTime(record?.created_at).normalDate}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {record?.status}
                      {record.customer_photo && (
                        <span
                          style={{
                            marginLeft: "15px",
                            color: "blue",
                            fontWeight: "500",
                            cursor: "pointer",
                            textDecorationLine: "underline",
                          }}
                          onClick={() => handleOpen(record)}
                        >
                          View
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{record?.notify}</TableCell>
                    <TableCell>{record?.notes} </TableCell>
                    <TableCell>{record?.generate_by} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="status-body">
          <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
            <Grid item xs={12}>
              <InputLabel htmlFor="shipping">Order Status :</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="shipping"
                  name="shipping"
                  value={state?.status}
                  onChange={(e) => setShippingValue(e.target.value)}
                >
                  {shippingOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {renderAdditionalFields()}

          {radioValue1 &&
            brandValue == "pickedup" &&
            (radioValue1 === "courier" ? (
              <div className="status-inputs">
                <InputLabel required>Tracking Code:</InputLabel>
                <TextField
                  placeholder="Tracking Code"
                  value={state.tracking_code}
                  onChange={(e) =>
                    setState({ ...state, tracking_code: e.target.value })
                  }
                />
                <InputLabel required> Courier Name:</InputLabel>
                <TextField
                  value={state.courier_name}
                  placeholder="Courier name"
                  onChange={(e) =>
                    setState({ ...state, courier_name: e.target.value })
                  }
                />
                <InputLabel>Expected Date:</InputLabel>
                <TextField
                  value={state.expected_date}
                  type="date"
                  onChange={(e) =>
                    setState({ ...state, expected_date: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="status-inputs">
                <InputLabel required>Name:</InputLabel>
                <TextField
                  placeholder="name"
                  value={state?.person_name}
                  onChange={(e) =>
                    setState({ ...state, person_name: e.target.value })
                  }
                />
                <InputLabel required>Phone:</InputLabel>
                <TextField
                  placeholder="phone"
                  value={state?.person_phone}
                  type="tel"
                  onChange={(e) =>
                    setState({ ...state, person_phone: e.target.value })
                  }
                />
                <InputLabel required>Tracking Code:</InputLabel>
                <TextField
                  placeholder="Tracking code"
                  value={state?.tracking_code_d}
                  onChange={(e) =>
                    setState({ ...state, tracking_code_d: e.target.value })
                  }
                />
                <InputLabel required>Expected Date:</InputLabel>
                <TextField
                  type="date"
                  value={state?.expected_date_d}
                  onChange={(e) =>
                    setState({ ...state, expected_date_d: e.target.value })
                  }
                />
              </div>
            ))}

          <div className="input-field">
            <Grid item xs={12} className="ref-toggle">
              <FormControlLabel
                label="Notify Customer:"
                labelPlacement="start"
                style={{
                  margin: "0rem 0 2rem 0",
                }}
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={state?.notify === "yes" ? true : false}
                    onChange={(e) => handleNotiChange(e)}
                  />
                }
              />
            </Grid>
            <InputLabel>Comment :</InputLabel>
            <TextArea
              placeholder="Write a Comment..."
              value={state?.notes}
              onChange={(e) => setState({ ...state, notes: e.target.value })}
            />
          </div>
        </div>
        {/* Submit button */}
        <div className="status-container">
          <div className="add-order-status-btn" style={{ padding: "1rem" }}>
            <Button
              className="save-btn"
              variant="contained"
              onClick={handleAddOrderHistory}
            >
              Add Order History
            </Button>
          </div>
          <div className="allsales-addmore-button" style={{ padding: "1rem" }}>
            <Button
              className="save-btn"
              variant="contained"
              onClick={() => navigate("/admin/Sales/all-orders")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid gray",
            borderRadius: "6px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            style={{
              width: "60%",
              margin: "auto",
              backgroundColor: "lightgray",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <img
              src={`${IMAGEURL}${img}`}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid grey",
                borderRadius: "4px",
              }}
              alt=""
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewAndUpdateStatus;
