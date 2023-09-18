import React, { useState, useEffect } from "react";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
  IconButton,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
  Switch,
  FormControlLabel,
  Modal,
  Box,
} from "@mui/material";
import { saveAs } from "file-saver";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import copy from "copy-to-clipboard";

import "./AllCustomers.css";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer } from "../../../../../redux/cartSlice";
import axios from "axios";
import { APIBASE } from "../../../../auth/apiConfig";
import Papa from "papaparse";
import { toast } from "react-toastify";
const XLSX = require("xlsx");
const AllCustomers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [data, setData] = useState([]);
  const [storeItems, setStoreItems] = useState([]);
  const allCustomers = useSelector((state) => state.cart.allCustomers);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getAllCustomers = async () => {
    setIsLoading(true);
    try {
      if (searchText) {
        const res = await axios.get(
          `${APIBASE}admin/users?page=${page}&search=${searchText}`
        );
        setListItems(res.data.data);
        setStoreItems(res.data.data);
        setPageCount(Math.ceil(res.data.meta.total / res.data.meta.per_page));
        setTotalItems(res.data.meta.total);
        setIsLoading(false);
      } else {
        const res = await axios.get(`${APIBASE}admin/users?page=${page}`);
        setListItems(res.data.data);
        setStoreItems(res.data.data);
        setPageCount(Math.ceil(res.data.meta.total / res.data.meta.per_page));
        setTotalItems(res.data.meta.total);
        setIsLoading(false);
      }
    } catch (error) {
      //console.log(error);
      setIsLoading(false);
    }
  };
  const handleSearchClick = () => {
    setPage(1);
    getAllCustomers();
  };

  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    getAllCustomers();
  }, [page]);

  useEffect(() => {
    setListItems(allCustomers);
  }, [allCustomers]);
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [linesCopied, setLinesCopied] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSearchChange = (event) => {
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

  const editClick = (id) => {
    setOpenMenuId(null);
    setAnchorEl(null);
    navigate(`/admin/People/GeneralCustomers/edit-customers/${id}`);
  };
  const handleDeleteClick = (id) => {
    setOpenMenuId(null);
    setAnchorEl(null);
    dispatch(deleteCustomer(id));
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   // Perform the upload logic here
  //   //console.log(file);
  // };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const arr = data.filter((elem) => elem["Patient Email"] == undefined);
    setNewData(arr);
  }, [data]);
  console.log(newData);

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

  const handleExportExcel = () => {
    const csvHeaders = [
      { label: "Sr.No.", key: "srNo" },
      { label: "Title", key: "StockUpdateOn" },
      { label: "Category", key: "category" },
      { label: "Description", key: "Brand" },
      { label: "Image", key: "ProcutDesc" },
      { label: "Status", key: "Supplier" },
    ];

    const csvData = {
      headers: csvHeaders,
    };

    const csvString = `${csvData.headers
      .map((header) => header.label)
      .join(",")}\n${csvData.data
      .map((row) => Object.values(row).join(","))
      .join("\n")}`;
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "customers.csv");
  };

  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 1000);
    }
  }, [isPopupOpen]);

  function getNormalDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleFileUpload = (event) => {
    const file = event.target.files;
    if (file[0] && file[0].name.endsWith(".csv")) {
      setSelectedFile(event.target.files[0]);
      Papa.parse(file[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          //console.log(results.data);
          setData(results.data);
        },
      });
    } else if (file[0] && file[0].name.endsWith(".xlsx" || ".xls")) {
      // Parse Excel data using xlsx library
      setSelectedFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet);
        setData(excelData);
      };
      reader.readAsBinaryString(file[0]);
    } else {
      alert("Unsupported file format");
    }
  };

  const handleCusStatusChange = async (e, row) => {
    const payload = { status: e.target.checked ? 1 : 0 };
    try {
      await axios.post(
        `${APIBASE}admin/update-user-status/${row.id}?_method=PUT`,
        payload
      );
      toast.success("Status got updated successfully.");
      getAllCustomers();
    } catch (err) {
      toast.error("Error!");
    }
  };
  const handleFilePost = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    setProcessing(true);
    await axios
      .post(`${APIBASE}admin/import-user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        //console.log("File uploaded successfully:", response.data);
        setProcessing(false);
        // Do something with the response
        toast.success("Customers imported successfully.");
      })
      .catch((error) => {
        //console.error("Error uploading file:", error);
        setProcessing(false);
        toast.error("Error importing customers!");
        // Handle error
      });
  };

  //  //console.log("data is", newData);

  //    const getExcell=()=>{

  // const arr=newData.map((elem)=>({
  // "First Name":elem["Patient First Name"],
  // "Last Name":elem["Patient Last Name"],
  // "Email":elem["Patient Email"],
  // "Phone":elem["Patient Cell Phone"],
  // "Home Phone":elem["Patient Home Phone"],
  // "Address":elem["Patient Address Line 1"],
  // "Work Phone":elem["Patien Work Phone"]
  // }))

  //     var wb = XLSX.utils.book_new();
  //       let ws = XLSX.utils.json_to_sheet(arr);
  //       XLSX.utils.book_append_sheet(wb, ws, "MySheet");
  //       XLSX.writeFile(wb, "my filter list 001.xlsx");

  //   }

  // useEffect(()=>{

  // if(newData.length>4000){
  //   getExcell()
  // }

  // },[newData])

  return (
    <>
      {" "}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            People - General Customers - All Customers
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
      <div className="download-sample">
        <InputLabel htmlFor="" className="input-labels-options">
          {/* <Link to=""> */}
          <span>Import Customers (Max 500)</span>
          {/* </Link> */}
        </InputLabel>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <div className="input-field">
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className="adjust-button mt-0">
              <Button
                className="import-btn"
                variant="contained"
                disabled={processing}
                onClick={() => handleFilePost()}
              >
                {processing ? "Importing" : "Import"}
              </Button>
            </div>
          </Grid>
          {data.length > 0 && (
            <div
              style={{
                paddingLeft: "15px",
                fontWeight: "bold",
                color: "#7356B2",
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              View Imported Data (make sure the list is correct)
            </div>
          )}
        </Grid>
      </div>
      <br />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Customers</h3>
          {/* Buttons */}
          <div className="tabs-butons">
            {/* <Button variant="contained">All</Button> */}

            <Button variant="contained" onClick={handleExportExcel}>
              Excel
            </Button>
          </div>
        </div>
        {/* Buttons End*/}
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos" style={{ width: "max-content" }}>
              Total:- {totalItems}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="search by first name,email,phone..."
                style={{
                  height: "2rem",
                  marginRight: "15px",
                  paddingLeft: "6px",
                  borderRadius: "6px",
                  border: "0.5px solid lightgray",
                  outline: "none",
                }}
              />
              <Button
                variant="contained"
                style={{ height: "2rem" }}
                onClick={() => handleSearchClick()}
              >
                Search
              </Button>
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
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Registered On
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Email Address
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Phone
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Address
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
                  <span>Loading...</span>
                ) : (
                  listItems?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {15 * (page - 1) + index + 1}
                      </TableCell>
                      <TableCell align="left">
                        {getNormalDate(row.created_at)}
                      </TableCell>
                      <TableCell align="left">
                        {row.first_name} {row.middle_name} {row.last_name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              sx={{ m: 1 }}
                              checked={row.status == 1}
                              onChange={(e) => handleCusStatusChange(e, row)}
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
                          <MenuItem
                            onClick={handleMenuClose}
                            style={{ color: "black" }}
                          >
                            <Link to={`/admin/Sales/customer-orders/${row.id}`}>
                              <ShoppingCartOutlinedIcon
                                fontSize="small"
                                style={{ marginRight: "5px" }}
                              />
                              Customer Orders
                            </Link>
                          </MenuItem>

                          <MenuItem
                            onClick={() => editClick(row.id)}
                            style={{ color: "black" }}
                          >
                            {/* <Link to="/admin/People/GeneralCustomers/edit-customers"> */}
                            <EditOutlined
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />
                            Edit
                            {/* </Link> */}
                          </MenuItem>

                          <MenuItem onClick={() => handleDeleteClick(row.id)}>
                            <DeleteOutlined
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />
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
      {/* Popup */}
      {/* {isPopupOpen && (
        <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <DialogTitle>Copied to Clipboard</DialogTitle>
          <DialogContent>
            <p>{linesCopied} lines copied to clipboard.</p>
          </DialogContent>
        </Dialog>
      )} */}
      {/* Popup END */}
      {data.length > 0 && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
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
              pt: 2,
              px: 4,
              pb: 3,
              width: 800,
              overflowY: "scroll",
              height: 500,
            }}
          >
            <Table>
              <TableHead>
                {data && (
                  <TableRow>
                    {Object.keys(data[0])?.map((row, index) => (
                      <TableCell style={{ fontWeight: "bold" }} key={index}>
                        {row}{" "}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {data &&
                  data?.map((elem, ind) => (
                    <TableRow>
                      {Object.keys(elem)?.map(
                        (row, index) =>
                          row && (
                            <TableCell key={index}>
                              {" "}
                              {elem[`${row}`]}{" "}
                            </TableCell>
                          )
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AllCustomers;
