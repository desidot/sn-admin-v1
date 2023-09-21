import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import "./AddCategories.css";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const EditCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form data and file uploads
  const [thumbnailFileDataUrl, setThumbnailFileDataUrl] = useState(null);
  const [bannerFileDataUrl, setBannerFileDataUrl] = useState(null);
  const [showUnitField, setShowUnitField] = useState(false);
  const [selectedBaseValueCategory, setSelectedBaseValueCategory] =
    useState("");

  const [editedCategory, setEditedCategory] = useState({
    _method: "PUT",
    name: "",
    code: "",
    parent_id: "",
    sort_order: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    meta_pixels: "",
    // banner: "",
    meta_image: "",
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

  const handleCheckboxChange = (event) => {
    setShowUnitField(event.target.checked);
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      parent_id: event.target.checked ? selectedBaseValueCategory.id : null,
    }));
  };

  const handleCategoryBaseValueChange = (event) => {
    setSelectedBaseValueCategory(event.target.value);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${APIBASE}admin/categories/${id}`);
        const dataFromBackend = response.data.data;
        // console.log(dataFromBackend);
        // Update banner and thumbnail URLs with the base URL
        if (dataFromBackend.meta_image) {
          dataFromBackend.meta_image = `${IMAGEURL}${dataFromBackend.meta_image}`;
          setBannerFileDataUrl(dataFromBackend.meta_image);
        }
        if (dataFromBackend.thumbnail) {
          dataFromBackend.meta_image = `${IMAGEURL}${dataFromBackend.thumbnail}`;
          setThumbnailFileDataUrl(`${IMAGEURL}${dataFromBackend.thumbnail}`);
        }

        // console.log(dataFromBackend);
        // console.log(dataFromBackend.thumbnail);
        // console.log(dataFromBackend.banner);

        setEditedCategory(dataFromBackend);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  const handleSubmit = async () => {
    if (editedCategory.name) {
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
        formData.append("name", editedCategory.name);
        formData.append("code", editedCategory.code);
        formData.append("parent_id", editedCategory.parent_id);
        formData.append(
          "sort_order",
          editedCategory.sort_order ? editedCategory.sort_order : 1
        );
        formData.append("meta_title", editedCategory.meta_title);
        formData.append("meta_keyword", editedCategory.meta_keyword);
        formData.append("meta_description", editedCategory.meta_description);

        await axios.post(`${APIBASE}admin/categories/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });

        toast.success("Category updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        navigate("/admin/ProductManager/Products/categories");
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Error updating category. Please try later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } else {
      toast.warn("Make sure Category name should not be duplicate or Empty.", {
        position: "top-center",
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
            Product Manager - Products - Edit Category
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
          <h3 className="card-title">Edit Categories</h3>
        </div>
        <div className="Add-Categories-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Title */}
              <div className="input-field">
                <InputLabel>Categories Name :</InputLabel>
                <TextField
                  placeholder="Categories Name"
                  value={editedCategory.name}
                  onChange={(e) =>
                    setEditedCategory((prevCategory) => ({
                      ...prevCategory,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Category */}
              <div className="input-field">
                <InputLabel>Category Code :</InputLabel>
                <TextField
                  placeholder="Category code is same as HSN code"
                  value={editedCategory.code}
                  onChange={(e) =>
                    setEditedCategory((prevCategory) => ({
                      ...prevCategory,
                      code: e.target.value,
                    }))
                  }
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
                <InputLabel>Sort Number :</InputLabel>
                <TextField
                  placeholder="1"
                  type="number"
                  value={editedCategory.sort_order}
                  onChange={(e) =>
                    setEditedCategory((prevCategory) => ({
                      ...prevCategory,
                      sort_order: e.target.value,
                    }))
                  }
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Thumbnail */}
              <div className="input-field">
                <InputLabel>Thumbnail (640px × 841px) :</InputLabel>
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
                <InputLabel>Meta Title :</InputLabel>
                <TextField
                  placeholder="Meta title"
                  value={editedCategory.meta_title}
                  onChange={(e) =>
                    setEditedCategory((prevCategory) => ({
                      ...prevCategory,
                      meta_title: e.target.value,
                    }))
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Meta Keywords */}
              <div className="input-field">
                <InputLabel>Meta Keywords :</InputLabel>
                <TextField
                  placeholder="Meta keywords"
                  value={editedCategory.meta_keyword}
                  onChange={(e) =>
                    setEditedCategory((prevCategory) => ({
                      ...prevCategory,
                      meta_keyword: e.target.value,
                    }))
                  }
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Meta Description */}
              <div className="input-field">
                <InputLabel>Meta Description :</InputLabel>
                <textarea
                  id="meta-description"
                  rows="4"
                  placeholder="Meta description"
                  value={editedCategory.meta_description}
                  onChange={(e) =>
                    setEditedCategory((prevCategory) => ({
                      ...prevCategory,
                      meta_description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </Grid>
            {/* Banner */}
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>Meta Image (Max 2MB size) :</InputLabel>
                <input
                  type="file"
                  name="meta_image"
                  onChange={(e) => handleBannerFileChange(e)}
                />
                {bannerFileDataUrl ? (
                  <div className="uploaded-image-container">
                    <img
                      className="uploaded-image"
                      src={bannerFileDataUrl}
                      alt="MetaImage"
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
                  <p>No meta image</p>
                )}
              </div>
            </Grid>
            {/* <Grid item xs={12}>
              {/* Meta Description 
              <div className="input-field">
                <InputLabel>Meta Pixels :</InputLabel>
                <textarea
                  id="meta-pixels"
                  rows="4"
                  placeholder="Meta Pixels"
                  value={editedCategory.meta_pixels}
                  onChange={(e) =>
                    setEditedCategory((prevCategory) => ({
                      ...prevCategory,
                      meta_pixels: e.target.value,
                    }))
                  }
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
    </>
  );
};

export default EditCategories;
