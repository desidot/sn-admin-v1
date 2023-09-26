import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "./OrderSummary.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../loader/loader";
import { toast } from "react-toastify";
import {
  addAddress,
  addAgent,
  addDiscount,
  makeCartItemsEmpty,
  selectCustomer,
  setInStoreInCart,
  setLazyNote,
} from "../../../../../redux/cartSlice";
import { useTheme } from "@mui/material/styles";
import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";
const initialCard = {
  card_number: "",
  expiry_month: "",
  expiry_year: "",
  cvv: "",
};
const offlinePay = {
  transaction_id: "",
  card_number: "",
  card_type: "",
};
const initialNote = {
  order_id: "",
  added_by: "",
  title: "",
  note: "",
};
const OrderSummaryPopup = ({ onClose }) => {
  const [card, setCard] = useState(initialCard);
  const dispatch = useDispatch();
  const [off, setOff] = useState(offlinePay);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [shipCharge, setShipCharge] = useState(0);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [isLoading1, setIsloading1] = useState(false);
  const [isLoading2, setIsloading2] = useState(false);
  const [isLoading3, setIsloading3] = useState(false);
  const added_by = useSelector((state) => state.auth.user.data.name);
  const [note, setNote] = useState(initialNote);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setNote({ ...note, added_by: added_by });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [added_by]);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleOpenDialog1 = () => {
    setIsOpen1(true);
  };
  const handleCloseDialog1 = () => {
    setIsOpen1(false);
  };

  const handleOpenDialog2 = () => {
    setOpenNoteModal(true);
  };
  const handleCloseDialog2 = () => {
    setOpenNoteModal(false);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cart?.cartItems?.forEach((product) => {
      const subsDisInfo = product.subscriptions?.filter(
        (elem) => +elem.months === +cart?.cartType?.duration?.split(" ")[0]
      )[0];

      let fPrice = 0;

      if (subsDisInfo?.discount) {
        if (subsDisInfo?.discount_type === "Percent") {
          // console.log("fprice in p",fPrice)

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
        cart.cartType.type === "Subscribe"
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

  useEffect(() => {
    calculateDiscount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    calculateDiscount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [
    totalPrice,
    // setTotalPrice
  ] = useState(calculateTotalPrice());

  const saveNote = async (not) => {
    try {
      await axios.post(`${APIBASE}admin/ordernotes`, not);
    } catch (error) {}
  };

  const calculateDiscount = () => {
    let finalPrice = totalPrice;

    if (cart.discountType === "Fixed") {
      finalPrice = finalPrice - +cart.discount;
    } else if (cart.discountType === "Percentage(%)") {
      const discountAmount = (+cart.discount / 100) * totalPrice;
      finalPrice -= discountAmount;
    }

    setDiscountedAmount(finalPrice.toFixed(2));
  };

  const confirmOrderWithCash = async (data) => {
    setIsloading1(true);
    try {
      const res = await axios.post(`${APIBASE}admin/pos/cash-payment`, data);

      if (res.data.data) {
        setIsloading1(false);
        toast.success("Order Placed Successfully.");
        // if (note.note && note.title) {
        //   saveNote({ ...note, order_id: res.data.data.id });
        // }
        navigate(`/admin/Sales/pos-thankyou/${res.data.data.id}`);

        dispatch(makeCartItemsEmpty([]));
        dispatch(selectCustomer({}));
        dispatch(addAddress({ address: {} }));
        dispatch(setInStoreInCart({ value: 0 }));
        dispatch(addAgent(""));
        dispatch(addDiscount({ discount: 0 }));
      } else {
        setIsloading1(false);
        toast.error(res.data.error);
      }
    } catch (error) {
      setIsloading1(false);
      toast.error(error.response.data.message);
      // console.log("Error is", error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const [age, setAge] = React.useState("");

  // eslint-disable-next-line no-unused-vars
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    const getShippingCharge = async () => {
      try {
        const res = await axios.get(
          `${APIBASE}admin/pos/calculate-shipping/${
            cart.shippingAddress.city
          }/${+totalPrice}`
        );
        if (cart.shippingAddress.first_name) {
          setShipCharge(res.data.shipping_rate);
        }
      } catch (error) {
        // console.log(error);
      }
    };

    getShippingCharge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const confirmOrderWithCard = async (data) => {
    setIsloading2(true);
    try {
      const res = await axios.post(`${APIBASE}admin/pos/online-payment`, data);

      if (res.data.data) {
        setIsloading2(false);
        toast.success("Order Placed Successfully.");
        // if (note.note && note.title) {
        //   saveNote({ ...note, order_id: res.data.data.id });
        // }
        navigate(`/admin/Sales/pos-thankyou/${res.data.data.id}`);

        dispatch(makeCartItemsEmpty([]));
        dispatch(selectCustomer({}));
        dispatch(addAddress({ address: {} }));
        dispatch(setInStoreInCart({ value: 0 }));
        dispatch(addAgent(""));
        dispatch(addDiscount({ discount: 0 }));
      } else {
        setIsloading2(false);
        toast.error(res.data.error);
      }
    } catch (error) {
      // console.log("Error is", error);
      setIsloading2(false);
      toast.error(error.response.data.message);
    }
  };

  const confirmOffline = async (data) => {
    setIsloading3(true);
    try {
      const res = await axios.post(`${APIBASE}admin/pos/offline-payment`, data);

      if (res.data.data) {
        setIsloading3(false);
        toast.success("Order Placed Successfully.");
        // if (note.note && note.title) {
        //   saveNote({ ...note, order_id: res.data.data.id });
        // }

        navigate(`/admin/Sales/pos-thankyou/${res.data.data.id}`);
        dispatch(makeCartItemsEmpty([]));
        dispatch(selectCustomer({}));
        dispatch(setInStoreInCart({ value: 0 }));
        dispatch(addAddress({ address: {} }));
        dispatch(addAgent(""));
        dispatch(addDiscount({ discount: 0 }));
      } else {
        setIsloading3(false);
        toast.error(res.data.error);
      }
    } catch (error) {
      // console.log("Error is", error);
      setIsloading3(false);
      toast.error(error.response.data.message);
    }
  };
  // console.log("cd", cart);
  const handleConfirmWithCashClick = () => {
    const obj = {
      user_id: "",
      order_type: "POS",
      sub_total: "",
      grand_total: "",
      billing_address: {
        address: cart.selectedCustomer?.address,
        city: cart.selectedCustomer?.city,
        country: cart.selectedCustomer?.country,
        email: cart.selectedCustomer?.email,
        // email:"sanju682295@gmail.com",
        first_name: cart.selectedCustomer?.first_name,
        last_name: cart.selectedCustomer?.last_name,

        flat_apartment: cart.selectedCustomer?.flat_apartment,
        phone: cart.selectedCustomer?.phone,
        state: cart.selectedCustomer?.state,
        street: cart.selectedCustomer?.street,
        zip: cart.selectedCustomer?.zip
          ? cart.selectedCustomer?.zip
          : cart.selectedCustomer?.zipcode,
      },

      shipping_address: {
        address: cart.shippingAddress.address,
        city: cart.shippingAddress.city,
        country: cart.shippingAddress.country,
        email: cart.shippingAddress.email,
        // email:"sanju682295@gmail.com",
        first_name: cart.shippingAddress.first_name,
        last_name: cart.shippingAddress.last_name,
        flat_apartment: cart.shippingAddress.flat_apartment,
        phone: cart.shippingAddress.phone,
        state: cart.shippingAddress.state,
        street: cart.shippingAddress.street,
        zip: cart.shippingAddress.zip
          ? cart.shippingAddress.zip
          : cart.shippingAddress.zipcode,
      },
      added_by: "",

      pickup_address: cart?.shippingAddress?.first_name
        ? ""
        : cart?.inStore === 1
        ? ""
        : cart?.pickupAddress?.location,

      pickup_order: cart?.shippingAddress?.first_name
        ? false
        : cart?.inStore === 1
        ? false
        : true,

      order_items: [],
      coupon: null,
      coupon_discount:
        cart.discountType === "Fixed"
          ? +cart.discount
          : ((+cart.discount * +totalPrice) / 100).toFixed(2),
      shipping_charge: +shipCharge,
    };
    obj.sub_total = +totalPrice;
    obj.grand_total = (+discountedAmount + +shipCharge).toFixed(2);
    obj.user_id = cart.selectedCustomer.id;
    obj.added_by = auth?.user?.data.name;
    obj.agent_id = cart.agent;
    obj.note = note?.note;
    obj.in_store = cart.inStore;
    obj.note = note?.note;
    obj.back_order = cart.backedOrder ? 1 : 0;
    obj.order_items = cart.cartItems.map((elem) => ({
      name: elem.product_name,
      product_id: elem.id,
      qty: +elem.itemCount,
      unit: elem.unit,
      old_price: elem?.selling_price.toFixed(2) || 0,
      price:
        elem?.discounted_price.toFixed(2) ?? elem?.selling_price.toFixed(2),
      discount: elem?.discount_value || 0,
      discount_type: elem?.discount_type,
      image: elem.thumbnail,
      category: elem.category,
      slug: elem.slug,
      sku: elem.sku,
      weight: elem.weight,
    }));
    if (cart.cartItems.length > 0 && cart.shippingAddress) {
      confirmOrderWithCash(obj);
      // console.log(obj)
    }
  };

  const handleCardConfirmClick = () => {
    const obj = {
      user_id: "",
      order_type: "POS",
      sub_total: "",
      agent_id: "",
      grand_total: "",
      billing_address: {
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
        zip: cart.selectedCustomer.zipcode
          ? cart.selectedCustomer.zipcode
          : cart.selectedCustomer.zip,
      },

      shipping_address: {
        address: cart.shippingAddress?.address,
        city: cart.shippingAddress?.city,
        country: cart.shippingAddress?.country,
        email: cart.shippingAddress?.email,
        first_name: cart.shippingAddress.first_name,
        last_name: cart.shippingAddress?.last_name,
        flat_apartment: cart.shippingAddress?.flat_apartment,
        phone: cart.shippingAddress?.phone,
        state: cart.shippingAddress?.state,
        street: cart.shippingAddress?.street,
        zip: cart.shippingAddress.zipcode
          ? cart.shippingAddress.zipcode
          : cart.shippingAddress.zip,
      },
      added_by: "",
      pickup_address: cart?.shippingAddress?.first_name
        ? ""
        : cart?.inStore === 1
        ? ""
        : cart?.pickupAddress?.location,

      pickup_order: cart?.shippingAddress?.first_name
        ? false
        : cart?.inStore === 1
        ? false
        : true,
      order_items: [],
      coupon: null,
      coupon_discount:
        cart.discountType === "Fixed"
          ? +cart.discount
          : ((+cart.discount * +totalPrice) / 100).toFixed(2),
      shipping_charge: +shipCharge,
      card_number: "",
      cvv: "",
      expiry_month: "",
      expiry_year: "",
    };
    obj.sub_total = +totalPrice;
    obj.grand_total = +discountedAmount + +shipCharge;
    obj.user_id = cart.selectedCustomer.id;
    obj.added_by = auth?.user?.data.name;
    obj.agent_id = cart.agent;
    obj.in_store = cart.inStore;
    obj.back_order = cart.backedOrder ? 1 : 0;
    if (cart.cartType.type !== "Subscribe") {
      obj.order_items = cart.cartItems.map((elem) => ({
        name: elem.product_name,
        product_id: elem.id,
        qty: +elem.itemCount,
        unit: elem.unit,
        old_price: elem?.selling_price.toFixed(2) || 0,
        price:
          elem?.discounted_price.toFixed(2) ?? elem?.selling_price.toFixed(2),
        discount: elem?.discount_value || 0,
        discount_type: elem?.discount_type,
        image: elem.thumbnail,
        category: elem.category,
        slug: elem.slug,
        sku: elem.sku,
        weight: elem.weight,
      }));
    } else {
      obj.grand_total = +discountedAmount + +shipCharge;
      obj.order_type = "Subscription";

      obj.order_items = cart.cartItems.map((elem) => {
        const newObj = {
          product_id: elem.id,
          name: elem.product_name,
          qty: +elem.itemCount,
          unit: elem.unit,
          old_price: elem.selling_price,
          price: getOriginalPrice(elem),
          image: elem.thumbnail,
          category: elem.category,
          slug: elem.slug,
          weight: elem.weight,
          subscription: {
            interval: cart.cartType.duration.split(" ")[0],
            type: "month",
            discount: elem?.subscriptions?.filter(
              (elem) => elem.months === cart.cartType.duration.split(" ")[0]
            )[0],
          },
        };

        const filteredSubscriptions = elem?.subscriptions?.filter(
          (elem) => elem.months === cart.cartType.duration.split(" ")[0]
        );

        if (filteredSubscriptions[0]) {
          newObj.price = (
            elem?.selling_price -
            (filteredSubscriptions[0]?.discount / 100) * elem?.selling_price
          ).toFixed(2);

          newObj.discount = filteredSubscriptions[0]?.discount || 0;
          newObj.discount_type = filteredSubscriptions[0]?.discount_type;
        } else {
          newObj.price = elem?.selling_price.toFixed(2);
          newObj.discount = 0;
          newObj.discount_type = "Percent";
        }

        return newObj;
      });
    }
    obj.card_number = card.card_number;
    obj.cvv = card.cvv;
    obj.expiry_month = card.expiry_month;
    obj.expiry_year = card.expiry_year;

    if (cart.cartItems.length > 0 && cart.shippingAddress) {
      confirmOrderWithCard(obj);
      setIsOpen1(false);
    }
  };
  const handleOfflinePayment = () => {
    const obj = {
      user_id: "",
      order_type: "POS",
      sub_total: "",
      grand_total: "",
      billing_address: {
        address: cart.selectedCustomer.address,
        city: cart.selectedCustomer.city,
        country: cart.selectedCustomer.country,
        email: cart.selectedCustomer.email,
        first_name: cart.selectedCustomer.first_name,
        last_name: cart.selectedCustomer.last_name,

        flat_apartment: cart.selectedCustomer.flat_apartment,
        phone: cart.selectedCustomer.phone,
        state: cart.selectedCustomer.state,
        street: cart.selectedCustomer.street,
        zip: cart.selectedCustomer.zipcode
          ? cart.selectedCustomer.zipcode
          : cart.selectedCustomer.zip,
      },

      shipping_address: {
        address: cart.shippingAddress.address,
        city: cart.shippingAddress.city,
        country: cart.shippingAddress.country,
        email: cart.shippingAddress.email,
        first_name: cart.shippingAddress.first_name,
        last_name: cart.shippingAddress.last_name,
        flat_apartment: cart.shippingAddress.flat_apartment,
        phone: cart.shippingAddress.phone,
        state: cart.shippingAddress.state,
        street: cart.shippingAddress.street,
        zip: cart.shippingAddress.zipcode
          ? cart.shippingAddress.zipcode
          : cart.shippingAddress.zip,
      },
      added_by: "",
      pickup_address: cart?.shippingAddress?.first_name
        ? ""
        : cart?.inStore === 1
        ? ""
        : cart?.pickupAddress?.location,

      pickup_order: cart?.shippingAddress?.first_name
        ? false
        : cart?.inStore === 1
        ? false
        : true,
      order_items: [],
      coupon: null,
      coupon_discount:
        cart.discountType === "Fixed"
          ? +cart.discount
          : ((+cart.discount * +totalPrice) / 100).toFixed(2),
      shipping_charge: +shipCharge,
    };
    obj.sub_total = +totalPrice;
    obj.grand_total = (+discountedAmount + +shipCharge).toFixed(2);
    obj.user_id = cart.selectedCustomer.id;
    obj.added_by = auth?.user?.data.name;
    obj.back_order = cart.backedOrder ? 1 : 0;
    obj.agent_id = cart.agent;
    obj.in_store = cart.inStore;
    obj.order_items = cart.cartItems.map((elem) => ({
      name: elem.product_name,
      product_id: elem.id,
      qty: +elem.itemCount,
      unit: elem.unit,
      old_price: elem?.selling_price.toFixed(2) || 0,
      price:
        elem?.discounted_price.toFixed(2) ?? elem?.selling_price.toFixed(2),
      discount: elem?.discount_value || 0,
      discount_type: elem?.discount_type,
      image: elem.thumbnail,
      category: elem.category,
      slug: elem.slug,
      sku: elem.sku,
      weight: elem.weight,
    }));

    obj.card_number = off.card_number;
    obj.card_type = off.card_type;
    obj.transaction_id = off.transaction_id;
    if (cart.cartItems.length > 0 && cart.shippingAddress) {
      confirmOffline(obj);
    }
  };

  const months = [
    { st: "January", no: 1 },
    { st: "February", no: 2 },
    { st: "March", no: 3 },
    { st: "April", no: 4 },
    { st: "May", no: 5 },
    { st: "June", no: 6 },
    { st: "July", no: 7 },
    { st: "August", no: 8 },
    { st: "September", no: 9 },
    { st: "October", no: 10 },
    { st: "November", no: 11 },
    { st: "December", no: 12 },
  ];

  const years = [
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
  ];

  const getOriginalPrice = (product) => {
    const subsDisInfo = product.subscriptions?.filter(
      (elem) => +elem.months === +cart?.cartType?.duration?.split(" ")[0]
    )[0];

    let fPrice = 0;

    if (cart.cartType.type === "Subscribe") {
      if (subsDisInfo?.discount_type === "Percent") {
        if (+subsDisInfo?.discount > 0) {
          fPrice =
            +product.selling_price -
            +product.selling_price * (+subsDisInfo?.discount / 100);
          // console.log("fprice 1", fPrice);
        } else {
          fPrice = +product.selling_price;
          // console.log("fprice 2", fPrice);
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

  const handleNoteSaveClick = () => {
    // if (note.note && note.title) {
    if (note.note) {
      handleCloseDialog2();
    } else {
      toast.warn("Nothing in note!", { position: "top-center" });
      handleCloseDialog2();
    }
  };

  return (
    <>
      <div className="summary-main-container">
        <Grid container spacing={2}>
          {/* Product List */}
          <Grid item xs={12} md={6}>
            {cart?.cartItems.map((product) => (
              <div className="list-products" key={product.id}>
                <div className="summary-container">
                  <div className="product-info">
                    <div className="product-summ-img">
                      <img
                        src={`${IMAGEURL}${product.thumbnail}`}
                        alt={product.name}
                        className="table-product-image"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "75%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="product-summ-description">
                        {product.product_name}
                        {/* <div dangerouslySetInnerHTML={{__html:product.product_desc}}></div> */}
                      </div>
                      <div className="summ-price-quant">
                        <h6>${getOriginalPrice(product)}</h6>
                        <p>Qty: {product.itemCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Grid>

          {/* Customer Info */}
          <Grid item xs={12} md={6}>
            <div className="customer-info-container">
              {cart.shippingAddress.first_name && (
                <div className="customer-info">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgb(210, 210, 210)",
                      alignItems: "center",
                      paddingRight: "15px",
                    }}
                  >
                    <span className="customer-info-head">Customer Info</span>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {" "}
                      <span>{cart?.cartType.type}</span>{" "}
                      <span style={{ fontSize: "14px" }}>
                        {cart?.cartType.duration ? cart?.cartType.duration : ""}
                      </span>
                    </div>
                  </div>

                  <div className="customer-info-body">
                    <p>
                      <span>Name:</span>{" "}
                      {`${
                        cart?.shippingAddress?.first_name
                          ? cart?.shippingAddress?.first_name
                          : ""
                      } ${
                        cart?.shippingAddress?.middle_name
                          ? cart?.shippingAddress?.middle_name
                          : ""
                      } ${
                        cart?.shippingAddress?.last_name
                          ? cart?.shippingAddress?.last_name
                          : ""
                      }`}
                    </p>
                    <p>
                      <span>Phone:</span> {cart.shippingAddress?.phone}
                    </p>
                    <p>
                      <span>Email:</span> {cart.shippingAddress?.email}
                    </p>
                    <p>
                      <span>Address:</span>{" "}
                      {cart.selectedCustomer?.address
                        ? cart.selectedCustomer?.address
                        : ""}{" "}
                      {cart.selectedCustomer?.zipcode
                        ? "," + cart.selectedCustomer?.zipcode
                        : ""}
                      {cart.selectedCustomer?.city
                        ? "," + cart.selectedCustomer?.city
                        : ""}{" "}
                      {cart.selectedCustomer?.state
                        ? "," + cart.selectedCustomer?.state
                        : ""}{" "}
                      {cart.selectedCustomer?.country
                        ? "," + cart.selectedCustomer?.country
                        : ""}{" "}
                    </p>
                    <p>
                      <span>Shipping:</span>{" "}
                      {cart.shippingAddress?.address
                        ? cart.shippingAddress?.address
                        : ""}{" "}
                      {cart.shippingAddress?.zip
                        ? "," + cart.shippingAddress?.zip
                        : ""}
                      {cart.shippingAddress?.city
                        ? "," + cart.shippingAddress?.city
                        : ""}{" "}
                      {cart.shippingAddress?.state
                        ? "," + cart.shippingAddress?.state
                        : ""}{" "}
                      {cart.shippingAddress?.country
                        ? "," + cart.shippingAddress?.country
                        : ""}{" "}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingRight: "10px",
                    }}
                  >
                    {" "}
                    <span style={{ fontWeight: "500" }}>
                      {cart?.backedOrder ? "Backed Order" : ""}
                    </span>{" "}
                  </div>
                </div>
              )}
              {!cart.shippingAddress.first_name && (
                <div className="customer-info">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgb(210, 210, 210)",
                      alignItems: "center",
                      paddingRight: "15px",
                    }}
                  >
                    {cart.inStore === 1 ? (
                      <span className="customer-info-head">In Store</span>
                    ) : (
                      <span className="customer-info-head">Pickup Store</span>
                    )}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {" "}
                      <span>{cart?.cartType.type}</span>{" "}
                      <span style={{ fontSize: "14px" }}>
                        {cart?.cartType.duration ? cart?.cartType.duration : ""}
                      </span>
                    </div>
                  </div>

                  <div className="customer-info-body">
                    <p>
                      <span>Name:</span>{" "}
                      {`${
                        cart?.selectedCustomer?.first_name
                          ? cart?.selectedCustomer?.first_name
                          : ""
                      } ${
                        cart?.selectedCustomer?.middle_name
                          ? cart?.selectedCustomer?.middle_name
                          : ""
                      } ${
                        cart?.selectedCustomer?.last_name
                          ? cart?.selectedCustomer?.last_name
                          : ""
                      }`}
                    </p>
                    <p>
                      <span>Phone:</span> {cart.selectedCustomer?.phone}
                    </p>
                    <p>
                      <span>Email:</span> {cart.selectedCustomer?.email}
                    </p>
                    <p>
                      <span>Address:</span>{" "}
                      {cart.selectedCustomer?.address
                        ? cart.selectedCustomer?.address
                        : ""}{" "}
                      {cart.selectedCustomer?.zipcode
                        ? "," + cart.selectedCustomer?.zipcode
                        : ""}
                      {cart.selectedCustomer?.city
                        ? "," + cart.selectedCustomer?.city
                        : ""}{" "}
                      {cart.selectedCustomer?.country
                        ? "," + cart.selectedCustomer?.country
                        : ""}{" "}
                    </p>
                    {cart.inStore === 0 && (
                      <p>
                        <span>Pickup Location:</span>{" "}
                        {cart?.pickupAddress?.location}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingRight: "10px",
                    }}
                  >
                    {" "}
                    <span style={{ fontWeight: "500" }}>
                      {cart?.backedOrder ? "Backed Order" : ""}
                    </span>{" "}
                  </div>
                </div>
              )}

              {/* Total Billing */}
              <div className="total-billing">
                <div className="blc-info">
                  <p>Sub Total</p>
                  <p>Shipping</p>
                  <p>Discount</p>
                </div>

                <div className="blc">
                  <p>${totalPrice}</p>
                  <p>${shipCharge}</p>
                  <p>
                    {cart.discountType === "Fixed"
                      ? `$${cart.discount ?? 0}`
                      : `${cart.discount ? cart.discount : 0}%`}
                  </p>
                </div>
              </div>

              {/* Total Discount */}
              <div className="total-discount">
                <div className="total-discount-head">
                  <h5>Total</h5>
                  <h5>${+discountedAmount + +shipCharge}</h5>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Payment Console */}
      <div className="payment-console">
        <div style={{ width: "40%", display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            style={{ background: "#6041A1" }}
            onClick={() => handleOpenDialog2()}
          >
            <EditNoteIcon /> Add Note
          </Button>
        </div>

        <div className="close-confirm">
          <Button
            variant="contained"
            style={{ background: "#FF4961" }}
            onClick={onClose}
          >
            Close
          </Button>

          {cart.cartType.type === "One Time Order" ? (
            <>
              <Button
                variant="contained"
                style={{ background: "#FD6F13" }}
                onClick={handleOpenDialog}
                disabled={isLoading3}
              >
                {isLoading3 ? "Processing" : "Offline Payment"}
              </Button>
              <Button
                variant="contained"
                style={{ background: "#1E9FF2" }}
                onClick={handleOpenDialog1}
                disabled={isLoading2}
              >
                {isLoading2 ? "Processing" : "Card Payment"}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleConfirmWithCashClick()}
                style={{ background: "#28D094" }}
                disabled={isLoading1}
              >
                {isLoading1 ? "Processing" : "Confirm with Cash"}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleOpenDialog1()}
              style={{ background: "#28D094" }}
            >
              Subscribe & Payment
            </Button>
          )}
        </div>
      </div>
      {/* Offline Payment Dialog */}
      <Dialog
        open={isOpen1}
        onClose={handleCloseDialog1}
        style={{ padding: "1rem", gap: "0.5rem" }}
      >
        <DialogTitle id="order-summ-head">Card Payment</DialogTitle>
        <DialogContent>
          <div className="input-field" style={{ padding: "0.5rem" }}>
            <InputLabel>Credit Card Number :</InputLabel>
            <TextField
              error={
                card.card_number.length > 16 || card.card_number.length < 16
              }
              placeholder="Credit Card Number"
              type="number"
              value={card.card_number}
              onChange={(e) =>
                setCard({ ...card, card_number: e.target.value })
              }
            />
          </div>
          <div
            className="input-field"
            style={{
              padding: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <InputLabel>Month :</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <Select
                style={{ width: "60%" }}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                // value={months}

                value={card.expiry_month}
                onChange={(e) =>
                  setCard({ ...card, expiry_month: e.target.value })
                }
              >
                <MenuItem value="">
                  <span>None</span>
                </MenuItem>

                {months.map((option) => (
                  <MenuItem value={option.no}>{option.st}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <InputLabel>Year :</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <Select
                style={{ width: "60%" }}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={card.expiry_year}
                onChange={(e) =>
                  setCard({ ...card, expiry_year: e.target.value })
                }
              >
                <MenuItem value="">
                  <span>None</span>
                </MenuItem>

                {years.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="input-field" style={{ padding: "0.5rem" }}>
            <InputLabel>CVV :</InputLabel>
            <TextField
              type="password"
              placeholder="CVV"
              value={card.cvv}
              error={card.cvv.length > 3 || card.cvv.length < 3}
              id="outlined-error"
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            />
          </div>
        </DialogContent>
        <DialogActions className="close-confirm">
          <Button onClick={handleCloseDialog1}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              card.cvv.length !== 3 ||
              card.card_number.length !== 16 ||
              card.expiry_month === "" ||
              card.expiry_year === ""
            }
            onClick={() => handleCardConfirmClick()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Offline Payment Dialog */}

      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        style={{ padding: "1rem", gap: "0.5rem" }}
      >
        <DialogTitle id="order-summ-head">Offline Payment</DialogTitle>
        <DialogContent>
          <div className="input-field" style={{ padding: "0.5rem" }}>
            <InputLabel>Card Type :</InputLabel>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <Select
                style={{ width: "60%" }}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={card.card_type}
                onChange={(e) => setOff({ ...off, card_type: e.target.value })}
              >
                <MenuItem value="">
                  <span>None</span>
                </MenuItem>

                <MenuItem value="Visa">Visa</MenuItem>
                <MenuItem value="Master Card">Master Card</MenuItem>
                <MenuItem value="Debit Card">Debit Card</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Authorized.net">Authorized.net</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input-field" style={{ padding: "0.5rem" }}>
            <InputLabel>Card Number :</InputLabel>
            <TextField
              type="number"
              placeholder="Card number"
              value={off.card_number}
              onChange={(e) => setOff({ ...off, card_number: e.target.value })}
            />
          </div>
          <div className="input-field" style={{ padding: "0.5rem" }}>
            <InputLabel>Transaction ID :</InputLabel>
            <TextField
              placeholder="Transaction ID"
              value={off.transaction_id}
              onChange={(e) =>
                setOff({ ...off, transaction_id: e.target.value })
              }
            />
          </div>

          {/* File upload input */}
        </DialogContent>
        <DialogActions className="close-confirm">
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={off.transaction_id === "" || off.card_type === ""}
            onClick={() => handleOfflinePayment()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openNoteModal}
        onClose={handleCloseDialog2}
        fullScreen={fullScreen}
        // style={{ padding: "1rem", gap: "0.5rem" }}
      >
        <DialogTitle id="order-summ-head">Add Note</DialogTitle>
        <DialogContent>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 0 1rem 0",
            }}
          >
            <input
              style={{
                width: "100%",
                border: "0.5px solid lightgray",
                borderRadius: "4px",
                padding: "5px",
              }}
              placeholder="Title"
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // padding: "1rem",
            }}
          >
            <textarea
              style={{
                width: "400px",
                height: "250px",
                padding: "5px",
                marginTop: "1rem",
              }}
              placeholder="Make note..."
              onChange={(e) => setNote({ ...note, note: e.target.value })}
            />
          </div>
        </DialogContent>
        <DialogActions className="close-confirm">
          <Button onClick={handleCloseDialog2}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNoteSaveClick()}
            className="m-0"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading1 && <Loader />}
      {isLoading2 && <Loader />}
      {isLoading3 && <Loader />}
    </>
  );
};

export default OrderSummaryPopup;
