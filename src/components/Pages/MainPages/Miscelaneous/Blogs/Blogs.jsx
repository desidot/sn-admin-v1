import React, { useEffect, useState } from "react";
import "./Blogs.css";
import BlogImage from "../../../../../assets/blog-sample.png";
import { Link, useNavigate } from "react-router-dom";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";

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
  FormControlLabel,
  IconButton,
  Menu,
  InputAdornment,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBlogStatus,
  deleteBlog,
  getAllBlogs,
  getAllCategory,
} from "../../../../../redux/cartSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.cart.allBlogs);
  const allCategory = useSelector((state) => state.cart.allCategory);
  const isLoadingStatus = useSelector((state) => state.cart.isLoadingStatus);
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllCategory());
  }, []);
  useEffect(() => {
    setListItems(allBlogs);
  }, [allBlogs]);
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  function createData(
    srNo,
    title,
    category,
    description,
    image,
    status,
    action
  ) {
    return { srNo, title, category, description, image, status, action };
  }

  const rows = [
    createData(
      1,
      "New Blog",
      "Dermatology",
      "Test Blog Test Blog Test Blog Test Blog Test BlogTest Blog Test Blog Test Blog Test Blog Test Blog Test Blog Test Blog Test Blog Test Blog Test Blog Test BlogTest Blog Test Blog Test Blog Test Blog Test Blog Test Blog Test",
      "Active",
      "Edit/Delete"
    ),
    createData(
      2,
      "Product B",
      "Category 2",
      "Description 2",
      "image2.png",
      "Inactive",
      "Edit/Delete"
    ),
    createData(
      3,
      "Product C",
      "Category 1",
      "Description 3",
      "image3.png",
      "Active",
      "Edit/Delete"
    ),
    // Add more dummy data as needed
  ];
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
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

  const handleMenuClose = (row, op) => {
    setOpenMenuId(null);
    setAnchorEl(null);
    if (op === "delete") {
      dispatch(deleteBlog(row.id));
    }
  };

  const filteredRows = rows.filter((row) => {
    const titleMatch = row.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const categoryMatch = row.category
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const statusMatch =
      statusFilter === "all" ||
      row.status.toLowerCase() === statusFilter.toLowerCase();
    return (titleMatch || categoryMatch) && statusMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusChange = (e, row) => {
    const event = e.target.checked;

    if (event) {
      dispatch(changeBlogStatus({ id: row.id, status: 1 }));
    } else {
      dispatch(changeBlogStatus({ id: row.id, status: 0 }));
    }
  };

  const handleEditClick = (id) => {
    setOpenMenuId(null);
    setAnchorEl(null);
    navigate(`/admin/miscellaneous/editBlog/${id}`);
  };

  return (
    <>
      <div className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
        <div style={{ display: "flex",alignItems:"center" }}>
            <HomeIcon /> - <h6 className="mb-0"> Miscellaneous - Blogs</h6>
        </div>

        <button
          className="back-button"
          onClick={handleGoBack}
          style={{ background: "#EEF2F6", fontWeight: "500" }}
        >
          <span className="back-arrow" style={{ fontWeight: "500" }}>
            &larr;
          </span>
          Back
        </button>
      </div>

   

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Blogs</h3>
          {/* Buttons */}
          <div className="tabs-butons">
            <Button variant="contained" onClick={() => setListItems(allBlogs)}>
              All
            </Button>
            <Link to="/admin/miscellaneous/addBlogs">
              <Button variant="contained">Add Blogs</Button>
            </Link>
            <Button
              variant="contained"
              onClick={() =>
                setListItems(allBlogs?.filter((elem) => elem.trash == 1))
              }
            >
              Trash
            </Button>
          </div>
          {/* Buttons End*/}
        </div>
        <div className="main-body2">
          <div className="">
            <div className="BlogsTable">
              {/* Search and Nos */}
              <div className="searchAndNosBlogs">
                <div className="nos">
                
                </div>
                <div className="search-in-table-blogs">
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
                        Title
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Category
                      </TableCell>
                      {/* <TableCell style={{ fontWeight: "bold" }} align="left">
                        Description
                      </TableCell> */}
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Image
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Status
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listItems?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">
                          {
                            allCategory?.filter(
                              (elem) => elem.id === row.category_id
                            )[0]?.name
                          }
                        </TableCell>
                        {/* <TableCell align="left">
                          {row.description.includes("<") ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: row.description,
                              }}
                            ></div>
                          ) : (
                            row.description
                          )}
                        </TableCell> */}
                        <TableCell align="left">
                          <div className="blog-img">
                            <img src={`${IMAGEURL}${row.banner}`} alt="Blog" style={{height:"50px",width:"auto"}} />
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <FormControlLabel
                            control={
                              <Switch
                                defaultChecked
                                value={row.state == 1 ? true : false}
                                onChange={(e) => handleStatusChange(e, row)}
                              />
                            }
                          />
                          {/* {isLoadingStatus && <div className="loader"></div>} */}
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
                            <MenuItem onClick={() => handleEditClick(row.id)}>
                              <EditOutlined sx={{ marginRight: 1 }} />
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleMenuClose(row, "delete")}
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

export default Blogs;
