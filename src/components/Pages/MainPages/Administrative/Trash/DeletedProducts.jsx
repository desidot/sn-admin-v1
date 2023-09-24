import React, { useEffect, useState } from "react";
import BrandImage from "../../../../../assets/products/product-bottle.jpg";
// import { Link } from "react-router-dom";
import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
import HomeIcon from "@mui/icons-material/Home";

import { AiFillStar } from "react-icons/ai";

import { MoreVertOutlined, EditOutlined } from "@mui/icons-material";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./deleted.css";

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
  IconButton,
  Menu,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ProductReiews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [listItems, setListItems] = useState([]);

  const getAllDeletedProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${APIBASE}admin/get-deleted-products`);
      setListItems(res.data["Deleted Product"]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllDeletedProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setStatusFilter("all");
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const filteredRows = listItems.filter((row) =>
    row.product_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(dateObject.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  }

  const handleRestoreClick = async (id) => {
    handleMenuClose();
    try {
      await axios.put(`${APIBASE}admin/restore-product/${id}`);
      toast.success("Product restored successfully.");
      getAllDeletedProducts();
    } catch (error) {
      toast.error("Product didn't get restored!");
    }
  };

  //console.log("dis", displayedRows);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Administrative - Trash - Deleted Products
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
          <h3 className="card-title"> Deleted Products </h3>
        </div>
        <div className="main-body2">
          <div className="">
            <div className="BrandsTable">
              {/* Search and Nos */}
              <div className="searchAndNosBrands">
                <div style={{ marginTop: "-5px" }}>
                  Show <span className="spaces"></span>
                  <Select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    label="Rows per page"
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                  <span className="spaces"></span> entries
                </div>
                <div className="search-in-table-del-products mt-2 mb-2 pt-0">
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
              <TableContainer component={Paper} style={{ boxShadow: "gray" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Photo
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Name
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Stock
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Price
                      </TableCell>

                      {/* <TableCell style={{ fontWeight: "bold" }} align="left">
                        Variation
                      </TableCell> */}
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Supplier
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Added by
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell>Loading...</TableCell>
                      </TableRow>
                    ) : (
                      displayedRows?.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">
                            <div className="blog-img">
                              <img
                                src={`${IMAGEURL}${row?.thumbnail}`}
                                alt="Blog"
                              />
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            {row?.product_name}
                          </TableCell>
                          <TableCell align="left">
                            Unit: {row?.quantity} <br />
                            Weight: {row?.weight}
                          </TableCell>

                          <TableCell align="left">
                            ${row?.selling_price}
                          </TableCell>
                          {/* <TableCell align="left">{row?.category?.name}</TableCell> */}
                          <TableCell align="left">
                            {row?.category?.name}
                          </TableCell>
                          <TableCell align="left">{row?.added_by}</TableCell>
                          <TableCell align="left">
                            <IconButton
                              onClick={(event) =>
                                handleMenuOpen(event, row?.id)
                              }
                              size="small"
                            >
                              <MoreVertOutlined />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={openMenuId === row?.id}
                              onClose={handleMenuClose}
                              PaperProps={{
                                style: {
                                  maxHeight: 120,
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => handleRestoreClick(row?.id)}
                              >
                                <RestorePageOutlinedIcon
                                  sx={{ marginRight: 1 }}
                                />
                                Restore
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table END*/}
              {/* Pagination */}
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
              {/* Pagination End*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReiews;
