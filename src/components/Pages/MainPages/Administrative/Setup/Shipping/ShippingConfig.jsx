import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  Grid,
  InputLabel,
  FormControl,
  TextField,
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
  Typography,
  Autocomplete,
  IconButton,
  Menu,
  Modal,
  Box,
} from "@mui/material";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import countries from "../../../Countries/Countries";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  createShipping,
  deleteShipping,
  getAllShippingCharges,
} from "../../../../../../redux/cartSlice";
import { APIBASE } from "../../../../../auth/apiConfig";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  city: "",
  zipcode: "",
  min_amount: "",
  max_amount: "",
  amount: "",
};

const ShippingConfiguration = () => {
  const [state, setState] = useState(initialState);
  const [listItems, setListItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const allPickUpPoints = useSelector((state) => state.cart.allPickUpPoints);
  // useEffect(() => {
  //   dispatch(getAllPickUpPoints());
  // }, []);
  const getAllShippingsHere = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${APIBASE}admin/shippings?page=${page}`);
      setListItems(res.data.data);
      setData(res.data.data);
      setPageCount(Math.ceil(res.data.meta.total / res.data.meta.per_page));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllShippingsHere();
  }, [page]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (row) => {
    //console.log(row);
    setEditIt(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function createData(
    srNo,
    StockUpdateOn,
    ProcutDesc,
    category,
    Brand,
    Supplier,
    Price,
    Quantity,
    action
  ) {
    return {
      srNo,
      StockUpdateOn,
      ProcutDesc,
      category,
      Brand,
      Supplier,
      Price,
      Quantity,
      action,
    };
  }

  const rows = [
    createData(
      1,
      "Jul 13 2023",
      "Users Name",
      "Health & Wellness",
      "Test Product",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),
    createData(
      2,
      "Jul 13 2023",
      "Users Name",
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
      "Users Name",
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

  const [newShippingValues, setNewShippingValues] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editIt, setEditIt] = useState({});

  const handleAddMore = () => {
    setNewShippingValues((prevValues) => [
      ...prevValues,
      {
        changes: "",
        country: "",
        amountFrom: "",
        amountTo: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    setNewShippingValues((prevValues) =>
      prevValues.filter((_, i) => i !== index)
    );
  };

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

  const handleMenuClose = (row) => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const deleteShippingHere = async (id) => {
    try {
      await axios.delete(`${APIBASE}admin/shippings/${id}`);
      toast.success("Shipping deleted successfully.");
      getAllShippingsHere();
    } catch (error) {
      toast.error("Error!");
    }
  };

  const filteredRows = rows.filter((row) => {
    const titleMatch = row.StockUpdateOn.toLowerCase().includes(
      searchText.toLowerCase()
    );
    const categoryMatch = row.category
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const statusMatch =
      statusFilter === "all" || row.Supplier.toLowerCase() === statusFilter;
    return titleMatch || categoryMatch || statusMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSaveClick = async () => {
    console.log("clicked");
    if (state.amount && state.max_amount && state.min_amount && state.country) {
      try {
        await axios.post(`${APIBASE}admin/shippings`, state);
        toast.success("Shipping added successfully.");
        getAllShippingsHere();
        setState(initialState);
      } catch (error) {
        toast.error("Error!");
      }

      setState(initialState);
    }
  };
  const handleEditSaveClick = () => {
    //console.log(editIt);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Administrative - Setup - Shipping Configuration
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
      <div className="filter-section">
        <div className="filter-head">
          <Typography variant="h1">Add New Shipping Values :</Typography>
        </div>

        <div className="filter-container">
          {/* {newShippingValues.map((value, index) => ( */}
          <Grid container spacing={2}>
            <Grid item xs={10} md={2}>
              <InputLabel htmlFor="date">Charges:</InputLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder=""
                  value={state.amount}
                  onChange={(e) =>
                    setState({ ...state, amount: e.target.value })
                  }
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={10} md={2}>
              <InputLabel htmlFor="select-city">City / Perish :</InputLabel>

              <FormControl fullWidth>
                <Select
                  value={state.country}
                  onChange={(e) =>
                    setState({ ...state, country: e.target.value })
                  }
                >
                  <MenuItem value="">Select Perish</MenuItem>
                  <MenuItem value="Sandys">Sandys</MenuItem>
                  <MenuItem value="Southampton">Southampton</MenuItem>
                  <MenuItem value="Warwick">Warwick</MenuItem>
                  <MenuItem value="Pembroke">Pembroke</MenuItem>
                  <MenuItem value="Paget">Paget</MenuItem>
                  <MenuItem value="Devonshire">Devonshire</MenuItem>
                  <MenuItem value="Smith's">Smith's</MenuItem>
                  <MenuItem value="Hamilton">Hamilton</MenuItem>
                  <MenuItem value="St. George's">St. George's</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10} md={2}>
              <InputLabel htmlFor="date">Amount From:</InputLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder=""
                  value={state.min_amount}
                  onChange={(e) =>
                    setState({ ...state, min_amount: e.target.value })
                  }
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={10} md={2}>
              <InputLabel htmlFor="date">Amount To:</InputLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder=""
                  value={state.max_amount}
                  onChange={(e) =>
                    setState({ ...state, max_amount: e.target.value })
                  }
                  type="number"
                />
              </FormControl>
            </Grid>

            {/* <Grid item xs={10} md={2}>
                <div className="allsales-remove-button">
                  <Button
                    className="search-btn"
                    variant="contained"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Grid> */}
          </Grid>
          {/* ))} */}
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={2}>
              <div className="allsales-addmore-button">
                <Button
                  className="search-btn"
                  variant="contained"
                  onClick={handleAddMore}
                >
                  Add More
                </Button>
              </div>
            </Grid> */}
            <Grid item xs={12} md={2}>
              <div className="allsales-search-button2">
                <Button
                  className="search-btn"
                  onClick={() => handleSaveClick()}
                  variant="contained"
                >
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <br />
      <div className="card">
        <div className="card-header">
          <h3>Shipping Detail</h3>
        </div>
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos"></div>
            {/* <div className="search-inventory">
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
          
            </div>    */}
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
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Charges
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    city
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Amount
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="left">
                {isLoading ? (
                  <span>Loading...</span>
                ) : (
                  listItems?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">
                        <Link>$ {row.amount}</Link>
                      </TableCell>
                      <TableCell align="left">{row.country}</TableCell>
                      <TableCell align="left">
                        From: ${row.min_amount} <br />
                        To: ${row.max_amount}
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
                          {/* <MenuItem onClick={() => handleOpen(row)}>
                          <EditOutlined sx={{ marginRight: 1 }} />
                          Edit
                        </MenuItem> */}
                          <MenuItem onClick={() => deleteShippingHere(row?.id)}>
                            <DeleteOutlined sx={{ marginRight: 1 }} />
                            Delete
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
                // padding: "1rem",
                justifyContent: "right",
              }}
            />
          </div>
          {/* Pagination END */}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label htmlFor="">Charge :</label>
            <input
              type="number"
              value={editIt.amount}
              onChange={(e) => setEditIt({ ...editIt, amount: e.target.value })}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label htmlFor="">Amount From :</label>
            <input
              type="number"
              value={editIt.min_amount}
              onChange={(e) =>
                setEditIt({ ...editIt, min_amount: e.target.value })
              }
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label htmlFor="">Amount To :</label>
            <input
              type="number"
              value={editIt.max_amount}
              onChange={(e) =>
                setEditIt({ ...editIt, max_amount: e.target.value })
              }
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label htmlFor="">Zip Code :</label>
            <input
              type="number"
              value={editIt.zipcode}
              onChange={(e) =>
                setEditIt({ ...editIt, zipcode: e.target.value })
              }
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <button
              style={{
                borderRadius: "8px",
                padding: "5px 15px",
                outline: "none",
                backgroundColor: "gray",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              style={{
                borderRadius: "8px",
                padding: "5px 15px",
                outline: "none",
                backgroundColor: "green",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => handleEditSaveClick()}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ShippingConfiguration;
