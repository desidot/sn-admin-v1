import React, { useEffect, useState } from "react";
import {
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Typography,
  FormControl,
  TextField,
  Autocomplete,
  OutlinedInput,
  Modal,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActiveProducts,
  postDiscount,
} from "../../../../../redux/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APIBASE } from "../../../../auth/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  product_id: [],
  name: "",
  amount: "",
  mode: "",
  valid_from: "",
  valid_to: "",
};
const AddPeriodicDiscount = () => {
  const [currDis, setCurrDis] = useState({});

  const [data, setData] = useState(initialState);
  const [listItems, setListItems] = useState([]);
  const [products, setProducts] = React.useState([]);
  const [dataIn, setDataIn] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const search = useParams();
  const dispatch = useDispatch();
  const allActiveProducts = useSelector(
    (state) => state.cart.allActiveProducts
  );
  const idToName = new Map(
    listItems?.map((item) => [item.id, item.product_name])
  );
  useEffect(() => {
    setListItems(allActiveProducts);
  }, [allActiveProducts]);

  const getCurrDis = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/discounts/${search.id}`);
      setCurrDis(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    if (search.id) {
      getCurrDis();
    }
  }, [search]);

  useEffect(() => {
    if (currDis?.mode) {
      setData({
        ...data,

        amount: currDis.amount,
        mode: currDis.mode,
      });
      if (currDis.products) {
        setProducts(currDis?.products?.map((elem) => elem.id));
      }
    }
  }, [currDis]);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const updateDis = async () => {
    try {
      await axios.put(`${APIBASE}admin/discounts/${search.id}`, data);
      toast.success("updated successfully.");
    } catch (error) {
      //console.log(error);
    }
  };

  const handleSaveData = () => {
    if (search.id) {
      updateDis();
      setData(initialState);
      setProducts([]);
    } else {
      dispatch(postDiscount(data));
      setData(initialState);
      setProducts([]);
    }
  };
  // const handleAddProducts = (value) => {
  //   const ids = value?.map((elem) => elem.id.toString());
  //   setData({ ...data, product_id: "[" + ids.join(",") + "]" });
  // };
  useEffect(() => {
    if (products.length >= 0) {
      setData({ ...data, product_id: products });
    }
    setDataIn(
      products
        ?.map((id) => ({ id, name: idToName?.get(id) }))
        .filter((item) => item.name !== undefined)
    );
  }, [products]);
  useEffect(() => {
    dispatch(getAllActiveProducts());
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProducts(typeof value === "string" ? value.split(",") : value);
  };
  const handleRemoveThisProd = (id) => {
    setProducts(products?.filter((elem) => elem !== id));
  };

  return (
    <>
      {" "}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Promotions - Discounts - Add Periodic Discounts
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
      <div className="add-products-main">
        <section className="filter-section">
          <div className="filter-head-products">
            <Typography variant="h1">Add Periodic Discount</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Discount Amount :{" "}
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter amount"
                    value={data.amount}
                    onChange={(e) =>
                      setData({ ...data, amount: e.target.value })
                    }
                    type="number"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="fromDate">
                  Amount / Percent :{" "}
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    style={{ width: "100%" }}
                    renderValue={(selected) => {
                      if (selected?.length === 0) {
                        return <span>Select Mode</span>;
                      }

                      return selected;
                    }}
                    value={data.mode}
                    displayEmpty
                    onChange={(e) => setData({ ...data, mode: e.target.value })}
                  >
                    <MenuItem value={"percent"}>Percent</MenuItem>
                    <MenuItem value={"fixed"}>Fixed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  style={{ display: "block" }}
                  id="demo-multiple-name-label"
                >
                  Select Products :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>{" "}
                  {products?.length > 0 && (
                    <span>
                      ({products.length} products selected)
                      <span
                        style={{
                          color: "blue",
                          marginLeft: "15px",
                          cursor: "pointer",
                          textDecorationLine: "underline",
                        }}
                        onClick={handleOpen}
                      >
                        View
                      </span>
                    </span>
                  )}
                </InputLabel>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel
                    style={{ display: "block" }}
                    id="demo-multiple-name-label"
                  >
                    Products
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    autoWidth
                    value={products}
                    onChange={handleChange}
                    input={<OutlinedInput label="Products" />}
                  >
                    {listItems?.map((elem, index) => (
                      <MenuItem key={index} value={elem.id}>
                        {elem.product_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <InputLabel htmlFor="fromDate">From Date :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    id="fromDate"
                    type="date"
                    className="task-date-input"
                    value={data.valid_from}
                    onChange={(e) =>
                      setData({ ...data, valid_from: e.target.value })
                    }
                  />
                </FormControl>
              </Grid> */}

              {/* <Grid item xs={12} md={6}>
                <InputLabel htmlFor="toDate">To Date :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    id="toDate"
                    type="date"
                    className="task-date-input"
                    value={data.valid_to}
                    onChange={(e) =>
                      setData({ ...data, valid_to: e.target.value })
                    }
                  />
                </FormControl>
              </Grid> */}

              <div
                className="add-wishlist-submit-btn"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Button
                  onClick={handleSaveData}
                  className="submit-btn"
                  variant="contained"
                  disabled={
                    data.amount == "" || data.mode == "" || products.length == 0
                  }
                >
                  Save
                </Button>
              </div>
            </Grid>
          </div>
        </section>
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
          <div style={{ backgroundColor: "white" }}>
            {dataIn?.map((row, index) => (
              <div
                style={{
                  padding: "5px 10px",
                  borderBottom: "0.5px solid lightgray",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div> {row.name}</div>

                <button
                  style={{
                    background: "none",
                    color: "red",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onClick={() => handleRemoveThisProd(row.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AddPeriodicDiscount;
