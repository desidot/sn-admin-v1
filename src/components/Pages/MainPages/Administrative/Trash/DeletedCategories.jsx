import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
// import ProductImage from "../../../../../assets/products/spray-product.jpg";
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
  Checkbox,
  Button,
  IconButton,
  Menu,
} from "@mui/material";
import { MoreVertOutlined, EditOutlined } from "@mui/icons-material";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { toast } from "react-toastify";
const DeletedCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  function createData(srNo, name, expdate, Supplier) {
    return { srNo, name, expdate, Supplier };
  }

  const rows = [
    createData(
      1,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
    createData(
      2,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
    createData(
      3,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
  ];

  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [listItems, setListItems] = useState([]);

  const getAllDeletedCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${APIBASE}admin/get-deleted-category`);
      setListItems(res.data["Deleted Categories"]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllDeletedCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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

  const handleCheckboxChange = (event, srNo) => {
    const isChecked = event.target.checked;
    setSelectedRows((prevSelectedRows) => {
      if (isChecked) {
        return [...prevSelectedRows, srNo];
      } else {
        return prevSelectedRows.filter((row) => row !== srNo);
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredRows?.map((row) => row.srNo));
    } else {
      setSelectedRows([]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredRows = listItems?.filter((row) => {
    const nameMatch = row?.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return nameMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows?.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows?.length / rowsPerPage);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleRestoreClick = async (id) => {
    handleMenuClose();
    try {
      await axios.put(`${APIBASE}admin/restore-category/${id}`);
      toast.success("Category restored successfully.");
      getAllDeletedCategories();
    } catch (error) {
      toast.error("Category didn't get restored!");
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
            Administrative - Trash - Deleted Categories
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
          <h3 className="card-title">Deleted Categories</h3>
          <div className="copy-button">
            <Link to="/admin/ProductManager/Products/add-categories">
              <Button variant="contained">Add New</Button>
            </Link>
          </div>
        </div>
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos"></div>
            <div className="search-inventory">
              <div className="search-in-table mt-2 mb-2">
                <OutlinedInput
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                  value={searchText}
                  onChange={handleSearchChange}
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="start">Search...</InputAdornment>
                  }
                />
              </div>
            </div>
          </div>
          {/* Search and Nos END */}

          {/* Table */}
          <TableContainer
            component={Paper}
            style={{ boxShadow: "gray" }}
            id="tableContainer"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    <Checkbox
                      checked={selectedRows?.length === displayedRows?.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Category Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Category Code / HSN Code
                  </TableCell>

                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="left">
                {isLoading ? (
                  <TableRow>
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                ) : (
                  displayedRows?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={(event) =>
                            handleCheckboxChange(event, row.id)
                          }
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {row.code ? row.code : "-"}
                      </TableCell>

                      <TableCell align="left">--</TableCell>
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
                          <MenuItem onClick={() => handleRestoreClick(row.id)}>
                            <RestorePageOutlinedIcon sx={{ marginRight: 1 }} />
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
          <div>
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
          {/* Pagination END */}
        </div>
      </div>
    </>
  );
};

export default DeletedCategories;
