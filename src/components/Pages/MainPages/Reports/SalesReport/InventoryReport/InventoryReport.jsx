import React, { useState, useEffect } from "react";

import { APIBASE } from "../../../../../auth/apiConfig";
import {
  Table,
  TableBody,
  // Grid,
  // InputLabel,
  // FormControl,
  // TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // OutlinedInput,
  // InputAdornment,
  Button,
  // Typography,
  Pagination,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "../Reports.css";
// import { Link } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
const XLSX = require("xlsx");
const InventoryReport = () => {
  const [searchText, setSearchText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 1000);
    }
  }, [isPopupOpen]);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const [listItems, setListItems] = useState([]);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getAllSalesReport = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/reports/get-inventory-report?page=${page}`
      );
      setData(res.data.products.data);
      setPageCount(
        Math.ceil(res.data.products.total / res.data.products.per_page)
      );
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getAllSalesReport();
  }, [page]);

  useEffect(() => {
    setListItems(data);
  }, [data]);

  //   useEffect(() => {
  //     setListItems(
  //       data?.filter((row) =>
  //         JSON.parse(row?.billing_address).first_name
  //           ? (
  //               JSON.parse(row?.billing_address).first_name +
  //               " " +
  //               JSON.parse(row?.billing_address).last_name
  //             )
  //               .toLowerCase()
  //               .includes(searchText.toLowerCase())
  //           : JSON.parse(row?.billing_address)
  //               .name.toLowerCase()
  //               .includes(searchText.toLowerCase())
  //       )
  //     );
  //   }, [searchText, data]);


  function formatDateToDayMonthYear(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const getExportInventoryData = async () => {
    setExporting(true);
    try {
      const res = await axios.get(
        `${APIBASE}admin/reports/export-inventory-report`
      );
      handleExport(res?.data?.products);
      setExporting(false);
    } catch (error) {
      setExporting(false);
    }
  };

  const handleExport = (data) => {
    const exportIt = data?.map((elem) => ({
      Product: elem.product_name,
      Category: elem.category_name,
      Brand: elem.brand_name,
      "Total quantity": elem.quantity,
      "Sold quantity": elem.total_sold,
      price: elem.selling_price,
    }));

    let wb = XLSX.utils.book_new();
    if (exportIt.length > 0) {
      let ws = XLSX.utils.json_to_sheet(exportIt);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet");
      XLSX.writeFile(wb, "InventoryReport.xlsx");
    } else {
      alert("Please select some items.");
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
            Report - Sales Report - Inventory Report
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
        <h3 className="card-title">Inventory Report</h3>
          {/* Buttons */}
          <div className="tabs-butons">
            {/* <Button variant="contained">All</Button> */}
            <Button
              disabled={exporting}
              variant="contained"
              onClick={() => getExportInventoryData()}
            >
              {exporting ? "Exporting" : "Excel"}
            </Button>
          </div>
        </div>
        {/* Buttons End*/}
        <div className="main-body2">
          {/* Search and Nos */}
          {/* <div className="searchAndNosBlogs">
            <div className="nos"></div>
            <div className="search-inventory">
              <div className="search-in-table m-2"> */}
                {/* <OutlinedInput
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
                /> */}
              {/* </div>
            </div>
          </div> */}
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
                    Product
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Category
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Brand
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Total Quantity
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Sold Quantity
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="left">
                {listItems
                  ?.sort((a, b) => {
                    const nameA = a.product_name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
                    const nameB = b.product_name.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                  })
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1} </TableCell>
                      <TableCell align="left">{row.product_name} </TableCell>
                      <TableCell align="left">{row.category_name} </TableCell>
                      <TableCell align="left">{row.brand_name} </TableCell>
                      <TableCell align="left"> {row.quantity} </TableCell>
                      <TableCell align="left"> {row.total_sold} </TableCell>
                      <TableCell align="left"> ${row.selling_price} </TableCell>
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
    </>
  );
};

export default InventoryReport;
