import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Autocomplete,
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";

import TextArea from "antd/es/input/TextArea";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";

import "./Employees.css";

import countries from "../../../MainPages/Countries/Countries";
import HomeIcon from "@mui/icons-material/Home";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  employee_code: "",
  phone: "",
  gender: "",
  joining_date: "",
  dob: "",
  address: "",
  country: "",
  marital_status: "",
  designation: "",
  department: "",
  employement_type: "",
  image: "",
  password: "",
  hourly_rate: "",
  slack_member_id: "",
  status: true,
  login_allowed: "",
  receive_mail_notification: "",
  skills: "",
  probation_end_date: "",
  notice_period_start_date: "",
  notice_period_end_date: "",
  roles: [],
  permissions: [],
};
const AddEmployees = () => {
  const [errors, setErrors] = useState({});

  const [allRoles, setAllRoles] = useState([]);

  const search = useParams();

  const [currEmp, setCurrEmp] = useState({});

  const getCurrEmp = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-employee/${search.id}`);
      setCurrEmp(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    if (search.id) {
      getCurrEmp();
    }
  }, []);
  useEffect(() => {
    if (currEmp.email) {
      setState({
        ...state,
        name: currEmp?.name,
        email: currEmp?.email,
        employee_code: currEmp?.employee_code,
        phone: currEmp?.phone,
        gender: currEmp?.gender,
        joining_date: currEmp?.joining_date,
        dob: currEmp?.dob,
        address: currEmp?.address,
        country: currEmp?.country,
        marital_status: currEmp?.marital_status,
        designation: currEmp?.designation,
        department: currEmp?.department,
        employement_type: currEmp?.employement_type,
        hourly_rate: currEmp?.hourly_rate,
        skills: currEmp?.skills,
        probation_end_date: currEmp?.probation_end_date,
        notice_period_start_date: currEmp?.notice_period_start_date,
        notice_period_end_date: currEmp?.notice_period_end_date,
        roles: currEmp?.roles.map((elem) => elem.id),
      });
    }
  }, [currEmp]);
  const getAllRoles = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/roles`);
      setAllRoles(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const [state, setState] = useState(initialState);
  const [brandValue, setShippingValue] = useState("");
  const [supplierValue, setPaymentValue] = useState("");
  const [radioValue1, setRadioValue1] = useState("");
  const [radioValue2, setRadioValue2] = useState("");

  const handleFileUploadGallary = (event) => {
    const files = event.target.files;
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Perform the upload logic here
      // You can use the 'file' object to upload the individual image

      // For example, you can create an object with image information and add it to the 'uploadedImages' array
      const imageInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      uploadedImages.push(imageInfo);
    }

    //console.log(uploadedImages);
  };

  const handleRadioChange1 = (event) => {
    setRadioValue1(event.target.value);
    setState({ ...state, login_allowed: event.target.value });
  };

  const handleRadioChange2 = (event) => {
    setRadioValue2(event.target.value);
    setState({ ...state, receive_mail_notification: event.target.value });
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSaveClick = () => {
    const newErrors = {};

    // Validate each field and populate newErrors object
    if (state.name?.trim() === "") {
      newErrors.name = true;
    }
    if (state.email?.trim() === "") {
      newErrors.email = true;
    }
    if (state.phone?.trim() === "") {
      newErrors.phone = true;
    }

    if (state.address?.trim() === "") {
      newErrors.address = true;
    }
    if (state.password?.trim() === "" && !search.id) {
      newErrors.password = true;
    }
    if (state.country?.trim() === "") {
      newErrors.country = true;
    }

    if (state.roles.length === 0) {
      newErrors.role = true;
    }
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    addEmployee(state);
  };

  const addEmployee = async (data) => {
    if (search.id) {
      delete data.password;
      try {
        await axios.put(`${APIBASE}admin/admins/${search.id}`, data);
        toast.success("Employee updated successfully.");
        window.history.go(-1);
      } catch (error) {
        toast.error("Error");
      }
    } else {
      try {
        await axios.post(`${APIBASE}admin/admins`, data);
        toast.success("Employee added successfully.");
        window.history.go(-1);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  // //console.log("state",currEmp.roles,state.roles, allRoles, allRoles?.filter((elem) => elem.id == state.roles[0])[0]
  // ?.name)

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - Add Employees
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
            <Typography variant="h1">Add Staff</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
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
                  {errors.employee_code && (
                    <FormHelperText error>
                      Employee ID is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Employee Name :
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
                  {errors.name && (
                    <FormHelperText error>
                      Employee Name is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Employee Email :
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

                  {errors.email && (
                    <FormHelperText error id="my-helper-text">
                      Employee email is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="input-field">
                  <InputLabel>Profile Picture :</InputLabel>
                  <input type="file" onChange={handleFileUploadGallary} />
                </div>
              </Grid>

              {!search.id && (
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="">
                    Password :
                    <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                  </InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Enter Password"
                      value={state.password}
                      onChange={(e) =>
                        setState({ ...state, password: e.target.value })
                      }
                      type="password"
                    />
                    {errors.password && (
                      <FormHelperText error>
                        Employee Password is required.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <InputLabel>Designation :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="shipping">Select Designation</InputLabel>
                  <Select
                    id="designation"
                    name="designation"
                    value={state.designation}
                    onChange={(e) =>
                      setState({ ...state, designation: e.target.value })
                    }
                  >
                    <MenuItem value="Senior">Senior</MenuItem>
                    <MenuItem value="Trainee">Trainee</MenuItem>
                  </Select>
                  {errors.designation && (
                    <FormHelperText error>
                      Employee Designation is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Department :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="">Select Department</InputLabel>
                  <Select
                    id="department"
                    name="department"
                    value={state.department}
                    onChange={(e) =>
                      setState({ ...state, department: e.target.value })
                    }
                  >
                    {/* Placeholder */}

                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Sale">Sale</MenuItem>
                  </Select>
                  {errors.department && (
                    <FormHelperText error>
                      Employee Department is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="select-country">
                  Country :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth required>
                  <Select
                    value={state.country}
                    onChange={(e) => {
                      setState({ ...state, country: e.target.value });
                    }}
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    <MenuItem value="Bermuda">Bermuda</MenuItem>
                  </Select>

                  {errors.country && (
                    <FormHelperText error>
                      Employee Country is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Mobile :
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
                  {errors.phone && (
                    <FormHelperText error>
                      Employee Phone is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Select Gender :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="">Select Gender</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
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
                <InputLabel htmlFor="date">Joining Date :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Select date"
                    value={state.joining_date}
                    onChange={(e) =>
                      setState({ ...state, joining_date: e.target.value })
                    }
                    id="date"
                    type="date"
                  />
                  {errors.joining_date && (
                    <FormHelperText error>
                      Employee Joining date is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">Date of Birth :</InputLabel>
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
                <InputLabel htmlFor="">
                  User Role :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="">Select Role</InputLabel>
                  <Select
                    id="role"
                    name="role"
                    value={
                      allRoles?.filter((elem) => elem.id == state.roles[0])[0]
                        ?.name
                    }
                    onChange={(e) =>
                      setState({
                        ...state,
                        roles: [
                          allRoles?.filter(
                            (elem) => elem.name === e.target.value
                          )[0]?.id,
                        ],
                      })
                    }
                  >
                    {/* Placeholder */}

                    {/* Dynamic menu items */}
                    {allRoles?.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.role && (
                    <FormHelperText error>
                      Employee Role is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">
                  {" "}
                  Address :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextArea
                    placeholder="Address"
                    id="date"
                    type="date"
                    style={{
                      padding: "4px 11px 0px",
                      fontSize: "16px",
                      borderRadius: "4px",
                    }}
                    value={state.address}
                    onChange={(e) =>
                      setState({ ...state, address: e.target.value })
                    }
                  />
                  {errors.address && (
                    <FormHelperText error>
                      Employee Address is required.
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <div className="partition"></div>
              {/* <Grid item xs={12} md={6}>
                <InputLabel>Login Allowed ? :</InputLabel>
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioValue1 === "yes"}
                      onChange={handleRadioChange1}
                      value="yes"
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioValue1 === "no"}
                      onChange={handleRadioChange1}
                      value="no"
                    />
                  }
                  label="No"
                />
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <InputLabel>Receive email notifications ? :</InputLabel>
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioValue2 === "yes"}
                      onChange={handleRadioChange2}
                      value="yes"
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioValue2 === "no"}
                      onChange={handleRadioChange2}
                      value="no"
                    />
                  }
                  label="No"
                />
              </Grid> */}

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Hourly Rate :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Hourly Rate"
                    type="number"
                    value={state.hourly_rate}
                    onChange={(e) =>
                      setState({ ...state, hourly_rate: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Skills :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Skills"
                    value={state.skills}
                    onChange={(e) =>
                      setState({ ...state, skills: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">Probation End Date :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Select date"
                    value={state.probation_end_date}
                    onChange={(e) =>
                      setState({ ...state, probation_end_date: e.target.value })
                    }
                    id="date"
                    type="date"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">
                  Notice Period Start Date :
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Select date"
                    value={state.notice_period_start_date}
                    onChange={(e) =>
                      setState({
                        ...state,
                        notice_period_start_date: e.target.value,
                      })
                    }
                    id="date"
                    type="date"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">Notice Period End Date :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Select date"
                    value={state.notice_period_end_date}
                    onChange={(e) =>
                      setState({
                        ...state,
                        notice_period_end_date: e.target.value,
                      })
                    }
                    id="date"
                    type="date"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="date">Employment Type :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="emptype">Employment Type</InputLabel>
                  <Select
                    id=""
                    name="emptype"
                    value={state.employement_type}
                    onChange={(e) =>
                      setState({ ...state, employement_type: e.target.value })
                    }
                  >
                    <MenuItem key="Full Time" value="Full Time">
                      Full Time
                    </MenuItem>
                    <MenuItem key="Part Time" value="Part Time">
                      Part Time
                    </MenuItem>
                    <MenuItem key="On Contract" value="On Contract">
                      On Contract
                    </MenuItem>
                  </Select>
                  {errors.employement_type && (
                    <FormHelperText error>Field is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Maritial Status :</InputLabel>
                <FormControl fullWidth>
                  <InputLabel htmlFor="">Maritial Status</InputLabel>
                  <Select
                    id="marital"
                    name="marital"
                    value={state.marital_status}
                    onChange={(e) =>
                      setState({ ...state, marital_status: e.target.value })
                    }
                  >
                    <MenuItem key="married" value="married">
                      Married
                    </MenuItem>
                    <MenuItem key="Single" value="Single">
                      Unmarried
                    </MenuItem>
                  </Select>
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
              Save
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddEmployees;
