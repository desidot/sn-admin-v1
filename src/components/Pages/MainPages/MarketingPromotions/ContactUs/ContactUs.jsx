import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
} from "@mui/material";
import "./ContactUs.css";
import {
  MoreVertOutlined,
  // EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import ReplayIcon from "@mui/icons-material/Replay";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import PrintIcon from "@mui/icons-material/Print";
// import ProductImg from "../../../../../../assets/products/spray-product.jpg";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers, getAllOrders } from "../../../../../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const getAllContactUs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${APIBASE}admin/contacts?page=${page}`);
      setListItems(res.data.data);
      setPageCount(Math.ceil(res.data.meta.total / res.data.meta.per_page));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllContactUs();
  }, [page]);

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

  const handleDeleteClick = async (id) => {
    handleMenuClose();
    try {
      await axios.delete(`${APIBASE}admin/contacts/${id}`);
      toast.success("Item deleted successfully.");
      getAllContactUs();
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Promotion - Marketing - Contact Us</h6>
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
      <div>
        <div className="all-orders">
          {/* End Filter */}
          <br />
          <div className="orders-section">
            {/* Orders Start*/}
            <div className="order-head">
              <Typography variant="h1">Contact Us</Typography>

              {/* <div className="search-orders">
                <div className="search-in-table">
                  <TextField
                    position="start"
                    value={searchOrder}
                    onChange={(e) => setSearchOrder(e.target.value)}
                  />
                  {/* Search...
                </div>
                <Button
                  variant="contained"
                  onClick={() => handleSearch()}
                  className="search-btn"
                >
                  search
                </Button>
              </div> */}
            </div>
            <div className="orders-container">
              <div className="order-entries" style={{ textAlign: "center" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr. No.</TableCell>
                        <TableCell>Date</TableCell>

                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Message</TableCell>

                        <TableCell>
                          <SettingsIcon />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <span>Loading...</span>
                      ) : (
                        <>
                          {listItems?.map((row, index) => (
                            <TableRow>
                              <TableCell>
                                {15 * (page - 1) + index + 1}{" "}
                              </TableCell>
                              <TableCell>
                                {
                                  getNormalDateAndTime(row.created_at)
                                    .normalDate
                                }
                                <br />
                                {
                                  getNormalDateAndTime(row.created_at)
                                    .normalTime
                                }
                              </TableCell>

                              <TableCell>{row.name} </TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>{row.phone}</TableCell>
                              <TableCell>{row.message}</TableCell>

                              <TableCell>
                                <IconButton
                                  onClick={(event) =>
                                    handleMenuOpen(event, row.id)
                                  }
                                  size="small"
                                >
                                  <MoreVertOutlined />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={openMenuId === row.id}
                                  onClose={handleMenuClose}
                                  PaperProps={{
                                    style: {
                                      maxHeight: 120,
                                    },
                                  }}
                                >
                                  <MenuItem
                                    onClick={() => handleDeleteClick(row.id)}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            {/* <br /> */}
            {/* Orders End */}
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              className="pagination-style"
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "right",
              }}
            />
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default ContactUs;
