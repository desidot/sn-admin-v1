import React, { useState, useEffect } from "react";
import { TextField, Button, InputLabel, Grid } from "@mui/material";
import "./AddAlert.css";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const SetAlerts = () => {
  const [minQuantity, setMinQuantity] = useState("");
  // const [previousMinQuantity, setPreviousMinQuantity] = useState("");

  // Fetch the previous minimum quantity from the server when the component mounts
  useEffect(() => {
    const fetchPreviousMinQuantity = async () => {
      try {
        const response = await axios.get(`${APIBASE}admin/quantityalerts/1`);
        // setPreviousMinQuantity(response.data.data.set_quantity);
        setMinQuantity(response.data.data.set_quantity); // Set the initial value of minQuantity
        //console.log(response.data.data.set_quantity);
      } catch (error) {
        //console.error("Error fetching previous minimum quantity:", error);
      }
    };
    fetchPreviousMinQuantity();
  }, []);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSubmit = async () => {
    try {
      // Validate if the minQuantity value is a number greater than 0
      if (isNaN(minQuantity) || Number(minQuantity) <= 0) {
        toast.error("Please enter a valid minimum quantity greater than 0", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }

      // Send a PUT request to the backend with the minimum quantity alert value
      const response = await axios.put(`${APIBASE}admin/quantityalerts/1`, {
        set_quantity: minQuantity,
      });

      //console.log(response);

      // Show toast notification for successful submission
      toast.success("Minimum quantity alert set successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      //console.error("Error setting minimum quantity alert:", error);
      // Show toast notification for error (optional)
      toast.error(
        "Error setting minimum quantity alert. Please try again later.",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        }
      );
    }
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
            Product Manager - Products - Minimum Quantity Alerts
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
          <h3 className="card-title">Minimum Quantity Alerts</h3>
        </div>
        <div className="Add-Alert-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Title */}
              <div className="input-field">
                <InputLabel>Set Minimum Quantity Alerts :</InputLabel>
                <TextField
                  placeholder="5"
                  type="number"
                  value={minQuantity}
                  onChange={(e) => setMinQuantity(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>

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

export default SetAlerts;
