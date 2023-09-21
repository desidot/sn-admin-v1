import React, { useState, useEffect } from "react";
import { TextField, Button, InputLabel, Grid, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

import "./AddBrands.css";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form data and file uploads
  const [thumbnailFileDataUrl, setThumbnailFileDataUrl] = useState(null);
  const [bannerFileDataUrl, setBannerFileDataUrl] = useState(null);
  // const [showUnitField, setShowUnitField] = useState(false);
  // const [selectedBaseValueBrand, setSelectedBaseValueBrand] = useState("");
  const [editedBrand, setEditedBrand] = useState({
    _method: "PUT",
    name: "",
    code: "",
    parent_id: "",
    sort_order: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    meta_pixels: "",
    banner: "",
    thumbnail: "",
  });

  // State for form data and file uploads
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  // Other state variables...

  // Function to read the image file and update the corresponding state
  const handleImagePreview = (event, setImageFile, setImageFileDataUrl) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImageFileDataUrl(imageDataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      // If file is not available, reset the corresponding state
      setImageFile(null);
      setImageFileDataUrl(null);
    }
  };

  const handleBannerFileChange = (event) => {
    handleImagePreview(event, setBannerFile, setBannerFileDataUrl);
  };

  const handleThumbnailFileChange = (event) => {
    handleImagePreview(event, setThumbnailFile, setThumbnailFileDataUrl);
  };

  // Function to remove the thumbnail or banner image
  const handleRemoveImage = (setImageFileDataUrl) => {
    setImageFileDataUrl(null);
  };

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.get(`${APIBASE}admin/brands/${id}`);
        const dataFromBackend = response.data.data;
        // Update banner and thumbnail URLs with the base URL
        if (dataFromBackend.banner) {
          dataFromBackend.banner = `${IMAGEURL}${dataFromBackend.banner}`;
          setBannerFileDataUrl(dataFromBackend.banner);
        }
        if (dataFromBackend.thumbnail) {
          dataFromBackend.thumbnail = `${IMAGEURL}${dataFromBackend.thumbnail}`;
          setThumbnailFileDataUrl(dataFromBackend.thumbnail);
        }

        // console.log(dataFromBackend);
        // console.log(dataFromBackend.thumbnail);
        // console.log(dataFromBackend.banner);

        setEditedBrand(dataFromBackend);
      } catch (error) {
        console.error("Error fetching Brand data:", error);
      }
    };

    if (id) {
      fetchBrandData();
    }
  }, [id]);
// console.log(editedBrand)
  const handleSubmit = async () => {
    if(editedBrand.name){
    try {
      // Create a FormData object to send form data along with the files
      const formData = new FormData();
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      if (bannerFile) {
        formData.append("banner", bannerFile);
      }
      // Append other form data fields to the formData object
      formData.append("_method", "PUT");
      formData.append("name", editedBrand.name);
      formData.append("code", editedBrand.code);
      formData.append("parent_id", editedBrand.parent_id); 
      formData.append("sort_order", editedBrand.sort_order?editedBrand.sort_order:1);
      formData.append("meta_title", editedBrand.meta_title);
      formData.append("meta_keyword", editedBrand.meta_keyword);
      formData.append("meta_description", editedBrand.meta_description);
      formData.append("meta_pixels", editedBrand.meta_pixels);

      await axios.post(`${APIBASE}admin/brands/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      toast.success("Brand updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      navigate("/admin/ProductManager/Products/brands");
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Error updating brand. Please try later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }    }else{
      toast.warn("Make sure brand name should not be duplicate or Empty.", {
        position:"top-center",
        autoClose: 2000,
      });
    } 
  };

  // Function to navigate back to the previous page
  const handleGoBack = () => {
    window.history.go(-1);
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
            Product Manager - All Brand - Edit Brands
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
          <h3 className="card-title">Edit Brand </h3>
        </div>
        <div className="add-Brand-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Title */}
              <div className="input-field">
                <InputLabel>Brand Name :</InputLabel>
                <TextField
                  placeholder="Brands Name"
                  value={editedBrand.name}
                  onChange={(e) =>
                    setEditedBrand((prevBrand) => ({
                      ...prevBrand,
                      name: e.target.value,
                    }))
                  }
                />{" "}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Brand */}
              <div className="input-field">
                <InputLabel>Sort Order :</InputLabel>
                <TextField placeholder="" type="number"
                value={editedBrand.sort_order}
                onChange={(e)=>setEditedBrand({...editedBrand,sort_order:e.target.value})}
                />
              </div>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>Banner : (1920 * 858)</InputLabel>
                <input
                  type="file"
                  name="banner"
                  onChange={(e) => handleBannerFileChange(e)}
                />
                {bannerFileDataUrl ? (
                  <div className="uploaded-image-container">
                    <img
                      className="uploaded-image"
                      src={bannerFileDataUrl}
                      alt="Banner"
                      height="80px"
                      width="80px"
                      margin="10px"
                    />
                    <IconButton
                      className="delete-icon"
                      onClick={() => handleRemoveImage(setBannerFileDataUrl)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ) : (
                  <p>No banner image</p>
                )}
              </div>
            </Grid> */}
            {/* Banner */}
            <Grid item xs={12} sm={6}>
              {/* Logo */}
              <InputLabel>Logo :</InputLabel>
              <div className="input-field">
                <input
                  type="file"
                  name="thumbnail"
                  onChange={(e) => handleThumbnailFileChange(e)}
                />
                {thumbnailFileDataUrl ? (
                  <div className="uploaded-image-container">
                    <img
                      className="uploaded-image"
                      src={thumbnailFileDataUrl}
                      alt="Thumbnail"
                      height="80px"
                      width="80px"
                      margin="10px"
                    />
                    <IconButton
                      className="delete-icon"
                      onClick={() => handleRemoveImage(setThumbnailFileDataUrl)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ) : (
                  <p>No thumbnail image</p>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Meta Title */}
              <div className="input-field">
                <InputLabel>Meta Title</InputLabel>
                <TextField
                  placeholder="Meta title"
                  value={editedBrand.meta_title}
                  onChange={(e) =>
                    setEditedBrand((prevBrand) => ({
                      ...prevBrand,
                      meta_title: e.target.value,
                    }))
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* Meta Keywords */}
              <div className="input-field">
                <InputLabel>Meta Keywords :</InputLabel>
                <TextField
                  placeholder="Meta keywords"
                  value={editedBrand.meta_keyword}
                  onChange={(e) =>
                    setEditedBrand((prevBrand) => ({
                      ...prevBrand,
                      meta_keyword: e.target.value,
                    }))
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* Meta Description */}
              <div className="input-field">
                <InputLabel>Meta Description :</InputLabel>
                <textarea
                  id="meta-description"
                  rows="4"
                  placeholder="Meta description"
                  value={editedBrand.meta_description}
                  onChange={(e) =>
                    setEditedBrand((prevBrand) => ({
                      ...prevBrand,
                      meta_description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </Grid>
            {/* Meta Description */}
            {/* <Grid item xs={12}>
              <div className="input-field">
                <InputLabel>Meta Pixels :</InputLabel>
                <textarea
                  id="meta-pixels"
                  rows="4"
                  placeholder="Meta Pixels"
                  value={editedBrand.meta_pixels}
                  onChange={(e) =>
                    setEditedBrand((prevBrand) => ({
                      ...prevBrand,
                      meta_pixels: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </Grid> */}
          </Grid>
          <br />
          <div>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
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
      </div>
    </>
  );
};

export default EditBrand;
