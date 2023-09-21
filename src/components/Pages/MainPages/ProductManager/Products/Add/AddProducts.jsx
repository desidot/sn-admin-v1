import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Switch,
  Typography,
  FormControl,
  Modal,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { styled } from "@mui/material/styles";
import "./AddProducts.css";
import HomeIcon from "@mui/icons-material/Home";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddBrand from "../Brand/AddBrands";
import AddSuppliers from "../Supplier/AddSuppliers";
import AddCategories from "../Categories/AddCategories";
import AddUnit from "../Unit/AddUnit";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIBASE } from "../../../../../auth/apiConfig";

import axios from "axios";

const subcategoryOptions = [
  { value: "subcategory1", label: "Subcategory 1" },
  { value: "subcategory2", label: "Subcategory 2" },
  { value: "subcategory3", label: "Subcategory 3" },
  // Add more options as needed
];

const AddProducts = () => {
  const navigate = useNavigate();
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [unitOptions, setSetunitOptions] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [supplierValue, setSupplierValue] = useState(null);
  const [subcategoryValue, setSubcategoryValue] = useState(null);

  const [selectedUnit, setSelectedUnit] = useState(null);

  const [fileData, setFileData] = useState({ thumbnail: null, banner: null });
  const [selectedImages, setSelectedImages] = useState([]);

  const [productDescription, setProductDescription] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  // const [isLowStock, setIsLowStock] = useState(1); // Initialized with 1
  // const [isWebsiteAvailable, setIsWebsiteAvailable] = useState(1); //
  // const [isPOS, setIsPOS] = useState(1); // Initialized with 1
  // const [isNotForSale, setIsNotForSale] = useState(false);

  // const [supplierValue, setSupplierValue] = useState(supplierOptions[0]);
  // const [manufacturerValue, setManufacturerValue] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // const [imagePreviews, setImagePreviews] = useState([]);
  const [galleryImageFileDataUrls, setGalleryImageFileDataUrls] = useState([]);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  // Fetch brand options from the API using Axios on component mount
  useEffect(() => {
    axios

      .get(`${APIBASE}admin/get-active-brand`)
      .then((response) => {
        setBrandOptions(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        //console.error("Error fetching brands:", error);
      });
  }, [modalOpen]);

  // Update formData and selectedBrand when the user selects a brand from Autocomplete
  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    setFormData((prevData) => ({
      ...prevData,
      brand_id: newValue ? newValue.id : "", // Set the brand_id in formData
    }));
    //console.log(formData);
  };

  // Fetch category options from the API using Axios on component mount

  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-category`)
      .then((response) => {
        setCategoryOptions(response.data.data);
        //consolele.log(response.data.data);
      })
      .catch((error) => {
        //console.error("Error fetching categories:", error);
      });
  }, [modalOpen]);

  // Update formData and categoryValue when the user selects a category from Autocomplete
  const handleCategoryChange = (event, newValue) => {
    setCategoryValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      category_id: newValue ? newValue.id : "", // Set the category_id in formData
    }));
  };

  // Fetch category options from the API using Axios on component mount
  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-supplier`)
      .then((response) => {
        setSupplierOptions(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        //console.error("Error fetching suppliers:", error);
      });
  }, [modalOpen]);

  // Update formData and csupplierValue when the user selects a supplier from Autocomplete
  const handleSupplierChange = (event, newValue) => {
    setSupplierValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      supplier_id: newValue ? newValue.id : "", // Set the suppliers_id in formData
    }));
  };

  // Fetch Units options from the API using Axios on component mount
  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-unit`)
      .then((response) => {
        setSetunitOptions(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        //console.error("Error fetching brands:", error);
      });
  }, [modalOpen]);

  // Update formData and selectedUnits when the user selects a brand from Autocomplete
  const handleUnitChange = (event, newValue) => {
    setSelectedUnit(newValue);
    setFormData((prevData) => ({
      ...prevData,
      unit_id: newValue ? newValue.id : "", // Set the unit_id in formData
    }));
    //console.log(formData);
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const handleEditorChange = (event, editor) => {
  //   const data = editor.getData();
  //   //console.log(data);
  // };

  const handleFileUpload = (event) => {
    // eslint-disable-next-line no-unused-vars
    const file = event.target.files[0];
    // Perform the upload logic here
    //console.log(file);
  };

  // const handleFileUploadGallary = (event) => {
  //   const files = event.target.files;
  //   const uploadedImages = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     // Perform the upload logic here
  //     // You can use the 'file' object to upload the individual image

  //     // For example, you can create an object with image information and add it to the 'uploadedImages' array
  //     const imageInfo = {
  //       name: file.name,
  //       size: file.size,
  //       type: file.type,
  //     };
  //     uploadedImages.push(imageInfo);
  //   }

  //   //console.log(uploadedImages);
  // };

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

  // Function to handle file upload for thumbnail image
  const handleThumbnailFileChange = (event) => {
    const thumbnailFile = event.target.files[0];
    setFileData((prevState) => ({
      ...prevState,
      thumbnail: thumbnailFile,
    }));
  };

  // Function to handle file upload for gallery images
  const handleGalleryFileChange = (e) => {
    const files = e.target.files;
    const newImages = [...selectedImages]; // Clone the existing array

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newImages.push(file);
    }

    setSelectedImages(newImages);

    const newUrls = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        newUrls.push(event.target.result);
        if (newUrls.length === files.length) {
          setGalleryImageFileDataUrls((prevUrls) => [...prevUrls, ...newUrls]);
        }
      };
      reader.readAsDataURL(files[i]);
    }

    //console.log("newUrls", newUrls);
  };

  const handleRemoveImage = (index) => {
    const updatedUrls = [...galleryImageFileDataUrls];
    updatedUrls.splice(index, 1);
    setGalleryImageFileDataUrls(updatedUrls);
  };

  // Function to handle file upload for product video thumbnail image
  const handleFileUploadThumbnailVideo = (event) => {
    const file = event.target.files[0];
    setFileData((prevState) => ({
      ...prevState,
      banner: file,
    }));
  };

  // Function to handle file upload for PDF specification
  const handleFileUploadThumbnail = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  // Function to handle editor change for product description
  const handleProductDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setProductDescription(data);
  };

  // Function to handle editor change for other description
  const handleOtherDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setOtherDescription(data);
  };

  const [formData, setFormData] = useState({
    brand_id: null,
    supplier_id: null,
    // manufacturer: null,
    category_id: null,
    sub_category_id: null,
    product_name: null,
    barcode: null,
    rfid: null,
    floor: null,
    shelf: null,
    refundable: 1,
    unit_id: null,
    weight: null,
    product_code: null,
    lot_number: null,
    quantity: null,
    expiry_date: null,
    cog_price: null,
    selling_price: null,
    thumbnail: null,
    images: [],
    product_video: null,
    meta_image: null,
    product_desc: null,
    other_desc: null,
    pdf_specification: null,
    low_stock: 1,
    website: 1,
    internal_sell: 1,
    not_for_sale: 0,
    meta_title: null,
    meta_keyword: null,
    meta_description: null,
    // header:"",
    // footer:"",
    // meta_pixels: "",
  });

  const handleSubmit = async () => {
    // Assuming you have the API endpoint URL to which you want to send the data
    // const apiUrl = "https://api.shop.urips.co.in/api/admin/products";

    // Prepare the data to send to the server
    const formDataToSend = new FormData();
    if (selectedBrand?.id) {
      formDataToSend.append(
        "brand_id",
        selectedBrand ? selectedBrand.id : null
      );
    }
    if (supplierValue?.id) {
      formDataToSend.append(
        "supplier_id",
        supplierValue ? supplierValue.id : null
      );
    }

    if (categoryValue?.id) {
      formDataToSend.append(
        "category_id",
        categoryValue ? categoryValue.id : null
      );
    }
    // formDataToSend.append(
    //   "sub_category_id",
    //   subcategoryValue ? subcategoryValue.value : null
    // );
    if (formData?.product_name) {
      formDataToSend.append("product_name", formData.product_name);
    }
    if (formData?.barcode) {
      formDataToSend.append("barcode", formData.barcode);
    }

    if (formData?.product_name) {
      formDataToSend.append("slug", formData.product_name);
    }
    if (formData?.product_name) {
      formDataToSend.append("slug", formData.product_name);
    }
    if (formData?.floor) {
      formDataToSend.append("floor", formData.floor);
    }
    if (formData?.shelf) {
      formDataToSend.append("shelf", formData.shelf);
    }
    if (formData?.refundable) {
      formDataToSend.append("refundable", formData.refundable ? 1 : 0);
    }
    if (selectedUnit?.id) {
      formDataToSend.append("unit_id", selectedUnit ? selectedUnit.id : null);
    }
    if (formData?.weight) {
      formDataToSend.append("weight", formData.weight);
    }
    if (formData?.product_code) {
      formDataToSend.append("product_code", formData.product_code);
    }
    if (formData?.lot_number) {
      formDataToSend.append("lot_number", formData.lot_number);
    }
    if (formData?.lot_number) {
      formDataToSend.append("lot_number", formData.lot_number);
    }
    if (formData?.quantity) {
      formDataToSend.append("quantity", formData.quantity);
    }
    if (formData?.expiry_date) {
      formDataToSend.append("expiry_date", formData.expiry_date);
    }
    if (formData?.cog_price) {
      formDataToSend.append("cog_price", formData.cog_price);
    }
    if (formData?.selling_price) {
      formDataToSend.append("selling_price", formData.selling_price);
    }
    if (fileData?.thumbnail) {
      formDataToSend.append("thumbnail", fileData.thumbnail);
      for (let i = 0; i < selectedImages.length; i++) {
        formDataToSend.append("images[]", selectedImages[i]);
      }
    }

    // for (let i = 0; i < selectedImages.length; i++) {
    //   formDataToSend.append("images", selectedImages[i]);
    // }

    // formDataToSend.append("images[]", JSON.stringify(selectedImages));
    if (fileData?.banner) {
      formDataToSend.append("banner", fileData.banner);
    }
    if (fileData?.meta_image) {
      formDataToSend.append("meta_image", fileData.meta_image);
    }
    if (productDescription) {
      formDataToSend.append("product_desc", productDescription);
    }
    if (otherDescription) {
      formDataToSend.append("other_desc", otherDescription);
    }
    if (pdfFile) {
      formDataToSend.append("pdf_specification", pdfFile);
    }
    if (formData?.low_stock) {
      formDataToSend.append("low_stock", formData.low_stock);
    }
    if (formData?.website) {
      formDataToSend.append("website", formData.website);
    }
    if (formData?.internal_sell) {
      formDataToSend.append("internal_sell", formData.internal_sell);
    }

    if (formData?.not_for_sale) {
      formDataToSend.append("not_for_sale", formData.not_for_sale ? 1 : 0);
    }
    if (formData?.meta_title) {
      formDataToSend.append("meta_title", formData.meta_title);
    }
    if (formData?.meta_keyword) {
      formDataToSend.append("meta_keyword", formData.meta_keyword);
    }
    if (formData?.meta_description) {
      formDataToSend.append("meta_description", formData.meta_description);
    }
    if (formData?.rfid) {
      formDataToSend.append("rfid", formData.rfid);
    }

    // formDataToSend.append("meta_pixels", formData.meta_pixels);

    // Send the data to the server using Axios POST request
    //console.log(formDataToSend);
    if (formData.product_name && formData.category_id) {
      try {
        await axios.post(`${APIBASE}admin/products`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });

        toast.success("Product added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        navigate("/admin/ProductManager/Products/list-products");
      } catch (error) {
        //console.error("Error updating product:", error);
        toast.error("Failed to upload product. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          error,
        });
      }
    } else {
      toast.warn(
        "Make sure Category Name and Product Name should not be Empty.",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
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
            Product Manger - Products - Add Product
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
      <div className="add-products-main">
        <section className="filter-section">
          <div className="filter-head-products">
            <Typography variant="h1">Product Information</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <InputLabel>
                  Brand :
                  {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                </InputLabel>

                <div className="add-pop-flex">
                  <FormControl fullWidth>
                    <Autocomplete
                      options={brandOptions}
                      value={selectedBrand}
                      onChange={handleBrandChange}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    onClick={() => openModal(<AddBrand />)}
                    className="plus-buttons-add-pro"
                  >
                    <Button className="plus-btn-pro">+</Button>
                  </ButtonGroup>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <InputLabel>
                  Supplier :
                  {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                </InputLabel>
                <div className="add-pop-flex">
                  <FormControl fullWidth>
                    <Autocomplete
                      options={supplierOptions}
                      value={supplierValue}
                      onChange={handleSupplierChange}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    onClick={() => openModal(<AddSuppliers />)}
                    className="plus-buttons-add-pro"
                  >
                    <Button className="plus-btn-pro">+</Button>
                  </ButtonGroup>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <InputLabel>
                  Category :
                  <span style={{ color: "red", fontWeight: "800" }}>*</span>
                </InputLabel>
                <div className="add-pop-flex">
                  <FormControl fullWidth>
                    <Autocomplete
                      options={categoryOptions}
                      value={categoryValue}
                      onChange={handleCategoryChange}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    onClick={() => openModal(<AddCategories />)}
                    className="plus-buttons-add-pro"
                  >
                    <Button className="plus-btn-pro">+</Button>
                  </ButtonGroup>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <InputLabel>Subcategory :</InputLabel>
                <FormControl fullWidth>
                  <Autocomplete
                    options={subcategoryOptions}
                    value={subcategoryValue}
                    disabled
                    onChange={(event, newValue) =>
                      setSubcategoryValue(newValue)
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="product">
                  Product Name :
                  <span style={{ color: "red", fontWeight: "800" }}>*</span>
                </InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Product Name"
                    value={formData.product_name || ""}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        product_name: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="barcode">Barcode :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Barcode"
                    value={formData.barcode || ""}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        barcode: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="rfid">RFID :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="RFID"
                    value={formData.rfid || ""}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        rfid: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="floor">
                  Floor :
                  {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                </InputLabel>

                <FormControl fullWidth>
                  <TextField
                    type="number"
                    placeholder="Floor"
                    value={formData.floor || ""}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        floor: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="shelf">
                  Shelf :
                  {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                </InputLabel>

                <FormControl fullWidth>
                  <TextField
                    type="number"
                    placeholder="Shalf"
                    value={formData.shelf || ""}
                    onChange={(event) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        shelf: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} className="ref-toggle mt-2">
                <FormControlLabel
                  label="Refundable:"
                  labelPlacement="start"
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={formData.refundable ? true : false}
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          refundable: event.target.checked ? 1 : "",
                        }))
                      }
                    />
                  }
                />
              </Grid>
            </Grid>
          </div>
        </section>
        {/* Modal */}
        <Modal
          open={modalOpen}
          onClose={closeModal}
          style={{
            height: "auto",
            width: "auto",
            overflowY: "scroll",
            paddingBottom: "60px",
          }}
        >
          <div className="modal-wrapper">
            <div className="modal-content">
              <div className="close-button-modal">
                <h1 className="card-title">
                  {modalContent && modalContent.props.title}
                </h1>
                <IconButton onClick={closeModal}>
                  <CloseOutlinedIcon />
                </IconButton>
              </div>
              {modalContent}
            </div>
          </div>
        </Modal>
        <br />

        <section className="card">
          <div className="filter-head-products">
            <Typography variant="h1">Product price + stock</Typography>
          </div>

          {/* Title */}
          <div className="add-products-body">
            <div>
              <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                  <InputLabel>
                    Unit :
                    {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                  </InputLabel>
                  <div className="add-pop-flex">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={unitOptions}
                        value={selectedUnit}
                        onChange={handleUnitChange}
                        getOptionLabel={(option) => option?.name}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled elevation buttons"
                      onClick={() => openModal(<AddUnit />)}
                      className="plus-buttons-add-pro"
                    >
                      <Button className="plus-btn-pro">+</Button>
                    </ButtonGroup>
                  </div>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="weight">Weight :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Weight"
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          weight: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="itemcode">Item Code :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Item Code"
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          product_code: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="lotno">Lot Number :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Lot Number"
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          lot_number: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="quantity">
                    Quantity:
                    {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                  </InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Enter quantity"
                      id="quantity"
                      type="number"
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          quantity: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="date">
                    Expiry Date:
                    {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                  </InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Select date"
                      id="date"
                      type="date"
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          expiry_date: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="cog">
                    COG Price :
                    {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                  </InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="COG Price"
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          cog_price: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="selling">
                    Selling Price :
                    {/* <span style={{ color: "red", fontWeight: "800" }}>*</span> */}
                  </InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Selling Price"
                      onChange={(event) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          selling_price: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </div>
        </section>

        <br />

        <section className="card">
          <div className="filter-head-products">
            <Typography variant="h1">Product Images</Typography>
          </div>

          <div className="add-products-body" style={{ display: "block" }}>
            <div className="inp-meta">
              {/* Thumbnail */}
              <div className="input-field">
                <InputLabel>Thumbnail Image (Max 2MB size) :</InputLabel>
                <input
                  type="file"
                  onChange={(e) => handleThumbnailFileChange(e, "thumbnail")}
                />
              </div>

              {/* Gallery */}
              <div className="input-field">
                <InputLabel>
                  Gallery Image (Multiple) (Max 2MB size):
                </InputLabel>
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryFileChange}
                />
                {galleryImageFileDataUrls.length > 0 && (
                  <div
                    className="uploaded-images-container"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "10px",
                      borderRadius: "6px",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {galleryImageFileDataUrls.map((url, index) => (
                      <div
                        key={index}
                        className="uploaded-image-container"
                        style={{
                          border: "1px solid lightgray",
                          position: "relative",
                        }}
                      >
                        <img
                          className="uploaded-image"
                          src={url}
                          alt={`GalleryImage${index}`}
                          height="80px"
                          width="80px"
                          style={{ margin: "10px" }}
                        />
                        <button
                          style={{
                            position: "absolute",
                            right: "0px",
                            top: "0px",
                            cursor: "pointer",
                            height: "25px",
                            width: "25px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                            color: "white",
                            outline: "none",
                          }}
                          className="delete-button"
                          onClick={() => handleRemoveImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {galleryImageFileDataUrls.length === 0 && (
                  <p>No gallery images</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <br />

        <section className="card">
          <div className="filter-head-products">
            <Typography variant="h1">Product Video</Typography>
          </div>

          <div className="add-products-body">
            <div className="inp-meta">
              {/* Banner */}
              <div className="input-field">
                <InputLabel>Video Thumbnail Image (Max 2MB size) :</InputLabel>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUploadThumbnailVideo(e, "video_thumbnail")
                  }
                />
              </div>

              {/* Thumbnail */}
              <div className="input-field">
                <InputLabel>Video Link :</InputLabel>
                <TextField
                  placeholder="Video Link"
                  onChange={(event) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      product_video: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <br />

        <section className="card">
          <div className="filter-head-products">
            <Typography variant="h1">Description</Typography>
          </div>

          <div className="add-products-body">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel>Product Description :</InputLabel>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={handleProductDescriptionChange}
                  config={{
                    ckfinder: {
                      uploadUrl: "/your_upload_image_endpoint", // Replace with your image upload endpoint
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Other Description :</InputLabel>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={handleOtherDescriptionChange}
                  config={{
                    ckfinder: {
                      uploadUrl: "/your_upload_image_endpoint", // Replace with your image upload endpoint
                    },
                  }}
                />
              </Grid>
            </Grid>
            <div className="input-field">
              <InputLabel className="input-field-pdf">
                PDF Specification (Max 2MB size) :
              </InputLabel>
              <input type="file" onChange={handleFileUploadThumbnail} />
            </div>
          </div>
        </section>

        <br />

        <section className="card">
          <div className="filter-head-products">
            <Typography variant="h1">
              Low Stock Quantity / Estimate Shipping Time
            </Typography>
          </div>

          <div className="add-products-body">
            <div className="low-quantity">
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} className="ref-toggle">
                  <FormControlLabel
                    label="  Low Stock Quantity : "
                    labelPlacement="start"
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={formData?.low_stock ? true : false}
                        onChange={(event) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            low_stock: event?.target?.checked ? 1 : "", // Set 1 if checked
                          }))
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // onChange={handleCheckboxWebChange}
                        checked={formData.website ? true : false}
                        onChange={(event) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            website: event.target.checked ? 1 : "", // Set 1 if checked
                          }))
                        }
                      />
                    }
                    label="Website"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.internal_sell ? true : false}
                        onChange={(event) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            internal_sell: event.target.checked ? 1 : "", // Set 1 if checked
                          }))
                        }
                      />
                    }
                    label="POS"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.not_for_sale === 1 ? true : false}
                        onChange={(event) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            not_for_sale: event.target.checked ? 1 : "",
                          }))
                        }
                      />
                    }
                    label="Not for Sale"
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </section>

        <br />

        <section className="card">
          <div className="filter-head-products">
            <Typography variant="h1">SEO Meta Tags</Typography>
          </div>

          {/* Title */}
          <div className="add-products-body">
            <div className="inp-seo-meta3">
              {/* Meta Title */}
              <div className="input-field">
                <InputLabel>Meta Title :</InputLabel>
                <TextField
                  placeholder="Meta title"
                  onChange={(event) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      meta_title: event.target.value,
                    }))
                  }
                />
              </div>

              {/* Meta Keywords */}
              <div className="input-field">
                <InputLabel>Meta Keywords :</InputLabel>
                <TextField
                  placeholder="Meta keywords"
                  onChange={(event) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      meta_keyword: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="inp-seo-meta2">
              {/* Banner */}
              <div className="input-field">
                <InputLabel>Description :</InputLabel>
                <textarea
                  placeholder="Description"
                  onChange={(event) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      meta_description: event.target.value,
                    }))
                  }
                />
              </div>

              {/* Thumbnail */}
              <div className="input-field">
                <InputLabel>Meta Image (Max 2MB size) :</InputLabel>
                {/* <input type="file" onChange={handleFileUpload} /> */}
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, "meta_image")}
                />
              </div>
            </div>

            {/* Description */}

            {/* Meta Description */}
            {/* <div className="input-field">
              <InputLabel>Meta Pixels :</InputLabel>
              <textarea
                id="meta-description"
                rows="4"
                placeholder="Meta Pixels"
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    meta_pixels: event.target.value,
                  }))
                }
              ></textarea>
            </div>
            <br /> */}
            {/* Submit button */}
            <div className="add-product-save-btn">
              <Button
                onClick={handleSubmit}
                className="save-btn"
                variant="contained"
              >
                Save
              </Button>
            </div>
          </div>
        </section>
        <br />
      </div>
    </>
  );
};

export default AddProducts;

// import React, { useState } from "react";
// import {
//   TextField,
//   Select,
//   Button,
//   InputLabel,
//   MenuItem,
//   Grid,
//   // FormGroup,
//   Autocomplete,
//   FormControlLabel,
//   Checkbox,
//   Switch,
//   Typography,
//   FormControl,
//   Modal,
//   ButtonGroup,
//   IconButton,
// } from "@mui/material";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { styled } from "@mui/material/styles";
// import "./AddProducts.css";
// import HomeIcon from "@mui/icons-material/Home";

// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import AddBrand from "../Brand/AddBrands";
// import AddSuppliers from "../Supplier/AddSuppliers";
// import AddCategories from "../Categories/AddCategories";
// import AddUnit from "../Unit/AddUnit";
// import AddManufacturer from "../Manufacturer/Manufacturer";

// const categoryOptions = [
//   { value: "electronics", label: "Electronics" },
//   { value: "clothing", label: "Clothing" },
//   { value: "home", label: "Home" },
//   // Add more options as needed
// ];

// const brandOptions = [
//   { value: "brand1", label: "Brand 1" },
//   { value: "brand2", label: "Brand 2" },
//   { value: "brand3", label: "Brand 3" },
//   // Add more options as needed
// ];

// const supplierOptions = [
//   { value: "supplier1", label: "Supplier 1" },
//   { value: "supplier2", label: "Supplier 2" },
//   { value: "supplier3", label: "Supplier 3" },
//   // Add more options as needed
// ];

// const manufacturerOptions = [
//   { value: "manufacturer1", label: "Manufacturer 1" },
//   { value: "manufacturer2", label: "Manufacturer 2" },
//   { value: "manufacturer3", label: "Manufacturer 3" },
//   // Add more options as needed
// ];

// const subcategoryOptions = [
//   { value: "subcategory1", label: "Subcategory 1" },
//   { value: "subcategory2", label: "Subcategory 2" },
//   { value: "subcategory3", label: "Subcategory 3" },
//   // Add more options as needed
// ];

// // Define dynamic menu items
// const shippingOptions = [
//   { value: "Select", label: "Select One" },
//   { value: "all", label: "All" },
//   { value: "pending", label: "Pending Order" },
//   { value: "confirm", label: "Ready for Collection" },
//   { value: "collected", label: "Collected" },
//   { value: "pickedup", label: "Shipped" },
//   { value: "delivered", label: "Delivered Orders" },
// ];

// const AddProducts = () => {
//   const [brandValue, setBrandValue] = useState(brandOptions[0]);
//   const [supplierValue, setSupplierValue] = useState(supplierOptions[0]);
//   const [categoryValue, setCategoryValue] = useState(categoryOptions[0]);
//   const [subcategoryValue, setSubcategoryValue] = useState(
//     subcategoryOptions[0]
//   );
//   const [manufacturerValue, setManufacturerValue] = useState(
//     manufacturerOptions[0]
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState(null);

//   const handleGoBack = () => {
//     // Go back to the previous page in the history
//     window.history.go(-1);
//   };

//   const openModal = (content) => {
//     setModalContent(content);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     //console.log(data);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     // Perform the upload logic here
//     //console.log(file);
//   };

//   const handleFileUploadThumbnail = (event) => {
//     const file = event.target.files[0];
//     // Perform the upload logic here
//     // You can use the 'file' object to upload the thumbnail image

//     //console.log(file);
//   };

//   const handleFileUploadThumbnailVideo = (event) => {
//     const file = event.target.files[0];
//     // Perform the upload logic here
//     // You can use the 'file' object to upload the thumbnail image

//     //console.log(file);
//   };

//   const handleFileUploadGallary = (event) => {
//     const files = event.target.files;
//     const uploadedImages = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       // Perform the upload logic here
//       // You can use the 'file' object to upload the individual image

//       // For example, you can create an object with image information and add it to the 'uploadedImages' array
//       const imageInfo = {
//         name: file.name,
//         size: file.size,
//         type: file.type,
//       };
//       uploadedImages.push(imageInfo);
//     }

//     //console.log(uploadedImages);
//   };

//   const IOSSwitch = styled((props) => (
//     <Switch
//       focusVisibleClassName=".Mui-focusVisible"
//       disableRipple
//       {...props}
//     />
//   ))(({ theme }) => ({
//     width: 42,
//     height: 26,
//     padding: 0,
//     "& .MuiSwitch-switchBase": {
//       padding: 0,
//       margin: 2,
//       transitionDuration: "300ms",
//       "&.Mui-checked": {
//         transform: "translateX(16px)",
//         color: "#fff",
//         "& + .MuiSwitch-track": {
//           backgroundColor:
//             theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
//           opacity: 1,
//           border: 0,
//         },
//         "&.Mui-disabled + .MuiSwitch-track": {
//           opacity: 0.5,
//         },
//       },
//       "&.Mui-focusVisible .MuiSwitch-thumb": {
//         color: "#33cf4d",
//         border: "6px solid #fff",
//       },
//       "&.Mui-disabled .MuiSwitch-thumb": {
//         color:
//           theme.palette.mode === "light"
//             ? theme.palette.grey[100]
//             : theme.palette.grey[600],
//       },
//       "&.Mui-disabled + .MuiSwitch-track": {
//         opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
//       },
//     },
//     "& .MuiSwitch-thumb": {
//       boxSizing: "border-box",
//       width: 22,
//       height: 22,
//     },
//     "& .MuiSwitch-track": {
//       borderRadius: 26 / 2,
//       backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
//       opacity: 1,
//       transition: theme.transitions.create(["background-color"], {
//         duration: 500,
//       }),
//     },
//   }));

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div style={{ display: "flex" }}>
//           <i>
//             <HomeIcon /> {"-"}{" "}
//           </i>
//           <h6 style={{ margin: "5px" }}>
//           Product Manger - Products - Add Product
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
//       <div className="add-products-main">
//         <section className="filter-section">
//           <div className="filter-head-products">
//             <Typography variant="h1">Product Information</Typography>
//           </div>
//           <div className="filter-container">
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <InputLabel>Brand :</InputLabel>
//                 <div className="add-pop-flex">
//                   <FormControl fullWidth>
//                     <Autocomplete
//                       options={brandOptions}
//                       value={brandValue}
//                       onChange={(event, newValue) => setBrandValue(newValue)}
//                       renderInput={(params) => <TextField {...params} />}
//                     />
//                   </FormControl>
//                   <ButtonGroup
//                     disableElevation
//                     variant="contained"
//                     aria-label="Disabled elevation buttons"
//                     onClick={() => openModal(<AddBrand />)}
//                     className="plus-buttons-add-pro"
//                   >
//                     <Button className="plus-btn-pro">+</Button>
//                   </ButtonGroup>
//                 </div>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <InputLabel>Supplier :</InputLabel>
//                 <div className="add-pop-flex">
//                   <FormControl fullWidth>
//                     <Autocomplete
//                       options={supplierOptions}
//                       value={supplierValue}
//                       onChange={(event, newValue) => setSupplierValue(newValue)}
//                       renderInput={(params) => <TextField {...params} />}
//                     />
//                   </FormControl>
//                   <ButtonGroup
//                     disableElevation
//                     variant="contained"
//                     aria-label="Disabled elevation buttons"
//                     onClick={() => openModal(<AddSuppliers />)}
//                     className="plus-buttons-add-pro"
//                   >
//                     <Button className="plus-btn-pro">+</Button>
//                   </ButtonGroup>
//                 </div>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <InputLabel>Manufacturer :</InputLabel>
//                 <div className="add-pop-flex">
//                   <FormControl fullWidth>
//                     <Autocomplete
//                       options={manufacturerOptions}
//                       value={manufacturerValue}
//                       onChange={(event, newValue) =>
//                         setManufacturerValue(newValue)
//                       }
//                       renderInput={(params) => <TextField {...params} />}
//                     />
//                   </FormControl>
//                   <ButtonGroup
//                     disableElevation
//                     variant="contained"
//                     aria-label="Disabled elevation buttons"
//                     onClick={() => openModal(<AddManufacturer />)}
//                     className="plus-buttons-add-pro"
//                   >
//                     <Button className="plus-btn-pro">+</Button>
//                   </ButtonGroup>
//                 </div>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <InputLabel>Category :</InputLabel>
//                 <div className="add-pop-flex">
//                   <FormControl fullWidth>
//                     <Autocomplete
//                       options={categoryOptions}
//                       value={categoryValue}
//                       onChange={(event, newValue) => setCategoryValue(newValue)}
//                       renderInput={(params) => <TextField {...params} />}
//                     />
//                   </FormControl>
//                   <ButtonGroup
//                     disableElevation
//                     variant="contained"
//                     aria-label="Disabled elevation buttons"
//                     onClick={() => openModal(<AddCategories />)}
//                     className="plus-buttons-add-pro"
//                   >
//                     <Button className="plus-btn-pro">+</Button>
//                   </ButtonGroup>
//                 </div>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <InputLabel>Subcategory :</InputLabel>
//                 <FormControl fullWidth>
//                   <Autocomplete
//                     options={subcategoryOptions}
//                     value={subcategoryValue}
//                     onChange={(event, newValue) =>
//                       setSubcategoryValue(newValue)
//                     }
//                     renderInput={(params) => <TextField {...params} />}
//                   />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Product Name :</InputLabel>
//                 <FormControl fullWidth>
//                   <TextField placeholder="Enter Product Name" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Barcode :</InputLabel>
//                 <FormControl fullWidth>
//                   <TextField placeholder="Enter Barcode" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Floor :</InputLabel>
//                 <FormControl fullWidth>
//                   <TextField placeholder="Floor" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Shelf :</InputLabel>
//                 <FormControl fullWidth>
//                   <TextField placeholder="Shalf" />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6} className="ref-toggle">
//                 <FormControlLabel
//                   label="Refundable:"
//                   labelPlacement="start"
//                   control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
//                 />
//               </Grid>
//             </Grid>
//           </div>
//         </section>
//         {/* Modal */}
//         <Modal
//           open={modalOpen}
//           onClose={closeModal}
//           style={{ height: "auto", width: "auto" }}
//         >
//           <div className="modal-wrapper">
//             <div className="modal-content">
//               <div className="close-button-modal">
//                 <h1 className="card-title">
//                   {modalContent && modalContent.props.title}
//                 </h1>
//                 <IconButton onClick={closeModal}>
//                   <CloseOutlinedIcon />
//                 </IconButton>
//               </div>
//               {modalContent}
//             </div>
//           </div>
//         </Modal>
//         <br />

//         <section className="card">
//           <div className="filter-head-products">
//             <Typography variant="h1">Product price + stock</Typography>
//           </div>

//           {/* Title */}
//           <div className="add-products-body">
//             <div>
//               <Grid container spacing={4}>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel>Unit :</InputLabel>
//                   <div className="add-pop-flex">
//                     <FormControl fullWidth>
//                       <InputLabel htmlFor="shipping">Select unit</InputLabel>
//                       <Select
//                         id="shipping"
//                         name="shipping"
//                         value={brandValue}
//                         onChange={(e) => setBrandValue(e.target.value)}
//                       >
//                         {shippingOptions.map((option) => (
//                           <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                     <ButtonGroup
//                       disableElevation
//                       variant="contained"
//                       aria-label="Disabled elevation buttons"
//                       onClick={() => openModal(<AddUnit />)}
//                       className="plus-buttons-add-pro"
//                     >
//                       <Button className="plus-btn-pro">+</Button>
//                     </ButtonGroup>
//                   </div>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel htmlFor="">Weight :</InputLabel>
//                   <FormControl fullWidth>
//                     <TextField placeholder="Weight" />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel htmlFor="">Item Code :</InputLabel>
//                   <FormControl fullWidth>
//                     <TextField placeholder="Item Code" />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel htmlFor="">Lot Number :</InputLabel>
//                   <FormControl fullWidth>
//                     <TextField placeholder="Lot Number" />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel htmlFor="quantity">Quantity:</InputLabel>
//                   <FormControl fullWidth>
//                     <TextField
//                       placeholder="Enter quantity"
//                       id="quantity"
//                       type="number"
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel htmlFor="date">Expiry Date:</InputLabel>
//                   <FormControl fullWidth>
//                     <TextField
//                       placeholder="Select date"
//                       id="date"
//                       type="date"
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel htmlFor="">COG Price :</InputLabel>
//                   <FormControl fullWidth>
//                     <TextField placeholder="COG Price" />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <InputLabel htmlFor="">Selling Price :</InputLabel>
//                   <FormControl fullWidth>
//                     <TextField placeholder="Selling Price" />
//                   </FormControl>
//                 </Grid>
//               </Grid>
//             </div>
//           </div>
//         </section>

//         <br />

//         <section className="card">
//           <div className="filter-head-products">
//             <Typography variant="h1">Product Images</Typography>
//           </div>

//           <div className="add-products-body">
//             <div className="inp-meta">
//               {/* Banner */}
//               <div className="input-field">
//                 <InputLabel>Thumbnail Image (Max 2MB size) :</InputLabel>
//                 <input type="file" onChange={handleFileUploadThumbnail} />
//               </div>

//               {/* Thumbnail */}
//               <div className="input-field">
//                 <InputLabel>
//                   Gallary Image (Multiple) (Max 2MB size) :
//                 </InputLabel>
//                 <input type="file" onChange={handleFileUploadGallary} />
//               </div>
//             </div>
//           </div>
//         </section>

//         <br />

//         <section className="card">
//           <div className="filter-head-products">
//             <Typography variant="h1">Product Video</Typography>
//           </div>

//           <div className="add-products-body">
//             <div className="inp-meta">
//               {/* Banner */}
//               <div className="input-field">
//                 <InputLabel>Video Thumbnail Image (Max 2MB size) :</InputLabel>
//                 <input type="file" onChange={handleFileUploadThumbnailVideo} />
//               </div>

//               {/* Thumbnail */}
//               <div className="input-field">
//                 <InputLabel>Video Link :</InputLabel>
//                 <TextField placeholder="Video Link" />
//               </div>
//             </div>
//           </div>
//         </section>

//         <br />

//         <section className="card">
//           <div className="filter-head-products">
//             <Typography variant="h1">Description</Typography>
//           </div>

//           <div className="add-products-body">
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <InputLabel>Product Description :</InputLabel>
//                 <CKEditor
//                   editor={ClassicEditor}
//                   onChange={handleEditorChange}
//                   config={{
//                     ckfinder: {
//                       uploadUrl: "/your_upload_image_endpoint", // Replace with your image upload endpoint
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <InputLabel>Other Description :</InputLabel>
//                 <CKEditor
//                   editor={ClassicEditor}
//                   onChange={handleEditorChange}
//                   config={{
//                     ckfinder: {
//                       uploadUrl: "/your_upload_image_endpoint", // Replace with your image upload endpoint
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <div className="input-field">
//               <InputLabel className="input-field-pdf">
//                 PDF Specification (Max 2MB size) :
//               </InputLabel>
//               <input type="file" onChange={handleFileUploadThumbnail} />
//             </div>
//           </div>
//         </section>

//         <br />

//         <section className="card">
//           <div className="filter-head-products">
//             <Typography variant="h1">
//               Low Stock Quantity / Estimate Shipping Time
//             </Typography>
//           </div>

//           <div className="add-products-body">
//             <div className="low-quantity">
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={3} className="ref-toggle">
//                   <FormControlLabel
//                     label="  Low Stock Quantity : "
//                     labelPlacement="start"
//                     control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="Website"
//                     labelPlacement="end"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="POS"
//                     labelPlacement="end"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="Not for Sale"
//                     labelPlacement="end"
//                   />
//                 </Grid>
//               </Grid>
//             </div>
//           </div>
//         </section>

//         <br />

//         <section className="card">
//           <div className="filter-head-products">
//             <Typography variant="h1">SEO Meta Tags</Typography>
//           </div>

//           {/* Title */}
//           <div className="add-products-body">
//             <div className="inp-seo-meta3">
//               {/* Meta Title */}
//               <div className="input-field">
//                 <InputLabel>Meta Title :</InputLabel>
//                 <TextField placeholder="Meta title" />
//               </div>

//               {/* Meta Keywords */}
//               <div className="input-field">
//                 <InputLabel>Meta Keywords :</InputLabel>
//                 <TextField placeholder="Meta keywords" />
//               </div>
//             </div>

//             <div className="inp-seo-meta2">
//               {/* Banner */}
//               <div className="input-field">
//                 <InputLabel>Description :</InputLabel>
//                 <textarea placeholder="Description" />
//               </div>

//               {/* Thumbnail */}
//               <div className="input-field">
//                 <InputLabel>Meta Image (Max 2MB size) :</InputLabel>
//                 <input type="file" onChange={handleFileUpload} />
//               </div>
//             </div>

//             <div className="inp-seo-meta3">
//               {/* Meta Title */}
//               <div className="input-field">
//                 <InputLabel>Header :</InputLabel>
//                 <TextField placeholder="Meta Header" />
//               </div>

//               {/* Meta Keywords */}
//               <div className="input-field">
//                 <InputLabel>Footer :</InputLabel>
//                 <TextField placeholder="Meta Footer" />
//               </div>
//             </div>
//             {/* Description */}

//             {/* Meta Description */}
//             <div className="input-field">
//               <InputLabel>Meta Pixcels :</InputLabel>
//               <textarea
//                 id="meta-description"
//                 rows="4"
//                 placeholder="Meta Pixcels"
//               ></textarea>
//             </div>
//             <br />
//             {/* Submit button */}
//             <div className="add-product-save-btn">
//               <Button className="save-btn" variant="contained">
//                 Save
//               </Button>
//             </div>
//           </div>
//         </section>
//         <br />
//       </div>
//     </>
//   );
// };

// export default AddProducts;
