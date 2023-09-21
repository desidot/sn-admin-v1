import React, { useState } from "react";
import { MoreVertOutlined, DeleteOutlined } from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import HomeIcon from "@mui/icons-material/Home";
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
  // OutlinedInput,
  // InputAdornment,
  Pagination,
  IconButton,
  Menu,
  Snackbar,
  TextField,
  Button,
} from "@mui/material";
import "./Invoice.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

const InvoiceList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    handleMenuClose();
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const [listItems, setListItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [searchOrder, setSearchOrder] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const getAllInvoices = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-all-orders?page=${page}&search=${searchOrder}`
      );
      setPageCount(Math.ceil(res.data.data.total / res.data.data.per_page));
      setTotalItems(res.data.data.total);
      setListItems(res.data.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllInvoices();
  }, [page]);
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleSearch = () => {
    getAllInvoices();
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Sales - Invoice List</h6>
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
            <h3 className="card-title">Invoice List</h3>
          </div>
          <div className="BlogsTable">
            {/* Search and Rows per Page */}
            <div className="searchAndNosInvoice">
              <div className="inv-nos">Total:-{totalItems}</div>
              <div className="search-invoice">
                <TextField
                  position="start"
                  value={searchOrder}
                  placeholder="search by order no."
                  size="small"
                  onChange={(e) => setSearchOrder(e.target.value)}
                />

                <Button
                  variant="contained"
                  onClick={() => handleSearch()}
                  className="search-btn"
                >
                  search
                </Button>
              </div>
            </div>
            {/* Search and Rows per Page END */}

            <TableContainer component={Paper} style={{ boxShadow: "gray" }}>
              {/* Table */}
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Sr. No.
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Date
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Invoice
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Order No
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Customer Name
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Amount
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
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
                    listItems?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">
                          {getNormalDateAndTime(row.created_at).normalDate}
                        </TableCell>
                        <TableCell align="left" style={{ color: "blue" }}>
                          <a
                            href={`${IMAGEURL}${row.invoice_pdf}`}
                            target="_blank"
                          >
                            {" "}
                            {row.invoice_no}
                          </a>
                        </TableCell>
                        <TableCell align="left">{row.order_no}</TableCell>
                        <TableCell align="left">
                          {JSON.parse(row?.billing_address).first_name}{" "}
                          {JSON.parse(row?.billing_address).last_name}{" "}
                        </TableCell>
                        <TableCell align="left">${row.grand_total}</TableCell>
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
                            <MenuItem onClick={handleMenuClose}>
                              <VisibilityOffIcon sx={{ marginRight: 1 }} />
                              <Link
                                to={`/admin/Admin/view-order-details/${row.id}`}
                              >
                                View
                              </Link>
                            </MenuItem>
                            <MenuItem
                              onClick={handleClick({
                                vertical: "top",
                                horizontal: "center",
                              })}
                            >
                              <small>
                                <DeleteOutlined sx={{ marginRight: 1 }} />
                                Delete
                              </small>
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table END */}
            {/* Pagination */}
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              className="pagination-style-invoice"
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "right",
              }}
            />
            {/* Pagination End */}

            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="First delete your order!"
              key={vertical + horizontal}
            />
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default InvoiceList;
