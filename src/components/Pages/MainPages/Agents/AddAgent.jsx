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
import "./Agent.css";
import HomeIcon from "@mui/icons-material/Home";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { APIBASE } from "../../../auth/apiConfig";

const initialState = {
  name: "",
  email: "",
};
const AddAgent = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [allRoles, setAllRoles] = useState([]);

  const search = useParams();

  const [currEmp, setCurrEmp] = useState({});

  const getCurrEmp = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/agents/${search.id}`);
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
      });
    }
  }, [currEmp]);

  const [state, setState] = useState(initialState);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSaveClick = () => {
    addEmployee(state);
  };

  const addEmployee = async (data) => {
    if (search.id) {
      let payload = {};
      if (data.name != currEmp.name && data.email === currEmp.email) {
        payload.name = data.name;
      } else if (data.email != currEmp.email && data.name === currEmp.name) {
        payload.email = data.email;
      } else {
        payload.name = data.name;
        payload.email = data.email;
      }
      try {
        setIsLoading(true);
        await axios.put(`${APIBASE}admin/agents/${search.id}`, payload);
        toast.success("Agent updated successfully.");
        setIsLoading(false);
        window.history.go(-1);
      } catch (error) {
        setIsLoading(false);
        toast.error("Error");
      }
    } else {
      try {
        setIsLoading(true);
        await axios.post(`${APIBASE}admin/agents`, data);
        toast.success("Agent added successfully.");
        setIsLoading(false);
        window.history.go(-1);
      } catch (error) {
        setIsLoading(false);
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
          <h6 style={{ margin: "5px" }}>People - Agent - Add Agent</h6>
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
            <Typography variant="h1">Add Agent</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Agent Name :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Agent Name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">
                  Agent Email :
                  <span style={{ fontWeight: "bold", color: "red" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Agent Email"
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    type="email"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}></Grid>
            </Grid>
            {/* <div className="partition"></div> */}
          </div>
          {/* Submit button */}
          <div
            className="add-product-save-btn"
            style={{ padding: "1rem", borderTop: "1px solid lightgray" }}
          >
            <Button
              className="save-btn"
              variant="contained"
              onClick={() => handleSaveClick()}
              disabled={state.name == "" || state.email == "" || isLoading}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddAgent;
