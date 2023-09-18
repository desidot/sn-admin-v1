import React, { useState, useEffect } from "react";
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
import {
  getAllActiveProducts,
  postSubsDiscount,
} from "../../../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APIBASE } from "../../../../auth/apiConfig";
import { toast } from "react-toastify";

// import "./WishList.css";
const initialState = {
  category_ids: [],
  discount_type: "",
  discount: "",
  months: "",
};
const AddSubscriptionDiscount = () => {
  const [currDis, setCurrDis] = useState({});

  const [data, setData] = useState(initialState);
  const [listItems, setListItems] = useState([]);
  const [products, setProducts] = React.useState([]);
  const [dataIn, setDataIn] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const search = useParams();
  const [saving,setSaving]=useState(false)
  const dispatch = useDispatch();
  const allActiveProducts = useSelector(
    (state) => state.cart.allActiveProducts
  );

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${APIBASE}admin/categories`)
      .then((response) => {
        setCategoryOptions(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        //console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    setListItems(allActiveProducts);
  }, [allActiveProducts]);

  const idToName = new Map(
    listItems?.map((item) => [item.id, item.product_name])
  );

  const getCurrDis = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/subcriptionDiscounts/${search.id}`
      );
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
    if (currDis?.discount_type) {
      setData({
        ...data,
        months: currDis.months,
        discount: currDis.discount,
        discount_type: currDis.discount_type,
      });
      if (currDis.products) {
        const productsArr = currDis.products;

        // Extract category names
        const categoryNames = productsArr.map((product) => product.category);

        // Remove duplicates using Set
        const distinctCategoryNames = [...new Set(categoryNames)];

        const matchingIds = categoryOptions
          .filter((obj) => distinctCategoryNames.includes(obj.name))
          .map((obj) => obj.id);

        setProducts(matchingIds);
      }
    }
  }, [currDis]);

  // Define dynamic menu items
  const shippingOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
  ];

  const supplierOptions = [
    { value: "", label: "Select One" },
    { value: 1, label: "1 month" },
    { value: 3, label: "3 months" },
  ];

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  // const handleAddProducts = (value) => {
  //   const ids = value?.map((elem) => elem.id.toString());
  //   setData({ ...data, product_id: JSON.stringify(ids) });
  // };

  const updateDis = async () => {
    setSaving(true)
    try {
      await axios.put(
        `${APIBASE}admin/subcriptionDiscounts/${search.id}`,
        data
      );
      toast.success("Updated successfully.");
      setSaving(false)
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.message)
      setSaving(false)
    }
  };

  const handleSaveClick = () => {
    if (search.id) {
      updateDis();
      setData(initialState);
      setProducts([]);
    } else {
      dispatch(postSubsDiscount(data));
      setData(initialState);
      setProducts([]);
    }
    setData(initialState);
    setProducts([]);
    // window.history.go(-1);
  };
  useEffect(() => {
    if (products.length >= 0) {
      setData({ ...data, category_ids: products });
    }
    // setDataIn(
    //   products
    //     ?.map((id) => ({ id, name: idToName?.get(id) }))
    //     .filter((item) => item.name !== undefined)
    // );
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Promotions - Discounts - {search.id ? "Edit" : "Add"} Subscription
            Discounts
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
            <Typography variant="h1">
              {search.id ? "Edit" : "Add"} Subscription Discount Information{" "}
            </Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  Type :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    id="shipping"
                    name="shipping"
                    value={data.discount_type}
                    onChange={(e) =>
                      setData({ ...data, discount_type: e.target.value })
                    }
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="Fixed">Fixed</MenuItem>
                    <MenuItem value="Percent">Percent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Months :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="" className="custom-inputlabel">Please Select</InputLabel>
                  <Select
                    id="supplier"
                    name="supplier"
                    value={data.months}
                    onChange={(e) =>
                      setData({ ...data, months: e.target.value })
                    }
                  >
                    {/* Dynamic menu items */}
                    {supplierOptions.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  style={{ display: "block" }}
                  id="demo-multiple-name-label"
                >
                   Categories :
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>*</span>{" "}
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
                    
                  )}*/}
                </InputLabel>
                <FormControl fullWidth>
                  <InputLabel
                    style={{ display: "block" }}
                    id="demo-multiple-name-label"
                    className="custom-inputlabel"
                  >
                    Select Categories (multiple)
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
                    {categoryOptions?.map((elem, index) => (
                      <MenuItem key={index} value={elem.id}>
                        {elem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Discount:
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter discount"
                    onChange={(e) =>
                      setData({ ...data, discount: e.target.value })
                    }
                    type="number"
                    value={data.discount}
                  />
                </FormControl>
              </Grid>

              {/* Submit button */}
              <div
                className="add-wishlist-submit-btn"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Button
                  className="submit-btn"
                  onClick={handleSaveClick}
                  variant="contained"
                  disabled={
                    data.discount == "" ||
                    data.months == "" ||
                    data.discount_type == "" ||
                    data.category_ids.length == 0 ||
                    products.length == 0
                  }
                >
                 {saving?"Saving":"Save"}
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

export default AddSubscriptionDiscount;
