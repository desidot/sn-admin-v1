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
import {
  createSlider,
  getAllSliders,
  updateSlider,
} from "../../../../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const initialState = {
  slug: "",
  page_name: "",
  title: "",
  banner: "",
  link: "",
  sort_order: "",
};

const AddSlider = () => {
  const allSliders = useSelector((state) => state.cart.allSliders);
  const search = useParams();
  useEffect(() => {
    dispatch(getAllSliders());
  }, []);
  useEffect(() => {
    if (search.id) {
      const filter = allSliders?.filter((elem) => elem.id == search.id)[0];

      setState({
        ...state,
        title: filter?.title,
        page_name: filter?.page_name,
        link: filter?.link,
        sort_order: filter?.sort_order,
        banner: filter?.banner,
      });
    }
  }, [allSliders]);
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const handleFileUploadGallary = (event) => {
    const file = event.target.files[0];
    // Perform the upload logic here;
    setState({ ...state, banner: file });
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    formData.append("title", state?.title);
    formData.append("page_name", state?.page_name);
    formData.append("banner", state?.banner);
    formData.append("slug", state?.title);
    formData.append("link", state?.link);
    formData.append("sort_order", state.sort_order?state.sort_order:1);

    if (state?.title && state.banner && !search.id) {
      dispatch(createSlider(formData));
      setState(initialState);
      window.history.go(-1);
    } else {
      dispatch(updateSlider({ data: formData, id: search.id }));
      setState(initialState);
      window.history.go(-1);
    }
  };

  // Define dynamic menu items

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Administrative - Website Setup -{" "}
            {search.id ? "Edit Slider" : "Add Slider"}
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
              {search.id ? "Edit Slider" : "Add Slider"}
            </Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor=""> Page :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Page Name"
                    value={state.page_name}
                    onChange={(e) =>
                      setState({ ...state, page_name: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor=""> Title :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Page Title"
                    value={state.title}
                    onChange={(e) =>
                      setState({ ...state, title: e.target.value })
                    }
                    type="email"
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                style={{ display: "flex", gap: "15px", alignItems: "start" }}
              >
                {search.id && typeof state.banner == "string" && (
                  <div
                    style={{
                      width: "200px",
                      height: "100px",
                      marginTop: "30px",
                    }}
                  >
                    <img
                      style={{ maxWidth: "100%", height: "auto" }}
                      src={`${IMAGEURL}${state.banner}`}
                    />
                  </div>
                )}
                <div className="input-field">
                  <InputLabel>Image (1920 × 741 px) :</InputLabel>
                  <input type="file" onChange={handleFileUploadGallary} />
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Website Link :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Website Link"
                    value={state.link}
                    onChange={(e) =>
                      setState({ ...state, link: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              {search.id && (
                <Grid item xs={12} style={{ visibility: "hidden" }} md={6}>
                  <InputLabel htmlFor="">Sort Order :</InputLabel>
                  <FormControl fullWidth>
                    <TextField placeholder="Sort Order" type="number" />
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Sort Order :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Sort Order"
                    value={state.sort_order}
                    onChange={(e) =>
                      setState({ ...state, sort_order: e.target.value })
                    }
                    type="number"
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

export default AddSlider;
