import React, { useState } from "react";
import { TextField, Button, InputLabel, Grid } from "@mui/material";
import "./AddBrands.css";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const AddBrand = () => {
  // const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaPixels, setMetaPixels] = useState("");
  const [fileData, setFileData] = useState({ thumbnail: null, banner: null });

  const handleGoBack = () => {
    window.history.go(-1);
  };

  const handleBannerFileChange = (event) => {
    const bannerFile = event.target.files[0];
    setFileData((prevState) => ({
      ...prevState,
      banner: bannerFile,
    }));
  };

  const handleThumbnailFileChange = (event) => {
    const thumbnailFile = event.target.files[0];
    setFileData((prevState) => ({
      ...prevState,
      thumbnail: thumbnailFile,
    }));
  };

  const handleSubmit = async () => {
    if (name) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", name);

      formData.append("sort_order", sortOrder ? sortOrder : 1);
      formData.append("meta_title", metaTitle);
      formData.append("meta_keyword", metaKeywords);
      formData.append("meta_description", metaDescription);
      formData.append("meta_pixels", metaPixels);
      formData.append("thumbnail", fileData.thumbnail);
      formData.append("banner", fileData.banner);

      try {
        await axios.post(`${APIBASE}admin/brands`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });

        toast.success("Brand added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        // console.error("Error adding brand:", error);
        toast.warn("Please Check the brand name is unique and not empty.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      toast.warn("Make sure brand name should not be duplicate or Empty.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // const handleCancel = () => {
  //   navigate("/admin/ProductManager/Products/brands");
  // }

  return (
    <>
      <ToastContainer />
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="my-breadcrum"
      >
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - All Brand - Add Brands
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
      <div className="card-flow">
        <div className="card-header">
          <h3 className="card-title">Add Brand </h3>
        </div>
        <div className="add-Brand-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Title */}
              <div className="input-field">
                <InputLabel>
                  Brand Name :
                  <span style={{ color: "red", fontWeight: "800" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Brand Name"
                  value={name} // Add value and onChange to capture
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* brand */}
              <div className="input-field">
                <InputLabel>Sort Order :</InputLabel>
                <TextField
                  placeholder="1"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  required
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Logo */}
              <div className="input-field">
                <InputLabel>Logo :</InputLabel>
                <input
                  type="file"
                  onChange={(e) => handleThumbnailFileChange(e, "thumbnail")}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Banner */}
              <div className="input-field">
                <InputLabel>Banner : (1920 * 858)</InputLabel>
                <input
                  type="file"
                  onChange={(e) => handleBannerFileChange(e, "banner")}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Meta Title */}
              <div className="input-field">
                <InputLabel>Meta Title</InputLabel>
                <TextField
                  placeholder="Meta title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Meta Keywords */}
              <div className="input-field">
                <InputLabel>Meta Keywords</InputLabel>
                <TextField
                  placeholder="Meta keywords"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* Meta Description */}
              <div className="input-field">
                <InputLabel>Meta Description</InputLabel>
                <textarea
                  id="meta-description"
                  rows="4"
                  placeholder="Meta description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></textarea>
              </div>
            </Grid>
            {/* Meta Pixels */}
            {/* <Grid item xs={12}>
              <div className="input-field">
                <InputLabel>Meta Pixels</InputLabel>
                <textarea
                  id="meta-pixels"
                  rows="4"
                  placeholder="Meta Pixels"
                  value={metaPixels}
                  onChange={(e) => setMetaPixels(e.target.value)}
                ></textarea>
              </div>
            </Grid> */}
          </Grid>
          <br />
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            {/* <Button
              className="save-btn"
              variant="contained"
              style={{ background: "#7356b2" }}
              onClick={handleCancel}
            >
              Cancel
            </Button> */}
            {/* Submit button */}
            <Button
              className="save-btn"
              variant="contained"
              style={{ background: "#7356b2" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
