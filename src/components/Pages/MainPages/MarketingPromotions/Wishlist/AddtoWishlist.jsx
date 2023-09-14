import React, { useState } from "react";
import {
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Typography,
  FormControl,
  Autocomplete,
  TextField,
} from "@mui/material";

import "./WishList.css";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createWishlist, getAllActiveProducts, getAllCustomers } from "../../../../../redux/cartSlice";
const initialState = {
  user_id: "",
  product_id: "",
};
const AddtoWislist = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const allActiveProducts = useSelector(
    (state) => state.cart.allActiveProducts
  );
  const allCustomers=useSelector((state)=>state.cart.allCustomers)

  useEffect(() => {
    dispatch(getAllActiveProducts());
    dispatch(getAllCustomers());
  }, []);

  const [brandValue, setShippingValue] = useState("");
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

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  const handleAddProducts = (e,value) => {
    const selected=allActiveProducts.filter((elem)=>elem.product_name===value)[0]
    setState({ ...state, product_id: selected.id });

  };
  const handleAddCustomer=(e,value)=>{
    const selected=allCustomers.filter((elem)=>(elem.first_name+" "+elem.last_name)===value)[0]
    setState({...state,user_id:selected.id})
  }
const handleSaveClick=()=>{
  if(state.user_id!='' && state.product_id!=''){
    dispatch(createWishlist(state))
  }

}
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Promotions - Add to Product Wishlist
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
            <Typography variant="h1">Add To Wishlist </Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <InputLabel>User :</InputLabel>
                <FormControl fullWidth>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={allCustomers?.map((option) => option.first_name+" "+option.last_name)}
                    onChange={(e, newValue) =>
                      handleAddCustomer(e,newValue) 
                     }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                      
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <InputLabel htmlFor="">Product :</InputLabel>
                <FormControl fullWidth>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={allActiveProducts?.map((option) => option.product_name)}
                    onInputChange={(e, newValue) =>
                      handleAddProducts(e,newValue) 
                     }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                      
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                {/* Submit button */}
                <div
                  className="add-wishlist-submit-btn"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button className="submit-btn" onClick={()=>handleSaveClick()} variant="contained">
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

export default AddtoWislist;
