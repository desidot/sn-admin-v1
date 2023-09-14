import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Pagination,
  Checkbox,
  Button,
  IconButton,
  Menu,
  // Dialog,
  // DialogTitle,
  // DialogContent,
} from "@mui/material";
import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import copy from "copy-to-clipboard";
// import * as XLSX from "xlsx";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import Moment from "react-moment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { MoreVertOutlined, EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AddEditStockPopup from "../../ProductInventoryPopup/AddEditStockPopup";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
const ExpiredStocks = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  // const [linesCopied, setLinesCopied] = useState(0);
  // const [showPopup, setShowPopup] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showStockEditPopup, setShowStockEditPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
    // setShowStockEditPopup(false); // Close the popup
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    setSelectedRows((prevSelectedRows) => {
      if (isChecked) {
        return [...prevSelectedRows, id];
      } else {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      }
    });
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

  // const exportExcel = () => {
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.json_to_sheet(rows);
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Expired Stocks");
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });
  //   const data = new Blob([excelBuffer], {
  //     type: "application/octet-stream",
  //   });
  //   saveAs(data, "expired_stocks.xlsx");
  // };

  // const exportCSV = () => {
  //   const csvHeaders = ["Sr No", "Name", "Exp Date", "Supplier"];
  //   const csvRows = selectedRows.map((row) => [
  //     row.id,
  //     row.name,
  //     row.expdate,
  //     row.supplier.name,
  //   ]);

  //   const csvData = [csvHeaders, ...csvRows];

  //   const csvContent = csvData
  //     .map((row) => row.map((cell) => `"${cell}"`).join(","))
  //     .join("\n");

  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  //   saveAs(blob, "expired_stocks.csv");
  // };

  // const exportPDF = async () => {
  //   try {
  //     const tableContainer = document.getElementById("tableContainer");
  //     if (!tableContainer) return;

  //     const canvas = await html2canvas(tableContainer, {
  //       width: tableContainer.offsetWidth,
  //       height: tableContainer.offsetHeight,
  //     });

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("expired_stocks.pdf");
  //   } catch (error) {
  //     //console.error("Error exporting PDF:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (showPopup) {
  //     setTimeout(() => {
  //       setShowPopup(false);
  //     }, 1000);
  //   }
  // }, [showPopup]);

  // const copyToClipboard = () => {
  //   const textToCopy = selectedRows.map((row) => row.product_name).join("\n");
  //   copy(textToCopy);
  //   setLinesCopied(selectedRows.length);
  //   setShowPopup(true);
  // };

  const exportCSV = () => {
    const csvHeaders = [
      "Sr. No.",
      "Stock Update On",
      "Image URL",
      "Name",
      "Expired On",
      "Supplier",
    ];

    const csvRows = displayedRows.map((row, index) => [
      index + 1,
      // <Moment format="MM/DD/YYYY">{row.updated_at}</Moment>,
      row.updated_at,
      `${IMAGEURL}${row.thumbnail}`,
      row.product_name,
      // <Moment format="MM/DD/YYYY">{row.expiry_date}</Moment>,
      row.expiry_date,
      row?.supplier?.name,
    ]);

    const csvContent =
      csvHeaders.join(",") +
      "\n" +
      csvRows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Expired.csv");
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${APIBASE}admin/get-expired-products`);
      // Update the state with the API data
      setRows(response.data.data);
      setLoading(false);
    } catch (error) {
      //console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API using Axios
    getData();
  }, []);

  const filteredRows = rows.filter((row) => {
    const nameMatch = row.product_name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return nameMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Inventory - Expired Stock
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
          <h3 className="card-title">Expired Stocks</h3>
          <div className="copy-button">
            {/* <Button variant="contained" onClick={copyToClipboard}>
              Copy
            </Button> */}
            {/* <Button variant="contained" onClick={exportExcel}>
              Excel
            </Button> */}
            <Button variant="contained" onClick={exportCSV}>
              CSV
            </Button>
            {/* <Button variant="contained" onClick={exportPDF}>
              PDF
            </Button> */}
          </div>
          {/* Popup */}
          {/* {showPopup && (
            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
              <DialogTitle>Copied to Clipboard</DialogTitle>
              <DialogContent>
                <p>{linesCopied} line(s) copied to clipboard.</p>
              </DialogContent>
            </Dialog>
          )} */}
          {/* Popup END */}
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
          <TableContainer>
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
                    Image
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", width: "500px" }}
                  >
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Expired On
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Supplier
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedRows.map((row) => (
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
                        <div className="blog-img">
                          <img
                            src={`${IMAGEURL}${row.thumbnail}`}
                            alt="ProductImage"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">{row.product_name}</TableCell>
                      <TableCell>
                        {row?.expiry_date ? (
                          <Moment format="MM/DD/YYYY">{row.expiry_date}</Moment>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell align="left">{row?.supplier?.name}</TableCell>
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
                          <MenuItem
                            onClick={() => {
                              // //console.log("my click", row.id);
                              setSelectedProductId(row.id); // Set the selected product ID
                              setShowStockEditPopup(true);
                              handleMenuClose();
                            }}
                          >
                            <EditOutlined
                              fontSize="small"
                              sx={{ marginRight: 1 }}
                            />{" "}
                            Stock Adjustment
                          </MenuItem>
                          <MenuItem aria-label="View order details">
                            <Link
                              to={`/admin/History/product-history/${row.id}`}
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                            >
                              <VisibilityOutlinedIcon sx={{ marginRight: 1 }} />
                              View
                            </Link>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {showStockEditPopup && (
              <AddEditStockPopup
                productId={selectedProductId}
                getData={getData}
                onSave={(updatedProductData) => {
                  // Perform any necessary action with the updated product data
                  //console.log("Updated Product Data:", updatedProductData);
                  // Hide the popup
                  setShowStockEditPopup(false);
                }}
                onCancel={() => setShowStockEditPopup(false)}
              />
            )}
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

export default ExpiredStocks;
