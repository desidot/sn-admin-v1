import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Brands.css";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import Moment from "react-moment";
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
  Switch,
  styled,
  FormControlLabel,
  IconButton,
  Menu,
  InputAdornment,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Brands = () => {
  const [brandsData, setBrandsData] = useState([]);
  // const [editBrandId, setEditBrandId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [pageCount, setPageCount] = useState(1);

  const [page, setPage] = useState(1);

  const handleSwitchChange = async (event, id) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.checked;

    const updatedBrandsData = brandsData.map((brand) =>
      brand.id === id ? { ...brand, [fieldName]: fieldValue } : brand
    );
    setBrandsData(updatedBrandsData);

    try {
      const brandToUpdate = brandsData.find((brand) => brand.id === id);
      if (!brandToUpdate) {
        console.error("Brand not found for the given ID:", id);
        return;
      }
      await axios.put(
        `${APIBASE}admin/brands/${id}`,
        { name: brandToUpdate.name, [fieldName]: fieldValue },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      toast.success("Brand updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Error updating brand. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // If there was an error updating the brand in the backend,
      // revert the changes in the local state to reflect the current state in the backend.
      setBrandsData((prevData) =>
        prevData.map((brand) =>
          brand.id === id
            ? { ...brand, [fieldName]: !event.target.checked }
            : brand
        )
      );
    }
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${APIBASE}admin/brands?page=${page}`);

      const data = response.data.data.map((brand) => ({
        ...brand,
        status: brand.status,
        popular: brand.popular,
      }));
      setPageCount(
        Math.ceil(response.data.meta.total / response.data.meta.per_page)
      );

      setBrandsData(data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleBrandDelete = async (id) => {
    try {
      await axios.delete(`${APIBASE}admin/brands/${id}`);

      setBrandsData((prevData) => prevData.filter((brand) => brand.id !== id));
      // setEditBrandId(null); // Reset editBrandId after successful deletion
      toast.success("Brand deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Error deleting brand. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  function createData(
    id,
    name,
    sort_order,
    banner,
    thumbnail,
    popular,
    status
  ) {
    return { id, name, sort_order, banner, thumbnail, popular, status };
  }

  const rows = brandsData.map((brand, index) =>
    createData(
      brand.id,
      brand.name,
      brand.sort_order,
      brand.thumbnail,
      brand.banner,
      brand.status ? false : true,
      brand.popular ? false : true
    )
  );

  const [searchText, setSearchText] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    // setStatusFilter("all");
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
    // setEditBrandId(null);
  };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
    // setEditBrandId(id); // Set the ID of the brand to be edited
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

  const filteredRows = rows.filter((row) => {
    const titleMatch = row.name.toLowerCase();
    return titleMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  //const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  return (
    <>
      <ToastContainer />{" "}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - All Brands
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
          <h3 className="card-title">Brands</h3>
          {/* Buttons */}
          <div className="tabs-butons">
            <Button variant="contained">All</Button>
            <Link to="/admin/ProductManager/Products/add-brands">
              <Button variant="contained">Add Brands</Button>
            </Link>
            <Button variant="contained">Trash</Button>
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
                        Sr.No.
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Added On
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Name
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Logo
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Status
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Popular
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brandsData?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {15 * page - 15 + index + 1}
                        </TableCell>
                        <TableCell align="left">
                          <Moment format="MM/DD/YYYY">{row.updated_at}</Moment>
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">
                          <div className="blog-img">
                            <img
                              src={`${IMAGEURL}${row.thumbnail}`}
                              alt="BrandImage"
                            />
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <FormControlLabel
                            control={
                              <IOSSwitch
                                sx={{ m: 1 }}
                                checked={row.status === true ? true : false}
                                onChange={(event) =>
                                  handleSwitchChange(event, row.id)
                                }
                                name="status" // Add the name prop for the status field
                              />
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          <FormControlLabel
                            control={
                              <IOSSwitch
                                sx={{ m: 1 }}
                                checked={row.popular === true ? true : false}
                                onChange={(event) =>
                                  handleSwitchChange(event, row.id)
                                }
                                name="popular" // Add the name prop for the popular field
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
                                to={`/admin/ProductManager/Products/edit-brands/${row.id}`}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                              >
                                <EditOutlined sx={{ marginRight: 1 }} />
                                Edit
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={() => handleBrandDelete(row.id)}>
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

export default Brands;
