import React from "react";
import {
  Button,
  InputLabel,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Prefixes = () => {
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  const [isLoading,setIsLoading]=useState(false)
  const [id,setId]=useState("")
  const [prefix, setPrefix] = useState({
    subscription_no: "",
    sales_order: "",
    invoice: "",
    pos: "",
  });

  const getPrefixes = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/prefixes`);
      const val = res.data.data[0];
      setPrefix({
        ...prefix,
        subscription_no: val.subscription_no,
        sales_order: val.sales_order,
        invoice: val.invoice,
        pos: val.pos,
      });
      setId(val.id)
    } catch (eer) {}
  };

  useEffect(() => {
    getPrefixes();
  }, []);

  const handleSaveAndUpdateClick=async()=>{
    setIsLoading(true)
try{
await axios.put(`${APIBASE}admin/prefixes/${id}`,prefix)
setIsLoading(false)
toast.success("Prefix updated successfully.")
getPrefixes()
}catch(error){
  setIsLoading(false)
  toast.error(error.response.data.message)
}
  }

  return (
    <>
      {" "}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Administrative - Settings - Perfixes
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
            <Typography variant="h1">Set Prefixes</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="">Subscription No :</InputLabel>
                <FormControl fullWidth>
                  <TextField placeholder="SBN" value={prefix.subscription_no} onChange={(e)=>setPrefix({...prefix,subscription_no:e.target.value})} />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="">Sales Order :</InputLabel>
                <FormControl fullWidth>
                  <TextField placeholder="SN" value={prefix.sales_order} onChange={(e)=>setPrefix({...prefix,sales_order:e.target.value})} />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="">Invoice :</InputLabel>
                <FormControl fullWidth>
                  <TextField placeholder="INV" value={prefix.invoice} onChange={(e)=>setPrefix({...prefix,invoice:e.target.value})} />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <InputLabel htmlFor="">POS :</InputLabel>
                <FormControl fullWidth>
                  <TextField placeholder="PO" value={prefix.pos} onChange={(e)=>setPrefix({...prefix,pos:e.target.value})} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <div
                  className="add-wishlist-submit-btn"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button className="submit-btn" variant="contained" disabled={isLoading} onClick={()=>handleSaveAndUpdateClick()} >
                 { isLoading?"Saving":"Save & Update"}
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

export default Prefixes;
