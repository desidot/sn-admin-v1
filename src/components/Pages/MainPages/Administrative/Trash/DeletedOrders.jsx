import React, { useEffect, useState } from "react";
import { MoreVertOutlined } from "@mui/icons-material";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";
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
  IconButton,
  Menu,
} from "@mui/material";

// import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { toast } from "react-toastify";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
const DeletedOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  function createData(
    srNo,
    stockUpdateOn,
    productDesc,
    category,
    brand,
    supplier,
    price,
    quantity,
    action
  ) {
    return {
      srNo,
      stockUpdateOn,
      productDesc,
      category,
      brand,
      supplier,
      price,
      quantity,
      action,
    };
  }

  const rows = [
    createData(
      1,
      "Jul 13 2023",
      "Sample ProcutDesc description 180 caps",
      "Health & Wellness",
      "Test Blog Tes",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),
    createData(
      2,
      "Jul 13 2023",
      "Sample ProcutDesc description 180 caps",
      "Health & Wellness",
      "Test Blog Tes",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),
    createData(
      3,
      "Jul 13 2023",
      "Sample ProcutDesc description 180 caps",
      "Health & Wellness",
      "Test Blog Tes",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),

    // Add more dummy data as needed
  ];

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [listItems, setListItems] = useState([]);

  const getAllDeletedOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${APIBASE}admin/get-deleted-orders`);
      setListItems(res.data["Deleted Orders"]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllDeletedOrders();
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
    row.order_no.toLowerCase().includes(searchText.toLowerCase())
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
      await axios.put(`${APIBASE}admin/restore-order/${id}`);
      toast.success("Order restored successfully.");
      getAllDeletedOrders();
    } catch (error) {
      toast.error("Order didn't get restored!");
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
            Administrative - Trash - Deleted Orders
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
      <div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Deleted Order</h3>
          </div>
          <div className="main-body2">
            {/* Search and Nos */}
            <div className="searchAndNosBlogs mt-2 mb-2">
              <div className="nos">
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
              <div className="search-inventory">
                <div className="search-in-table">
                  <OutlinedInput
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
                    }}
                    value={searchText}
                    onChange={handleSearchChange}
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
                    <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Order ID
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Customer Details
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Discount
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Shipping Status
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Pay Status
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Source</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="left">
                  {isLoading ? (
                    <TableRow>
                      <TableCell>Loading...</TableCell>
                    </TableRow>
                  ) : (
                    displayedRows?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell>{formatDate(row.deleted_at)}</TableCell>
                        <TableCell>{row?.order_no} </TableCell>
                        <TableCell>
                          {JSON.parse(row.billing_address)?.first_name +
                            " " +
                            JSON.parse(row.billing_address)?.last_name}
                          <br />
                          {JSON.parse(row.billing_address)?.email}
                          <br />
                          {JSON.parse(row.billing_address)?.phone}
                        </TableCell>

                        <TableCell>${row?.grand_total}</TableCell>
                        <TableCell>${row?.coupon_discount}</TableCell>
                        <TableCell>
                          {row?.order_status ? row?.order_status : "-"}
                        </TableCell>
                        <TableCell>{row?.payment_status}</TableCell>
                        <TableCell>{row?.payment_method} </TableCell>

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
                            <MenuItem
                              onClick={() => handleRestoreClick(row.id)}
                            >
                              <RestorePageOutlinedIcon
                                sx={{ marginRight: 1 }}
                              />{" "}
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
            {/* Table End */}

            {/* Pagination */}
            <div className="pagination-style-p-inventory">
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                className="pagination-style"
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              />
            </div>
            {/* Pagination END */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletedOrders;
