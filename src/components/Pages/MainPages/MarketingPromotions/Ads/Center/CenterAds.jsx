import React, { useState } from "react";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Pagination,
  Button,
  IconButton,
  Menu,
  Checkbox,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Center.css";
import axios from "axios";
import { toast } from "react-toastify";

const CenterAds = () => {
  const [listItems, setListItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };
  const getAllAds = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${APIBASE}admin/promosbanner`);
      setListItems(res.data.data);
      setIsLoading(false);
    } catch (error) {
      //console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAds();
  }, []);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  const handleStatusChange = async (e, id) => {
    const payload = { status: e.target.checked ? 1 : 0 };
    try {
      await axios.post(
        `${APIBASE}admin/update-banner-status/${id}?_method=PUT`,
        payload
      );
      toast.success("Status changed successfully.");
      getAllAds();
    } catch (error) {
      //console.log(error);
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
          <h6 style={{ margin: "5px" }}>Promotions - All Center Ads</h6>
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
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Center Ads</h3>
            {/* Buttons */}
            {/* <div className="tabs-butons">All</div> */}
          </div>
          {/* Buttons End*/}
          <div className="main-body2">
            {/* Search and Nos */}
            <div className="searchAndNosBlogs mt-2">
              <div className="nos">
                Show <span className="spaces"></span>
                <Select
                  //   value={rowsPerPage}
                  //   onChange={handleRowsPerPageChange}
                  label="Rows per page"
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
                <span className="spaces"></span> entries
              </div>
              <div className="search-inventory">
                <div className="search-in-table">
                  <OutlinedInput
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
                    }}
                    // value={searchText}
                    // onChange={handleSearchChange}
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="start">
                        Search...
                      </InputAdornment>
                    }
                  />
                </div>
              </div>
            </div>
            {/* Search and Nos END */}

            {/* Table */}
            <TableContainer
              component={Paper}
              style={{ boxShadow: "none" }}
              id="tableContainer"
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }} align="left">
                      Sr. No.
                    </TableCell>

                    <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>

                    <TableCell style={{ fontWeight: "bold" }}>Image</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Image url
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="left">
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    listItems?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1} </TableCell>
                        <TableCell>{row?.title} </TableCell>

                        <TableCell>
                          <img
                            src={`${IMAGEURL}${row.image}`}
                            style={{ height: "50px", width: "auto" }}
                          />{" "}
                        </TableCell>
                        <TableCell>{row?.image_url} </TableCell>
                        <TableCell>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={(e) => handleStatusChange(e, row.id)}
                              checked={row.status === 1}
                            />
                            <span className="slider"></span>
                          </label>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(event) => handleMenuOpen(event, row.id)}
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
                            <MenuItem>
                              <Link
                                to={`/admin/Marketing-Promotions/add-center-ads/${row.id}`}
                              >
                                Update
                              </Link>
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table End */}

            {/* Pagination */}
            <div className="pagination-style-p-inventory">
              {/* <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                className="pagination-style"
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              /> */}
            </div>
            {/* Pagination END */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CenterAds;
