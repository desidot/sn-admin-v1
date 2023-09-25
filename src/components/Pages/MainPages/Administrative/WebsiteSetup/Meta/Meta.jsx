import React, { useEffect, useState } from "react";
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
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { toast } from "react-toastify";

const Meta = () => {
  const [listItems, setListItems] = useState([]);
  const navigate = useNavigate();
  const getAllMeta = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/metas`);
      setListItems(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllMeta();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  });

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

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredRows = listItems?.filter((row) =>
    row.page_name.toLowerCase().includes(searchText.toLowerCase())
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

  const handleDeleteClick = async (id) => {
    handleMenuClose();
    try {
      await axios.delete(`${APIBASE}admin/metas/${id}`);
      toast.success("Meta deleted successfully.");
      getAllMeta();
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong!");
    }
  };
  const handleEditClick = (id) => {
    navigate(`/admin/Administrative/Website-Setup/edit-meta/${id}`);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Administrative - Website Setup - All Meta
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
            <h3 className="card-title">All Meta</h3>
            {/* Buttons */}
            <div className="tabs-butons">
              <Button variant="contained">All</Button>
              <Link to="/admin/Administrative/Website-Setup/add-meta">
                <Button variant="contained">Add Meta</Button>
              </Link>
              {/* <Button variant="contained">Trash</Button> */}
            </div>
          </div>
          {/* Buttons End*/}
          <div className="main-body2">
            {/* Search and Nos */}
            <div className="searchAndNosBlogs mt-3 mb-2">
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
                    <TableCell style={{ fontWeight: "bold" }}>Page</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Keywords
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell>Loading...</TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody align="left">
                    {displayedRows?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell>{row.page_name}</TableCell>
                        <TableCell>{row.meta_title}</TableCell>
                        <TableCell>{row.meta_keyword}</TableCell>

                        <TableCell>{row.meta_description} </TableCell>

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
                            <MenuItem onClick={() => handleEditClick(row.id)}>
                              <EditOutlined fontSize="small" /> Edit
                            </MenuItem>
                            <MenuItem onClick={() => handleDeleteClick(row.id)}>
                              <DeleteOutlined fontSize="small" /> Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
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

export default Meta;
