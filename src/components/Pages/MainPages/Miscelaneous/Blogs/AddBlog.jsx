import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Autocomplete,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";

import "./AddBlog.css"; // Import the CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getAllCategory } from "../../../../../redux/cartSlice";
import HomeIcon from "@mui/icons-material/Home";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  title: "",
  category_id: "",
  thumbnail: "",
  banner: "",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keyword: "",
};
const AddBlog = () => {
  const search = useParams();

  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.cart.allCategory);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  const [state, setState] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setState({ ...state, description: data });
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    // Perform the upload logic here;
    setState({ ...state, banner: file });
  };
  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    // Perform the upload logic here;
    setState({ ...state, thumbnail: file });
  };

  const saveEditedBlog = async (data) => {
    try {
      await axios.post(`${APIBASE}admin/blogs/${search.id}?_method=PUT`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      toast.success("Blog edited successfully.");
      setState(initialState);
      window.history.go(-1);
    } catch (error) {
      //console.log(error);
    }
  };

  const handleSaveClick = () => {
    if (search.id) {
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("category_id", state.category_id);
      formData.append("description", state.description);
      formData.append("meta_title", state.meta_title);
      formData.append("meta_keyword", state.meta_keyword);
      formData.append("meta_description", state.meta_description);
      formData.append("thumbnail", state.thumbnail);
      formData.append("banner", state.banner);

      if (state.title && state.description && state.banner && state.thumbnail) {
        //console.log(state);
        saveEditedBlog(formData);
      }
    } else {
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("category_id", state.category_id);
      formData.append("description", state.description);
      formData.append("meta_title", state.meta_title);
      formData.append("meta_keyword", state.meta_keyword);
      formData.append("meta_description", state.meta_description);
      formData.append("thumbnail", state.thumbnail);
      formData.append("banner", state.banner);

      if (
        state.title &&
        state.description &&
        state.banner &&
        state.thumbnail
      ) {
        dispatch(createBlog(formData));
       
      }
    }
  };

  useEffect(() => {
    const getPreviousBlog = async () => {
      try {
        const res = await axios.get(`${APIBASE}admin/blogs/${search.id}`);
        const abc = res.data.data;
        setState({
          ...state,
          title: abc.title,
          category_id: abc.category_id,
          thumbnail: abc.thumbnail,
          banner: abc.banner,
          description: abc.description,
          meta_title: abc.meta_title,
          meta_description: abc.meta_description,
          meta_keyword: abc.meta_keyword,
        });
        //console.log(res);
      } catch (err) {
        //console.log(err);
      }
    };

    getPreviousBlog();
  }, [search]);

  const handleAddCategory = (e) => {
    setState({
      ...state,
      category_id: e.target.value,
    });
  };
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const changeStatus = async (id) => {
    try {
      await axios.put(`${APIBASE}admin/update-blog-status/${id}`);
    } catch (error) {
      //console.log(error);
    }
  };

  // console.log(state)

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Miscellaneous - {search.id ? "Edit" : "Add"} Blog
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
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{search.id ? "Edit" : "Add"} Blog </h3>
        </div>
        <div className="Add-blog-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Title */}
              <div className="input-field">
                <InputLabel>Title<span style={{fontWeight:"bold",color:"red"}}>*</span></InputLabel>
                <TextField
                  value={state.title}
                  onChange={(e) =>
                    setState({ ...state, title: e.target.value })
                  }
                  placeholder="Title"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Category */}
              <div className="input-field">
              <InputLabel
                  
                  >
                    Categories
                  </InputLabel>
              <FormControl fullWidth>
                
                  <Select
                  
                    displayEmpty
                    value={state?.category_id}
                    onChange={(e) =>
                      handleAddCategory(e)}
                      inputProps={{ 'aria-label': 'Without label' }}
                  >
                     <MenuItem value="">
           Select Category
          </MenuItem>
                    {allCategory?.map((elem, index) => (
                      <MenuItem key={index} value={elem.id}>
                        {elem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                {/* <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  value={
                    allCategory.filter(
                      (elem) => elem.id == state.category_id
                    )[0]?.name
                  }
                  options={allCategory?.map((option) => option.name)}
                  onInputChange={(e, newValue) =>
                    handleAddCategory(e, newValue)
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
                /> */}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Banner */}
              <div className="input-field">
                <InputLabel>Banner<span style={{fontWeight:"bold",color:"red"}}>*</span></InputLabel>
                <input type="file" onChange={handleBannerUpload} />
              </div>
              {typeof state.banner === "string" && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    style={{ width: "100px", objectFit: "cover" }}
                    src={`${IMAGEURL}${state.banner}`}
                    alt=""
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Thumbnail */}
              <div className="input-field">
                <InputLabel>Thumbnail<span style={{fontWeight:"bold",color:"red"}}>*</span></InputLabel>
                <input type="file" onChange={handleThumbnailUpload} />
              </div>
              {typeof state.thumbnail === "string" && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    style={{ width: "100px", objectFit: "cover" }}
                    src={`${IMAGEURL}${state.thumbnail}`}
                    alt=""
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              {/* Description */}
              <div className="input-field">
                <InputLabel>Description<span style={{fontWeight:"bold",color:"red"}}>*</span></InputLabel>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={handleEditorChange}
                  data={state.description || ""}
                  config={{
                    ckfinder: {
                      uploadUrl: "/your_upload_image_endpoint", // Replace with your image upload endpoint
                    },
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Meta Title */}
              <div className="input-field">
                <InputLabel>Meta Title</InputLabel>
                <TextField
                  value={state.meta_title}
                  onChange={(e) =>
                    setState({ ...state, meta_title: e.target.value })
                  }
                  placeholder="Meta title"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Meta Keywords */}
              <div className="input-field">
                <InputLabel>Meta Keywords</InputLabel>
                <TextField
                  value={state.meta_keyword}
                  onChange={(e) =>
                    setState({ ...state, meta_keyword: e.target.value })
                  }
                  placeholder="Meta keywords"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* Meta Description */}
              <div className="input-field">
                <InputLabel>Meta Description</InputLabel>
                <textarea
                  value={state.meta_description}
                  id="meta-description"
                  rows="4"
                  style={{ color: "black" }}
                  placeholder="Meta description"
                  onChange={(e) =>
                    setState({ ...state, meta_description: e.target.value })
                  }
                ></textarea>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <br />
      {/* Submit button */}
      <div>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          {/* Submit button */}
          <Button
            className="save-btn"
            variant="contained"
            style={{ background: "#7356b2" }}
            onClick={() => handleSaveClick()}
          >
            Save
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default AddBlog;
