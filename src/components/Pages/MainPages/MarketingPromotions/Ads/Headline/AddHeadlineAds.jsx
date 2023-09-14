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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const initialState = {
  title: "",
  brief: "",
  link_text: "",

  url: "",
};

const AddHeadlineAds = () => {
  const [state, setState] = useState(initialState);
  const search = useParams();
  const navigate = useNavigate();
  const getCurrentAds = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/promos/${search.id}`);
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
        `${APIBASE}admin/promos/${search.id}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      toast.success("Ads updated successfully.");
      window.history.go(-1);
    } catch (error) {
      //console.log(error);
      toast.error("Error!");
    }
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    formData.append("title", state?.title);
    formData.append("brief", state?.brief);
    formData.append("url", state?.url);
    formData.append("link_text", state?.link_text);

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
            Promotions -{search.id ? "Edit Ads" : "Add Ads"}
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
              {search.id ? "Edit Ads" : "Add Ads"}
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
                <InputLabel htmlFor=""> Brief :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter brief"
                    value={state.brief}
                    onChange={(e) =>
                      setState({ ...state, brief: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Link text:</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Link text"
                    value={state.link_text}
                    onChange={(e) =>
                      setState({ ...state, link_text: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">url:</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Image url"
                    value={state.url}
                    onChange={(e) =>
                      setState({ ...state, url: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
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

export default AddHeadlineAds;
