import React, { useState, useEffect } from "react";
import { MoreVertOutlined, DeleteOutlined } from "@mui/icons-material";
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
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
// import { saveAs } from "file-saver";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import copy from "copy-to-clipboard";

import { Link } from "react-router-dom";
import "./Coupons.css";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getAllCoupons } from "../../../../../redux/cartSlice";

const Coupons = () => {
  const dispatch = useDispatch();
  const allCoupons = useSelector((state) => state.cart.allCoupons);

  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);
  useEffect(() => {
    setListItems(allCoupons);
  }, [allCoupons]);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [linesCopied, setLinesCopied] = useState(0);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setStatusFilter("all");
    setPage(1);
  };

  useEffect(() => {
    setListItems(
      allCoupons?.filter((elem) =>
        elem.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, allCoupons]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (row) => {
    dispatch(deleteCoupon(row.id));
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  // const IOSSwitch = styled((props) => (
  //   <Switch
  //     focusVisibleClassName=".Mui-focusVisible"
  //     disableRipple
  //     {...props}
  //   />
  // ))(({ theme }) => ({
  //   width: 42,
  //   height: 26,
  //   padding: 0,
  //   "& .MuiSwitch-switchBase": {
  //     padding: 0,
  //     margin: 2,
  //     transitionDuration: "300ms",
  //     "&.Mui-checked": {
  //       transform: "translateX(16px)",
  //       color: "#fff",
  //       "& + .MuiSwitch-track": {
  //         backgroundColor:
  //           theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
  //         opacity: 1,
  //         border: 0,
  //       },
  //       "&.Mui-disabled + .MuiSwitch-track": {
  //         opacity: 0.5,
  //       },
  //     },
  //     "&.Mui-focusVisible .MuiSwitch-thumb": {
  //       color: "#33cf4d",
  //       border: "6px solid #fff",
  //     },
  //     "&.Mui-disabled .MuiSwitch-thumb": {
  //       color:
  //         theme.palette.mode === "light"
  //           ? theme.palette.grey[100]
  //           : theme.palette.grey[600],
  //     },
  //     "&.Mui-disabled + .MuiSwitch-track": {
  //       opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     boxSizing: "border-box",
  //     width: 22,
  //     height: 22,
  //   },
  //   "& .MuiSwitch-track": {
  //     borderRadius: 26 / 2,
  //     backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
  //     opacity: 1,
  //     transition: theme.transitions.create(["background-color"], {
  //       duration: 500,
  //     }),
  //   },
  // }));

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

  // const startIndex = (page - 1) * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  // const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const exportCSV = () => {
  //   const csvHeaders = [
  //     { label: "Sr.No.", key: "srNo" },
  //     { label: "Stock Update On", key: "StockUpdateOn" },
  //     { label: "Product Description", key: "ProcutDesc" },
  //     { label: "Category", key: "category" },
  //     { label: "Brand", key: "Brand" },
  //     { label: "Supplier", key: "Supplier" },
  //     { label: "Price (US $)", key: "Price" },
  //     { label: "Quantity", key: "Quantity" },
  //     { label: "Action", key: "action" },
  //   ];

  //   const csvData = {
  //     headers: csvHeaders,
  //     data: rows,
  //   };

  //   const csvString = `${csvData.headers
  //     .map((header) => header.label)
  //     .join(",")}\n${csvData.data
  //     .map((row) => Object.values(row).join(","))
  //     .join("\n")}`;
  //   const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
  //   saveAs(blob, "product_inventory.csv");
  // };

  // const handleExportPDF = () => {
  //   html2canvas(document.querySelector("#tableContainer")).then((canvas) => {
  //     const imgData = canvas.toDataURL("ProcutDesc/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const imageWidth = pageWidth - 20;
  //     const imageHeight = (imageWidth * canvas.height) / canvas.width;
  //     pdf.addImage(imgData, "PNG", 10, 10, imageWidth, imageHeight);
  //     pdf.save("blogs.pdf");
  //   });
  // };

  // const handleCopy = () => {
  //   const data = displayedRows.map((row) => [
  //     row.srNo,
  //     row.StockUpdateOn,
  //     row.category,
  //     row.Brand,
  //     row.ProcutDesc,
  //     row.Supplier,
  //   ]);

  //   const csvData = data.map((row) => row.join(",")).join("\n");

  //   copy(csvData);

  //   const linesCopied = data.length;
  //   setLinesCopied(linesCopied);
  //   setIsPopupOpen(true);
  // };

  // const handleExportExcel = () => {
  //   const csvHeaders = [
  //     { label: "Sr.No.", key: "srNo" },
  //     { label: "Title", key: "StockUpdateOn" },
  //     { label: "Category", key: "category" },
  //     { label: "Description", key: "Brand" },
  //     { label: "Image", key: "ProcutDesc" },
  //     { label: "Status", key: "Supplier" },
  //   ];

  //   const csvData = {
  //     headers: csvHeaders,
  //     data: rows,
  //   };

  //   const csvString = `${csvData.headers
  //     .map((header) => header.label)
  //     .join(",")}\n${csvData.data
  //     .map((row) => Object.values(row).join(","))
  //     .join("\n")}`;
  //   const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
  //   saveAs(blob, "blogs.csv");
  // };

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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Promotions - All Coupons</h6>
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
            <h3 className="card-title">Coupons</h3>
            {/* Buttons */}
            <div className="tabs-buttons">
              <Grid container spacing={2} className="m-0">
                <Grid item className="mr-3">
                  <Link to="/admin/Marketing-Promotions/add-coupons">
                    <Button variant="contained">Add New Coupons</Button>
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Button variant="contained">Active</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">Deactive</Button>
                </Grid> */}
              </Grid>
            </div>
          </div>
          {/* Buttons End*/}
          <div className="main-body2">
            {/* Search and Nos */}
            <div className="searchAndNosBlogs mt-3 mr-1">
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
                    <TableCell style={{ fontWeight: "bold" }}>Code</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>type</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>value</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Start Date
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      End Date
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                    {/* <TableCell style={{ fontWeight: "bold" }}>On/Off</TableCell> */}
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="left">
                  {listItems?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <span className="product-type">{row.code}</span>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.mode} </TableCell>
                      <TableCell>{row.amount} </TableCell>
                      <TableCell>{getNormalDate(row.valid_from)}</TableCell>
                      <TableCell>{getNormalDate(row.valid_to)}</TableCell>

                      <TableCell>
                        <span className="status-active">
                          {row.status ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      {/* <TableCell align="left">
                    <FormControlLabel
                      control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    />
                  </TableCell> */}
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
                          <MenuItem onClick={() => handleMenuClose(row)}>
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
                  // padding: "1rem",
                  justifyContent: "right",
                }}
              />
            </div>
            {/* Pagination END */}
          </div>
        </div>
      </div>
      {/* Popup */}
      {isPopupOpen && (
        <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <DialogTitle>Copied to Clipboard</DialogTitle>
          <DialogContent>
            <p> lines copied to clipboard.</p>
          </DialogContent>
        </Dialog>
      )}
      {/* Popup END */}
    </>
  );
};

export default Coupons;
