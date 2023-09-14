import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import HomeIcon from "@mui/icons-material/Home";
import countries from "../../Countries/Countries";
import { useDispatch } from "react-redux";
import {
  addCustomer,
  getAllCustomers,
  updateCustomer,
} from "../../../../../redux/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipcode: "",
  country: "",
  photo: "",
  password: "",
  status: true,
};
const CustomerForm = () => {
  const [state, setState] = useState(initialState);
  const search = useParams();
  //console.log(search);
  const dispatch = useDispatch();
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-2);
  };

  const getCurrCus = async (id) => {
    try {
      const res = await axios.get(`${APIBASE}admin/users/${id}`);
      //console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    if (search.id) {
      hiFi(+search.id);
    }
  }, [search]);

  const hiFi = async (id) => {
    const data = await getCurrCus(id);
    setState(data);
  };

  const addCustomer = async (data) => {
    try {
      await axios.post(`${APIBASE}admin/users`, data);
      dispatch(getAllCustomers());
      window.history.go(-1);
    } catch (error) {
      //console.log("error is -", error);
      toast.error(error.response.data.message.split(".")[0]);
    }
  };

  const handleSaveClick = () => {
    if (state.first_name && state.last_name) {
      if (search.id) {
        state.status = true;
        dispatch(updateCustomer({ id: search.id, data: state }));
        window.history.go(-1);
      } else {
        addCustomer(state);
      }

      setState(initialState);
    } else {
      toast.warn("Fill First and Last Name!");
    }
  };

  return (
    <>
      {" "} 
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            People - General Customers - {search.id ? "Edit" : "Add"} Customers
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
          <h3 className="card-title">{search.id ? "Edit" : "Add"} Customer</h3>
        </div>
        <div className="card-body">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>
                  First Name:
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  required
                  placeholder="First Name"
                  value={state.first_name}
                  onChange={(e) =>
                    setState({ ...state, first_name: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>Middle Name:</InputLabel>
                <TextField
                  placeholder="Middle Name"
                  value={state.middle_name}
                  onChange={(e) =>
                    setState({ ...state, middle_name: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>
                  Last Name:
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  required
                  placeholder="Last Name"
                  value={state.last_name}
                  onChange={(e) =>
                    setState({ ...state, last_name: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>
                  Cell Phone:
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>*</span> */}
                </InputLabel>
                <TextField
                  required
                  placeholder="Cell Phone"
                  value={state.phone}
                  onChange={(e) =>
                    setState({ ...state, phone: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>Work Phone:</InputLabel>
                <TextField
                  placeholder="Work Phone"
                  value={state.work_phone}
                  onChange={(e) =>
                    setState({ ...state, work_phone: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>Home Phone:</InputLabel>
                <TextField
                  placeholder="Home Phone"
                  value={state.home_phone}
                  onChange={(e) =>
                    setState({ ...state, home_phone: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>
                  Email:
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>*</span> */}
                </InputLabel>
                <TextField
                  required
                  placeholder="Email"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
              </div>
            </Grid>
            {!search.id && (
              <Grid item xs={12} sm={4}>
                <div className="input-field">
                  <InputLabel>Password:</InputLabel>
                  <TextField
                    required
                    placeholder="Password"
                    type="password"
                    value={state.password}
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                  />
                </div>
              </Grid>
            )}
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>Date of Birth:</InputLabel>
                <TextField
                  type="date"
                  value={state.dob?.split("T")[0]}
                  onChange={(e) => setState({ ...state, dob: e.target.value })}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>Gender:</InputLabel>
                <FormControl>
                  <select
                  style={{height:"3.43rem",outline:"none",border:"0.5px solid lightgray",borderRadius:"4px"}}
                    value={state.gender}
                    onChange={(e) =>
                      setState({ ...state, gender: e.target.value })
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>
                  Address:
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>*</span> */}
                </InputLabel>
                <TextArea
                  required
                  style={{ color: "black" }}
                  placeholder="Address Line 1"
                  value={state.address}
                  onChange={(e) =>
                    setState({ ...state, address: e.target.value })
                  }
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>
                  City / Perish:
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>*</span> */}
                </InputLabel>
                <Select
                  value={state.city}
                  onChange={(e) => setState({ ...state, city: e.target.value })}
                >
                  <MenuItem value="">Select Perish</MenuItem>
                  <MenuItem value="Sandys">Sandys</MenuItem>
                  <MenuItem value="Southampton">Southampton</MenuItem>
                  <MenuItem value="Warwick">Warwick</MenuItem>
                  <MenuItem value="Pembroke">Pembroke</MenuItem>
                  <MenuItem value="Paget">Paget</MenuItem>
                  <MenuItem value="Devonshire">Devonshire</MenuItem>
                  <MenuItem value="Smith's">Smith's</MenuItem>
                  <MenuItem value="Hamilton">Hamilton</MenuItem>
                  <MenuItem value="St. George's">St. George's</MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="input-field">
                <InputLabel>
                  Postal Code:
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>*</span> */}
                </InputLabel>
                <TextField
                  required
                  placeholder="Postal Code"
                  value={state.zipcode}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) {
                      setState({ ...state, zipcode: e.target.value });
                    }
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>
                  Country:
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>*</span> */}
                </InputLabel>

                <select
                  className="form-control"
                  name="country"
                  id="country"
                  style={{
                    border: "1px solid lightgray",
                    padding: "5px 10px",
                    height: "2rem",
                  }}
                  required=""
                  value={state?.country || ""}
                  onChange={(e) =>
                    setState({ ...state, country: e.target.value })
                  }
                >
                  <option value="">Select Country</option>

                  <option value="Bermuda">Bermuda</option>
                </select>
              </div>
            </Grid>
            <Grid
              container
              justifyContent="flex-end"
              sx={{ marginTop: "20px" }}
            >
              <Grid item>
                <Button
                  className="save-btn"
                  variant="contained"
                  style={{ background: "#7356b2" }}
                  onClick={() => handleSaveClick()}
                  disabled={
                    state.first_name == "" || state.last_name == ""
                    // state.address == "" ||
                    // state.zipcode == "" ||
                    // state.country == "" ||
                    // state.city == "" ||
                    // state.email == "" ||
                    // state.phone == ""
                  }
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
