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
} from "@mui/material";
import "./Meta.css";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const initialState = {
  page_name: "",
  meta_title: "",
  meta_keyword: "",
  meta_description: "",
};
const AddMeta = () => {
  const search = useParams();
  const [state, setState] = useState(initialState);
  const shippingOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "About Us" },
    { value: "blog", label: "Blog" },
    { value: "cart", label: "Cart" },
    { value: "cart product", label: "Cart Product" },
    { value: "checkout", label: "Checkout" },
    { value: "contact us", label: "Contact Us" },
    { value: "payment", label: "Payment" },
    { value: "search result", label: "Search Result" },
    { value: "success", label: "Success" },
  ];

  const getCurrMeta = async (id) => {
    try {
      const res = await axios.get(`${APIBASE}admin/metas/${id}`);
      setState({
        ...state,
        page_name: res.data.data.page_name,
        meta_title: res.data.data.meta_title,
        meta_description: res.data.data.meta_description,
        meta_pixels: res.data.data.meta_pixels,
        meta_keyword: res.data.data.meta_keyword,
      });
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    if (search.id) {
      getCurrMeta(search.id);
    }
  }, [search]);
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  const handleSaveClick = async () => {
    if (search.id) {
      try {
        await axios.put(`${APIBASE}admin/metas/${search.id}`, state);
        toast.success("Meta updated successfully.");
        window.history.go(-1);
      } catch (error) {
        toast.error("Error!");
      }
    } else {
      try {
        await axios.post(`${APIBASE}admin/metas`, state);
        toast.success("Meta added successfully.");
        window.history.go(-1);
      } catch (error) {
        toast.error("Error!");
      }
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
            Administrative - Website Setup - {search.id ? "Edit" : "Add"} Meta
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
              {search.id ? "Edit" : "Add"} Meta
            </Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel>Page :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="shipping">Select Page</InputLabel>
                  <Select
                    id="shipping"
                    name="shipping"
                    value={state.page_name}
                    onChange={(e) =>
                      setState({ ...state, page_name: e.target.value })
                    }
                  >
                    {shippingOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="fromDate">Meta Title :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    id="fromDate"
                    type="text"
                    placeholder="meta title"
                    className="task-date-input"
                    value={state.meta_title}
                    onChange={(e) =>
                      setState({ ...state, meta_title: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Keywords :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Keywords"
                    value={state.meta_keyword}
                    onChange={(e) =>
                      setState({ ...state, meta_keyword: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Meta Description :</InputLabel>
                <FormControl fullWidth>
                  <textarea
                    placeholder=""
                    value={state.meta_description}
                    onChange={(e) =>
                      setState({ ...state, meta_description: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Meta Pixels :</InputLabel>
                <FormControl fullWidth>
                  <textarea
                    placeholder=""
                    value={state.meta_pixels}
                    onChange={(e) =>
                      setState({ ...state, meta_pixels: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
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

export default AddMeta;
