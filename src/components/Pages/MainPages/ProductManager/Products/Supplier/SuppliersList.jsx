import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  FormControlLabel,
  styled,
  Switch,
} from "@mui/material";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const Suppliers = () => {
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const [suppliersData, setSuppliersData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Function to update the status of a supplier
  const handleSupplierStatusChange = async (event, row) => {
    const fieldValue = event.target.checked; // true or false

    try {
      await axios.put(`${APIBASE}admin/suppliers/${row.id}`, {
        status: fieldValue,
        name: row.name,
      });
      setSuppliersData((prevData) =>
        prevData.map((supplier) =>
          supplier.id === row.id
            ? { ...supplier, status: fieldValue } // Update the status field
            : supplier
        )
      );
      toast.success("Supplier status updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      // console.error("Error updating supplier status:", error);
      toast.error("Error updating supplier status. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // If there was an error updating the status in the backend,
      // revert the changes in the local state to reflect the current state in the backend.
      setSuppliersData((prevData) =>
        prevData.map((supplier) =>
          supplier.id === row.id
            ? { ...supplier, status: !fieldValue } // Revert the status field
            : supplier
        )
      );
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${APIBASE}admin/suppliers?page=${page}`
      );
      setSuppliersData(response.data.data); // Assuming the API response contains the 'data' field as an array of suppliers
      setPageCount(
        Math.ceil(response.data.meta.total / response.data.meta.per_page)
      );
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  // Function to delete a supplier
  const handleSupplierDelete = async (id) => {
    try {
      await axios.delete(`${APIBASE}admin/suppliers/${id}`);
      fetchData();
      setSuppliersData((prevData) =>
        prevData.filter((supplier) => supplier.id !== id)
      );
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row !== id)
      );
      toast.success("Supplier deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      // console.error("Error deleting supplier:", error);
      toast.error("Error deleting supplier. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    setSelectedRows((prevSelectedRows) => {
      if (isChecked) {
        return [...prevSelectedRows, id];
      } else {
        return prevSelectedRows.filter((row) => row !== id);
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredRows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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

  // Replace 'rows' with 'suppliersData' in the filteredRows variable
  const filteredRows = suppliersData.filter((row) => {
    const nameMatch = row.name.toLowerCase().includes(searchText.toLowerCase());
    return nameMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  //const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
  function formatDate(inputDate) {
    try {
      const dateObj = new Date(inputDate);

      // Array of month names
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Get day, month, and year from the date object
      const day = dateObj.getDate();
      const month = months[dateObj.getMonth()];
      const year = dateObj.getFullYear();

      // Formatted date string
      const formattedDate = `${day} ${month} ${year}`;

      return formattedDate;
    } catch (error) {
      return "-";
    }
  }
  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - All Suppliers
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
          <h3 className="card-title">All Suppliers</h3>
          <div className="copy-button">
            <Link to="/admin/ProductManager/Products/add-supplierslist">
              <Button variant="contained">Add New</Button>
            </Link>
          </div>
        </div>
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos"></div>
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
                      checked={selectedRows.length === displayedRows.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Registered On
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Phone
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Address
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    email
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
                {suppliersData?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, row.id)
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(row.created_at)}
                    </TableCell>

                    <TableCell align="left">
                      {row.name ? row.name : "-"}
                    </TableCell>
                    <TableCell align="left">
                      {row.phone ? row.phone : "-"}
                    </TableCell>
                    <TableCell align="left">
                      {row.address ? row.address : "-"}
                    </TableCell>
                    <TableCell align="left">
                      {row.email ? row.email : "-"}
                    </TableCell>
                    <TableCell align="left">
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            checked={row.status === true ? true : false}
                            onChange={(event) =>
                              handleSupplierStatusChange(event, row)
                            }
                            name="status"
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
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            to={`/admin/ProductManager/Products/edit-supplier/${row.id}`}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <EditOutlined sx={{ marginRight: 1 }} />
                            Edit
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={() => handleSupplierDelete(row.id)}>
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

export default Suppliers;
