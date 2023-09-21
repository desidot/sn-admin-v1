import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  styled,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  TextField,
  // OutlinedInput,
  // InputAdornment,
  Pagination,
  Autocomplete,
  // Button,
  IconButton,
  Menu,
  Button,
  Modal,
  Box,
} from "@mui/material";
import "./ListProducts.css";
import Moment from "react-moment";

// import { Link } from "react-router-dom";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./ListProducts.css";

import { AiFillStar } from "react-icons/ai";
import { FaCubes } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// const [isPopupOpen, setIsPopupOpen] = useState(false);
import AddEditStockPopup from "../../ProductInventoryPopup/AddEditStockPopup";
// import { useSelector } from "react-redux";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import Loader from "../../../../../loader/loader";
import Papa from "papaparse";
const XLSX = require("xlsx");
const ListOfProducts = () => {
  const [brandValue, setShippingValue] = useState("");
  const [expandedRow, setExpandedRow] = React.useState("");
  const [productsData, setProductsData] = useState([]);

  // Move the rowsPerPage and pageCount outside the component
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1); // State to keep track of the current page number
  const [showStockEditPopup, setShowStockEditPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const [currentRow, setCurrentRow] = useState({});

  const [searchParam, setSearchParam] = useSearchParams();
  const params = useLocation();
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [statusValue, setStatusValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [searchIt, setSearchIt] = useState("");

  //
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // State for the quantity to add
  const [quantityToAdd, setQuantityToAdd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  // Function to handle adding quantity to the product
  const handleAddQuantity = async (product) => {
    if (quantityToAdd > 0) {
      // console.log("quantity to add", quantityToAdd);
      try {
        const response = await axios.post(`${APIBASE}admin/inventories`, {
          product_id: product.id,
          adjust_type: "increment",
          quantity: quantityToAdd,
          expiry_date: product?.expiry_date?.split("T")[0],
          cog_price: product?.cog_price,
          selling_price: product?.selling_price,
        });

        toast.success("Product updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        document.getElementById(`input${product.id}`).value = "";
        fetchData();
        setQuantityToAdd(1);
      } catch (error) {
        // console.error("Error updating product:", error);
        toast.error("Error updating product. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } else {
      toast.warn("Fill quantity.", { position: "top-center" });
    }
  };

  // Implement the onClick event for the pagination numbers

  // Function to handle row click for individual rows
  const handleRowClick = (rowId) => {
    setExpandedRow((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowId]: !prevExpandedRows[rowId],
    }));
  };
  // useEffect(() => {
  //   fetchData();
  // }, [params, page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${APIBASE}admin/get-all-products${params.search}&search=${searchIt}`
      );
      setProductsData(response.data.data);
      setTotalCount(response.data.total);
      setTotalItems(response.data.total);
      setIsLoading(false);
      // const initialToggleState = response.data.data.status;
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
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
    if (val?.trim() !== "" && val?.length >= 4) {
      setSearchIt(val);
    } else {
      setSearchIt(""); // Clear searchResults when searchQuery is empty
    }
    // Perform your logic here with the updated value
    // This function will be called after the specified delay (debounce time)
  };
  const handleInput = debounce(handleInputChange, 1000);

  // console.log("Total", totalCount);

  const handlePageChange = (event, value) => {
    setPage(value); // Update the current page when pagination is changed
  };

  useEffect(() => {
    // Fetch data for the initial page (page 1)

    fetchData();
  }, [searchIt, params]);
  // [page, searchIt]); // Fetch data whenever the page changes

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  // Function to toggle the switch
  const handleToggleChange = async (event, id) => {
    const fieldName = event.target.name;

    // Map both 1 : 0 and true : false
    let fieldValue;
    if (typeof event.target.checked === "boolean") {
      fieldValue = event.target.checked ? true : false;
    } else {
      fieldValue = event.target.checked ? 1 : 0;
    }

    const updatedProductsData = productsData.map((product) =>
      product.id === id ? { ...product, [fieldName]: fieldValue } : product
    );
    setProductsData(updatedProductsData);

    try {
      const productToUpdate = updatedProductsData.find(
        (product) => product.id === id
      );
      if (!productToUpdate) {
        // console.error("Product not found for the given ID:", id);
        return;
      }
      const payload = {
        _method: "PUT",
        name: productToUpdate.product_name,
        [fieldName]: fieldValue,
      };
      await axios.post(`${APIBASE}admin/update-product/${id}`, payload, {
        headers: {
          Accept: "application/json",
        },
      });
      // showFunctions();
      toast.success("Product updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      setShowFunctions();
    } catch (error) {
      // console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // Revert the changes in the local state to reflect the current state in the backend.
      setProductsData((prevData) =>
        prevData.map((product) =>
          product.id === id ? { ...product, [fieldName]: !fieldValue } : product
        )
      );
    }
  };

  //// eslint-disable-next-line no-unused-vars
  // Implement the onClick event for the pagination numbers

  const handleMenuOpen = (event, productId) => {
    setSelectedMenuItem((prevSelectedMenuItem) => ({
      ...prevSelectedMenuItem,
      [productId]: true,
    }));
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedMenuItem({});
    setAnchorEl(null);
  };

  // Define dynamic menu items
  const shippingOptions = [
    { value: "", label: "Select One" },
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

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

  // Fetch brand options from the API using Axios on component mount
  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-brand`)
      .then((response) => {
        setBrandOptions(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // console.error("Error fetching brands:", error);
      });
  }, []);

  // Update formData and selectedBrand when the user selects a brand from Autocomplete
  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    setFormData((prevData) => ({
      ...prevData,
      brand: newValue ? newValue?.name : "", // Set the brand in formData
    }));
    // console.log(newValue);
  };

  // Fetch category options from the API using Axios on component mount
  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-category`)
      .then((response) => {
        setCategoryOptions(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // console.error("Error fetching categories:", error);
      });
  }, []);

  // Update formData and categoryValue when the user selects a category from Autocomplete
  const handleCategoryChange = (event, newValue) => {
    setCategoryValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      category: newValue ? newValue?.name : "", // Set the category
    }));
  };

  // Fetch Units options from the API using Axios on component mount
  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-unit`)
      .then((response) => {
        setUnitOptions(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // console.error("Error fetching brands:", error);
      });
  }, []);

  const handleUnitChange = (event, newValue) => {
    setSelectedUnit(newValue);
    setFormData((prevData) => ({
      ...prevData,
      unit: newValue ? newValue?.name : "", // Set the unit_id in formData
    }));
    // console.log("Selected Unit:", newValue);
  };

  const [showFunctions, setShowFunctions] = useState(null);

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value || null);
  };

  const handleShowFunctions = (product) => {
    setShowFunctions(product.id);
    handleMenuClose();
    // console.log("myId", product);
    setCurrentRow(product);
    // console.log("current row", currentRow);
  };

  const handleDeleteProduct = async (productId) => {
    setAnchorEl(null);

    try {
      // Make the API call to delete the product
      handleMenuClose();
      await axios.delete(`${APIBASE}admin/products/${productId}`);

      // Update the local state to remove the deleted product
      setProductsData((prevData) =>
        prevData.filter((product) => product.id !== productId)
      );

      // Show the success toast message
      toast.success("Product deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      // Show the error toast message
      toast.error("Error deleting product. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const [formData, setFormData] = useState({
    today_deals: 0,
    status: true,
    is_gift: 0,
    is_home: 0,
  });

  useEffect(() => {
    const myObj = {};
    if (selectedBrand?.name) {
      myObj.brand = selectedBrand?.id;
    }
    if (categoryValue?.name) {
      myObj.category = categoryValue?.id;
    }
    if (selectedUnit?.name) {
      myObj.unit = selectedUnit?.id;
    }
    if (statusValue) {
      myObj.status = statusValue;
    }
    if (page) {
      myObj.page = page;
    }
    setSearchParam(myObj);
  }, [
    page,
    selectedBrand?.name,
    categoryValue?.name,
    selectedUnit?.name,
    statusValue,
  ]);

  //--
  const [isExcelLoading, setIsExcelLoading] = useState(false);

  const getAllProductsExcel = async () => {
    setIsExcelLoading(true);
    try {
      const res = await axios.get(
        `https://api.shopnmac.com/api/admin/get-excel-products`
      );

      handleExport(res.data);
      setIsExcelLoading(false);
    } catch (error) {
      toast.error("Error");
      setIsExcelLoading(false);
    }
  };

  const handleExport = (data) => {
    // console.log("data", data);
    const exportIt = data?.map((elem) => ({
      name: elem.product_name,
      brand: elem.brand ? elem.brand : "-",
      category: elem.category,
      unit: elem.unit ? elem.unit : "-",
      supplier: elem.supplier ? elem.supplier : "-",
      code: elem.product_code ? elem.product_code : "-",
      "bar code": elem.barcode ? elem.barcode : "-",
      rfid: elem.rfid ? elem.rfid : "-",
      floor: elem.floor ? elem.floor : "-",
      shelf: elem.shelf ? elem.shelf : "-",
      weight: elem.weight ? elem.weight : "-",
      sku: elem.sku ? elem.sku : "-",
      quantity: elem.quantity ? elem.quantity : "-",
      "expiry date": elem.expiry_date ? elem.expiry_date : "-",
      "cog price": elem.cog_price ? elem.cog_price : "-",
      "selling price": elem.selling_price ? elem.selling_price : "-",
    }));

    var wb = XLSX.utils.book_new();
    if (data.length > 0) {
      let ws = XLSX.utils.json_to_sheet(exportIt);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet");
      XLSX.writeFile(wb, "All Products.xlsx");
      toast.success("Exported successfully.");
    } else {
      alert("Please select some items.");
    }
  };

  const handleExportExcel = () => {
    getAllProductsExcel();
  };

  const [data, setData] = useState([]);

  const handleFileUpload = (files) => {
    const file = files.target.files;
    if (file[0] && file[0].name.endsWith(".csv")) {
      Papa.parse(file[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          // console.log(results.data);
          setData(results.data);
        },
      });
    } else if (file[0] && file[0].name.endsWith(".xlsx")) {
      // Parse Excel data using xlsx library
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

  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - List of Products
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
          <span>Import Products </span>
          {/* </Link> */}
        </InputLabel>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <div className="input-field">
              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={handleFileUpload}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className="adjust-button mt-0">
              <Button className="import-btn" variant="contained">
                Import
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
      <div>
        <div className="all-orders">
          <section className="card">
            <div className="filter-head">
              <Typography variant="h1">Filter</Typography>
            </div>

            {/* Title */}
            <div className="add-products-body">
              <div className="inpFifty">
                <Grid container spacing={4}>
                  <Grid item xs={12} md={3}>
                    <InputLabel>Brand :</InputLabel>
                    <FormControl fullWidth>
                      <Autocomplete
                        options={brandOptions}
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel>Category :</InputLabel>

                    <FormControl fullWidth>
                      <Autocomplete
                        options={categoryOptions}
                        value={categoryValue}
                        onChange={handleCategoryChange}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel>Unit :</InputLabel>
                    <FormControl fullWidth>
                      <Autocomplete
                        options={unitOptions}
                        value={selectedUnit}
                        onChange={handleUnitChange}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel>Status :</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="status"
                        name="status"
                        value={statusValue}
                        onChange={handleStatusChange}
                      >
                        {shippingOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <TextField
                        placeholder="Search by Product Name/Barcode"
                        onChange={(e) => handleInput(e)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </div>
          </section>
          {/* End Filter */}
          <br />
          <section className="orders-section">
            {/* Orders Start*/}
            <div className="order-head">
              <h3 className="card-title">All Products (Total:-{totalItems})</h3>

              {isExcelLoading ? (
                <>
                  <span style={{ color: "lightgray", paddingRight: "15px" }}>
                    Exporting...
                  </span>
                </>
              ) : (
                <Button variant="contained" onClick={handleExportExcel}>
                  Export All Products
                </Button>
              )}
            </div>
            <div className="orders-container">
              <div className="order-entries">
                <TableContainer>
                  {isLoading ? (
                    <Typography className="text-center">Loading...</Typography>
                  ) : (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>View Details</TableCell>
                          <TableCell>Photo</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Stock</TableCell>
                          <TableCell>Info</TableCell>
                          <TableCell>Sells/Rating</TableCell>
                          <TableCell>Variation</TableCell>
                          <TableCell>Supplier</TableCell>
                          <TableCell>Published</TableCell>
                          <TableCell>Stock Add</TableCell>
                          <TableCell>Qty</TableCell>
                          <TableCell>Expiry Date</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {showStockEditPopup && (
                          <AddEditStockPopup
                            getData={fetchData}
                            productId={selectedProductId}
                            onSave={(updatedProductData) => {
                              // Perform any necessary action with the updated product data
                              // console.log("Updated Product Data:",updatedProductData);
                              // Hide the popup
                              setShowStockEditPopup(false);
                            }}
                            onCancel={() => setShowStockEditPopup(false)}
                          />
                        )}
                        {showFunctions && (
                          <div className="popup">
                            <div className="card-header">
                              <div className="main-body2">
                                <h3 className="card-title">Functions</h3>
                                <div
                                  className="card"
                                  style={{
                                    backgroundColor: "#FFFFFF",
                                    alignItems: "flex-start",
                                  }}
                                  productId={selectedProductId}
                                >
                                  <div>
                                    {" "}
                                    <span style={{ marginRight: "4rem" }}>
                                      Today's deal
                                    </span>
                                    <FormControlLabel
                                      control={
                                        <IOSSwitch
                                          sx={{ m: 1 }}
                                          name="today_deals"
                                          checked={currentRow.today_deals === 1}
                                          onChange={(event) =>
                                            handleToggleChange(
                                              event,
                                              currentRow.id
                                            )
                                          }
                                        />
                                      }
                                    />
                                  </div>

                                  <div>
                                    {" "}
                                    <span style={{ marginRight: "6.4rem" }}>
                                      Popular
                                    </span>
                                    <FormControlLabel
                                      control={
                                        <IOSSwitch
                                          sx={{ m: 1 }}
                                          name="popular"
                                          checked={currentRow.popular === 1}
                                          onChange={(event) =>
                                            handleToggleChange(
                                              event,
                                              currentRow.id
                                            )
                                          }
                                        />
                                      }
                                    />
                                  </div>

                                  {/* <div>
                                  <span style={{ marginRight: "8.5rem" }}>
                                    Gift
                                  </span>

                                  <FormControlLabel
                                    control={
                                      <IOSSwitch
                                        sx={{ m: 1 }}
                                        name="is_gift"
                                        checked={currentRow.is_gift === 1}
                                        onChange={(event) =>
                                          handleToggleChange(
                                            event,
                                            currentRow.id
                                          )
                                        }
                                      />
                                    }
                                  />
                                </div> */}
                                  <div>
                                    {" "}
                                    <span style={{ marginRight: "6.2rem" }}>
                                      Is Home
                                    </span>
                                    <FormControlLabel
                                      control={
                                        <IOSSwitch
                                          sx={{ m: 1 }}
                                          name="is_home"
                                          checked={currentRow.is_home === 1}
                                          onChange={(event) =>
                                            handleToggleChange(
                                              event,
                                              currentRow.id
                                            )
                                          }
                                        />
                                      }
                                    />
                                  </div>
                                </div>
                                <hr />
                                <button
                                  onClick={() => setShowFunctions()}
                                  style={{ justifySelf: "center" }}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        {Array.isArray(productsData) ? (
                          productsData.map((product, index) => (
                            <React.Fragment key={index}>
                              <TableRow>
                                <TableCell>
                                  <IconButton
                                    onClick={() => handleRowClick(product.id)}
                                    variant="outlined"
                                    // size="small"
                                    style={{
                                      paddingLeft: "0.5rem",
                                      paddingRight: "0.5rem",
                                    }}
                                  >
                                    {expandedRow[product.id] ? (
                                      <FaAngleUp />
                                    ) : (
                                      <FaAngleDown />
                                    )}
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <div className="blog-img">
                                    {product?.thumbnail_compress ? (
                                      <img
                                        src={
                                          JSON.parse(product.thumbnail_compress)
                                            .image_urls["100px"]
                                        }
                                        alt="User"
                                      />
                                    ) : (
                                      <div className="default-user-image">
                                        <img
                                          src={`${IMAGEURL}${product?.thumbnail}`}
                                          alt="Default User"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div style={{ width: "150px" }}>
                                    <p>{product.product_name}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div style={{ width: "100px" }}>
                                    <b>Unit:</b> {product.unit?.name}
                                    <br />
                                    <b>Weight:</b> {product?.weight}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div style={{ width: "150px" }}>
                                    <b>COG Price:</b> ${product.cog_price}
                                    <br />
                                    <b>Sale Price:</b> ${product.selling_price}
                                  </div>
                                </TableCell>
                                <TableCell style={{ width: "120px" }}>
                                  <p>Num of Sale: {product?.quantity_used}</p>
                                  <div>
                                    Rating: {product?.star}{" "}
                                    <i style={{ color: "#F59012" }}>
                                      <AiFillStar />
                                    </i>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div style={{ width: "150px" }}>
                                    <b>Brand -</b> {product.brand?.name}
                                    <br />
                                    <b>Category -</b> {product.category?.name}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div>{product.supplier?.name}</div>
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  <FormControlLabel
                                    control={
                                      <IOSSwitch
                                        sx={{ m: 1 }}
                                        checked={
                                          product.status === true ? true : false
                                        }
                                        onChange={(event) =>
                                          handleToggleChange(event, product.id)
                                        }
                                        name="status"
                                      />
                                    }
                                  />
                                </TableCell>

                                <TableCell
                                  className="list-pro-stock-add"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    border: "none",
                                    paddingTop: "35px",
                                    // borderBottom: "1px solid #E0E0E0",
                                  }}
                                >
                                  <TextField
                                    placeholder="1"
                                    style={{
                                      maxWidth: "100%",
                                      // paddingTop: "2rem",
                                    }}
                                    id={`input${product.id}`}
                                    //  value={quantityToAdd}
                                    onChange={(e) =>
                                      setQuantityToAdd(e.target.value)
                                    }
                                  />
                                  <button
                                    style={{
                                      height: "2.5rem",
                                      width: "4rem",
                                      borderRadius: "5px",
                                      fontSize: "26px",
                                      marginLeft: "0.5rem",
                                      // marginTop: "2rem",
                                      outline: "none",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleAddQuantity(product)}
                                  >
                                    +
                                  </button>
                                </TableCell>

                                <TableCell>
                                  <div style={{ width: "60px" }}>
                                    {product?.quantity - product?.quantity_used}
                                    <br /> <br />
                                    Stock <br /> Out : {product.quantity}
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div>
                                    {product.expiry_date ? (
                                      <Moment format="MM/DD/YYYY">
                                        {product.expiry_date}
                                      </Moment>
                                    ) : (
                                      "-"
                                    )}

                                    <br />
                                    {product.expiry_date ? (
                                      <Moment format="h:mm A">
                                        {product.expiry_date}
                                      </Moment>
                                    ) : (
                                      "-"
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={(event) =>
                                      handleMenuOpen(event, product.id)
                                    }
                                    size="small"
                                  >
                                    <MoreVertOutlined />
                                  </IconButton>
                                  <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(selectedMenuItem[product.id])} // Check if the current menu item is selected
                                    onClose={handleMenuClose}
                                    className="no-border-shadow-menu"
                                  >
                                    <MenuItem
                                      component={Link}
                                      to={`/admin/ProductManager/Products/view-products/${product.id}`}
                                      onClose={handleMenuClose}
                                    >
                                      <VisibilityIcon sx={{ marginRight: 1 }} />
                                      View
                                    </MenuItem>
                                    <MenuItem
                                      component={Link}
                                      to={`/admin/ProductManager/Products/edit-products/${product.id}`}
                                    >
                                      <EditOutlined sx={{ marginRight: 1 }} />
                                      Edit
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                    >
                                      <DeleteOutlined sx={{ marginRight: 1 }} />
                                      Delete
                                    </MenuItem>

                                    <MenuItem
                                      onClick={() => {
                                        setSelectedProductId(product.id);
                                        handleMenuClose();
                                        setShowStockEditPopup(true);
                                      }}
                                    >
                                      <span
                                        style={{
                                          marginLeft: "0.2rem",
                                          marginRight: "1rem",
                                        }}
                                      >
                                        <FaCubes />
                                      </span>
                                      <span>Add & Edit Stock</span>
                                    </MenuItem>

                                    <MenuItem
                                    // onClick={handleMenuClose}
                                    >
                                      <Link
                                        to={`/admin/History/product-history/${product.id}`}
                                        style={{
                                          color: "black",
                                          textDecoration: "none",
                                        }}
                                      >
                                        <FormatListBulletedIcon
                                          sx={{ marginRight: 1 }}
                                        />
                                        Stock History
                                      </Link>
                                    </MenuItem>

                                    {/* <MenuItem
                                  // onClick={handleMenuClose}
                                  >
                                    <Link
                                      to={`/admin/History/product-history/${product.id}`}
                                      style={{
                                        color: "black",
                                        textDecoration: "none",
                                      }}
                                    >
                                      <FormatListBulletedIcon
                                        sx={{ marginRight: 1 }}
                                      />
                                      Stock Out
                                    </Link>
                                  </MenuItem> */}

                                    <MenuItem
                                      onClick={() =>
                                        handleShowFunctions(product)
                                      }
                                    >
                                      <ToggleOnIcon sx={{ marginRight: 1 }} />
                                      Functions
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
                                    in={expandedRow[product.id]}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <div className="accordian-body" id="order">
                                      <div variant="h4">
                                        <p
                                          style={{
                                            padding: "1rem",
                                            margin: "0",
                                          }}
                                        >
                                          Product Details
                                        </p>
                                      </div>
                                      <TableContainer>
                                        <Table>
                                          <TableHead className="orders-table-head-row">
                                            <TableRow className="info">
                                              <TableCell>
                                                Stock History
                                              </TableCell>
                                              <TableCell>Sort</TableCell>
                                              <TableCell>Item Code</TableCell>
                                              <TableCell>Unit</TableCell>
                                              <TableCell>Cog price</TableCell>
                                              <TableCell>Sale price</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell>
                                                <Link
                                                  to={`/admin/History/product-history/${product.id}`}
                                                >
                                                  Stock History
                                                </Link>
                                              </TableCell>
                                              <TableCell>
                                                <TextField placeholder="1" />
                                              </TableCell>

                                              <TableCell>
                                                {product.product_code}
                                              </TableCell>
                                              <TableCell>
                                                {product.unit?.name}
                                              </TableCell>
                                              <TableCell>
                                                ${product.cog_price}
                                              </TableCell>
                                              <TableCell>
                                                ${product.selling_price}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </div>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                        ) : (
                          <Typography>Loading products...</Typography>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </div>
            </div>
            {/* Orders End */}
            <Pagination
              count={Math.ceil(totalCount / 10)} // Assuming 15 items per page, adjust this as needed
              page={page}
              onChange={handlePageChange} // Handle page change events
              className="pagination-style"
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "right",
              }}
            />
          </section>
        </div>
        <br />
      </div>
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
              width: "90%",
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

export default ListOfProducts;
