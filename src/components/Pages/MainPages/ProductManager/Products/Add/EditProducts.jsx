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
import { useNavigate, useParams } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddBrand from "../Brand/AddBrands";
import AddSuppliers from "../Supplier/AddSuppliers";
import AddCategories from "../Categories/AddCategories";
import AddUnit from "../Unit/AddUnit";
import CancelIcon from "@mui/icons-material/Cancel";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

import axios from "axios";

const subcategoryOptions = [
  { value: "subcategory1", label: "Subcategory 1" },
  { value: "subcategory2", label: "Subcategory 2" },
  { value: "subcategory3", label: "Subcategory 3" },
  // Add more options as needed
];

const EditProducts = () => {
  const { id } = useParams();
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

  // const [fileData, setFileData] = useState({ thumbnail: null, images: null });
  const [fileData, setFileData] = useState({
    thumbnail: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const [productDescription, setProductDescription] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [pdfFile, setPdfFile] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [thumbnailFileDataUrl, setThumbnailFileDataUrl] = useState(null);
  // const [bannerFileDataUrl, setBannerFileDataUrl] = useState(null);
  const [videoThumbnailFileDataUrl, setVideoThumbnailFileDataUrl] =
    useState(null);
  const [galleryImageFileDataUrl, setGalleryFileDataUrl] = useState([]);
  const [metaImageFileDataUrl, setMetaImageFileDataUrl] = useState(null);
  const [pdfFileDataUrl, setPdfFileDataUrl] = useState(null);
  const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([]);

  const [editedProduct, setEditedProduct] = useState({
    brand_id: "",
    supplier_id: "",
    // manufacturer: "",
    category_id: "",
    sub_category_id: "",
    product_name: "",
    barcode: "",
    rfid: "",
    floor: "",
    shelf: "",
    refundable: 0,
    unit_id: "",
    weight: "",
    product_code: "",
    lot_number: "",
    quantity: "",
    expiry_date: "",
    cog_price: "",
    selling_price: "",
    thumbnail: "",
    images: [],
    product_video: "",
    meta_image: "",
    product_desc: "",
    other_desc: "",
    pdf_specification: "",
    low_stock: 1,
    website: 1,
    internal_sell: 1,
    not_for_sale: false,
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    // header:"",
    // footer:"",
    // meta_pixels: "",
  });

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${APIBASE}admin/get-product/${id}`);
      const dataFromBackend = response.data.data[0];
      // console.log(dataFromBackend);
      //console.log("single product to edit", response.data.data[0]);
      // Convert the category_id to the corresponding category object
      const selectedCategory = categoryOptions.find(
        (category) => category.id === dataFromBackend.category_id
      );

      const productData = response.data; // Assuming your API returns data in this format
      setProductDescription(productData.product_desc);
      setOtherDescription(productData.other_desc);

      // Update banner and thumbnail URLs with the base URL
      // src="https://api.shopnmac.com/upload/product/thumbnail/100/1693303784-test_product.png"
      if (dataFromBackend.thumbnail_compress) {
        // dataFromBackend.thumbnail = `${IMAGEURL}/upload/product/thumbnail/100/${dataFromBackend.thumbnail_compress}`;
        setThumbnailFileDataUrl(
          JSON.parse(dataFromBackend.thumbnail_compress).image_urls["100px"]
        );
      } else {
        setThumbnailFileDataUrl(`${IMAGEURL}/${dataFromBackend.thumbnail}`);
      }

      if (dataFromBackend.images) {
        //console.log(dataFromBackend.images);
        // dataFromBackend.images = `${IMAGEURL}${dataFromBackend.images}`;
        // setGalleryFileDataUrl(dataFromBackend.image);
      }

      // if (dataFromBackend.images) {
      //   //console.log("images array", dataFromBackend.images);
      //   dataFromBackend.images = `${IMAGEURL}/upload/product/thumbnail/100/${dataFromBackend.images}`;
      //   setThumbnailFileDataUrl(dataFromBackend.thumbnail_name);
      // } else {
      //   setThumbnailFileDataUrl(dataFromBackend.images);
      // }

      if (dataFromBackend.video_thambnail) {
        dataFromBackend.video_thambnail = `${IMAGEURL}${dataFromBackend.video_thambnail}`;
        setVideoThumbnailFileDataUrl(dataFromBackend.video_thambnail);
      }

      if (dataFromBackend.pdf_specification) {
        dataFromBackend.pdf_specification = `${IMAGEURL}${dataFromBackend.pdf_specification}`;
        setPdfFileDataUrl(dataFromBackend.pdf_specification);
      }

      if (dataFromBackend.meta_image) {
        dataFromBackend.meta_image = `${IMAGEURL}${dataFromBackend.meta_image}`;
        setMetaImageFileDataUrl(dataFromBackend.meta_image);
      }
      // console.log(metaImageFileDataUrl);

      if (dataFromBackend.product_desc) {
        setProductDescription(dataFromBackend.product_desc);
        //console.log(productDescription);
      }

      if (dataFromBackend.other_desc) {
        setOtherDescription(dataFromBackend.other_desc);
        //console.log(otherDescription);
      }

      setEditedProduct(dataFromBackend);
      setCategoryValue(selectedCategory); // Set the selected category
    } catch (error) {
      //console.error("Error fetching category data:", error);
    }
  };

  // console.log(thumbnailFileDataUrl);

  useEffect(() => {
    if (id) {
      fetchCategoryData();
      // console.log("in useEffect");
    }
  }, [id]);

  // Function to handle MULTIPLE file upload for gallery images

  const handleGalleryFileChange = (e) => {
    const files = e.target.files;
    const newImages = [...selectedImages];
    const newUrls = [...galleryImageFileDataUrl]; // Maintain existing image URLs for preview

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newImages.push(file);

      // Convert the file to a Data URL for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        newUrls.push(event.target.result);
        if (newUrls.length === newImages.length) {
          setGalleryFileDataUrl(newUrls);
        }
      };
      reader.readAsDataURL(file);
    }

    setEditedProduct((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
    setSelectedImages(newImages);
    //console.log(selectedImagesToRemove);
    //console.log(files);
  };

  // Function to remove a selected gallery image
  const handleRemoveGalleryImage = async (index) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);

    const updatedImages = [...editedProduct.images];
    const removedImage = updatedImages.splice(index, 1)[0]; // Get the removed image object
    const imageId = removedImage.id; // Extract the image ID

    setSelectedImages(updatedSelectedImages);
    setEditedProduct((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));

    setSelectedImagesToRemove((prevSelectedImagesToRemove) => [
      ...prevSelectedImagesToRemove,
      index,
    ]);
  };

  // Function to remove the thumbnail or banner image
  const handleRemoveImage = (setImageFileDataUrl) => {
    setImageFileDataUrl(null);
  };

  const handleRemoveExistingImage = async (id) => {
    // const updatedImages = [...editedProduct.images];
    // updatedImages.splice(index, 1);

    // setEditedProduct((prevData) => ({
    //   ...prevData,
    //   images: updatedImages,
    // }));
    try {
      // Send a DELETE request to remove the image from the server
      await axios.delete(`${APIBASE}admin/remove-product-image/${id}`);
      fetchCategoryData();
      // Display toast for successful image removal
      toast.success("Image removed successfully");
    } catch (error) {
      // Handle error and display toast for unsuccessful removal
      toast.error("Failed to remove image");
    }
  };

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

        // Find the previously selected brand in the options array
        const selectedBrand = response.data.data.find(
          (brand) => brand.id === editedProduct.brand_id
        );

        // Set the brandValue to display the previously selected brand
        setSelectedBrand(selectedBrand);
      })
      .catch((error) => {
        //console.error("Error fetching brands:", error);
      });
  }, [editedProduct.brand_id, modalOpen]); // Add editedProduct.brand_id as a dependency

  // Update formData and selectedBrand when the user selects a brand from Autocomplete
  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    setEditedProduct((prevData) => ({
      ...prevData,
      brand_id: newValue ? newValue.id : "", // Set the brand_id in formData
    }));
  };

  // Fetch category options from the API using Axios on component mount
  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-category`)
      .then((response) => {
        setCategoryOptions(response.data.data);

        // Find the previously selected category in the options array
        const selectedCategory = response.data.data.find(
          (category) => category.id === editedProduct.category_id
        );

        // Set the categoryValue to display the previously selected category
        setCategoryValue(selectedCategory);
      })
      .catch((error) => {
        //console.error("Error fetching categories:", error);
      });
  }, [editedProduct.category_id, modalOpen]); // Add editedProduct.category_id as a dependency

  // Update formData and categoryValue when the user selects a category from Autocomplete
  const handleCategoryChange = (event, newValue) => {
    setCategoryValue(newValue);
    setEditedProduct((prevData) => ({
      ...prevData,
      category_id: newValue ? newValue.id : "", // Set the category_id in formData
    }));
  };

  // Fetch supplier options from the API using Axios on component mount
  useEffect(() => {
    axios
      .get(`${APIBASE}admin/get-active-supplier`)
      .then((response) => {
        setSupplierOptions(response.data.data);

        // Find the previously selected supplier in the options array
        const selectedSupplier = response.data.data.find(
          (supplier) => supplier.id === editedProduct.supplier_id || null
        );

        // Set the supplierValue to display the previously selected supplier
        setSupplierValue(selectedSupplier);
      })
      .catch((error) => {
        //console.error("Error fetching suppliers:", error);
      });
  }, [editedProduct.supplier_id, modalOpen]); // Add editedProduct.supplier_id as a dependency

  // Update formData and csupplierValue when the user selects a supplier from Autocomplete
  const handleSupplierChange = (event, newValue) => {
    setSupplierValue(newValue);
    setEditedProduct((prevData) => ({
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

        // Find the previously selected unit in the options array
        const selectedUnit = response.data.data.find(
          (unit) => unit.id === editedProduct.unit_id
        );

        // Set the selectedUnit to display the previously selected unit
        setSelectedUnit(selectedUnit);
      })
      .catch((error) => {
        //console.error("Error fetching units:", error);
      });
  }, [editedProduct.unit_id, modalOpen]); // Add editedProduct.unit_id as a dependency

  // Update formData and selectedUnits when the user selects a unit from Autocomplete
  const handleUnitChange = (event, newValue) => {
    setSelectedUnit(newValue);
    setEditedProduct((prevData) => ({
      ...prevData,
      unit_id: newValue ? newValue.id : "", // Set the unit_id in formData
    }));
    //console.log(editedProduct);
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

  const handleFileUploadMeta = (event) => {
    const metaFile = event.target.files[0];
    // Perform the upload logic here
    //console.log(file);
    setFileData((prevState) => ({
      ...prevState,
      meta_image: metaFile,
    }));
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

  // Function to handle file upload for thumbnail image
  const handleThumbnailFileChange = (event) => {
    const thumbnailFile = event.target.files[0];
    setFileData((prevState) => ({
      ...prevState,
      thumbnail: thumbnailFile,
    }));
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
    //console.log("Product Description Data:", data);
    setProductDescription(data);
  };
  //console.log(handleProductDescriptionChange);

  // Function to handle editor change for other description
  const handleOtherDescriptionChange = (event, editor) => {
    const data = editor.getData();
    //console.log("Other Description Data:", data);
    setOtherDescription(data);
  };
  //console.log(handleOtherDescriptionChange);

  const handleSubmit = async () => {
    // Assuming you have the API endpoint URL to which you want to send the data
    // Prepare the data to send to the server
    const imagesToKeep = editedProduct.images.filter(
      (image, index) => !selectedImagesToRemove.includes(index)
    );

    const formDataToSend = new FormData();

    formDataToSend.append("_method", "PUT");
    if (selectedBrand?.id) {
      formDataToSend.append("brand_id", selectedBrand ? selectedBrand.id : "");
    }
    if (supplierValue?.id) {
      formDataToSend.append(
        "supplier_id",
        supplierValue ? supplierValue.id : ""
      );
    }
    if (categoryValue?.id) {
      formDataToSend.append(
        "category_id",
        categoryValue ? categoryValue.id : ""
      );
    }

    if (subcategoryValue?.value) {
      formDataToSend.append(
        "sub_category_id",
        subcategoryValue ? subcategoryValue.value : ""
      );
    }

    if (editedProduct?.product_name) {
      formDataToSend.append("product_name", editedProduct.product_name);
    }

    if (editedProduct?.barcode) {
      formDataToSend.append("barcode", editedProduct.barcode);
    }

    // formDataToSend.append("slug", editedProduct.product_name);
    if (editedProduct?.floor) {
      formDataToSend.append("floor", editedProduct.floor);
    }
    if (editedProduct?.shelf) {
      formDataToSend.append("shelf", editedProduct.shelf);
    }
    if (editedProduct?.refundable) {
      formDataToSend.append("refundable", editedProduct.refundable ? 1 : 0);
    }
    if (selectedUnit?.id) {
      formDataToSend.append("unit_id", selectedUnit ? selectedUnit.id : "");
    }
    if (editedProduct?.weight) {
      formDataToSend.append("weight", editedProduct.weight);
    }
    if (editedProduct?.product_code) {
      formDataToSend.append("product_code", editedProduct.product_code);
    }
    if (editedProduct?.lot_number) {
      formDataToSend.append("lot_number", editedProduct.lot_number);
    }

    if (editedProduct?.quantity) {
      formDataToSend.append("quantity", editedProduct.quantity);
    }
    if (editedProduct?.expiry_date) {
      formDataToSend.append("expiry_date", editedProduct.expiry_date);
    }
    if (editedProduct?.cog_price) {
      formDataToSend.append("cog_price", editedProduct.cog_price);
    }
    if (editedProduct?.selling_price) {
      formDataToSend.append("selling_price", editedProduct.selling_price);
    }
    if (editedProduct?.rfid) {
      formDataToSend.append("rfid", editedProduct.rfid);
    }

    if (fileData?.thumbnail) {
      formDataToSend.append("thumbnail", fileData.thumbnail);
    }

    // if (fileData?.images) {
    for (let i = 0; i < imagesToKeep.length; i++) {
      formDataToSend.append("images[]", imagesToKeep[i]);
      //console.log(imagesToKeep[i]);
    }
    // }

    // for (let i = 0; i < selectedImages.length; i++) {
    //   formDataToSend.append("images[]", selectedImages[i]);
    // }

    // Append the images that are to be kept to FormData
    // if (fileData?.banner) {
    formDataToSend.append("banner", fileData.banner);
    // }
    // if (fileData?.meta_image) {
    formDataToSend.append("meta_image", fileData.meta_image);
    // }

    if (productDescription) {
      formDataToSend.append("product_desc", productDescription);
    }
    if (otherDescription) {
      formDataToSend.append("other_desc", otherDescription);
    }
    if (pdfFile) {
      formDataToSend.append("pdf_specification", pdfFile);
    }
    // if (editedProduct?.low_stock) {
    formDataToSend.append("low_stock", editedProduct.low_stock ? 1 : 0);
    // }
    // if (editedProduct?.website) {
    formDataToSend.append("website", editedProduct.website ? 1 : 0);
    // }
    // if (editedProduct?.internal_sell) {
    formDataToSend.append("internal_sell", editedProduct.internal_sell ? 1 : 0);
    // }
    // if (editedProduct?.not_for_sale) {
    formDataToSend.append("not_for_sale", editedProduct.not_for_sale ? 1 : 0);
    // }
    if (editedProduct?.meta_title) {
      formDataToSend.append("meta_title", editedProduct.meta_title);
    }
    if (editedProduct?.meta_keyword) {
      formDataToSend.append("meta_keyword", editedProduct.meta_keyword);
    }
    if (editedProduct?.meta_description) {
      formDataToSend.append("meta_description", editedProduct.meta_description);
    }

    // formDataToSend.append("meta_pixels", formData.meta_pixels);

    // Send the data to the server using Axios POST request
    //console.log(formDataToSend);
    if (editedProduct.product_name && editedProduct.category_id) {
      try {
        await axios.post(`${APIBASE}admin/products/${id}`, formDataToSend, {
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
            Product Manger - Products - Edit Product
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
              <Grid item xs={12} md={6}>
                <InputLabel>Brand :</InputLabel>
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

              <Grid item xs={12} md={6}>
                <InputLabel>Supplier :</InputLabel>
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

              <Grid item xs={12} md={6}>
                <InputLabel>Category :</InputLabel>
                <div className="add-pop-flex">
                  <FormControl fullWidth>
                    <Autocomplete
                      // disabled
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

              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Product Name :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Product Name"
                    value={editedProduct.product_name || ""}
                    onChange={(event) =>
                      setEditedProduct((prevData) => ({
                        ...prevData,
                        product_name: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Barcode :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Enter Barcode"
                    value={editedProduct.barcode || ""}
                    onChange={(event) =>
                      setEditedProduct((prevData) => ({
                        ...prevData,
                        barcode: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="">RFID :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="RFID"
                    value={editedProduct.rfid || ""}
                    onChange={(event) =>
                      setEditedProduct((prevData) => ({
                        ...prevData,
                        rfid: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="">Floor :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Floor"
                    value={editedProduct.floor || ""}
                    onChange={(event) =>
                      setEditedProduct((prevData) => ({
                        ...prevData,
                        floor: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="">Shelf :</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Shalf"
                    value={editedProduct.shelf || ""}
                    onChange={(event) =>
                      setEditedProduct((prevData) => ({
                        ...prevData,
                        shelf: event.target.value,
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} className="ref-toggle">
                <FormControlLabel
                  label="Refundable:"
                  labelPlacement="start"
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={editedProduct.refundable === 1 ? true : false}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
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
                  <InputLabel>Unit :</InputLabel>
                  <div className="add-pop-flex">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={unitOptions}
                        value={selectedUnit}
                        onChange={handleUnitChange}
                        getOptionLabel={(option) => option.name}
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
                  <InputLabel htmlFor="">Weight :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Weight"
                      value={editedProduct.weight}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
                          ...prevData,
                          weight: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="">Item Code :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Item Code"
                      value={editedProduct.product_code}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
                          ...prevData,
                          product_code: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="">Lot Number :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Lot Number"
                      value={editedProduct.lot_number}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
                          ...prevData,
                          lot_number: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="quantity">Quantity:</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Enter quantity"
                      id="quantity"
                      type="number"
                      value={editedProduct.quantity}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
                          ...prevData,
                          quantity: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="date">Expiry Date:</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Select date"
                      id="date"
                      type="date"
                      value={editedProduct?.expiry_date?.split("T")[0]}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
                          ...prevData,
                          expiry_date: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="">COG Price :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="COG Price"
                      value={editedProduct.cog_price}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
                          ...prevData,
                          cog_price: event.target.value,
                        }))
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="">Selling Price :</InputLabel>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Selling Price"
                      value={editedProduct.selling_price}
                      onChange={(event) =>
                        setEditedProduct((prevData) => ({
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

          <div className="add-products-body">
            <div className="inp-meta" style={{ display: "block" }}>
              {/* Thumbnail */}
              <div className="input-field">
                <InputLabel>Thumbnail Image (Max 2MB size) :</InputLabel>
                <input
                  type="file"
                  onChange={(e) => handleThumbnailFileChange(e, "thumbnail")}
                />
                {thumbnailFileDataUrl ? (
                  <div className="uploaded-image-container">
                    <img
                      className="uploaded-image"
                      src={thumbnailFileDataUrl}
                      alt="Thumbnail"
                      height="60px"
                      width="60px"
                      style={{
                        border: "1px solid lightgray",
                        marginTop: "1rem",
                      }}
                      // margin="10px"
                    />
                    <IconButton
                      className="delete-icon"
                      onClick={() => handleRemoveImage(setThumbnailFileDataUrl)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                ) : (
                  <p>No thumbnail image</p>
                )}
              </div>
              <br />

              {/* Gallery */}
              {/* Gallery */}
              <div className="input-field" style={{ display: "block" }}>
                <InputLabel>
                  Gallery Images (Multiple) (Max 2MB size):
                </InputLabel>
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryFileChange}
                />
                <div className="uploaded-images-container">
                  {selectedImages.length > 0 && (
                    <div
                      className="uploaded-images-container"
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      {selectedImages.map((image, index) => (
                        <div key={index} className="uploaded-image-container">
                          <img
                            className="uploaded-image"
                            src={
                              typeof image === "string"
                                ? `${IMAGEURL}${image}`
                                : URL.createObjectURL(image)
                            }
                            alt={`GalleryImage${index}`}
                            height="60px"
                            width="60px"
                            style={{
                              border: "1px solid lightgray",
                              marginTop: "1rem",
                            }}
                          />
                          <IconButton
                            className="delete-button"
                            onClick={() =>
                              handleRemoveGalleryImage(
                                index,
                                editedProduct.images[index].id
                              )
                            }
                          >
                            <CancelIcon />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Display existing gallery images */}
                {Array.isArray(editedProduct.images) &&
                  editedProduct.images.length > 0 && (
                    <div
                      className="existing-images-container"
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      {editedProduct.images.map((galleryImage, index) => (
                        <div key={index} className="existing-image-container">
                          <img
                            className="existing-image"
                            src={`${IMAGEURL}${galleryImage.url}`}
                            alt={`Uploading Image${index + 1}`}
                            height="60px"
                            width="60px"
                            style={{
                              border: "1px solid lightgray",
                              fontSize: "10px",
                            }}
                          />
                          <IconButton
                            className="delete-button"
                            onClick={() =>
                              handleRemoveExistingImage(galleryImage.id)
                            }
                          >
                            <CancelIcon />
                          </IconButton>
                        </div>
                      ))}
                    </div>
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
                {videoThumbnailFileDataUrl ? (
                  <div className="uploaded-image-container">
                    <img
                      className="uploaded-image"
                      src={videoThumbnailFileDataUrl}
                      alt="VideoThumbnail"
                      height="80px"
                      width="80px"
                      margin="10px"
                    />
                    <IconButton
                      className="delete-icon"
                      onClick={() =>
                        handleRemoveImage(setVideoThumbnailFileDataUrl)
                      }
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                ) : (
                  <p>No Video Thumbnail Aavailable</p>
                )}
              </div>

              {/* Thumbnail */}
              <div className="input-field">
                <InputLabel>Video Link :</InputLabel>
                <TextField
                  value={editedProduct.product_video}
                  placeholder="Video Link"
                  onChange={(event) =>
                    setEditedProduct((prevData) => ({
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
                  data={productDescription || ""} // Use an empty string if productDescription is null or undefined
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setProductDescription(data);
                  }}
                  config={{
                    ckfinder: {
                      uploadUrl: "/your_upload_image_endpoint",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Other Description :</InputLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data={otherDescription || ""} // Use an empty string if productDescription is null or undefined
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setOtherDescription(data);
                  }}
                  config={{
                    ckfinder: {
                      uploadUrl: "/your_upload_image_endpoint",
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
              {pdfFileDataUrl ? (
                <div className="uploaded-image-container">
                  <img
                    className="uploaded-image"
                    src={pdfFileDataUrl}
                    alt="PDF"
                    height="80px"
                    width="80px"
                    margin="10px"
                  />
                  <IconButton
                    className="delete-icon"
                    onClick={() => handleRemoveImage(setPdfFileDataUrl)}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>
              ) : (
                <p>No file available</p>
              )}
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
                        checked={editedProduct.low_stock === 1 ? true : false}
                        onChange={(event) =>
                          setEditedProduct((prevData) => ({
                            ...prevData,
                            low_stock: event.target.checked ? 1 : "",
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
                        // value={editedProduct.website}
                        checked={editedProduct.website === 1 ? true : false}
                        onChange={(event) =>
                          setEditedProduct((prevData) => ({
                            ...prevData,
                            website: event.target.checked ? 1 : 0, // Set 1 if checked
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
                        // checked={editedProduct.internal_sell ? true : false}
                        checked={
                          editedProduct.internal_sell === 1 ? true : false
                        }
                        onChange={(event) =>
                          setEditedProduct((prevData) => ({
                            ...prevData,
                            internal_sell: event.target.checked ? 1 : 0, // Set 1 if checked
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
                        checked={editedProduct.not_for_sale}
                        onChange={(event) =>
                          setEditedProduct((prevData) => ({
                            ...prevData,
                            not_for_sale: event.target.checked ? true : false,
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
                  value={editedProduct.meta_title}
                  onChange={(event) =>
                    setEditedProduct((prevData) => ({
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
                  value={editedProduct.meta_keyword}
                  onChange={(event) =>
                    setEditedProduct((prevData) => ({
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
                  value={editedProduct.meta_description}
                  onChange={(event) =>
                    setEditedProduct((prevData) => ({
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
                  onChange={(e) => handleFileUploadMeta(e, "meta_image")}
                />
                {metaImageFileDataUrl ? (
                  <div className="uploaded-image-container">
                    <img
                      className="uploaded-image"
                      src={metaImageFileDataUrl}
                      alt="Banner"
                      height="60px"
                      width="60px"
                      margin="10px"
                    />
                    <IconButton
                      className="delete-icon"
                      onClick={() => handleRemoveImage(setMetaImageFileDataUrl)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                ) : (
                  <p>No meta image</p>
                )}
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

export default EditProducts;
