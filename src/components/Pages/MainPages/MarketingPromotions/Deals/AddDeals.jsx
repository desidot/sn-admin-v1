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
  OutlinedInput,
  Modal,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupons,
  getAllActiveProducts,
} from "../../../../../redux/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { APIBASE } from "../../../../auth/apiConfig";
import { useParams } from "react-router-dom";
import { IoGameController } from "react-icons/io5";

const initialState = {
  name: "",
  product_id: [],
  valid_from: "",
  valid_to: "",
  mode: "",
  amount: "",
};
const AddDeals = () => {
  const [currDeal, setCurrDeal] = useState({});
  const [state, setState] = useState(initialState);
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [listItems, setListItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const idToName = new Map(
    listItems?.map((item) => [item.id, item.product_name])
  );

  const allActiveProducts = useSelector(
    (state) => state.cart.allActiveProducts
  );
  //---edit------
  const search = useParams();

  const getCurrDeal = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/deals/${search.id}`);
      setCurrDeal(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    if (search.id) {
      getCurrDeal();
    }
  }, [search]);

  useEffect(() => {
    if (currDeal?.name) {
      setState({
        ...state,
        name: currDeal.name,
        valid_from: currDeal?.valid_from?.split("T")[0],
        valid_to: currDeal?.valid_to?.split("T")[0],
        amount: currDeal.amount,
        mode: currDeal.mode,
      });
      if (currDeal.products) {
        setProducts(currDeal?.products?.map((elem) => elem.id));
      }
    }
  }, [currDeal]);

  //---add--------

  useEffect(() => {
    setListItems(allActiveProducts);
  }, [allActiveProducts]);

  useEffect(() => {
    dispatch(getAllActiveProducts());
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProducts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (products.length >= 0) {
      setState({ ...state, product_id: products });
    }

    setData(
      products
        ?.map((id) => ({ id, name: idToName?.get(id) }))
        .filter((item) => item.name !== undefined)
    );
  }, [products]);

  const supplierOptions = [
    { value: "Fixed", label: "Amount" },
    { value: "Percent", label: "Percent" },
  ];

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSaveClick = async () => {
    if (search.id) {
      try {
        await axios.put(`${APIBASE}admin/deals/${search.id}`, state);
        toast.success("Deal updated successfully.", { autoClose: 400 });
        window.history.go(-1);
      } catch (error) {
        toast.error("Error!");
      }
    } else {
      try {
        await axios.post(`${APIBASE}admin/deals`, state);
        toast.success("Deal added successfully.", { autoClose: 400 });
        window.history.go(-1);
      } catch (error) {
        toast.error("Error!");
      }
    }
    // dispatch(createCoupons(state));
  };
  const handleRemoveThisProd = (id) => {
    setProducts(products?.filter((elem) => elem !== id));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Promotions - Add Deal</h6>
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
            <Typography variant="h1">Add Deal Information</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  Deal Name :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Deal name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
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
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="fromDate">
                  From Date :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
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
                <InputLabel htmlFor="toDate">
                  To Date :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
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
                <InputLabel htmlFor="">
                  Discount (%) :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
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
                <InputLabel htmlFor="">
                  Amount / Percent :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  {/* <InputLabel htmlFor="">Select Type</InputLabel> */}
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
                    <MenuItem value="">Select Type</MenuItem>
                    {supplierOptions?.map((option) => (
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
                    className="cancel-btn"
                    onClick={() => window.history.go(-1)}
                    variant="contained"
                    style={{ marginRight: "15px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="submit-btn"
                    onClick={() => handleSaveClick()}
                    variant="contained"
                    disabled={
                      state.product_id.length == 0 ||
                      state.name == "" ||
                      state.valid_from == "" ||
                      state.valid_to == "" ||
                      state.amount == "" ||
                      state.mode == "" ||
                      products.length == 0
                    }
                  >
                    Save
                  </Button>
                </div>
              </Grid>
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
            {data?.map((row, index) => (
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

export default AddDeals;
