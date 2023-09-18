import React, { useState, useEffect } from "react";
// import BrandImage from "../../../../../../assets/products/product-bottle.jpg";
import "./ProductReviews.css";
import { AiFillStar } from "react-icons/ai";
import HomeIcon from "@mui/icons-material/Home";

import { MoreVertOutlined, DeleteOutlined } from "@mui/icons-material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  Pagination,
  Switch,
  styled,
  FormControlLabel,
  IconButton,
  Menu,
  InputAdornment,
} from "@mui/material";
import axios from "axios";

const ProductReiews = () => {
  const [reviewsData, setReviewsData] = useState(null);
  const [searchText, setSearchText] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  // State to keep track of the selected review to show in the popup
  const [selectedReview, setSelectedReview] = useState(null);

  // Function to handle showing the popup with selected review
  const handleShowReview = (review) => {
    // console.log(review);
    setSelectedReview(review);
    handleMenuClose();
  };
  // console.log(selectedReview);
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    // setStatusFilter("all");
    // setPage(1);
  };

  // const handleRowsPerPageChange = (event) => {
  //   setRowsPerPage(event.target.value);
  //   // setPage(1);
  // };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`${APIBASE}admin/reviews?page=${page}`);
      setReviewsData(response.data);
      setTotalCount(response.data.meta.total);
      // console.log(response.data.data);
      // const initialToggleState = response.data.data.status;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(reviewsData);
  // console.log(totalCount);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Fetch data for the initial page (page 1)
    fetchData(page);
  }, [page]); // Fetch data whenever the page changes

  const handleDeleteUnit = async (id) => {
    handleMenuClose();
    try {
      // Send a DELETE request to the backend with the review ID
      await axios.delete(`${APIBASE}admin/reviews/${id}`);
      // Show toast notification for successful review deletion
      toast.success("Review deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast after 3 seconds
      });

      // After successful deletion, update the reviewsData state
      // by fetching the updated data from the server
      const response = await axios.get(`${APIBASE}admin/reviews`);
      setReviewsData(response.data);
    } catch (error) {
      console.error("Error deleting review:", error);
      // Show toast notification for error (optional)
      toast.error("Error deleting review. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  // const filteredRows = rows.filter((row) => {
  //   const titleMatch = row.title
  //     .toLowerCase()
  //     .includes(searchText.toLowerCase());
  //   const categoryMatch = row.category
  //     .toLowerCase()
  //     .includes(searchText.toLowerCase());
  //   const statusMatch =
  //     statusFilter === "all" ||
  //     row.status.toLowerCase() === statusFilter.toLowerCase();
  //   return (titleMatch || categoryMatch) && statusMatch;
  // });

  // const startIndex = (page - 1) * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  // const displayedRows = filteredRows.slice(startIndex, endIndex);

  // const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handleStatusChange = async (e, row) => {
    const newStatus = e.target.checked ? 1 : 0;

    try {
      // Send a PUT request to the backend to update the review status
      await axios.put(`${APIBASE}admin/update-review-status/${row.id}`, {
        status: newStatus,
      });

      // Update the reviewsData state to reflect the updated status
      setReviewsData((prevData) => ({
        ...prevData,
        data: prevData.data.map((review) => {
          if (review.id === row.id) {
            return { ...review, status: newStatus };
          }
          return review;
        }),
      }));
    } catch (error) {
      console.error("Error updating review status:", error);
      // Show toast notification for error (optional)
      toast.error("Error updating review status. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - Product Reviews
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
          <h3 className="card-title">Product Reviews</h3>
        </div>
        <div className="main-body2">
          <div className="">
            <div className="BrandsTable">
              {/* Search and Nos */}
              <div className="searchAndNosBrands">
                <div className="nos">
                  Show <span className="spaces"></span>
                  <Select
                    // value={rowsPerPage}
                    // onChange={handleRowsPerPageChange}
                    label="Rows per page"
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                  <span className="spaces"></span> entries
                </div>
                <div className="search-in-table">
                  <OutlinedInput
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
                    }}
                    id="outlined-adornment-weight"
                    onChange={handleSearchChange}
                    value={searchText}
                    endAdornment={
                      <InputAdornment position="end">Search</InputAdornment>
                    }
                  />
                </div>
              </div>
              {/* Search and Nos END */}

              {/* Table */}
              {reviewsData && (
                <TableContainer component={Paper} style={{ boxShadow: "gray" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }} align="left">
                          Sr.No.
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="left">
                          Product
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="left">
                          Rating
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="left">
                          Customer
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="left">
                          Comment
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="left">
                          Published
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }} align="left">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Popup for displaying review details */}
                      {selectedReview && (
                        <div className="popup">
                          <div className="card-header">
                            <div className="main-body2">
                              <h3 className="card-title">View Reviews</h3>
                              <hr />
                              <div
                                className="card"
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  alignItems: "flex-start",
                                }}
                              >
                                <p>
                                  <strong>Name:</strong>{" "}
                                  {selectedReview?.name
                                    ? selectedReview?.name
                                    : selectedReview?.user?.first_name
                                    ? selectedReview?.user?.first_name
                                    : "Unknown" +
                                      " " +
                                      selectedReview?.user?.last_name
                                    ? selectedReview?.user?.last_name
                                    : ""}
                                </p>

                                <p>
                                  <strong>Email:</strong>{" "}
                                  {selectedReview?.email
                                    ? selectedReview?.email
                                    : selectedReview?.user?.email
                                    ? selectedReview?.user?.email
                                    : "unknown"}
                                </p>

                                <p>
                                  <strong>Rating:</strong>{" "}
                                  {selectedReview?.star}
                                </p>

                                <p>
                                  <strong>Headline:</strong>{" "}
                                  {selectedReview?.headline}
                                </p>

                                <p>
                                  <strong>Review:</strong>{" "}
                                  {selectedReview?.review}
                                </p>
                              </div>
                              <hr />
                              <button
                                onClick={() => setSelectedReview(null)}
                                style={{ justifySelf: "center" }}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {reviewsData.data.map((row, index) => (
                        <TableRow
                          key={row.star}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="left">
                            {index + 1}
                          </TableCell>
                          <TableCell align="left">
                            {/* Replace this with actual image URL */}
                            <div
                              className="blog-img"
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              {row?.product?.thumbnail_compress ? (
                                <img
                                  src={
                                    JSON.parse(row?.product?.thumbnail_compress)
                                      .image_urls["100px"]
                                  }
                                  alt="User"
                                />
                              ) : (
                                <img
                                  src={`${IMAGEURL}${row?.product?.thumbnail}`}
                                  alt="Default User"
                                />
                              )}
                              <span>{row.product?.product_name}</span>
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            {row?.star}
                            <span className="star-icon">
                              <AiFillStar />
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            {row?.name
                              ? row?.name
                              : row?.user?.first_name
                              ? row?.user?.first_name
                              : "-" + " " + row?.user?.last_name
                              ? row?.user?.last_name
                              : ""}
                          </TableCell>
                          <TableCell align="left">{row?.review}</TableCell>
                          <TableCell align="left">
                            <FormControlLabel
                              control={
                                <IOSSwitch
                                  sx={{ m: 1 }}
                                  checked={row.status === 1 ? true : false}
                                  onChange={(e) => handleStatusChange(e, row)}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell align="left">
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
                              <MenuItem
                                onClick={() => handleShowReview(row)}
                                size="small"
                              >
                                <VisibilityIcon sx={{ marginRight: 1 }} />
                                View
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleDeleteUnit(row.id)}
                                size="small"
                              >
                                <DeleteOutlined sx={{ marginRight: 1 }} />
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {/* Table END*/}
              {/* Pagination */}
              <Pagination
                count={Math.ceil(totalCount / 15)}
                page={page}
                onChange={handlePageChange}
                className="pagination-style"
                style={{
                  display: "flex",
                  padding: "1rem",
                  justifyContent: "right",
                }}
              />
              {/* Pagination End*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReiews;
