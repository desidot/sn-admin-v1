import React, { useState } from "react";
import {
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { createCoupons } from "../../../../../redux/cartSlice";

const initialState = {
  name: "",
  code: "",
  valid_from: "",
  valid_to: "",
  mode: "",
  amount: "",
  status: true,
  one_per_user: true,
};
const AddCoupons = () => {
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  // const shippingOptions = [
  //   { value: "", label: "Select One" },
  //   { value: "all", label: "All" },
  //   { value: "pending", label: "Pending Order" },
  //   { value: "confirm", label: "Ready for Collection" },
  //   { value: "collected", label: "Collected" },
  //   { value: "pickedup", label: "Shipped" },
  //   { value: "delivered", label: "Delivered Orders" },
  // ];

  const supplierOptions = [
    { value: "fixed", label: "Amount" },
    { value: "percent", label: "Percent" },
  ];

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSaveClick = () => {
    //console.log(state)
    dispatch(createCoupons(state));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Promotions - Add Coupons</h6>
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
      <div className="add-products-main">
        <section className="filter-section">
          <div className="filter-head-products">
            <Typography variant="h1">Add Coupon Information</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel>Coupon Title :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Coupon title"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel>Coupon code :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Coupon title"
                    value={state.code}
                    onChange={(e) =>
                      setState({ ...state, code: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="fromDate">From Date :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    id="fromDate"
                    type="date"
                    className="task-date-input"
                    value={state.valid_from}
                    onChange={(e) =>
                      setState({ ...state, valid_from: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="toDate">To Date :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    id="toDate"
                    type="date"
                    className="task-date-input"
                    value={state.valid_to}
                    onChange={(e) =>
                      setState({ ...state, valid_to: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="">Discount (%) :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder=""
                    value={state.amount}
                    type="number"
                    onChange={(e) =>
                      setState({ ...state, amount: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="">Amount / Percent :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="">Select Mode</InputLabel>
                  <Select
                    id="supplier"
                    name="supplier"
                    value={state.mode}
                    onChange={(e) =>
                      setState({ ...state, mode: e.target.value })
                    }
                  >
                    {/* Placeholder */}

                    {/* Dynamic menu items */}
                    {supplierOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <div
                  className="add-wishlist-submit-btn"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    className="submit-btn"
                    onClick={() => handleSaveClick()}
                    variant="contained"
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddCoupons;
