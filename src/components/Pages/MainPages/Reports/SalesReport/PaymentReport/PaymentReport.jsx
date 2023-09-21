import React, { useState, useEffect } from "react";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
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
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Autocomplete,
} from "@mui/material";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import copy from "copy-to-clipboard";
import HomeIcon from "@mui/icons-material/Home";

import "../Reports.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const XLSX = require("xlsx");
const PaymentReport = () => {
  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  function CreateData(
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
    CreateData(
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
    CreateData(
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
    CreateData(
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
  const [page, setPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [linesCopied, setLinesCopied] = useState(0);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setStatusFilter("all");
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
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

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const exportCSV = () => {
    const csvHeaders = [
      { label: "Sr.No.", key: "srNo" },
      { label: "Stock Update On", key: "StockUpdateOn" },
      { label: "Product Description", key: "ProcutDesc" },
      { label: "Category", key: "category" },
      { label: "Brand", key: "Brand" },
      { label: "Supplier", key: "Supplier" },
      { label: "Price (US $)", key: "Price" },
      { label: "Quantity", key: "Quantity" },
      { label: "Action", key: "action" },
    ];

    const csvData = {
      headers: csvHeaders,
      data: rows,
    };

    const csvString = `${csvData.headers
      .map((header) => header.label)
      .join(",")}\n${csvData.data
      .map((row) => Object.values(row).join(","))
      .join("\n")}`;
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "product_inventory.csv");
  };

  const handleExportPDF = () => {
    html2canvas(document.querySelector("#tableContainer")).then((canvas) => {
      const imgData = canvas.toDataURL("ProcutDesc/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imageWidth = pageWidth - 20;
      const imageHeight = (imageWidth * canvas.height) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imageWidth, imageHeight);
      pdf.save("customers.pdf");
    });
  };

  const handleCopy = () => {
    const data = displayedRows.map((row) => [
      row.srNo,
      row.StockUpdateOn,
      row.category,
      row.Brand,
      row.ProcutDesc,
      row.Supplier,
    ]);

    const csvData = data.map((row) => row.join(",")).join("\n");

    copy(csvData);

    const linesCopied = data.length;
    setLinesCopied(linesCopied);
    setIsPopupOpen(true);
  };

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
      data: rows,
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

  const cards = ["All", "AUTHORIZED.NET", "CASH", "OFFLINE"];

  const [listItems, setListItems] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [data, setData] = useState([]);
  const [cType, setCType] = useState("");

  const getAllSalesReport = async () => {
    // console.log(cType, from_date, to_date);

    if (from_date && to_date && cType) {
      try {
        const res = await axios.get(
          `${APIBASE}admin/reports/get-payment-report/${
            cType == "All" ? 0 : cType
          }/${from_date}/${to_date}`
        );
        setData(res.data);
      } catch (error) {
        // console.log(error);
      }
    } else {
      toast.error("Select both dates!");
    }
  };

  useEffect(() => {
    setListItems(data);
  }, [data]);

  useEffect(() => {
    setListItems(
      data?.filter((row) =>
        JSON.parse(row?.billing_address).first_name
          ? (
              JSON.parse(row?.billing_address).first_name +
              " " +
              JSON.parse(row?.billing_address).last_name
            )
              .toLowerCase()
              .includes(searchText.toLowerCase())
          : JSON.parse(row?.billing_address)
              .name.toLowerCase()
              .includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  function formatDateToDayMonthYear(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const handleExport = () => {
    const exportIt = listItems?.map((elem) => ({
      "Sales Date": formatDateToDayMonthYear(elem.created_at),
      "Invoice Id": elem.invoice_no,
      "Customer Name": JSON.parse(elem.billing_address).first_name
        ? JSON.parse(elem.billing_address).first_name +
          " " +
          JSON.parse(elem.billing_address).last_name
        : JSON.parse(elem.billing_address).name,
      "Paid Amount": "$" + elem.grand_total,
      "Reciept by": elem.added_by ? elem.added_by : "-",
      "Card Type": elem.card_type,
    }));

    var wb = XLSX.utils.book_new();
    if (exportIt.length > 0) {
      const totalAmount = listItems.reduce(
        (sum, item) => sum + +item.grand_total,
        0
      );

      exportIt.push({
        "Sales Date": "",
        "Invoice Id": "",
        "Customer Name": "",
        "Paid Amount": "",
        "Reciept by": "",
        "Card Type": "",
      });
      exportIt.push({
        "Sales Date": "",
        "Invoice Id": "",
        "Customer Name": "",
        "Paid Amount": "Total",
        "Reciept by": "Card Type",
        "Card Type": "",
      });

      const auth = listItems?.filter(
        (elem) => elem.card_type === "Authorized.net"
      );
      const cash = listItems?.filter((elem) => elem.card_type === "Visa");
      const offline = listItems?.filter(
        (elem) => elem.card_type === "Master Card"
      );
      const debit = listItems?.filter(
        (elem) => elem.card_type === "Debit Card"
      );
      const credit = listItems?.filter(
        (elem) => elem.card_type === "Credit Card"
      );

      const others = listItems?.filter(
        (elem) =>
          elem.card_type !== "Authorized.net" &&
          elem.card_type !== "Visa" &&
          elem.card_type !== "Master Card" &&
          elem.card_type !== "Debit Card" &&
          elem.card_type !== "Credit Card"
      );

      if (credit.length > 0) {
        const othTotal = credit.reduce((a, b) => {
          return a + +b.grand_total;
        }, 0);
        exportIt.push({
          "Sales Date": "",
          "Invoice Id": "",
          "Customer Name": "",
          "Paid Amount": "$" + othTotal,
          "Reciept by": "Credit Card",
          "Card Type": "",
        });
      }
      if (debit.length > 0) {
        const othTotal = debit.reduce((a, b) => {
          return a + +b.grand_total;
        }, 0);
        exportIt.push({
          "Sales Date": "",
          "Invoice Id": "",
          "Customer Name": "",
          "Paid Amount": "$" + othTotal,
          "Reciept by": "Debit Card",
          "Card Type": "",
        });
      }

      if (auth.length > 0) {
        const authTotal = auth.reduce((a, b) => {
          return a + +b.grand_total;
        }, 0);
        exportIt.push({
          "Sales Date": "",
          "Invoice Id": "",
          "Customer Name": "",
          "Paid Amount": "$" + authTotal,
          "Reciept by": "AUTHORIZED.NET",
          "Card Type": "",
        });
      }
      if (cash.length > 0) {
        const cashTotal = cash.reduce((a, b) => {
          return a + +b.grand_total;
        }, 0);
        exportIt.push({
          "Sales Date": "",
          "Invoice Id": "",
          "Customer Name": "",
          "Paid Amount": "$" + cashTotal,
          "Reciept by": "Visa",
          "Card Type": "",
        });
      }
      if (offline.length > 0) {
        const offTotal = offline.reduce((a, b) => {
          return a + +b.grand_total;
        }, 0);
        exportIt.push({
          "Sales Date": "",
          "Invoice Id": "",
          "Customer Name": "",
          "Paid Amount": "$" + offTotal,
          "Reciept by": "Master Card",
          "Card Type": "",
        });
      }
      if (others.length > 0) {
        const othTotal = others.reduce((a, b) => {
          return a + +b.grand_total;
        }, 0);
        exportIt.push({
          "Sales Date": "",
          "Invoice Id": "",
          "Customer Name": "",
          "Paid Amount": "$" + othTotal,
          "Reciept by": "Others",
          "Card Type": "",
        });
      }

      exportIt.push({
        "Sales Date": "",
        "Invoice Id": "",
        "Customer Name": "",
        "Paid Amount": "$" + totalAmount,
        "Reciept by": "Grand Total",
        "Card Type": "",
      });
      let ws = XLSX.utils.json_to_sheet(exportIt);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet");
      XLSX.writeFile(wb, "MyExcel.xlsx");
    } else {
      alert("Please select some items.");
    }
  };
  // console.log(listItems);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Report - Sales Report - POS - Payment Report
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
          <Typography variant="h1">Filter</Typography>
        </div>

        <div className="filter-container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor=""> Payment Type :</InputLabel>
              <FormControl fullWidth>
                {/* <InputLabel htmlFor="">Select Role</InputLabel> */}
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cards}
                  //   sx={{ width: 300 }}
                  onChange={(e, value) => setCType(value)}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Payment Type" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="date">Start Date:</InputLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder="Select date"
                  value={from_date}
                  onChange={(e) => setFrom_date(e.target.value)}
                  id="date"
                  type="date"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="date">End Date:</InputLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder="Select date"
                  value={to_date}
                  onChange={(e) => setTo_date(e.target.value)}
                  id="date"
                  type="date"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="allsales-search-button">
                <Button
                  className="search-btn"
                  onClick={() => getAllSalesReport()}
                  variant="contained"
                >
                  Search
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Payment Report</h3>
          {/* Buttons */}
          <div className="tabs-butons">
            {/* <Button variant="contained">All</Button> */}

            <Button variant="contained" onClick={handleExport}>
              Excel
            </Button>
          </div>
        </div>
        {/* Buttons End*/}
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos">{/* */}</div>
            <div className="search-inventory">
              <div className="search-in-table m-2">
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
                    Sales Date
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Invoice
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Customer
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Address
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Sub Total
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Discount
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Paid Amount
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Reciept By
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Payment Method
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="left">
                {listItems?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">
                      {formatDateToDayMonthYear(row.created_at)}
                    </TableCell>
                    <TableCell align="left">
                      <a
                        href={`${IMAGEURL}${row?.invoice_pdf}`}
                        target="_blank"
                      >
                        {row.invoice_no}
                      </a>
                    </TableCell>
                    <TableCell align="left">
                      {JSON.parse(row?.billing_address).first_name
                        ? JSON.parse(row?.billing_address).first_name +
                          " " +
                          JSON.parse(row?.billing_address).last_name
                        : JSON.parse(row?.billing_address).name}{" "}
                      <br />
                      {JSON.parse(row?.billing_address)?.email} <br />
                      {JSON.parse(row?.billing_address)?.phone}
                    </TableCell>
                    <TableCell align="left">
                      {JSON.parse(row?.billing_address)?.address}{" "}
                      {JSON.parse(row?.billing_address)?.city
                        ? "," + JSON.parse(row?.billing_address)?.city
                        : ""}
                      ,
                      {JSON.parse(row?.billing_address)?.zip
                        ? "," + JSON.parse(row?.billing_address)?.zip
                        : ""}
                    </TableCell>
                    <TableCell align="left">${row?.sub_total}</TableCell>
                    <TableCell align="left">${row?.coupon_discount}</TableCell>
                    <TableCell align="left">${row.grand_total}</TableCell>
                    <TableCell align="left">
                      {row.added_by ? row.added_by : "-"}
                    </TableCell>
                    <TableCell>
                      {row?.payment_method} <br /> <br />
                      {row?.transaction_id ?? ""}
                    </TableCell>
                  </TableRow>
                ))}

                {listItems.length > 0 && (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                    ></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">
                      <span style={{ fontWeight: "500", fontSize: "17px" }}>
                        Total
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ fontWeight: "500", fontSize: "17px" }}>
                        {" "}
                        $
                        {listItems
                          ?.reduce((a, b) => {
                            return +b?.grand_total + a;
                          }, 0)
                          .toFixed(2)}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left"></TableCell>
                    {/* <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell> */}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Table End */}

          {/* Pagination */}
          <div className="pagination-style-p-inventory">
            {/* <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              className="pagination-style"
              style={{
                display: "flex",
                // padding: "1rem",
                justifyContent: "right",
              }}
            /> */}
          </div>
          {/* Pagination END */}
        </div>
      </div>
      {/* Popup */}
      {isPopupOpen && (
        <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <DialogTitle>Copied to Clipboard</DialogTitle>
          <DialogContent>
            <p>{linesCopied} lines copied to clipboard.</p>
          </DialogContent>
        </Dialog>
      )}
      {/* Popup END */}
    </>
  );
};

export default PaymentReport;
