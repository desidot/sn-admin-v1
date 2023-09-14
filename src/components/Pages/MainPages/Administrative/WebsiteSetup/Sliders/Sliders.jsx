import React, { useState } from "react";
// import ProductImage from "../../../../../../assets/Sliders/Banner4.jpg";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
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
  Checkbox,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteSlider, getAllSliders } from "../../../../../../redux/cartSlice";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import { toast } from "react-toastify";
import axios from "axios";

const Sliders = () => {
  const dispatch = useDispatch();
  const allSliders = useSelector((state) => state.cart.allSliders);

  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    dispatch(getAllSliders());
  }, []);
  useEffect(() => {
    setListItems(allSliders);
  }, [allSliders]);

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
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setStatusFilter("all");
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuOpen = (event, row) => {
    setOpenMenuId(row.id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (id, todo) => {
    setOpenMenuId(null);
    setAnchorEl(null);
    if (todo == "edit") {
      navigate(`edit-sliders/${id}`);
    }
  };
  const handleDeleteClick = (row) => {
    setOpenMenuId(null);
    setAnchorEl(null);
    dispatch(deleteSlider(row.id));
  };

  const handleCheckboxChange = (event, id) => {};

  const filteredRows = rows.filter((row) => {
    const titleMatch = row.stockUpdateOn
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const categoryMatch = row.category
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const statusMatch =
      statusFilter === "all" || row.supplier.toLowerCase() === statusFilter;
    return titleMatch || categoryMatch || statusMatch;
  });

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
  useEffect(() => {
    setListItems(
      allSliders?.filter((elem) =>
        elem.page_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const handleStatusChange = async (e, row) => {
    const payload = { status: e.target.checked ? 1 : 0 };
    try {
      await axios.post( 
        `${APIBASE}admin/update-slider-status/${row.id}?_method=PUT`,
        payload
      );
      dispatch(getAllSliders());
      toast.success("Status updated successfully.")
    } catch (err) {
      toast.error("Error!");
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
            Administrative - Website Setup - All Sliders
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
            <h3>All Sliders</h3>
            {/* Buttons */}
            <div className="tabs-butons">
              <Button variant="contained">All</Button>
              <Link to="/admin/Administrative/Website-Setup/add-sliders">
                <Button variant="contained">Add Slider</Button>
              </Link>
            </div>
          </div>
          {/* Buttons End*/}
          <div className="main-body2">
            {/* Search and Nos */}
            <div className="searchAndNosBlogs">
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
                      Website Link
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Image</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Published
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="left">
                  {listItems?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.page_name}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>
                        {row.link === "undefined" ? "-" : row.link}
                      </TableCell>

                      <TableCell>
                        <div className="blog-img" onClick={() => alert(row.id)}>
                          <img src={`${IMAGEURL}${row.banner}`} alt="Blog" />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <Checkbox
                          checked={row.status}
                          onChange={(event) => handleStatusChange(event, row)}
                        />
                      </TableCell>

                      <TableCell>
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
                          PaperProps={{
                            style: {
                              maxHeight: 120,
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => handleMenuClose(row.id, "edit")}
                          >
                            <EditOutlined fontSize="small" /> Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleDeleteClick(row)}>
                            <DeleteOutlined fontSize="small" /> Delete
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

export default Sliders;
