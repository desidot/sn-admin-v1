import React, { useState, useEffect } from "react";
import {
  MoreVertOutlined,
  //   EditOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
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
  Pagination,
  Button,
  IconButton,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  styled,
  Switch,
  FormControlLabel,
  Typography,
  Collapse,
} from "@mui/material";
// import { saveAs } from "file-saver";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import copy from "copy-to-clipboard";

import { Link } from "react-router-dom";
import "./SubsDiscount.css";
import {
  changeSubsStatus,
  deleteSubsDiscount,
  getAllSubsDiscounts,
} from "../../../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
import { toast } from "react-toastify";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const SubscriptionDiscount = () => {
  const [listItems, setListItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getAllDiscountsHere = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/subcriptionDiscounts?page=${page}`
      );
      setListItems(res.data.data);
      setData(res.data.data);
      setPageCount(Math.ceil(res.data.meta.total / res.data.meta.per_page));
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    getAllDiscountsHere();
  }, [page]);

  // useEffect(() => {
  //   setListItems(allDiscounts);
  // }, [allDiscounts]);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  const [expandedRow, setExpandedRow] = React.useState("");

  const handleRowClick = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow("");
    } else {
      setExpandedRow(rowId);
    }
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

  // const [searchText, setSearchText] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
  };

  const handleDeleteSubs = async (row) => {
    handleMenuClose();
    try {
      await axios.delete(`${APIBASE}admin/subcriptionDiscounts/${row.id}`);
      toast.success("Item deleted successfully");
      getAllDiscountsHere();
    } catch (err) {
      //console.log(err);
    }
  };

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
  // function getNormalDate(dateString) {
  //   const dateObj = new Date(dateString);
  //   const year = dateObj.getFullYear();
  //   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //   const day = String(dateObj.getDate()).padStart(2, "0");

  //   return `${year}-${month}-${day}`;
  // }
  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 1000);
    }
  }, [isPopupOpen]);

  const handleStatusChange = async (e, row) => {
    const event = e.target.checked;

    if (event) {
      try {
        const response = await axios.put(
          `${APIBASE}admin/update-subscription-discount-status/${row.id}`,
          { status: 1 }
        );
        toast.success("Updated successfully.");
        getAllDiscountsHere();
      } catch (error) {
        return; //console.log("error", error);
      }
    } else {
      try {
        const response = await axios.put(
          `${APIBASE}admin/update-subscription-discount-status/${row.id}`,
          { status: 0 }
        );
        toast.success("Updated successfully.");
        getAllDiscountsHere();
      } catch (error) {
        return; //console.log("error", error);
      }
    }
    // ;
  };
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
          <h6 style={{ margin: "5px" }}>
            Promotions - Discounts - Subscription Discounts
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
            <h3 className="card-title">Subscription Discount</h3>
            {/* Buttons */}
            <div className="tabs-buttons">
              <Grid container spacing={2} className="m-0">
                <Grid item className="m-1">
                  <Link to="/admin/Marketing-Promotions/add-subscription-discount">
                    <Button variant="contained">
                      Add New Subscription Discount
                    </Button>
                  </Link>
                </Grid>
                <Grid item className="m-1">
                  <Button
                    variant="contained"
                    onClick={() => setListItems(data)}
                  >
                    All
                  </Button>
                </Grid>
                <Grid item className="m-1">
                  <Button
                    variant="contained"
                    onClick={() =>
                      setListItems(data?.filter((elem) => elem.status === 1))
                    }
                  >
                    Active
                  </Button>
                </Grid>
                <Grid item className="m-1">
                  <Button
                    variant="contained"
                    onClick={() =>
                      setListItems(data?.filter((elem) => elem.status === 0))
                    }
                  >
                    Deactive
                  </Button>
                </Grid>

                {/* <Grid item>
                  <Button variant="contained" >
                    Excel
                  </Button>
                </Grid> */}
              </Grid>
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
                    <TableCell
                      style={{ fontWeight: "bold" }}
                      align="left"
                    ></TableCell>
                    {/* <TableCell style={{ fontWeight: "bold" }}>Date</TableCell> */}
                    <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>

                    <TableCell style={{ fontWeight: "bold" }}>
                      Discount
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Month</TableCell>

                    <TableCell style={{ fontWeight: "bold" }}>On/Off</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="left">
                  {listItems?.map((row, index) => (
                    <React.Fragment Fragment key={index}>
                      <TableRow>
                        <TableCell>
                          <IconButton
                            onClick={() => handleRowClick(row.id)}
                            variant="outlined"
                            // size="small"
                          >
                            {expandedRow === row.id ? (
                              <i>
                                <FaAngleUp />
                              </i>
                            ) : (
                              <span className="fa fa-chevron-down">
                                <FaAngleDown />
                              </span>
                            )}
                          </IconButton>
                        </TableCell>

                        {/* <TableCell>{row.name}</TableCell>
                          <TableCell>{row.mode} </TableCell> */}
                        <TableCell>{row.discount_type}</TableCell>
                        <TableCell>{row.discount}</TableCell>
                        <TableCell>{row.months}</TableCell>
                        <TableCell>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={(e) => handleStatusChange(e, row)}
                              checked={row.status == 1}
                            />
                            <span className="slider"></span>
                          </label>
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
                          >
                            <MenuItem>
                              <Link
                                to={`/admin/marketing-promotions/edit-subscription-discount/${row.id}`}
                                onClick={handleMenuClose}
                                style={{ color: "black" }}
                              >
                                <small>
                                  {" "}
                                  <EditOutlined sx={{ marginRight: 1 }} />
                                  Edit
                                </small>
                              </Link>
                            </MenuItem>

                            <MenuItem onClick={() => handleDeleteSubs(row)}>
                              <small>
                                <DeleteOutlined sx={{ marginRight: 1 }} />
                                Delete
                              </small>
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          colSpan={12}
                          className="hiddenRow pc-padding"
                          style={{ padding: "0px" }}
                        >
                          <Collapse
                            in={expandedRow === row.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <div className="accordian-body" id="order">
                              <Typography
                                variant="h4"
                                className="sub-table-heading"
                              >
                                <p style={{ padding: "1rem", margin: "0" }}>
                                  Products in Deal
                                </p>
                              </Typography>
                              {/* <hr /> */}
                              <TableContainer>
                                <Table>
                                  <TableHead className="orders-table-head-row font-weight-bold">
                                    <TableRow className="info">
                                      <TableCell>Product Name</TableCell>
                                      {/* <TableCell>Unit</TableCell> */}
                                      <TableCell>Category</TableCell>
                                      {/* <TableCell>Qty</TableCell> */}
                                      <TableCell>Brand</TableCell>
                                      <TableCell>Price</TableCell>
                                      <TableCell>Final Price</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {row?.products?.map((elem, index2) => (
                                      <TableRow className="info" key={index2}>
                                        <TableCell>
                                          <img
                                            src={`${IMAGEURL}${elem?.thumbnail}`}
                                            style={{
                                              marginRight: "15px",
                                              height: "50px",
                                              width: "auto",
                                            }}
                                          />{" "}
                                          {elem.product_name}
                                        </TableCell>
                                        {/* <TableCell>{elem.unit}</TableCell> */}
                                        <TableCell>
                                          {elem.category ? elem.category : "-"}
                                        </TableCell>
                                        {/* <TableCell>{elem.stock}</TableCell> */}
                                        <TableCell>{elem.brand}</TableCell>

                                        <TableCell>${elem.price}</TableCell>

                                        <TableCell>
                                          $
                                          {(
                                            +elem?.price -
                                            (row?.discount_type === "Percent"
                                              ? (+elem?.price *
                                                  +row?.discount) /
                                                100
                                              : +row?.discount)
                                          ).toFixed(2)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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

export default SubscriptionDiscount;
