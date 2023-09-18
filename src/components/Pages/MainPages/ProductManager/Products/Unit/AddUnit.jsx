import React, { useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIBASE } from "../../../../../auth/apiConfig";
const AddUnit = () => {
  // const navigate = useNavigate();

  const [showUnitField, setShowUnitField] = useState(false);

  const [newUnit, setNewUnit] = useState({
    name: "",
    short_name: "",
    allow_decimal: "",
    add_as_multiple: "",
    unit_value: "",
    base_unit: "",
  });

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleCheckboxChange = (event) => {
    setShowUnitField(event.target.checked);
  };
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (value === "newUnit.allow_decimal") {
      const allowDecimalValue = newValue === "Yes" ? "Yes" : "No";
      setNewUnit((prevUnit) => ({
        ...prevUnit,
        allow_decimal: allowDecimalValue,
      }));
    } else {
      setNewUnit((prevUnit) => ({
        ...prevUnit,
        [name]: newValue,
      }));
    }
  };

  // console.log(handleInputChange.allowDecimalValue);

  const handleSave = async () => {
  if(newUnit.name){
    try {
      // Send a POST request to the backend with the newUnit data
      await axios.post(`${APIBASE}admin/units`, newUnit);

      // Show toast notification for successful unit addition
      toast.success("Unit added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast after 3 seconds
      });

      // Redirect back to the Units component after saving
      // navigate("/admin/ProductManager/Products/units");
    } catch (error) {
      console.error("Error adding unit:", error);
      // Show toast notification for error (optional)
      toast.error("Error adding unit. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }} else {
      toast.warn("Make sure unit name should not be Empty or duplicate.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    // console.log(handleSave);
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
            Product Manager - Products - Add Units
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
          <h3 className="card-title">Add Units</h3>
        </div>
        <div className="add-Brand-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>
                  Name:
                  <span style={{ color: "red", fontWeight: "800" }}>*</span>
                </InputLabel>
                <TextField
                  name="name"
                  value={newUnit.name}
                  onChange={handleInputChange}
                  placeholder="Unit Name"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>
                  Short Name:
                 
                </InputLabel>
                <TextField
                  name="short_name"
                  value={newUnit.short_name}
                  onChange={handleInputChange}
                  placeholder="Short Name"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>
                  Allow decimal:
               
                </InputLabel>
                <Select
                  name="allow_decimal"
                  value={newUnit.allow_decimal}
                  onChange={handleInputChange}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <div>Yes / No</div>;
                    }
                    return value;
                  }}
                >
                  {/* Update the MenuItem values */}
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div
                className="input-field"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "row",
                  paddingTop: "36px",
                }}
              >
                <Checkbox
                  style={{ marginRight: "4px" }}
                  onChange={handleCheckboxChange}
                />
                <InputLabel>Add as multiple of other unit</InputLabel>
              </div>
            </Grid>

            {showUnitField && (
              <Grid item xs={12} sm={6}>
                <div className="units">
                  <div className="input-field">
                    <InputLabel>1 Unit =</InputLabel>
                    <TextField
                      name="unit_value"
                      value={newUnit.unit_value}
                      onChange={handleInputChange}
                      placeholder="Brand Name"
                    />
                  </div>
                </div>
              </Grid>
            )}
            {showUnitField && (
              <Grid item xs={12} sm={6}>
                <div className="units" style={{ paddingTop: "31px" }}>
                  <div className="input-field">
                    <Select
                      name="base_unit"
                      value={newUnit.base_unit}
                      onChange={handleInputChange}
                      displayEmpty
                      renderValue={(value) => {
                        if (value === "") {
                          return <div>Select base unit</div>;
                        }
                        return value;
                      }}
                    >
                      <MenuItem value="Piece(s)">Piece(s)</MenuItem>
                      <MenuItem value="Packet(s)">Packet(s)</MenuItem>
                      <MenuItem value="Gram(s)">Gram(s)</MenuItem>
                    </Select>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "20px" }}>
            <Grid item>
              <Button
                className="save-btn"
                variant="contained"
                style={{ background: "#7356b2" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default AddUnit;
