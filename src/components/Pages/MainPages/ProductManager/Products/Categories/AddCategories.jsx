import React, { useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  Checkbox,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import "./AddCategories.css";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
const AddCategories = () => {
  // const navigate = useNavigate();
  const [showUnitField, setShowUnitField] = useState(false);
  const [selectedBaseValueCategory, setSelectedBaseValueCategory] =
    useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaPixels, setMetaPixels] = useState("");
  const [fileData, setFileData] = useState({ thumbnail: null, banner: null });

  const handleGoBack = () => {
    window.history.go(-1);
  };

  const handleCheckboxChange = (event) => {
    setShowUnitField(event.target.checked);
  };

  const handleCategoryBaseValueChange = (event) => {
    setSelectedBaseValueCategory(event.target.value);
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
    if(name){
    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("slug", name);
    formData.append(
      "parent_id",
      selectedBaseValueCategory ? selectedBaseValueCategory.id : null
    );
    formData.append("sort_order", sortOrder?sortOrder:1);
    formData.append("meta_title", metaTitle);
    formData.append("meta_keyword", metaKeywords);
    formData.append("meta_description", metaDescription);
    formData.append("meta_pixels", metaPixels);
    formData.append("thumbnail", fileData.thumbnail);
    formData.append("banner", fileData.banner);

    try {
      await axios.post(`${APIBASE}admin/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      toast.success("Category added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // navigate("/admin/ProductManager/Products/categories");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Make sure category name is not empty and unique.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } } else {
      toast.warn("Make sure category name should not be Empty or duplicate.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Perform the upload logic here
    // console.log(file);
  };

  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - Add Category
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
      <div className="card-flow" >
        <div className="card-header">
          <h3 className="card-title">Add Categories</h3>
        </div>
        <div className="Add-Categories-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Title */}
              <div className="input-field">
                <InputLabel>
                  Categories Name :
                  <span style={{ color: "red", fontWeight: "800" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Categories Name"
                  value={name} // Add value and onChange to capture input value
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Category */}
              <div className="input-field">
                <InputLabel>Category Code :</InputLabel>
                <TextField
                  placeholder="Category code is same as HSN code"
                  value={code} // Add value and onChange to capture input value
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                className="input-field"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "row",
                  paddingTop: "25px",
                }}
              >
                <Checkbox
                  style={{ marginRight: "2px" }}
                  onChange={handleCheckboxChange}
                />
                <InputLabel> Add as sub taxonomy</InputLabel>
              </div>
            </Grid>

            {showUnitField && (
              <Grid item xs={12} sm={6}>
                <div
                  className="units"
                  // style={{ paddingTop: "31px" }}
                >
                  <div className="input-field">
                    <InputLabel>Select parent category :</InputLabel>
                    <Select
                      value={selectedBaseValueCategory}
                      onChange={handleCategoryBaseValueChange}
                      displayEmpty
                      renderValue={(value) => {
                        if (value === "") {
                          return <div>Select base unit</div>;
                        }
                        return value;
                      }}
                    >
                      <MenuItem value="Test">Test</MenuItem>
                      <MenuItem value="Dermatology">Dermatology</MenuItem>
                      <MenuItem value="Health and Wellness">
                        Health and Wellness
                      </MenuItem>
                      <MenuItem value="Hair Growth">Hair Growth</MenuItem>
                      <MenuItem value="Hair Growth">
                        Fire Mobility Support
                      </MenuItem>
                    </Select>
                  </div>
                </div>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              {/* Category */}
              <div className="input-field">
                <InputLabel>
                  Sort Number :
              
                </InputLabel>
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
                <InputLabel>Thumbnail (640px × 841px) :</InputLabel>
                <input
                  type="file"
                  onChange={(e) => handleThumbnailFileChange(e, "thumbnail")}
                />
              </div>
            </Grid>
            {/* Banner */}
            {/* <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>Banner (1920px × 741px) :</InputLabel>
                <input
                  type="file"
                  onChange={(e) => handleBannerFileChange(e, "banner")}
                />
              </div>
            </Grid> */}
          </Grid>
          {/* <Grid item xs={12} sm={6}>
              {/* Meta Title 
              <div className="input-field">
                <InputLabel>Meta Title :</InputLabel>
                <TextField
                  placeholder="Meta title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Meta Keywords 
              <div className="input-field">
                <InputLabel>Meta Keywords :</InputLabel>
                <TextField
                  placeholder="Meta keywords"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* Meta Description 
              <div className="input-field">
                <InputLabel>Meta Description :</InputLabel>
                <textarea
                  id="meta-description"
                  rows="4"
                  placeholder="Meta description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></textarea>
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* Meta Description 
              <div className="input-field">
                <InputLabel>Meta Pixels :</InputLabel>
                <textarea
                  id="meta-pixels"
                  rows="4"
                  placeholder="Meta Pixels"
                  value={metaPixels}
                  onChange={(e) => setMetaPixels(e.target.value)}
                ></textarea>
              </div>
            </Grid>
          </Grid>
          <br />
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {/* Submit button 
            <Button
              className="save-btn"
              variant="contained"
              style={{ background: "#7356b2" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid> */}
        </div>

        {/* </div> */}
      </div>
      <section className="card" style={{ marginTop: "20px" }}>
        <div className="filter-head-products">
          <Typography variant="h1">SEO Meta Tags</Typography>
        </div>

        {/* Title */}
        <div className="add-products-body">
          <div className="inp-seo-meta3">
            {/* Meta Title */}
            <div className="input-field">
              <InputLabel>Meta Title :</InputLabel>
              <TextField
                placeholder="Meta title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            {/* Meta Keywords */}
            <div className="input-field">
              <InputLabel>Meta Keywords :</InputLabel>
              <TextField
                placeholder="Meta keywords"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
              />
            </div>
          </div>

          <div className="inp-seo-meta2">
            {/* Banner */}
            <div className="input-field">
              <InputLabel>Description :</InputLabel>
              <textarea
                id="meta-description"
                rows="4"
                placeholder="Meta description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            {/* Thumbnail */}
            <div className="input-field">
              <InputLabel>Meta Image (Max 2MB size) :</InputLabel>
              {/* <input type="file" onChange={handleFileUpload} /> */}
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, "meta_image")}
              />{" "}
            </div>
          </div>

          {/* Description */}

          {/* Meta Description */}
          {/* <div className="input-field">
              <InputLabel>Meta Pixels :</InputLabel>
              <textarea
                id="meta-description"
                rows="4"
                placeholder="Meta Pixels"
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    meta_pixels: event.target.value,
                  }))
                }
              ></textarea>
            </div>
            <br /> */}
          {/* Submit button */}
          <div className="add-product-save-btn">
            <Button
              onClick={handleSubmit}
              className="save-btn"
              variant="contained"
            >
              Save
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCategories;
