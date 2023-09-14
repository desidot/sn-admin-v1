// import React, { useState } from "react";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  Typography,
  FormControl,
} from "@mui/material";
import axios from "axios";
import "./Account.css";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const ChangePassword = () => {
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [old_password, setOld_password] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const authId = useSelector((state) => state.auth.user.data.id);
  // const debounce = (func, delay) => {
  //   let timer;
  //   return function (...args) {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func.apply(this, args), delay);
  //   };
  // };

  const handleInput = (event) => {
    const val = event.target.value;

    setOld_password(val);

    // Perform your logic here with the updated value
    // This function will be called after the specified delay (debounce time)
  };
  // const handleInput = debounce(handleInputChange, 1000);

  // const checkPassword = async (val) => {
  //   setIsChecking(true);
  //   try {
  //     const res = await axios.get(
  //       `${APIBASE}admin/check-password/${authId}/${val}`
  //     );
  //     setIsChecking(false);
  //     setIsWrong(false);
  //     setIsRight(true);
  //   } catch (error) {
  //     //console.log(error);
  //     setIsWrong(true);
  //     setIsRight(false);
  //     setIsChecking(false);
  //   }
  // };

  const handleChangeClick = async () => {
    try {
      if (newPass === conPass) {
        await axios.put(`${APIBASE}admin/update-password/${authId}`, {
          new_password: newPass,
          old_password: old_password,
        });
        toast.success("Password changed successfully.");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.message);
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
            Administrative - Account Settings - Change Password
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
            <Typography variant="h1">Change Password</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor=""> Password :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Password"
                    onChange={(e) => handleInput(e)}
                    type="password"
                  />
                  {/* {isChecking && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                      }}
                      className="loader"
                    ></div>
                  )} */}
                  {/* {isRight && !isChecking && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                      }}
                    >
                      {" "}
                      <CheckCircleOutlineIcon
                        style={{ fontSize: "44px", color: "green" }}
                      />{" "}
                    </div>
                  )}
                  {isWrong && !isChecking && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                      }}
                    >
                      {" "}
                      <CloseIcon
                        style={{ fontSize: "44px", color: "Red" }}
                      />{" "}
                    </div>
                  )} */}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor=""> New Password :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="New Password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    type="password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor=""> Confirm Password :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Confirm Password"
                    value={conPass}
                    onChange={(e) => setConPass(e.target.value)}
                    type="password"
                  />
                  {conPass === newPass && newPass.length > 0 && conPass && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                      }}
                    >
                      {" "}
                      <CheckCircleOutlineIcon
                        style={{ fontSize: "44px", color: "green" }}
                      />{" "}
                    </div>
                  )}
                  {conPass !== newPass && newPass.length > 0 && conPass && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                      }}
                    >
                      {" "}
                      <CloseIcon
                        style={{ fontSize: "44px", color: "Red" }}
                      />{" "}
                    </div>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </div>
          {/* Submit button */}
          <div className="add-product-save-btn" style={{ padding: "1rem" }}>
            <Button
              className="save-btn"
              variant="contained"
              onClick={() => handleChangeClick()}
            >
              Change
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChangePassword;
