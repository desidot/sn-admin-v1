import React from "react";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  Typography,
  FormControl,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  title: "",

  image: "",

  image_url: "",
};

const AddCenterAds = () => {
  const [state, setState] = useState(initialState);
  const search = useParams();
  const navigate = useNavigate();
  const getCurrentAds = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/promosbanner/${search.id}`);
      setState(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    if (search.id) {
      getCurrentAds();
    }
  }, [search]);
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleFileUploadGallary = (event) => {
    const file = event.target.files[0];
    // Perform the upload logic here;
    setState({ ...state, image: file });
  };

  const addAds = async (data) => {
    try {
      await axios.post(
        `${APIBASE}admin/promosbanner/${search.id}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      toast.success("Ads added successfully.");
      window.history.go(-1);
    } catch (error) {
      //console.log(error);
      toast.error("Error!");
    }
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    formData.append("title", state?.title);

    formData.append("image", state?.image);
    // formData.append("_method", "PUT");
    formData.append("image_url", state?.image_url);

    addAds(formData);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Promotions -{search.id ? "Edit Center Ads" : "Add Center Ads"}
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
      <div className="add-profiles-main">
        <section className="filter-section">
          <div className="filter-head-products">
            <Typography variant="h1">
              {search.id ? "Edit Center Ads" : "Add Center Ads"}
            </Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor=""> Title :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter title"
                    value={state.title}
                    onChange={(e) =>
                      setState({ ...state, title: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="input-field">
                  <InputLabel>Image (1920 × 741 px) :</InputLabel>
                  <input type="file" onChange={handleFileUploadGallary} />
                </div>
                {search.id && typeof state.image == "string" && (
                  <div
                    style={{
                      width: "auto",
                      height: "60px",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      style={{ width: "auto", height: "60px" }}
                      src={`${IMAGEURL}${state.image}`}
                    />
                  </div>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Image url:</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Image url"
                    value={state.image_url}
                    onChange={(e) =>
                      setState({ ...state, image_url: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Headline :</InputLabel>
                <FormControl fullWidth>
                  <TextField placeholder="Headline"  value={state.head} onChange={(e)=>setState({...state,title:e.target.value})} />
                </FormControl>
              </Grid> */}
            </Grid>
          </div>
          {/* Submit button */}
          <div className="add-product-save-btn" style={{ padding: "1rem" }}>
            <Button
              className="save-btn"
              variant="contained"
              onClick={() => handleSaveClick()}
            >
              {search.id ? "Save" : "Add"}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddCenterAds;
