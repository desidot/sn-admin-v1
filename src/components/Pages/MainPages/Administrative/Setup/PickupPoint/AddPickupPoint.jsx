import React, { useState } from "react";
import {
  Button,
  InputLabel,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { createPickUpPoint } from "../../../../../../redux/cartSlice";

const initialState = {
  name: "",
  location: "",
  phone: "",
  manager: "",
};
const AddPickupPoint = () => {
  const dispatch=useDispatch()
  const [state, setState] = useState(initialState); 
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  const handleSaveClick = () => {
    if(state.name && state.location && state.manager && state.phone){
      dispatch(createPickUpPoint(state))
      setState(initialState);
  
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
            Administrative - Setup - Add Pickup Points
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
              Add New Pickup Point Information
            </Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Name :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder=""
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Location :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder=""
                    value={state.location}
                    onChange={(e) =>
                      setState({ ...state, location: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Phone :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder=""
                    value={state.phone}
                    type="number"
                    onChange={(e) =>
                      setState({ ...state, phone: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Pick-up Point Manager :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder=""
                    value={state.manager}
                    onChange={(e) =>
                      setState({ ...state, manager: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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

export default AddPickupPoint;
