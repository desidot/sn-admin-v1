/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  Radio,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
} from "@mui/material";
// import { Search,  LocalShipping} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UilTimes, UilPlus } from "@iconscout/react-unicons";
import "./Pos.css";
// import SampleImage from "../../../../../assets/pos/test_product.png";
import PlusImage from "../../../../../assets/pos/plus-image.png";
import countries from "../../Countries/Countries";
import OrderSummaryPopup from "./OrderSummary";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressInStore,
  addAddress,
  addAgent,
  addCustomerAddress,
  addDiscount,
  addItem,
  addPickupAddress,
  changeCartType,
  changeDiscountType,
  getAllSubscriptionProducts,
  increaseQty,
  removeItem,
  selectCustomer,
  setBackedOrder,
  setInStoreInCart,
} from "../../../../../redux/cartSlice";
import { LocalShipping } from "@mui/icons-material";
import { toast } from "react-toastify";
import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
import { Link, useNavigate } from "react-router-dom";
//initialState for adding customer address
const initialState = {
  address: "",
  city: "",
  country: "",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  zipcode: "",
  middle_name: "",
  user_id: null,
  state: null,
  in_store: 0,
};
const PoS = () => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); //value for customer address
  const [cusAddress, setCusAddress] = useState([]); //state for saving  selected customer all addresses
  const [pickup, setPickup] = useState(false);
  const [newAdd, setNewAdd] = useState(initialState); //state for creating new address
  const [isLoading, setIsLoading] = useState(false);
  // const [itemCount, setItemCount] = useState(1);
  const [currentCustomers, setCurrentCustomers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [emptyFlag, setEmptyFlag] = useState(false);
  const [showNewCustomerForm, setNewShowCustomerForm] = useState(false);
  const [flag, setFlag] = useState(false);
  // new useStates
  const [searchResults, setSearchResults] = useState([]);
  const [subsDuration, setSubsDuration] = useState("");
  const [showCusDropdown, setShowCusDropdown] = useState(false);
  const [shipCharge, setShipCharge] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [pass, setPass] = useState("");
  const [allPickupPoints, setAllPickupPoints] = useState([]);
  const [billShip, setBillShip] = useState("");
  const [inStore, setInStore] = useState("");

  const [changeThisCusAddress, setChangeThisCusAddress] = useState({});

  const [allAgents, setAllAgents] = useState([]);
  //redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllSubscriptionProducts());
  }, []);

  // const handleAutoRadioChange = (event) => {
  //    setSelectedValue(event.target.value);

  //    if(event.target.value === 'in_store'){
  //     setSelectedValue('One Time Order')
  //    }
  // };

  // useEffect(() => {
  //   if (cusAddress.length === 0  ) {
  //     handleCloseCustomerForm();
  //     setNewShowCustomerForm(true);
  //   }
  // }, [cusAddress]);
  //fetching selected customer all addresses
  const fetchAddress = async (userId) => {
    try {
      const response = await axios.get(`${APIBASE}admin/get-address/${userId}`);
      setCusAddress(response?.data?.data);
      // todo
      // setShowCustomerForm(true);

      if (response?.data?.data?.length === 0) {
        // handleCloseCustomerForm();
        // setNewShowCustomerForm(true);
      }
    } catch (err) {
      //console.log("error is-", err);
    }
  };

  //fetch all agents
  useEffect(() => {
    const fetchAllAgents = async () => {
      try {
        const response = await axios.get(`${APIBASE}admin/get-active-agent`);
        setAllAgents(response?.data);
      } catch (err) {
        //console.log("error is-", err);
      }
    };
    fetchAllAgents();
  }, []);

  //fetching all searching products
  const fetchProducts = async (val) => {
    setIsLoading(true);
    const obj = JSON.parse(window.sessionStorage.getItem("persist:root"));

    const user = JSON.parse(obj.auth).user;

    const apiUrl = `${APIBASE}admin/product/search/${encodeURIComponent(val)}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${user._token}`,
        },
      });

      const products = response.data.data;
      if (products?.length === 1) {
        // If there's only one product in the search results, add it to the billing table directly
        handleClick(products[0]);
        setSearchResults(products);
        // //console.log(products)

        setIsLoading(false);
      } else if (products?.length > 1) {
        setSearchResults(products);

        setIsLoading(false);
      } else {
        setIsLoading(false);

        setSearchResults([]);
      }
      ////console.log(response.data.data);
    } catch (error) {
      //console.error("Error fetching products:", error);
      setIsLoading(false);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const getAllPickUpPointsAddresses = async () => {
      try {
        const res = await axios.get(`${APIBASE}admin/pickuppoints`);
        setAllPickupPoints(res.data.data);
      } catch (error) {
        //console.log(error);
      }
    };

    getAllPickUpPointsAddresses();
  }, []);

  useEffect(() => {
    const getShippingCharge = async () => {
      try {
        const res = await axios.get(
          `${APIBASE}admin/pos/calculate-shipping/${
            cart.shippingAddress?.city
          }/${+totalPrice}`
        );
        if (cart.shippingAddress?.first_name) {
          setShipCharge(res.data.shipping_rate);
        }
      } catch (error) {
        //console.log(error);
      }
    };
    if (cart.selectedCustomer?.first_name) {
      getShippingCharge();
    }
  }, [cart, cart.cartItems, cart.shippingAddress]);
  const token = useSelector((state) => state.auth.user._token);
  //fetching all searched customers
  const fetchCustomers = async (val) => {
    const apiUrl = `${APIBASE}admin/search-customer-details/${val}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentCustomers(response.data.data);
      setFlag(true);
      setShowCusDropdown(true);
    } catch (error) {
      //console.error("Error fetching customers:", error);
    }
  };
  //function for calculating total proce without discount
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cart?.cartItems?.forEach((product) => {
      const subsDisInfo = product.subscriptions?.filter(
        (elem) => elem.months == cart?.cartType?.duration?.split(" ")[0]
      )[0];

      let fPrice = 0;

      if (subsDisInfo?.discount) {
        if (subsDisInfo?.discount_type == "Percent") {
          // //console.log("fprice in p",fPrice)

          fPrice =
            +product.selling_price -
            +product.selling_price * (+subsDisInfo?.discount / 100);
        } else {
          fPrice = +product.selling_price - +subsDisInfo?.discount;
        }
      } else {
        fPrice = +product.selling_price;
      }

      const sellingPrice =
        cart.cartType.type == "Subscribe"
          ? +fPrice ?? 0
          : +product.discounted_price ?? 0;

      //  parseFloat(
      //   product.selling_price ? product.selling_price : 0
      // );
      const itemCount = parseInt(product.itemCount, 10); // Parse as an integer with base 10

      if (!isNaN(sellingPrice) && !isNaN(itemCount) && itemCount >= 1) {
        totalPrice += sellingPrice * itemCount;
      }
    });

    return totalPrice.toFixed(2); // Round the totalPrice to 2 decimal points
  };

  // State to hold the total price
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());

  //function to calculate discounted final amount
  const calculateDiscount = () => {
    let finalPrice = totalPrice;

    if (cart.discountType === "Fixed") {
      finalPrice = finalPrice - +cart.discount;
      setDiscountedAmount(finalPrice);
    } else if (cart.discountType === "Percentage(%)") {
      const discountAmount = (+cart.discount / 100) * totalPrice;
      finalPrice -= discountAmount;

      setDiscountedAmount(finalPrice.toFixed(2));
      //return finalPrice.toFixed(2)
    }

    // Update the discountedAmount state

    // return finalPrice.toFixed(3); // Round the finalPrice to 3 decimal points
  };

  useEffect(() => {
    calculateDiscount();
  }, [totalPrice, cart.discount, cart.discountType]);

  //function for setting discount type
  const handleDiscountTypeChange = (e) => {
    if (+cart.discount > 100 && e.target.value === "Percentage(%)") {
      dispatch(addDiscount({ discount: "0" }));
    } else {
      dispatch(changeDiscountType({ discountType: e.target.value }));
    }

    // Update the final price and discounted amount when discount type is changed
  };

  //function for handling discount value
  const handleDiscountChange = (e) => {
    if (+e.target.value <= totalPrice && cart.discountType === "Fixed") {
      dispatch(addDiscount({ discount: e.target.value }));
    } else if (
      cart.discountType === "Percentage(%)" &&
      +e.target.value <= 100
    ) {
      dispatch(addDiscount({ discount: e.target.value }));
    }

    // Update the final price and discounted amount when discount value is changed
  };

  // const handleInput = () => {
  //   // Perform the API call only if the searchQuery is not empty
  //   if (searchQuery.trim() !== "") {
  //     fetchProducts(searchQuery);
  //   } else {
  //     setSearchResults([]); // Clear searchResults when searchQuery is empty
  //   }
  // };

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
      fetchProducts(val);
      setEmptyFlag(true);
    } else {
      setEmptyFlag(false);
      setSearchResults([]); // Clear searchResults when searchQuery is empty
    }
    // Perform your logic here with the updated value
    // This function will be called after the specified delay (debounce time)
  };
  const handleInput = debounce(handleInputChange, 1000); // Specify the desired debounce delay in milliseconds (e.g., 300ms)
  // const getUnit = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `${APIBASE}admin/units/${id}`
  //     );
  //     return response.data.data;
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };
  const handleClick = (product) => {
    if (+product.selling_price > 0) {
      if (
        cart?.cartType?.type == "Subscribe" &&
        product?.subscriptions?.length > 0
      ) {
        if (product.itemCount) {
          const pro = {
            id: product.id,
            selling_price: product.selling_price,
            itemCount: product.itemCount,
            unit: product.unit,
            thumbnail: product.thumbnail,
            product_name: product.product_name,
            category: product.category,
            slug: product.slug,
            discounted_price: product.discounted_price,
            subscriptions: product.subscriptions,
            sku: product.sku,
            weight: product.weight,
            discount_value: product.discount_value,
          };
          dispatch(addItem({ product: pro }));
        } else {
          const pro = {
            id: product.id,
            selling_price: product.selling_price,
            unit: product.unit,
            thumbnail: product.thumbnail,
            product_name: product.product_name,
            category: product.category,
            slug: product.slug,
            discounted_price: product.discounted_price,
            subscriptions: product.subscriptions,
            sku: product.sku,
            weight: product.weight,
            discount_value: product.discount_value,
          };
          dispatch(addItem({ product: pro }));
        }
      } else if (cart?.cartType?.type == "One Time Order") {
        if (product.itemCount) {
          const pro = {
            id: product.id,
            selling_price: product.selling_price,
            itemCount: product.itemCount,
            unit: product.unit,
            thumbnail: product.thumbnail,
            product_name: product.product_name,
            category: product.category,
            slug: product.slug,
            discounted_price: product.discounted_price,
            subscriptions: product.subscriptions,
            sku: product.sku,
            weight: product.weight,
            discount_value: product.discount_value,
          };
          dispatch(addItem({ product: pro }));
        } else {
          const pro = {
            id: product.id,
            selling_price: product.selling_price,
            unit: product.unit,
            thumbnail: product.thumbnail,
            product_name: product.product_name,
            category: product.category,
            slug: product.slug,
            discounted_price: product.discounted_price,
            subscriptions: product.subscriptions,
            sku: product.sku,
            weight: product.weight,
            discount_value: product.discount_value,
          };
          dispatch(addItem({ product: pro }));
        }
      } else {
        toast.warn("This Product is not for subscription.", {
          position: "top-center",
        });
      }
    }

    // After updating billingTableProducts, we'll also update the total price
    // setTotalPrice(calculateTotalPrice());
  };
  const handleQuantityChange = (e, product) => {
    dispatch(increaseQty({ value: e.target.value, product: product }));
  };
  const [selectedOption] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  // Update the total price whenever billingTableProducts change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleDelete = (product) => {
    dispatch(removeItem(product.id));
    setTotalPrice(calculateTotalPrice());
    calculateDiscount();
  };

  // const handleSubscribeChange = (event) => {
  //   if (event.target.value === "Subscribe") {
  //     setShowPopup(true);
  //   } else if (event.target.value === "in_store") {
  //     setShowPopup(false); // Close the subscription popup if "In Store" is selected
  //     dispatch(changeCartType({ cartType: { type: "One Time Order" } }));
  //   } else {
  //     dispatch(changeCartType({ cartType: { type: event.target.value } }));
  //     setShowPopup(false);
  //   }
  // };

  const handleSubscribeChange = (event) => {
    if (event.target.value === "Subscribe") {
      setShowPopup(true);
    } else {
      dispatch(changeCartType({ cartType: { type: event.target.value } }));

      setShowPopup(false);
    }
  };

  const handleCustomerInputChange = (event) => {
    const val = event.target.value;

    if (val.trim() !== "" && val?.length >= 2) {
      fetchCustomers(val);
    } else {
      setFlag(false);
      setShowCusDropdown(false);
      setCurrentCustomers([]);
      setCusAddress([]);
      // Clear searchResults when searchQuery is empty
    }
    // Perform your logic here with the updated value
    // This function will be called after the specified delay (debounce time)
  };
  //cdcd
  const handleCustomerSearch = debounce(handleCustomerInputChange, 500);

  useEffect(() => {
    if (cart.selectedCustomer?.first_name) {
      document.getElementById("customerInput").value =
        cart.selectedCustomer?.first_name +
        " " +
        cart.selectedCustomer?.last_name;

      fetchAddress(cart.selectedCustomer?.id);
    }
  }, [cart]);
  useEffect(() => {
    if (document.getElementById("customerInput")?.value === "") {
      setCusAddress([]);
      dispatch(selectCustomer({}));
      dispatch(addAddress({ address: {} }));
      setShipCharge(0);
    }
  }, [document.getElementById("customerInput")?.value]);

  const handleCustomeClick = (cus) => {
    setNewAdd({ ...newAdd, user_id: cus.id });

    document.getElementById("customerInput").value =
      cus?.first_name + " " + cus?.last_name;
    fetchAddress(cus.id);
    dispatch(selectCustomer(cus));

    const {
      address,
      city,
      country,
      flat_apartment,
      home_phone,
      state,
      street,
      zipcode,
      phone,
    } = cus;
    const data = {};
    data.address = address;
    data.city = city;
    data.country = country;
    data.flat_apartment = flat_apartment;
    data.home_phone = home_phone;
    data.state = state;
    data.street = street;
    data.zip = zipcode;
    data.phone = phone;

    setCusAddress(data);
    setShowCusDropdown(false);
  };
  //
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    dispatch(setBackedOrder(e.target.checked));
  };
  const backedOrder = useSelector((state) => state.cart.backedOrder);

  const handleButtonClick = () => {
    //console.log(cart);
    if (
      !pickup &&
      cart.shippingAddress?.first_name == null &&
      cart.inStore == 0
    ) {
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (event, todo) => {
    if (todo == "pickup") {
      setPickup(true);
      setSelectedValue(event.target.value);
    } else if (todo == "inStore") {
      setPickup(false);
      setSelectedValue(event.target.value);
      setBillShip("");
    } else if (todo != "inStore" && todo != "pickup") {
      setSelectedValue(event.target.value);
      setPickup(false);
      setBillShip("");
    }
  };

  useEffect(() => {
    if (pickup) {
      setBillShip("");
    }
  }, [pickup]);

  useEffect(() => {
    if (billShip) {
      setPickup(false);
      setSelectedValue("");
    }
  }, [billShip]);
  useEffect(() => {
    if (cart.inStore) {
      setSelectedValue("in_store");
    }
  }, []);

  // /* eslint-disable react-hooks/exhaustive-deps */
  const handleOpenCustomerForm = () => {
    setShowCustomerForm(true);
  };

  // useEffect(()=>{
  //   dispatch(addAddress({address:cusAddress[selectedValue]}))
  // },[cusName])
  const handleCloseCustomerForm = (todo) => {
    if (pickup && todo !== "close") {
      dispatch(addAddress({ address: {} }));

      dispatch(setInStoreInCart({ value: 0 }));

      dispatch(
        addPickupAddress(
          allPickupPoints.filter(
            (elem) => elem.id == selectedValue?.split(" ")[0]
          )[0]
        )
      );

      setShowCustomerForm(false);
    } else if (
      cusAddress.length > 0 &&
      selectedValue &&
      !pickup &&
      todo !== "close" &&
      selectedValue !== "in_store"
    ) {
      const address = cusAddress.filter(
        (elem) => elem.id == selectedValue?.split(" ")[0]
      )[0];
      address.zip = address.zipcode;
      delete address.zipcode;
      dispatch(setInStoreInCart({ value: 0 }));
      dispatch(
        addAddress({
          address: address,
        })
      );

      setShowCustomerForm(false);
    } else if (selectedValue === "in_store" && todo !== "close") {
      dispatch(addAddress({ address: {} }));
      dispatch(setInStoreInCart({ value: 1 }));

      // const add = {
      //   address: cart.selectedCustomer?.address,
      //   city: cart.selectedCustomer?.city,
      //   country: cart.selectedCustomer?.country,
      //   email: cart.selectedCustomer?.email,
      //   first_name: cart.selectedCustomer?.first_name,
      //   last_name: cart.selectedCustomer?.last_name,
      //   flat_apartment: cart.selectedCustomer?.flat_apartment,
      //   phone: cart.selectedCustomer?.phone,
      //   state: cart.selectedCustomer?.state,
      //   street: cart.selectedCustomer?.street,
      //   zip: cart.selectedCustomer?.zipcode,
      //   in_store: 1,
      // };

      // dispatch(addAddressInStore({ address: add }));
      setShowCustomerForm(false);
    } else if (billShip && todo !== "close") {
      const add = {
        address: cart.selectedCustomer?.address,
        city: cart.selectedCustomer?.city,
        country: cart.selectedCustomer?.country,
        email: cart.selectedCustomer?.email,
        first_name: cart.selectedCustomer?.first_name,
        last_name: cart.selectedCustomer?.last_name,
        flat_apartment: cart.selectedCustomer?.flat_apartment,
        phone: cart.selectedCustomer?.phone,
        state: cart.selectedCustomer?.state,
        street: cart.selectedCustomer?.street,
        zip: cart.selectedCustomer?.zipcode,
      };
      dispatch(addAddress({ address: add }));
      setShowCustomerForm(false);
    } else if (todo == "close") {
      setShowCustomerForm(false);
    }
  };

  const handleSaveCusAddress = async () => {
    try {
      await axios.put(
        `${APIBASE}admin/user-addresses/${changeThisCusAddress.id}`,
        newAdd
      );
      toast.success("Address updated successfully.");
      setNewShowCustomerForm(false);
      fetchAddress(newAdd.user_id);
      setChangeThisCusAddress({});
    } catch (error) {
      setChangeThisCusAddress({});
      toast.error("Error in adding address!");
    }
  };

  const handleEditCustomerAddress = (currAdd) => {
    setChangeThisCusAddress(currAdd);

    setNewAdd({
      ...newAdd,
      address: currAdd.address ? currAdd.address : "",
      city: currAdd.city ? currAdd.city : "",
      country: currAdd.country ? currAdd.country : "",
      email: currAdd.email ? currAdd.email : "",
      first_name: currAdd.first_name ? currAdd.first_name : "",
      last_name: currAdd.last_name ? currAdd.last_name : "",
      phone: currAdd.phone ? currAdd.phone : "",
      zipcode: currAdd.zipcode ? currAdd.zipcode : "",
      middle_name: currAdd.middle_name ? currAdd.middle_name : "",
      state: null,
    });
    setNewShowCustomerForm(true);
  };

  const handleDeleteCustomerAddress = async (elem) => {
    try {
      await axios.delete(`${APIBASE}admin/user-addresses/${elem.id}`);
      toast.success("Address deleted successfully.");
      fetchAddress(cart?.selectedCustomer?.id);
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleOpenNewCustomerForm = () => {
    setNewAdd(initialState);
    setChangeThisCusAddress({});
    setNewShowCustomerForm(true);
  };

  const addCustomer = async (data) => {
    try {
      await axios.post(`${APIBASE}admin/users`, data);
      toast.success("Customer added successfully.");
    } catch (error) {
      //console.log("error is -", error);
      toast.error("Error!");
    }
  };

  const handleCloseNewCustomerForm = (todo) => {
    setChangeThisCusAddress({});

    if (currentCustomers.length == 0 && todo !== "close") {
      newAdd.password = pass;
      addCustomer(newAdd);
      setNewShowCustomerForm(false);
      setShowCustomerForm(false);
    } else if (todo !== "close") {
      newAdd.user_id = cart?.selectedCustomer?.id;
      dispatch(addCustomerAddress(newAdd)).then((res) =>
        fetchAddress(cart?.selectedCustomer?.id)
      );
      setNewShowCustomerForm(false);
      setShowCustomerForm(false);
    } else {
      setNewShowCustomerForm(false);
      setShowCustomerForm(false);
    }
  };

  const handleSubscribeSaveClick = () => {
    if (subsDuration) {
      dispatch(
        changeCartType({
          cartType: { type: "Subscribe", duration: subsDuration },
        })
      );
      setShowPopup(false);
    } else {
      toast.warn("Select Duration First.", { position: "top-center" });
    }
  };

  const pickUpChange = (e) => {
    setPickup(e.target.checked);
  };

  const handleBillChange = (e) => {
    setBillShip("sameAsBillAddress");
  };

  const handleBillChangeInStore = (e) => {
    setInStore("sameAsBillAddressInStore");
  };

  const handleProfileAddressUpdateClick = () => {
    dispatch(selectCustomer({}));
    dispatch(addAddress({ address: {} }));
    navigate(
      `/admin/People/GeneralCustomers/edit-customers/${cart?.selectedCustomer?.id}`
    );
  };

  const getOriginalPrice = (product) => {
    const subsDisInfo = product.subscriptions?.filter(
      (elem) => elem.months == cart?.cartType?.duration?.split(" ")[0]
    )[0];

    let fPrice = 0;

    if (cart.cartType.type == "Subscribe") {
      if (subsDisInfo?.discount_type == "Percent") {
        if (+subsDisInfo?.discount > 0) {
          fPrice =
            +product.selling_price -
            +product.selling_price * (+subsDisInfo?.discount / 100);
          //console.log("fprice 1", fPrice);
        } else {
          fPrice = +product.selling_price;
          //console.log("fprice 2", fPrice);
        }

        return fPrice.toFixed(2);
      } else {
        if (+subsDisInfo?.discount > 0) {
          fPrice = +product.selling_price - +subsDisInfo?.discount;
        } else {
          fPrice = +product.selling_price;
        }

        return fPrice.toFixed(2);
      }
    } else {
      fPrice = +product.discounted_price;

      return fPrice.toFixed(2);
    }
  };

  const handleAgentSelection = (e) => {
    dispatch(addAgent(e.target.value));
  };

  return (
    <>
      <div>
        <div>
          <div className="pos-main-container">
            <section className="product-search">
              <div className="search-container">
                <div className="search-cabin">
                  <div className="input-field" style={{ width: "100%" }}>
                    <TextField
                      placeholder="Search by product Name / Barcode"
                      id="searchInput"
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  {/* <Select
                    className="category-dropdown"
                    displayEmpty
                    value="All Categories"
                    renderValue={(value) => {
                      if (value === "All Categories") {
                        return <div>All Categories</div>;
                      }
                      return value;
                    }}
                  >
                    <MenuItem value="All Categories">All Categories</MenuItem>
                    {/* Add your category options here 
                  </Select> */}
                  {/* <Select
                    className="brand-dropdown"
                    displayEmpty
                    value="All Brands"
                    renderValue={(value) => {
                      if (value === "All Brands") {
                        return <div>All Brands</div>;
                      }
                      return value;
                    }}
                  >
                    <MenuItem value="All Brands">All Brands</MenuItem>
                    {/* Add your brand options here 
                  </Select> */}
                  {/* <IconButton onClick={handleInput}>
                    <Search className="search-icon" />
                  </IconButton> */}
                </div>

                {/* Image Card */}
                {/* Images Card End*/}
                {/* Image Section start */}
                {/* Image Card for Instock product*/}
                <section className="images-section">
                  {searchResults && !isLoading ? (
                    searchResults?.length !== 0 ? (
                      searchResults?.map((product) => (
                        <div className="image-card" key={product.id}>
                          <p className="in-stock">In Stock</p>
                          {/* <img
                            src={`${IMAGEURL}${product.thumbnail}`}
                            alt={product.product_name}
                            className="product-image"
                          /> */}

                          {product?.thumbnail_compress ? (
                            <img
                              src={
                                JSON.parse(product.thumbnail_compress)
                                  .image_urls["100px"]
                              }
                              alt={product.product_name}
                              className="product-image"
                            />
                          ) : (
                            <div className="product-image">
                              {product?.thumbnail_compress ? (
                                <img
                                  src={
                                    JSON.parse(product.thumbnail_compress)
                                      .image_urls["100px"]
                                  }
                                  alt="User"
                                />
                              ) : (
                                <img
                                  src={`${IMAGEURL}${product.thumbnail}`}
                                  alt="Default User"
                                />
                              )}
                            </div>
                          )}
                          <div
                            className="overlay"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={PlusImage}
                              alt="+"
                              className="plus-img"
                              onClick={() => handleClick(product)}
                            />
                          </div>
                          <h4 className="product-name">
                            {product.product_name}
                          </h4>
                          <span
                            className="price-span"
                            style={{
                              textDecorationLine:
                                product.discounted_price < product.selling_price
                                  ? "line-through"
                                  : "none",
                            }}
                          >
                            ${" "}
                            {product.selling_price ? product.selling_price : 0}
                          </span>
                          {product.discounted_price < product.selling_price && (
                            <span
                              className="price-span"
                              style={{ marginLeft: "15px" }}
                            >
                              ${product.discounted_price ?? 0}
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          fontSize: "18px",
                          color: "gray",
                          paddingTop: "20px",
                        }}
                      >
                        {emptyFlag &&
                          "There is no Item related to this Search!"}
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          color: "gray",
                          marginTop: "20px",
                        }}
                      >
                        Loading...
                      </div>
                    </div>
                  )}

                  {/* Image Card for Out of Stock product*/}
                  {/* dummy image cards Start*/}

                  {/* <div className="image-card">
                    <p className="out-of-stock">Out of stock</p>
                    <img
                      src={SampleImage}
                      alt="Product"
                      className="product-image"
                    />
                    <div className="overlay">
                      <img src={PlusImage} alt="+" className="plus-img" />
                    </div>
                    <h4 className="product-name">Product Name</h4>
                    {/* <del className="cancel-price">$50.000</del> 
                    <span className="price-span">$30.000</span>
                  </div> */}

                  {/* dummy image cards End*/}
                </section>

                {/* Load more */}
                {/* <div className="load-more">
                  <Button className="load-btn" variant="contained">
                    Load More
                  </Button>
                </div> */}

                {/* Load more end*/}
              </div>
            </section>

            {/* Image Section End */}
            <section className="product-billing">
              <div
                className="search-container"
                style={{ width: "100%", padding: "1rem" }}
              >
                <FormControl fullWidth>
                  <Select
                    id="agent"
                    name="agent"
                    value={cart.agent}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={(e) => handleAgentSelection(e)}
                  >
                    <MenuItem value="">Select Agent</MenuItem>
                    {allAgents?.map((row, index) => (
                      <MenuItem key={index} value={row.id}>
                        {row.name}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="search-container">
                <div className="search-cabin pt-0">
                  <div className="input-field" style={{ width: "100%" }}>
                    <input
                      className="form-control"
                      placeholder="Search by Name / Email / Phone"
                      onChange={(e) => handleCustomerSearch(e)}
                      id="customerInput"
                    />
                    {currentCustomers?.length > 0
                      ? flag &&
                        showCusDropdown && (
                          <div className="input-field-results">
                            {currentCustomers?.map((elem, index) => (
                              <div
                                key={index}
                                onClick={() => handleCustomeClick(elem)}
                              >
                                {elem?.first_name} {elem?.last_name} {"-"}{" "}
                                {elem?.phone}
                              </div>
                            ))}
                          </div>
                        )
                      : flag &&
                        showCusDropdown && (
                          <div className="input-field-0result">
                            <Link to="/admin/People/GeneralCustomers/add-customers">
                              {" "}
                              + Create New Customer
                            </Link>
                          </div>
                        )}
                  </div>

                  {cart?.selectedCustomer?.first_name && (
                    <LocalShipping
                      className="delivery-icon"
                      style={{ cursor: "pointer" }}
                      onClick={handleOpenCustomerForm}
                    />
                  )}
                </div>
              </div>

              <div className="billingtable-mastertable">
                {cart?.cartItems?.length > 0 ? (
                  <table className="billingtable">
                    <tbody>
                      {cart?.cartItems?.map((product, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid #dcdcdc" }}
                        >
                          <td style={{ width: "10%" }}>
                            <div className="input-group1">
                              <input
                                type="number"
                                step="1"
                                value={product.itemCount}
                                onChange={(e) =>
                                  handleQuantityChange(e, product)
                                }
                                name="quantity"
                                className="quantity-field text-center"
                                defaultValue={1}
                                min={1}
                              />
                            </div>
                          </td>
                          <td align="left">
                            <img
                              src={`${IMAGEURL}${product.thumbnail}`}
                              alt={product.name}
                              className="table-product-image"
                            />
                          </td>
                          <td style={{ width: "50%" }}>
                            <div className="pro-name">
                              {product.product_name}
                            </div>

                            {product.subscriptions?.length > 0 ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "12px",
                                  padding: "0 0.5rem",
                                }}
                              >
                                Available for subscription
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  padding: "0 0.5rem",
                                }}
                              >
                                Not for subscription
                              </span>
                            )}
                          </td>
                          <td style={{ width: "30%", padding: "1rem" }}>
                            <small>
                              ${getOriginalPrice(product)}x {product.itemCount}
                            </small>{" "}
                            =
                            <small className="pro-price">
                              ${getOriginalPrice(product) * product.itemCount}
                              {/* {cart?.cartType?.type === "Subscribe"
                                ? product.selling_price ?? 0
                                : product.discounted_price ??
                                  0 * product.itemCount} */}
                              {/* ${product.totalPrice ? product.totalPrice : 0} */}
                            </small>
                            <br />
                            {(product.subscriptions?.filter(
                              (elem) =>
                                elem.months ==
                                cart?.cartType?.duration?.split(" ")[0]
                            )[0]?.discount_type == "Percent" ||
                              product.subscriptions?.filter(
                                (elem) =>
                                  elem.months ==
                                  cart?.cartType?.duration?.split(" ")[0]
                              )[0]?.discount_type == "Fixed") &&
                              cart?.cartType?.type == "Subscribe" && (
                                <small>
                                  {"(- "}{" "}
                                  {product.subscriptions?.filter(
                                    (elem) =>
                                      elem.months ==
                                      cart?.cartType?.duration?.split(" ")[0]
                                  )[0]?.discount_type == "Percent"
                                    ? product.subscriptions?.filter(
                                        (elem) =>
                                          elem.months ==
                                          cart?.cartType?.duration?.split(
                                            " "
                                          )[0]
                                      )[0]?.discount + "%"
                                    : "$" +
                                      product.subscriptions?.filter(
                                        (elem) =>
                                          elem.months ==
                                          cart?.cartType?.duration?.split(
                                            " "
                                          )[0]
                                      )[0]?.discount}
                                  {")"}
                                </small>
                              )}
                          </td>
                          <td>
                            <IconButton
                              variant="round"
                              onClick={() => handleDelete(product)}
                            >
                              <DeleteIcon className="trash" />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="noItemsInCart">Empty !</div>
                )}
              </div>

              <div className="total-billing">
                <div
                  className="blc-info"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span>Sub Total</span>

                  <span>Shipping</span>
                  <span>Discount</span>
                </div>

                <div
                  className="blc"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span>$ {totalPrice.toLocaleString("en-IN")}</span>

                  <span>${pickup ? 0 : shipCharge}</span>
                  <span>
                    ${" "}
                    {(totalPrice - discountedAmount)
                      .toFixed(2)
                      .toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="total-discount">
                <div className="total-discount-head">
                  <h5>Total</h5>
                  <h5>
                    ${" "}
                    {(
                      +discountedAmount + (pickup ? 0 : +shipCharge)
                    ).toLocaleString("en-IN")}
                  </h5>
                </div>
                <div className="shipp-option">
                  <div
                    className="type-discount"
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    <div style={{ width: "100%" }}>
                      <label>Discount Type</label>
                      <br />
                      <select
                        className="d-form"
                        onChange={handleDiscountTypeChange}
                        value={cart.discountType}
                      >
                        <option value="Fixed">Fixed</option>
                        <option value="Percentage(%)">Percentage(%)</option>
                      </select>
                    </div>

                    <div className="">
                      <label>Discount</label>
                      <br />
                      <div>
                        <div className="">
                          <input
                            type="text"
                            className="d-form"
                            placeholder="Enter discount"
                            value={cart.discount}
                            onChange={handleDiscountChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="type-discount">
                    <RadioGroup
                      value={cart?.cartType?.type}
                      onChange={handleSubscribeChange}
                    >
                      {/* {selectedValue !== "in_store" && ( */}
                      <FormControlLabel
                        value="Subscribe"
                        control={<Radio />}
                        label="Subscribe"
                        disabled={
                          (cart?.cartItems.filter(
                            (elem) => elem.subscriptions?.length > 0
                          )?.length < cart?.cartItems?.length 
                          // && cart.inStore === 1) 
                          )
                          || selectedValue === "in_store"
                        }
                      />
                      {/* )} */}
                    </RadioGroup>
                    <RadioGroup
                      value={cart?.cartType?.type}
                      onChange={handleSubscribeChange}
                    >
                      <FormControlLabel
                        value="One Time Order"
                        control={<Radio />}
                        label="One Time Order"
                      />
                    </RadioGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={backedOrder}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Back Order"
                    />
                  </div>

                  <Dialog open={showPopup} style={{ height: "450px" }}>
                    <DialogTitle id="order-summ-head">
                      Subscribe & Save
                    </DialogTitle>
                    <DialogContent
                      className="months-popup"
                      style={{ padding: "1rem", height: "max-content" }}
                    >
                      {/* Label */}
                      <InputLabel>Delivery Every</InputLabel>

                      {/* Dropdown menu */}
                      <Select
                        style={{ width: "100%" }}
                        renderValue={(selected) => {
                          if (selected?.length === 0) {
                            return <span>Select Duration</span>;
                          }

                          return selected;
                        }}
                        value={subsDuration}
                        displayEmpty
                        onChange={(e) => setSubsDuration(e.target.value)}
                      >
                        {/* <MenuItem value="" disabled >Select Duration</MenuItem> */}
                        <MenuItem value={"1 month"}>1 month</MenuItem>
                        {/* <MenuItem value={"3 month"}>3 month</MenuItem> */}
                      </Select>
                      {/* <div style={{ width: "100%", paddingTop: "25px" }}>
                        <span>Monthly Auto-Deliveries Sold By Shopnmac</span>
                        <br />
                        <span>
                          <span style={{ fontWeight: "500" }}>Save 10%</span>{" "}
                          subscription discount with 1 month
                        </span>
                        <br />
                        {/* <span><span style={{fontWeight:"500"}}>Save 15%</span>subscription discount with 3 month</span> }
                      </div> */}
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => setShowPopup(false)}
                        color="primary"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => handleSubscribeSaveClick()}
                        id="subscribe-save"
                      >
                        Subscribe & Save
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <div className="submit-order">
                    <Button
                      variant="contained"
                      onClick={handleButtonClick}
                      className="place-order-btn"
                      disabled={
                        cart.cartItems?.length === 0 ||
                        (pickup === false &&
                          !cart.shippingAddress?.first_name &&
                          cart.inStore === 0) ||
                        !cart.cartType.type ||
                        (cart?.cartType?.type === "Subscribe" &&
                          cart?.cartItems.filter(
                            (elem) => elem.subscriptions?.length > 0
                          )?.length < cart?.cartItems?.length) ||
                        (cart?.cartType?.type === "Subscribe" &&
                          selectedValue === "in_store")
                      }
                    >
                      Place Order
                    </Button>
                  </div>

                  <Dialog
                    open={isPopupOpen}
                    onClose={handleClosePopup}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogTitle id="order-summ-head">
                      <InputLabel>Order Summary </InputLabel>

                      <CloseOutlinedIcon
                        onClick={handleClosePopup}
                        style={{ cursor: "pointer" }}
                      />
                    </DialogTitle>
                    <DialogContent style={{ padding: "1rem" }}>
                      <OrderSummaryPopup
                        selectedOption={selectedOption}
                        isChecked={isChecked}
                        onClose={handleClosePopup}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/*Select shipping Address form */}
        {showCustomerForm && (
          <div className="freeze-backdrop">
            <div className="customer-form" style={{ width: "60%", top: "50%" }}>
              <div className="shipping-address-head">
                <h2>Shipping Address</h2>
                <i onClick={() => handleCloseCustomerForm("close")}>
                  <UilTimes />
                </i>
              </div>

              {/* <div
                style={{
                  width: "99%",
                  height: "max-content",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={pickup}
                  onChange={(e) => pickUpChange(e)}
                />
                <label style={{ marginLeft: "10px" }}>
                  Pick up your order from our pickup store.
                </label>
              </div> */}
              <div
                className="scroll-container"
                style={{
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                  paddingBottom: "15px",
                  overflowY: "scroll",
                }}
              >
                <span style={{ fontSize: "24px", fontWeight: "500" }}>
                  Your Addresses
                </span>
                <section className="address-details">
                  <div
                    style={{
                      padding: "0 1rem",
                      display: "flex",
                    }}
                  >
                    {/* <input
                      type="checkbox"
                      checked={billShip}
                      onChange={(e) => setBillShip(e.target.checked)}
                    /> */}
                    <Radio
                      checked={billShip === "sameAsBillAddress"}
                      onChange={(e) => handleBillChange(e)}
                      value={billShip}
                      inputProps={{ "aria-label": "A" }}
                    />
                  </div>
                  <div></div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontWeight: "500", fontSize: "20px" }}>
                      {cart?.selectedCustomer?.first_name}{" "}
                      {cart?.selectedCustomer?.last_name}
                      {cart?.selectedCustomer?.address
                        ? ", " + cart?.selectedCustomer?.address
                        : " "}
                      {cart?.selectedCustomer?.street
                        ? ", " + cart?.selectedCustomer?.street
                        : " "}
                      {cart?.selectedCustomer?.flat_apartment
                        ? ", " + cart?.selectedCustomer?.flat_apartment
                        : " "}{" "}
                      {cart?.selectedCustomer?.zipcode
                        ? ", " + cart?.selectedCustomer?.zipcode
                        : " "}{" "}
                      {cart?.selectedCustomer?.city
                        ? ", " + cart?.selectedCustomer?.city
                        : " "}
                      {cart?.selectedCustomer?.state
                        ? ", " + cart?.selectedCustomer?.state
                        : " "}{" "}
                      {cart?.selectedCustomer?.country
                        ? ", " + cart?.selectedCustomer?.country
                        : " "}{" "}
                      <span className="bold-para" style={{ fontSize: "20px" }}>
                        , Phone :{" "}
                      </span>
                      <span>{cart?.selectedCustomer?.phone}</span>{" "}
                      <span
                        style={{
                          marginLeft: "6px",
                          fontWeight: "500",
                          fontSize: "18px",
                          color: "#007BFF",
                          cursor: "pointer",
                        }}
                        onClick={() => handleProfileAddressUpdateClick()}
                      >
                        {" "}
                        <span>Edit address</span>
                      </span>
                    </span>
                  </div>
                </section>

                {/* In store */}
                <span style={{ fontSize: "24px", fontWeight: "500" }}>
                  In Store
                </span>
                <section className="address-details">
                  <div
                    style={{
                      padding: "0 1rem",
                      display: "flex",
                    }}
                  >
                    <Radio
                      checked={selectedValue === "in_store"}
                      onChange={(event) => handleChange(event, "inStore")}
                      value="in_store"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </div>
                  <div></div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontWeight: "500", fontSize: "20px" }}>
                      In Store
                    </span>
                  </div>
                </section>
                {/* In store end */}
                {cusAddress?.length > 0 &&
                  cusAddress?.map((elem, index) => (
                    <section key={index} className="address-details">
                      <div
                        style={{
                          padding: "0 1rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Radio
                          checked={selectedValue === `${elem.id} shipp`}
                          onChange={(event) => handleChange(event, "shipp")}
                          value={`${elem.id} shipp`}
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </div>
                      <div></div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontWeight: "500", fontSize: "20px" }}>
                          {elem?.first_name} {elem?.last_name}
                          {elem?.address ? ", " + elem?.address : " "}
                          {elem?.street ? ", " + elem?.street : " "}
                          {elem?.flat_apartment
                            ? ", " + elem?.flat_apartment
                            : " "}{" "}
                          {elem?.zipcode ? ", " + elem?.zipcode : " "}{" "}
                          {elem?.city ? ", " + elem?.city : " "}
                          {elem?.state ? ", " + elem?.state : " "}{" "}
                          {elem?.country ? ", " + elem?.country : " "}{" "}
                          <span
                            className="bold-para"
                            style={{ fontSize: "20px" }}
                          >
                            , Phone :{" "}
                          </span>
                          <span>{elem?.phone}</span>
                          <span
                            style={{
                              marginLeft: "6px",
                              fontWeight: "500",
                              fontSize: "18px",
                              color: "#007BFF",
                              cursor: "pointer",
                            }}
                            onClick={() => handleEditCustomerAddress(elem)}
                          >
                            Edit address
                          </span>{" "}
                          <span
                            style={{
                              marginLeft: "6px",
                              fontWeight: "500",
                              fontSize: "18px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteCustomerAddress(elem)}
                          >
                            Remove address
                          </span>
                        </span>
                      </div>
                    </section>
                  ))}
                <span style={{ fontSize: "24px", fontWeight: "500" }}>
                  Your Pickup Locations
                </span>
                {allPickupPoints?.map((row, index) => (
                  <section className="address-details" key={index}>
                    <div
                      style={{
                        padding: "0 1rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Radio
                        checked={selectedValue === `${row.id} pickup`}
                        onChange={(event) => handleChange(event, "pickup")}
                        value={`${row.id} pickup`}
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </div>
                    <div></div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: "20px" }}>
                        {row?.name} {", " + row?.location}{" "}
                        <span style={{ fontSize: "20px", fontWeight: "500" }}>
                          {", " + row?.phone}{" "}
                        </span>
                      </span>
                    </div>
                  </section>
                ))}
              </div>
              <br />
              <br />
              <div
                className="add-new-address"
                onClick={handleOpenNewCustomerForm}
                style={{ cursor: "pointer" }}
              >
                <i>
                  <UilPlus />
                </i>
                Add New Shipping Address
              </div>
              <br />
              <div className="close-confirm">
                <Button
                  variant="contained"
                  onClick={() => handleCloseCustomerForm("close")}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleCloseCustomerForm("confirm")}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
        {showNewCustomerForm && (
          <div className="freeze-backdrop">
            <div className="customer-form">
              <div className="shipping-address-head">
                {/* <p>Sorry customer does not exist.</p> */}
                <h2>
                  {" "}
                  {currentCustomers.length == 0
                    ? "Add New Customer"
                    : "Add New Shipping Address"}
                </h2>
                <i onClick={() => handleCloseNewCustomerForm("close")}>
                  <UilTimes />
                </i>
              </div>
              <div className="customer-details-form">
                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="first_name">
                      First Name:<span className="text-danger">*</span>
                    </label>
                    <div className="form-input">
                      <input
                        type="text"
                        placeholder="First Name"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                        required=""
                        value={newAdd.first_name}
                        onChange={(e) =>
                          setNewAdd({ ...newAdd, first_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="lastname">
                      Middle Name:
                    </label>
                    <div className="form-input">
                      <input
                        type="text"
                        placeholder="Middle Name"
                        id="lastname"
                        name="lastname"
                        className="form-control"
                        required=""
                        value={newAdd.middle_name}
                        onChange={(e) =>
                          setNewAdd({ ...newAdd, middle_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="lastname">
                      Last Name:<span className="text-danger">*</span>
                    </label>
                    <div className="form-input">
                      <input
                        type="text"
                        placeholder="Last Name"
                        id="lastname"
                        name="lastname"
                        className="form-control"
                        required=""
                        value={newAdd.last_name}
                        onChange={(e) =>
                          setNewAdd({ ...newAdd, last_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="email">
                      Email:<span className="text-danger">*</span>
                    </label>
                    <div className="form-input">
                      <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        className="form-control"
                        required=""
                        value={newAdd.email}
                        onChange={(e) =>
                          setNewAdd({ ...newAdd, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="phone">
                      Phone:<span className="text-danger">*</span>
                    </label>
                    <div className="form-input">
                      <input
                        type="tel"
                        placeholder="Phone"
                        id="phone"
                        name="phone"
                        className="form-control"
                        required=""
                        value={newAdd.phone}
                        onChange={(e) =>
                          setNewAdd({
                            ...newAdd,
                            phone: e.target.value.toString(),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="address">
                      Address:<span className="text-danger">*</span>
                    </label>
                    <div className="form-input">
                      <textarea
                        placeholder="Address"
                        id="address"
                        name="address"
                        className="form-control-address"
                        required=""
                        value={newAdd.address}
                        onChange={(e) =>
                          setNewAdd({ ...newAdd, address: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="city">
                      City / Parish:<span className="text-danger">*</span>
                    </label>
                    <div className="form-input">
                      <input
                        type="text"
                        placeholder="City / Parish"
                        id="city"
                        name="city"
                        value={newAdd.city}
                        className="form-control"
                        required=""
                        onChange={(e) =>
                          setNewAdd({ ...newAdd, city: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label" htmlFor="postal_code">
                      Postal Code:<span className="text-danger">*</span>
                    </label>
                    <div className="form-input">
                      <input
                        type="text"
                        placeholder="Postal Code"
                        id="postal_code"
                        name="zipcode"
                        className="form-control"
                        required=""
                        value={newAdd.zipcode}
                        onChange={(e) =>
                          setNewAdd({ ...newAdd, zipcode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="details-form">
                  <div className="form-main-div">
                    <label className="form-main-label">
                      Country:<span className="text-danger">*</span>
                    </label>

                    <select
                      className="form-control"
                      name="country"
                      id="country"
                      required=""
                      value={newAdd?.country || ""}
                      onChange={(e) =>
                        setNewAdd({ ...newAdd, country: e.target.value })
                      }
                    >
                      <option value="">Select your country</option>
                      <option value="Bermuda">Bermuda</option>
                    </select>
                  </div>
                </div>
              </div>

              <br />
              <div className="close-confirm">
                <Button
                  variant="contained"
                  onClick={() => handleCloseNewCustomerForm("close")}
                >
                  Close
                </Button>
                {changeThisCusAddress?.id ? (
                  <Button
                    variant="contained"
                    onClick={() => handleSaveCusAddress()}
                    disabled={
                      newAdd.first_name == "" ||
                      newAdd.last_name == "" ||
                      newAdd.email == "" ||
                      newAdd.phone == "" ||
                      newAdd.country == "" ||
                      newAdd.address == "" ||
                      newAdd.city == "" ||
                      newAdd.zipcode == ""
                    }
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleCloseNewCustomerForm()}
                    disabled={
                      newAdd.first_name == "" ||
                      newAdd.last_name == "" ||
                      newAdd.email == "" ||
                      newAdd.phone == "" ||
                      newAdd.country == "" ||
                      newAdd.address == "" ||
                      newAdd.city == "" ||
                      newAdd.zipcode == ""
                    }
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PoS;
