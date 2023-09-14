import React, { useEffect } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  styled,
  Switch,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
// import "./AddCategories.css";
import "./Roles.css";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import axios from "axios";
import PermissionRow from "./PermissionRow";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddRoleAndPremissions = () => {
  const [allPermissions, setAllPermissions] = useState([]);
  const [allowedPermissions, setAllowedPermissions] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const search = useParams();

  const [currRole, setCurrRole] = useState({});

  const getCurrRole = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/roles/${search.id}`);
      setCurrRole(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    if (search.id) {
      getCurrRole();
    }
  }, [search]);

  useEffect(() => {
    if (currRole.name) {
      setName(currRole.name);
      setDesc(currRole.description);
      setAllowedPermissions(currRole?.permissions?.map((elem) => elem.id));
    }
  }, [currRole]);

  const getAllPemissions = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/permissions/all`);
      const arr = Object.keys(res.data.data).map((key) => {
        return { [key]: res.data.data[key] };
      });
      setAllPermissions(arr);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllPemissions();
  }, []);
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSaveClick = async () => {
    const payload = {
      name: name,
      description: desc,
      permissions: allowedPermissions,
    };

    if (search.id) {
      try {
        await axios.put(`${APIBASE}admin/roles/${search.id}`, payload);
        toast.success("Role updated successfully.");
        window.history.go(-1);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        await axios.post(`${APIBASE}admin/roles`, payload);
        toast.success("Role added successfully.");
        window.history.go(-1);
      } catch (error) {
        toast.error(error.response.data.message);
      }
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
            Administrative - Settings - {search.id ? "Edit Role" : "Add Roles"}{" "}
            And Permissions
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
          <h3 className="card-title">
            {search.id ? "Edit Role" : "Add New Roles "}
          </h3>
        </div>
        <div className="Add-Categories-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div className="input-field">
                <InputLabel>Role Name:</InputLabel>
                <TextField
                  placeholder="Enter Role Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="input-field">
                <InputLabel>Description:</InputLabel>
                <TextField
                  placeholder="Enter Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>
          <br />

          <h3>Role Permissions</h3>
          <div className="permissions"></div>
          {allPermissions?.map((row, index) => (
            <PermissionRow
              row={row}
              index={index}
              allowedPermissions={allowedPermissions}
              setAllowedPermissions={setAllowedPermissions}
            />
          ))}
        </div>
        <br />
        <div>
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
              style={{
                background: "#7356b2",
                marginRight: "1rem",
                color: "white",
              }}
              onClick={() => handleSaveClick()}
              disabled={
                name === "" || desc === "" || allowedPermissions?.length === 0
              }
            >
              Save
            </Button>
          </Grid>
        </div>
        <br />
      </div>
    </>
  );
};

export default AddRoleAndPremissions;
