import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
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
  Checkbox,
  Button,
  IconButton,
  Menu,
  FormControlLabel,
  styled,
  Switch,
  Typography,
  InputLabel,
} from "@mui/material";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
// import FunctionPopup from "./FunctionPopup";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { toast } from "react-toastify";
const Categories = () => {
  // States for managing data and UI
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openFunctionPopup, setOpenFunctionPopup] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  // const [showFunctions, setShowFunctions] = useState(null);
  const [currentRow, setCurrentRow] = useState({});
  const [catId, setCatId] = useState(null);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${APIBASE}admin/categories?page=${page}`
      );
      setCategoriesData(response.data.data);
      setPageCount(
        Math.ceil(response.data.meta.total / response.data.meta.per_page)
      );
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [page]);

  // Uncomment the 'rows' variable and the code to generate it
  // Function to create a data row
  function createData(id, name, code, parent_id, status, thumbnail, banner) {
    return {
      id,
      name,
      code,
      parent_id,
      status,
      thumbnail,
      banner,
    };
  }

  // Transform the API response data into the required format for the table
  const rows = categoriesData.map((category, index) =>
    createData(
      category.id,
      category.name,
      category.code,
      category.parent_id,
      category.status,
      category.thumbnail,
      category.banner
    )
  );

  const handleOpenFunctionPopup = (category) => {
    setOpenFunctionPopup(true);
    // setCurrentRow(category); // Set the currentRow here
    setCatId(currentRow.id);
    handleMenuClose();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuClose = async () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event, row) => {
    setOpenMenuId(row.id);
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
    setCatId(currentRow.id);
  };
  // console.log("currentRow id", currentRow.id);
  // console.log("catId", catId);
  const currRowId = currentRow.id;

  const handleToggleChange = async (event, catId) => {
    let cId = currentRow.id;
    // console.log(cId);
    const fieldName = "is_home"; // Change this if needed
    const fieldValue = event.target.checked ? 1 : 0;

    try {
      // Update the category in the API
      const payload = {
        // _method: "PUT",
        [fieldName]: fieldValue,
        name: currentRow.name,
      };
      await axios.put(`${APIBASE}admin/categories/${catId}`, payload, {
        headers: {
          Accept: "application/json",
        },
      });

      // Update the local state to reflect the changes
      setCategoriesData((prevData) =>
        prevData.map((category) =>
          category.id === currRowId
            ? { ...category, [fieldName]: fieldValue }
            : category
        )
      );

      toast.success("Category updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setOpenFunctionPopup(false);
    } catch (error) {
      // console.error("Error updating category:", error);
      toast.error("Error updating category. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDeleteRecord = async () => {
    setOpenMenuId(null);
    setAnchorEl(null);

    if (openMenuId) {
      const menuItem = displayedRows.find((row) => row.id === openMenuId);
      if (menuItem) {
        try {
          // Make the API call to delete the category
          await axios.delete(`${APIBASE}admin/categories/${openMenuId}`);
          fetchData();

          // Update the local state to remove the deleted category
          setCategoriesData((prevData) =>
            prevData.filter((category) => category.id !== openMenuId)
          );

          // Show the success toast message
          toast.success("Category deleted successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        } catch (error) {
          // console.error("Error deleting category:", error);
          // Show the error toast message
          toast.error("Error deleting category. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      }
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

  const handleStatusChange = async (event, id) => {
    const fieldName = event.target.name;
    const isChecked = event.target.checked;

    const updatedCategoryData = categoriesData.map((category) =>
      category.id === id ? { ...category, [fieldName]: isChecked } : category
    );
    setCategoriesData(updatedCategoryData);

    try {
      const categoryToUpdate = categoriesData.find((brand) => brand.id === id);
      if (!categoryToUpdate) {
        // console.error("Brand not found for the given ID:", id);
        return;
      }
      // Make the API call to update the status
      await axios.put(`${APIBASE}admin/categories/${id}`, {
        name: categoryToUpdate.name,
        status: isChecked ? true : false,
      });

      // Update the local state to reflect the changes
      setCategoriesData((prevData) => {
        return prevData.map((category) => {
          if (category.id === id) {
            return { ...category, status: isChecked };
          }
          return category;
        });
      });

      // Show a success toast
      toast.success("Status updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      // console.error("Error updating status:", error);

      // Show an error toast
      toast.error("Error updating status. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(displayedRows.map((row) => row.id));
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

  // Filter rows based on searchText
  const filteredRows = rows.filter((row) => {
    const nameMatch =
      row.name && row.name.toLowerCase().includes(searchText.toLowerCase());
    const codeMatch =
      row.code && row.code.toLowerCase().includes(searchText.toLowerCase());
    // const parentMatch =
    //   row.parent_id && row.parent_id.toLowerCase().includes(searchText.toLowerCase());
    // const supplierMatch =
    //   row.Supplier &&
    //   row.Supplier.toLowerCase().includes(searchText.toLowerCase());
    return nameMatch || codeMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  //const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - Categories
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
          <h3 className="card-title">All Categories</h3>
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

          <TableContainer
            component={Paper}
            style={{ boxShadow: "gray" }}
            id="tableContainer"
          >
            {/* Table */}
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
                    Category Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Category Code / HSN Code
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Parent
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Thumbnail
                  </TableCell>

                  {/* <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Banner
                  </TableCell> */}
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="left">
                {categoriesData?.map((row) => (
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
                    <TableCell align="left">{row?.code}</TableCell>
                    <TableCell align="left">{row.parent_id}</TableCell>
                    <TableCell align="left">
                      <div className="blog-img">
                        <img
                          src={`${IMAGEURL}${row.thumbnail}`}
                          alt="Thumbnail"
                        />
                      </div>
                    </TableCell>

                    {/* <TableCell align="left">
                      <div className="blog-img">
                        <img
                          src={`${IMAGEURL}${row.banner}`}
                          alt="Banner"
                        />{" "}
                      </div>
                    </TableCell> */}
                    <TableCell align="left">
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            // defaultChecked={row.status}
                            checked={row.status === true ? true : false}
                            onChange={(event) =>
                              handleStatusChange(event, row.id)
                            }
                          />
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, row)}
                        size="small"
                      >
                        <MoreVertOutlined />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenuId === row.id}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            to={`/admin/ProductManager/Products/edit-categories/${row.id}`}
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            <EditOutlined sx={{ marginRight: 1 }} />
                            Edit
                          </Link>
                        </MenuItem>

                        <MenuItem onClick={handleOpenFunctionPopup} se>
                          <ToggleOffOutlinedIcon sx={{ marginRight: 1 }} />
                          Function
                        </MenuItem>

                        <MenuItem onClick={handleDeleteRecord}>
                          <DeleteOutlined sx={{ marginRight: 1 }} />
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* Function Popup */}
              {/* Function Popup */}
              {openFunctionPopup && (
                <div className="popup">
                  <div
                    className="popup-content"
                    style={{
                      padding: "0px 1rem 1rem 1rem",
                      // width: "300px",
                    }}
                  >
                    <div className="filter-head">
                      <Typography variant="h1">Function</Typography>
                      <IconButton
                        onClick={() => setOpenFunctionPopup(false)}
                        size="small"
                        style={{ marginLeft: "auto" }}
                      >
                        ✘
                      </IconButton>
                    </div>
                    <div className="popup-inputs">
                      <span style={{ marginRight: "4rem" }}>Is Home</span>

                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            name="is_home"
                            checked={currentRow.is_home === 1}
                            onChange={(event) =>
                              handleToggleChange(event, currentRow.id)
                            }
                          />
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
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

export default Categories;
