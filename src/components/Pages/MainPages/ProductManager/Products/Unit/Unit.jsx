import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Button,
  IconButton,
  Menu,
  InputAdornment,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import EditUnit from "./EditUnit";

const Units = () => {
  // const navigate = useNavigate();
  const [unitsData, setUnitsData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${APIBASE}admin/units?page=${page}`);
      setUnitsData(response.data.data);
      setPageCount(
        Math.ceil(response.data.meta.total / response.data.meta.per_page)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [page]);

  function createData(id, name, short_name, allow_decimal, action) {
    return { id, name, short_name, allow_decimal, action };
  }

  const rows =
    unitsData.map((units, index) =>
      createData(units.id, units.name, units.short_name, units.allow_decimal)
    ) || [];

  const [searchText, setSearchText] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleDeleteUnit = async (id) => {
    try {
      // Send a DELETE request to the backend with the unit ID
      await axios.delete(`${APIBASE}admin/units/${id}`);
      // Fetch data again to update the unitsData state after deletion
      fetchData();
      // Show toast notification for successful unit deletion
      toast.success("Unit deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast after 3 seconds
      });
    } catch (error) {
      console.error("Error deleting unit:", error);
      // Show toast notification for error (optional)
      toast.error("Error deleting unit. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    // setStatusFilter("all");
    setPage(1);
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
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

  const filteredRows = rows.filter((row) => {
    const nameMatch = row.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const short_nameMatch = row.short_name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    return nameMatch || short_nameMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  //const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Other routes */}
        <Route
          path="/admin/ProductManager/Products/edit-unit"
          element={<EditUnit />}
        />
      </Routes>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - All Units
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
          <h3 className="card-name">All your units</h3>
          {/* Buttons */}
          <div className="tabs-butons">
            <Link to="/admin/ProductManager/Products/add-unit">
              <Button variant="contained">Add New</Button>
            </Link>
          </div>
          {/* Buttons End*/}
        </div>
        <div className="main-body2">
          <div className="">
            <div className="BrandsTable">
              {/* Search and Nos */}
              <div className="searchAndNosBrands">
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
              <TableContainer component={Paper} style={{ boxShadow: "gray" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Name
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Short Name
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Allow Decimal
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {unitsData?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.short_name}</TableCell>
                        <TableCell align="left">{row.allow_decimal}</TableCell>
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
                              <Link
                                to={`/admin/ProductManager/Products/edit-unit/${row.id}`}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                              >
                                <EditOutlined sx={{ marginRight: 1 }} />
                                Edit
                              </Link>
                            </MenuItem>

                            <MenuItem onClick={() => handleDeleteUnit(row.id)}>
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

export default Units;
