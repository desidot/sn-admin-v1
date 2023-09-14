import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Autocomplete,
  Typography,
  FormControl,
} from "@mui/material";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import TextArea from "antd/es/input/TextArea";
import "./Account.css";
import countries from "../../../Countries/Countries";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  employee_code: "",
  phone: "",
  gender: "",
  dob: "",
  address: "",
  country: "",
};
const Profile = () => {
  const [supplierValue, setPaymentValue] = useState("");
  const [currProfile, setCurrProfile] = useState({});

  const authId = useSelector((state) => state.auth.user.data.id);

  const [state, setState] = useState(initialState);
  const handleFileUploadGallary = (event) => {
    const files = event.target.files;
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      uploadedImages.push(imageInfo);
    }

    //console.log(uploadedImages);
  };

  const getCurrProfile = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-employee/${authId}`);
      setCurrProfile(res.data.data);
    } catch (error) {
      //console.log("error is ", error);
    }
  };

  useEffect(() => {
    getCurrProfile();
  }, [authId]);

  useEffect(() => {
    setState({
      ...state,
      employee_code: currProfile.employee_code,
      name: currProfile.name ?? "",
      email: currProfile.email ?? "",
      phone: currProfile.phone ?? "",
      gender: currProfile.gender ?? "",
      dob: currProfile.dob ?? "",
      address: currProfile.address ?? "",
      country: currProfile.country ?? "",
    });
  }, [currProfile]);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform the upload logic here;
    setState({ ...state, image: file });
  };

  const updateProfile = async (data) => {
    try {
      await axios.post(
        `${APIBASE}admin/update-profile/${authId}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      toast.success("Profile updated successfully.");

      setState(initialState);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSaveClick = () => {
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("employee_code", state.employee_code);
    formData.append("phone", state.phone);
    formData.append("email", state.email);
    formData.append("gender", state.gender);
    formData.append("address", state.address);
    formData.append("country", state.country);
    formData.append("image", state.image);
    formData.append("dob", state.dob);

    updateProfile(formData);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Administrative - Account Settings - Profile
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
            <Typography variant="h1">Profile</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  {" "}
                  Name :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Employee Name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  {" "}
                  Email :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Employee Email"
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    type="email"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Employee ID :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Employee ID"
                    value={state.employee_code}
                    onChange={(e) =>
                      setState({ ...state, employee_code: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Phone :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Phone  Number"
                    type="number"
                    value={state.phone}
                    onChange={(e) =>
                      setState({ ...state, phone: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Select Gender :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="">Select Gender</InputLabel>
                  <Select
                    id="supplier"
                    name="supplier"
                    value={state.gender}
                    onChange={(e) =>
                      setState({ ...state, gender: e.target.value })
                    }
                  >
                    <MenuItem key="Male" value="male">
                      Male
                    </MenuItem>
                    <MenuItem key="Female" value="female">
                      Female
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">Date of Birth:</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Select date"
                    value={state.dob}
                    onChange={(e) =>
                      setState({ ...state, dob: e.target.value })
                    }
                    id="date"
                    type="date"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">
                  {" "}
                  Address :
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    *
                  </span>{" "}
                </InputLabel>
                <FormControl fullWidth>
                  <TextArea
                    placeholder="Address"
                    value={state.address}
                    onChange={(e) =>
                      setState({ ...state, address: e.target.value })
                    }
                    id="date"
                    type="date"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="country">Country :</InputLabel>
                <FormControl fullWidth>
                  <Select
                    value={state.country}
                    onChange={(e) =>
                      setState({ ...state, country: e.target.value })
                    }
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    <MenuItem value="Bermuda">Bermuda</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <div className="input-field">
                  <InputLabel>Photo :</InputLabel>
                  <input type="file" onChange={(e) => handleImageUpload(e)} />
                </div>
              </Grid>
            </Grid>
          </div>
          {/* Submit button */}
          <div className="add-product-save-btn" style={{ padding: "1rem" }}>
            <Button
              className="save-btn"
              variant="contained"
              onClick={() => handleSaveClick()}
              disabled={
                state.name == "" ||
                state.address == "" ||
                state.email == "" ||
                state.phone == ""
              }
            >
              Save
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
