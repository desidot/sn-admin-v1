import React, { useState, useEffect } from "react";
import axios from "axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { MoreVertOutlined, EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
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
  // Dialog,
  // DialogTitle,
  // DialogContent,
} from "@mui/material";
import { saveAs } from "file-saver";
import HomeIcon from "@mui/icons-material/Home";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import copy from "copy-to-clipboard";
import "../ProductInventory.css";
import AddEditStockPopup from "../../ProductInventoryPopup/AddEditStockPopup";
import Moment from "react-moment";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
const ProductInventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [linesCopied, setLinesCopied] = useState(0);
  const [showStockEditPopup, setShowStockEditPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  // Inside the handleMenuClose function, set the selectedProductId and open the popup
  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
    // setShowStockEditPopup(false); // Close the popup
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleInputChange = (event) => {
    const val = event.target.value;
    if (val?.trim() !== "" && val?.length >= 3) {
      setSearchText(val);
    } else {
      setSearchText(""); // Clear searchResults when searchQuery is empty
    }
    // Perform your logic here with the updated value
    // This function will be called after the specified delay (debounce time)
  };
  const handleInput = debounce(handleInputChange, 1000);

  const getData = async () => {
    try {
      await axios
        .get(
          `${APIBASE}admin/get-all-products?page=${page}&search=${searchText}`
        )
        .then((response) => {
          // Update the state with the API data
          setInventoryData(response.data.data);
          setLoading(false);
          setPageCount(Math.ceil(response.data.total / response.data.per_page));
          setTotalItems(response.data.total);
          setCurrPage(response.data.current_page);
        })
        .catch((error) => {
          //console.error("Error fetching data:", error);
          setLoading(false);
        });
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    // Fetch data from the API using Axios
    getData();
  }, [page, searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // setStatusFilter("all");
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

  // const handleMenuClose = () => {
  //   setOpenMenuId(null);
  //   setAnchorEl(null);
  //   setShowStockEditPopup(false); // Close the popup
  // };

  // Update the filteredRows function to map the correct data
  const filteredRows = inventoryData
    ? inventoryData.filter((row) => {
        const titleMatch = row.product_name
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return titleMatch;
      })
    : [];

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  // const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const exportCSV = () => {
    const csvHeaders = [
      "Sr. No.",
      "Stock Update On",
      "Product Description",
      "Category",
      "Brand",
      "Supplier",
      "Price (US $)",
      "Quantity",
      "Expiry Date",
    ];

    const csvRows = displayedRows.map((row, index) => [
      currPage * rowsPerPage - rowsPerPage + 1 + index,
      row.updated_at,
      row.product_name,
      row.category?.name,
      row.brand?.name,
      row.supplier?.name,
      row.selling_price,
      row.quantity,
      row.expiry_date,
    ]);

    const csvString = `${csvHeaders.join(",")}\n${csvRows
      .map((row) => row.join(","))
      .join("\n")}`;

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "ProductInventory.csv");
  };

  // Function to navigate back to the previous page
  const handleGoBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Inventory - Product Inventory
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
            <h3 className="card-title">Product Inventory</h3>
            {/* Buttons */}
            <div className="tabs-butons">
              <Button variant="contained">All</Button>

              {/* <Button variant="contained" onClick={handleCopy}>
                Copy
              </Button> */}
              {/* <Button variant="contained" onClick={handleExportExcel}>
                Excel
              </Button> */}
              <Button variant="contained" onClick={exportCSV}>
                CSV
              </Button>
              {/* <Button variant="contained" onClick={handleExportPDF}>
                PDF
              </Button> */}
            </div>
          </div>
          {/* Buttons End*/}
          <div className="main-body2">
            {/* Search and Nos */}
            <div className="searchAndNosBlogs">
              <div>Total:-{totalItems}</div>
              <div className="search-inventory">
                <div
                  className="search-in-table mt-0"
                  style={{ marginBottom: "20px" }}
                >
                  <OutlinedInput
                    // value={searchText}
                    onChange={handleInput}
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
                    <TableCell style={{ fontWeight: "bold" }}>
                      Stock Update On
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Product
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Category
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Brand</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Suppliyer
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Price (US $)
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Expiry date
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="center">
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={12} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRows.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" align="left">
                          {currPage * 10 - 10 + 1 + index}
                        </TableCell>
                        <TableCell>
                          <Moment format="MM/DD/YYYY">{row.updated_at}</Moment>
                        </TableCell>
                        <TableCell>
                          <div className="blog-img">
                            {/* <img
                              src={`${IMAGEURL}${row.thumbnail}`}
                              style={{ maxHeight: "40px", maxWidth: "40px" }}
                              alt="ProductImage"
                            /> */}
                            {row?.thumbnail_name ? (
                              <img
                                src={`${IMAGEURL}upload/product/thumbnail/100/${row.thumbnail_name}`}
                                alt="ProdutName"
                                style={{ maxHeight: "40px", maxWidth: "40px" }}
                              />
                            ) : (
                              <div className="default-user-image">
                                <img
                                  src={`${IMAGEURL}${row.thumbnail}`}
                                  alt="ProdutName"
                                  style={{
                                    maxHeight: "40px",
                                    maxWidth: "40px",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          {row.product_name}
                        </TableCell>
                        <TableCell>{row.category?.name}</TableCell>
                        <TableCell>{row.brand?.name}</TableCell>
                        <TableCell>{row.supplier?.name}</TableCell>
                        <TableCell>$ {row.selling_price}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>
                          {row?.expiry_date ? (
                            <Moment format="MM/DD/YYYY">
                              {row.expiry_date}
                            </Moment>
                          ) : (
                            "-"
                          )}
                        </TableCell>
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
                                <VisibilityOutlinedIcon
                                  sx={{ marginRight: 1 }}
                                />
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
            </TableContainer>
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

export default ProductInventory;

// import React, { useState, useEffect } from "react";
// import ProductImage from "../../../../../../assets/products/sample-product-bone.png";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// import {
//   MoreVertOutlined,
//   EditOutlined,
//   // DeleteOutlined,
// } from "@mui/icons-material";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   InputAdornment,
//   Pagination,
//   Button,
//   IconButton,
//   Menu,
//   Dialog,
//   DialogTitle,
//   DialogContent,
// } from "@mui/material";
// import { saveAs } from "file-saver";
// import HomeIcon from "@mui/icons-material/Home";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import copy from "copy-to-clipboard";

// import "../ProductInventory.css";
// import AddEditStockPopup from "../AddEditStockPopup";

// const ProductInventory = () => {
//   function createData(
//     srNo,
//     StockUpdateOn,
//     ProcutDesc,
//     category,
//     Brand,
//     Supplier,
//     Price,
//     Quantity,
//     action
//   ) {
//     return {
//       srNo,
//       StockUpdateOn,
//       ProcutDesc,
//       category,
//       Brand,
//       Supplier,
//       Price,
//       Quantity,
//       action,
//     };
//   }

//   const rows = [
//     createData(
//       1,
//       "Jul 13 2023",
//       "Sample ProcutDesc description 180 caps",
//       "Health & Wellness",
//       "Test Blog Tes",
//       "Protocol For Life Balance",
//       "emerson ecologics (Bermuda)",
//       "44.29",
//       "Total Stock: 1"
//     ),
//     createData(
//       2,
//       "Jul 13 2023",
//       "Sample ProcutDesc description 180 caps",
//       "Health & Wellness",
//       "Test Blog Tes",
//       "Protocol For Life Balance",
//       "emerson ecologics (Bermuda)",
//       "44.29",
//       "Total Stock: 1"
//     ),
//     createData(
//       3,
//       "Jul 13 2023",
//       "Sample ProcutDesc description 180 caps",
//       "Health & Wellness",
//       "Test Blog Tes",
//       "Protocol For Life Balance",
//       "emerson ecologics (Bermuda)",
//       "44.29",
//       "Total Stock: 1"
//     ),

//     // Add more dummy data as needed
//   ];

//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [linesCopied, setLinesCopied] = useState(0);
//   const [showStockEditPopup, setShowStockEditPopup] = useState(false);

//   const handleGoBack = () => {
//     // Go back to the previous page in the history
//     window.history.go(-1);
//   };

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//     setStatusFilter("all");
//     setPage(1);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(event.target.value);
//     setPage(1);
//   };

//   const handleMenuOpen = (event, id) => {
//     setOpenMenuId(id);
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setOpenMenuId(null);
//     setAnchorEl(null);
//   };

//   const filteredRows = rows.filter((row) => {
//     const titleMatch = row.StockUpdateOn.toLowerCase().includes(
//       searchText.toLowerCase()
//     );
//     const categoryMatch = row.category
//       .toLowerCase()
//       .includes(searchText.toLowerCase());
//     const statusMatch =
//       statusFilter === "all" || row.Supplier.toLowerCase() === statusFilter;
//     return titleMatch || categoryMatch || statusMatch;
//   });

//   const startIndex = (page - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const displayedRows = filteredRows.slice(startIndex, endIndex);

//   const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const exportCSV = () => {
//     const csvHeaders = [
//       { label: "Sr.No.", key: "srNo" },
//       { label: "Stock Update On", key: "StockUpdateOn" },
//       { label: "Product Description", key: "ProcutDesc" },
//       { label: "Category", key: "category" },
//       { label: "Brand", key: "Brand" },
//       { label: "Supplier", key: "Supplier" },
//       { label: "Price (US $)", key: "Price" },
//       { label: "Quantity", key: "Quantity" },
//       { label: "Action", key: "action" },
//     ];

//     const csvData = {
//       headers: csvHeaders,
//       data: rows,
//     };

//     const csvString = `${csvData.headers
//       .map((header) => header.label)
//       .join(",")}\n${csvData.data
//       .map((row) => Object.values(row).join(","))
//       .join("\n")}`;
//     const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
//     saveAs(blob, "product_inventory.csv");
//   };

//   const handleExportPDF = () => {
//     html2canvas(document.querySelector("#tableContainer")).then((canvas) => {
//       const imgData = canvas.toDataURL("ProcutDesc/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const imageWidth = pageWidth - 20;
//       const imageHeight = (imageWidth * canvas.height) / canvas.width;
//       pdf.addImage(imgData, "PNG", 10, 10, imageWidth, imageHeight);
//       pdf.save("blogs.pdf");
//     });
//   };

//   const handleCopy = () => {
//     const data = displayedRows.map((row) => [
//       row.srNo,
//       row.StockUpdateOn,
//       row.category,
//       row.Brand,
//       row.ProcutDesc,
//       row.Supplier,
//     ]);

//     const csvData = data.map((row) => row.join(",")).join("\n");

//     copy(csvData);

//     const linesCopied = data.length;
//     setLinesCopied(linesCopied);
//     setIsPopupOpen(true);
//   };

//   const handleExportExcel = () => {
//     const csvHeaders = [
//       { label: "Sr.No.", key: "srNo" },
//       { label: "Title", key: "StockUpdateOn" },
//       { label: "Category", key: "category" },
//       { label: "Description", key: "Brand" },
//       { label: "Image", key: "ProcutDesc" },
//       { label: "Status", key: "Supplier" },
//     ];

//     const csvData = {
//       headers: csvHeaders,
//       data: rows,
//     };

//     const csvString = `${csvData.headers
//       .map((header) => header.label)
//       .join(",")}\n${csvData.data
//       .map((row) => Object.values(row).join(","))
//       .join("\n")}`;
//     const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
//     saveAs(blob, "blogs.csv");
//   };

//   useEffect(() => {
//     if (isPopupOpen) {
//       setTimeout(() => {
//         setIsPopupOpen(false);
//       }, 1000);
//     }
//   }, [isPopupOpen]);

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div style={{ display: "flex" }}>
//           <i>
//             <HomeIcon /> {"-"}{" "}
//           </i>
//           <h6 style={{ margin: "5px" }}>
//             Product Manager - Inventory - Product Inventory
//           </h6>
//         </div>

//         <button
//           className="back-button"
//           onClick={handleGoBack}
//           style={{ background: "#EEF2F6", fontWeight: "500" }}
//         >
//           <span className="back-arrow" style={{ fontWeight: "500" }}>
//             &larr;
//           </span>{" "}
//           Back
//         </button>
//       </div>
//       <br />
//       <div>
//         <div className="card">
//           <div className="card-header">
//             <h3>Product Inventory</h3>
//             {/* Buttons */}
//             <div className="tabs-butons">
//               <Button variant="contained">All</Button>

//               <Button variant="contained" onClick={handleCopy}>
//                 Copy
//               </Button>
//               <Button variant="contained" onClick={handleExportExcel}>
//                 Excel
//               </Button>
//               <Button variant="contained" onClick={exportCSV}>
//                 CSV
//               </Button>
//               <Button variant="contained" onClick={handleExportPDF}>
//                 PDF
//               </Button>
//             </div>
//           </div>
//           {/* Buttons End*/}
//           <div className="main-body2">
//             {/* Search and Nos */}
//             <div className="searchAndNosBlogs">
//               <div className="nos">
//                 Show <span className="spaces"></span>
//                 <Select
//                   value={rowsPerPage}
//                   onChange={handleRowsPerPageChange}
//                   label="Rows per page"
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//                 <span className="spaces"></span> entries
//               </div>
//               <div className="search-inventory">
//                 <div className="search-in-table">
//                   <OutlinedInput
//                     value={searchText}
//                     onChange={handleSearchChange}
//                     id="outlined-adornment-weight"
//                     endAdornment={
//                       <InputAdornment position="start">
//                         Search...
//                       </InputAdornment>
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Search and Nos END */}

//             {/* Table */}
//             <TableContainer
//               component={Paper}
//               style={{ boxShadow: "none" }}
//               id="tableContainer"
//             >
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
// <TableRow>
//   <TableCell style={{ fontWeight: "bold" }} align="left">
//     Sr. No.
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>
//     Stock Update On
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>
//     Product
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>
//     Category
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>Brand</TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>
//     Suppliyer
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>
//     Price (US $)
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>
//     Quantity
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>
//     Expiry date
//   </TableCell>
//   <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
// </TableRow>
//                 </TableHead>
//                 <TableBody align="left">
//                   {displayedRows.map((row, index) => (
//                     <TableRow key={index}>
// <TableCell component="th" scope="row" align="left">
//   {row.srNo}
// </TableCell>
// <TableCell>{row.StockUpdateOn}</TableCell>
// <TableCell>
//   <div className="blog-img">
//     <img src={ProductImage} alt="Blog" />
//   </div>
//   {row.ProcutDesc}
// </TableCell>
// <TableCell>{row.category}</TableCell>
// <TableCell>{row.Brand}</TableCell>
// <TableCell>{row.Supplier}</TableCell>
// <TableCell>{row.Price}</TableCell>
// <TableCell>{row.Quantity}</TableCell>
// <TableCell>12 Jul, 2024</TableCell>
// <TableCell>
//                         <IconButton
//                           onClick={(event) => handleMenuOpen(event, row.srNo)}
//                           size="small"
//                         >
//                           <MoreVertOutlined />
//                         </IconButton>
//                         <Menu
//                           anchorEl={anchorEl}
//                           open={openMenuId === row.srNo}
//                           onClose={handleMenuClose}
//                           PaperProps={{
//                             style: {
//                               maxHeight: 120,
//                             },
//                           }}
//                         >
//                           <MenuItem
//                             onClick={() => {
//                               handleMenuClose();
//                               setShowStockEditPopup(true);
//                             }}
//                           >
//                             <EditOutlined
//                               fontSize="small"
//                               sx={{ marginRight: 1 }}
//                             />{" "}
//                             Stock Adjustment
//                           </MenuItem>
//                           <MenuItem aria-label="View order details">
//                             <VisibilityOutlinedIcon sx={{ marginRight: 1 }} />
//                             View
//                           </MenuItem>
//                         </Menu>
//                         {showStockEditPopup && (
//                           <AddEditStockPopup
//                             onSave={(staffNote) => {
//                               // Perform any necessary action with the staff note value
//                               //console.log(staffNote);

//                               // Hide the popup
//                               setShowStockEditPopup(false);
//                             }}
//                             onCancel={() => setShowStockEditPopup(false)}
//                           />
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             {/* Table End */}

//             {/* Pagination */}
//             <div className="pagination-style-p-inventory">
//               <Pagination
//                 count={pageCount}
//                 page={page}
//                 onChange={handlePageChange}
//                 className="pagination-style"
//                 style={{
//                   display: "flex",
//                   // padding: "1rem",
//                   justifyContent: "right",
//                 }}
//               />
//             </div>
//             {/* Pagination END */}
//           </div>
//         </div>
//       </div>
//       {/* Popup */}
//       {isPopupOpen && (
//         <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
//           <DialogTitle>Copied to Clipboard</DialogTitle>
//           <DialogContent>
//             <p>{linesCopied} lines copied to clipboard.</p>
//           </DialogContent>
//         </Dialog>
//       )}
//       {/* Popup END */}
//     </>
//   );
// };

// export default ProductInventory;
