import React, { useState, useEffect } from "react";

import {
  MoreVertOutlined,
  //   EditOutlined,
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
  // OutlinedInput,
  // InputAdornment,
  Pagination,
  Button,
  IconButton,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { saveAs } from "file-saver";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import copy from "copy-to-clipboard";

import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlist,
  getAllActiveProducts,
  getAllCategory,
  getAllCustomers,
  getWishlist,
} from "../../../../../redux/cartSlice";
import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
const XLSX = require("xlsx");
const ProductWishlist = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const wishlist = useSelector((state) => state.cart.wishlist);

  //   const getAllWishlist=async()={
  //     try{
  // const res=await axios.get(``)
  //     }catch(error){
  //       //console.log(error)
  //     }
  //   }

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

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
      "Sample ProcutDesc description 180 caps",
      "Health & Wellness",
      "Test Blog Tes",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),
    CreateData(
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
    CreateData(
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

  // const [searchText, setSearchText] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [linesCopied, setLinesCopied] = useState(0);

  // const handleSearchChange = (event) => {
  //   setSearchText(event.target.value);
  //   setStatusFilter("all");
  //   setPage(1);
  // };

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
    if (row) {
      dispatch(deleteWishlist(row.id));
    }
  };

  // const filteredRows = rows.filter((row) => {
  //   const titleMatch = row.StockUpdateOn.toLowerCase().includes(
  //     searchText.toLowerCase()
  //   );
  //   const categoryMatch = row.category
  //     .toLowerCase()
  //     .includes(searchText.toLowerCase());
  //   const statusMatch =
  //     statusFilter === "all" || row.Supplier.toLowerCase() === statusFilter;
  //   return titleMatch || categoryMatch || statusMatch;
  // });

  // const startIndex = (page - 1) * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  // const displayedRows = filteredRows.slice(startIndex, endIndex);

  // const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

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

  const handleExportExcel = () => {
    const exportIt = wishlist?.map((elem) => ({
      name: elem.product_name,
      "user name": elem.user_first_name + " " + elem.user_last_name,
      category: elem.category,
      "selling price": "$" + elem.selling_price ? elem.selling_price : 0,
    }));

    var wb = XLSX.utils.book_new();
    if (wishlist.length > 0) {
      let ws = XLSX.utils.json_to_sheet(exportIt);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet");
      XLSX.writeFile(wb, "MyExcel.xlsx");
      toast.success("Exported successfully.");
    } else {
      alert("Please select some items.");
    }
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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>Promotions - All Wishlist Products</h6>
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
            <h3>Wishlist Products</h3>
            {/* Buttons */}
            <div className="tabs-butons">
              <Link to="/admin/Marketing-Promotions/product-wishlist/add-to-products">
                <Button variant="contained">Add</Button>
              </Link>

              <Button variant="contained" onClick={handleExportExcel}>
                Excel
              </Button>
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
                      <InputAdornment position="start">
                        Search...
                      </InputAdornment>
                    }
                  />
                </div>
              </div> */}
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

                    <TableCell style={{ fontWeight: "bold" }}>
                      Product
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Category
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Customer
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="left">
                  {wishlist?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {index + 1}
                      </TableCell>

                      <TableCell
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div className="blog-img">
                          <img src={`${IMAGEURL}${row.thumbnail}`} alt="Blog" />
                        </div>
                        {row.product_name}
                      </TableCell>
                      <TableCell>{row.category}</TableCell>

                      <TableCell>
                        {row.user_first_name} {row.user_last_name}
                      </TableCell>
                      <TableCell>$ {row?.selling_price}</TableCell>
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
                count={1}
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

export default ProductWishlist;
