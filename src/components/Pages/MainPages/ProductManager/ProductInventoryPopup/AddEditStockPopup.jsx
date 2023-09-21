import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  TableContainer,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./AddEditStock.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";

const AddEditStockPopup = ({ productId, onSave, onCancel, getData }) => {
  const [productList, setProductList] = useState({
    product_name: "",
    low_stock: "",
    type: "",
    expiry_date: "",
    qty: 0,
    cog_price: "",
    selling_price: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [inputQuantity, setInputQuantity] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (productId) {
          const response = await axios.get(
            `${APIBASE}admin/products/${productId}`
          );

          if (response.status === 200) {
            const data = response.data.data;
            setProductList(data);
            setIsLoading(false);
          } else {
            //console.error("Error fetching product data");
          }
        }
      } catch (error) {
        //console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [productId]); // Include productId as dependency

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleIncrementQuantity = () => {
    setProductList((prevProductList) => ({
      ...prevProductList,
      qty: prevProductList.qty + 1,
    }));
    setInputQuantity((prevQuantity) => prevQuantity + 1); // Update inputQuantity using the previous value
  };

  const handleDecrementQuantity = () => {
    if (productList.qty > 0) {
      setProductList((prevProductList) => ({
        ...prevProductList,
        qty: prevProductList.qty - 1,
      }));
      setInputQuantity((prevQuantity) => prevQuantity - 1); // Update inputQuantity using the previous value
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductList({ ...productList, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${APIBASE}admin/inventories`, {
        product_id: productId,
        adjust_type: type,
        quantity: inputQuantity,
        expiry_date: productList.expiry_date?.split("T")[0],
        cog_price: productList.cog_price,
        selling_price: productList.selling_price,
      });

      if (response.status === 200) {
        onSave(productList);
        toast.success("Record saved successfully!"); // Show success toast
        getData();
      } else {
        //console.error("Error saving data to the backend");
        toast.error("Error saving data to the backend"); // Show error toast
      }
    } catch (error) {
      //console.error("Error saving data to the backend:", error);
      toast.error("Error saving data to the backend: " + error.message); // Show error toast with error message
    }
  };

  return (
    <div className="popup">
      <div className="popup-content3">
        <div className="filter-head">
          <Typography variant="h1">Add / Edit Stocks</Typography>
        </div>
        <div className="orders-container3">
          <div className="order-entries">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead className="orders-table-head-row">
                    <TableRow className="info">
                      <TableCell>Product Name</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Expiry Date</TableCell>
                      <TableCell style={{ width: "200px" }}>Qty</TableCell>
                      <TableCell>COG Price</TableCell>
                      <TableCell>Selling Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{productList.product_name}</TableCell>
                      <TableCell>{productList.quantity}</TableCell>
                      <TableCell>
                        <Select
                          value={type}
                          onChange={handleChange}
                          displayEmpty
                          style={{ zIndex: 9999, width: "150px" }}
                          MenuProps={{ style: { zIndex: 9999 } }}
                        >
                          <MenuItem value="" className="visible-above">
                            <p>Select Type</p>
                          </MenuItem>
                          <MenuItem value="increment" className="visible-above">
                            Increment
                          </MenuItem>
                          <MenuItem value="decrement" className="visible-above">
                            Decrement
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <TextField
                            placeholder="Select date"
                            id="date"
                            value={productList.expiry_date?.split("T")[0]}
                            type="date"
                            onChange={handleInputChange} // Handle expiry_date change
                            name="expiry_date"
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "200px",
                        }}
                      >
                        <IconButton onClick={handleDecrementQuantity}>
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          name="qty"
                          type="number"
                          value={inputQuantity} // Use inputQuantity here
                          style={{ width: "160px" }}
                          onChange={(e) =>
                            setInputQuantity(parseInt(e.target.value, 10))
                          } // Parse input to integer
                        />
                        <IconButton onClick={handleIncrementQuantity}>
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ width: "200px" }}>
                        <TextField
                          name="cog_price"
                          type="number"
                          value={productList.cog_price}
                          placeholder="COG Price"
                          onChange={handleInputChange}
                          // style={{ minWidth: "160px" }}
                        />
                      </TableCell>
                      <TableCell style={{ width: "200px" }}>
                        <TextField
                          name="selling_price"
                          type="number"
                          value={productList.selling_price}
                          placeholder="Selling Price"
                          onChange={handleInputChange}
                          // style={{ minWidth: "160px" }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <div className="add-edit-stocks-button">
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditStockPopup;
