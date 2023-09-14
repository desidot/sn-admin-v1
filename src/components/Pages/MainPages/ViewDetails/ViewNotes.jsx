import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css";
import axios from "axios";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { APIBASE } from "../../../auth/apiConfig";
const initialNote = {
  order_id: "",
  added_by: "",
  title: "",
  note: "",
};
const ViewNotes = () => {
  const search = useParams();
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(initialNote);
  const auth = useSelector((state) => state.auth.user.data.name);
  const getNotes = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-order-note/${search.id}`
      );
      setNotes(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);
  //console.log(notes);

  function getNormalDateAndTime(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const normalDate = `${year}-${month}-${day}`;
    const normalTime = `${hours}:${minutes}:${seconds}`;

    return {
      normalDate,
      normalTime,
    };
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    setNote({ ...note, order_id: search.id, added_by: auth });
  }, [search, auth]);
  const handleClose = () => {
    setOpen(false);
  };

  const saveNote = async (not) => {
    try {
      await axios.post(`${APIBASE}admin/ordernotes`, not);
      toast.success("Note added.");
      getNotes();
    } catch (error) {
      //console.log(error);
    }
  };

  const handleSaveClick = () => {
    saveNote(note);
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  function formatDateToDayMonthYear(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <div
      className="order-details-main-container"
      style={{ paddingBottom: "20px" }}
    >
      <div className="card-header">
        <h4 className="card-title">Notes</h4>
        {/* Buttons */}
        <div className="tabs-butons">
          <Link to={`/admin/Admin/view-order-details/${search.id}`}>
            <Button variant="contained">Details</Button>
          </Link>

          <Link to={`/admin/Admin/view-invoice-details/${search.id}`}>
            <Button variant="contained">Invoice</Button>
          </Link>

          <Link to={`/admin/Admin/view-and-update-status/${search.id}`}>
            <Button variant="contained">Status</Button>
          </Link>
          <Button variant="contained" style={{ backgroundColor: "#1976d2" }}>
            Notes
          </Button>
          {/* <Button variant="contained">Notes</Button> */}
        </div>
        {/* Buttons End*/}
      </div>
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "15px",
        }}
      >
        <MdAddCircle
          onClick={() => handleClickOpen()}
          style={{ fontSize: "60px", color: "#1976d2", cursor: "pointer" }}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Note"
            type="text"
            fullWidth
            variant="standard"
            value={note.note}
            onChange={(e) => setNote({ ...note, note: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>

      <section className="notes_container">
        {notes?.map((row, index) => (
          <div className="note_box">
            <div
              style={{
                borderBottom: "1px dotted lightgray",
                width: "100%",
                height: "60px",
                display: "flex",
                alignItems: "center",
                padding: "0px 10px",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{ color: "gray", fontWeight: "500", fontSize: "17px" }}
              >
                {formatDateToDayMonthYear(row.created_at)}
              </span>
              <span
                style={{ color: "gray", fontWeight: "500", fontSize: "17px" }}
              >
                Added by : {row.added_by}
              </span>
            </div>
            <div style={{ padding: "0px 10px", paddingBottom: "20px" }}>
              <h3 style={{ color: "#666666" }}>{row.title}</h3>
              <p style={{ color: "#6B6F82" }}> {row.note} </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ViewNotes;
