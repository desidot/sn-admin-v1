import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { APIBASE } from "../components/auth/apiConfig";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  cartType: { type: "One Time Order" },
  discount: "0",
  discountType: "Fixed",
  subscriptionProducts: [],
  allActiveProducts: [],
  allDiscounts: [],
  allSubsDiscount: [],
  allCoupons: [],
  wishlist: [],
  isLoadingStatus: false,
  allCustomers: [],
  allCategory: [],
  allShippingCharges: [],
  allBlogs: [],
  allTasks: [],
  allAdmins: [],
  allPickUpPoints: [],
  allSliders: [],
  selectedCustomer: {},
  allPosOrders: [],
  backedOrder: false,
  allEmployees: [],
  pickupAddress: {},
  agent: "",
  inStore:0
};

//GET APIS  ---->

export const getAllEmployees = createAsyncThunk(
  "admin/getAllEmployees",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/get-active-employee`);
      return response.data.data;
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/get-all-orders`);
      return response.data.data;
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);

export const getAllSliders = createAsyncThunk(
  "admin/getAllSliders",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/sliders`);
      return response.data.data;
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "admin/getAllAdmins",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/admins`);
      return response.data.data;
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);
export const getAllTasks = createAsyncThunk(
  "admin/getAllTasks",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/tasks`);
      return response.data.data;
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "admin/getAllBlogs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/blogs`);
      return response.data.data;
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);

export const getAllShippingCharges = createAsyncThunk(
  "admin/getAllShippingCharges",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/shippings`);
      return response.data.data;
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);
export const getAllCategory = createAsyncThunk(
  "admin/getAllCategory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/categories`);
      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  "admin/getAllCustomers",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/users`);
      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const getAllCoupons = createAsyncThunk(
  "admin/getAllCoupons",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/coupons`);
      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "admin/getWishlist",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/wishlists`);
      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const getAllDiscounts = createAsyncThunk(
  "admin/allDiscounts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/discounts`);

      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const getAllSubsDiscounts = createAsyncThunk(
  "admin/allSubsDiscounts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/subcriptionDiscounts`);
      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const getAllActiveProducts = createAsyncThunk(
  `admin/allActiveProducts`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/get-active-products`);

      return response.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const getAllSubscriptionProducts = createAsyncThunk(
  "cart/allSubscriptionProducts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/subcriptionDiscounts`);
      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const getAllPickUpPoints = createAsyncThunk(
  `cart/getAllPickUpPoints`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${APIBASE}admin/pickuppoints`);
      return response.data.data;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

//GET APIS  <----

//POST APIS ---->

export const addCustomer = createAsyncThunk(
  "admin/addCustomer",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/users`, data);
      toast.success("Customer added");
      thunkAPI.dispatch(getAllCustomers());
    } catch (error) {
      //console.log("error is -", error);
    }
  }
);

export const createPickUpPoint = createAsyncThunk(
  "admin/createPickUpPoint",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/pickuppoints`, data);
      toast.success("Pickup Point added");
      thunkAPI.dispatch(getAllPickUpPoints());
    } catch (error) {
      //console.log("error is -", error);
    }
  }
);
export const createTask = createAsyncThunk(
  "admin/createTask",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/tasks`, data);
      toast.success("Task added");
      thunkAPI.dispatch(getAllTasks());
    } catch (error) {
      //console.log("error is -", error);
    }
  }
);

export const createWishlist = createAsyncThunk(
  "admin/createWishlist",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/wishlists`, data);
      toast.success("Wishlist created");
      thunkAPI.dispatch(getWishlist());
    } catch (error) {
      //console.log("error is -", error);
    }
  }
);

export const createCoupons = createAsyncThunk(
  "admin/createCoupon",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/coupons`, data);
      toast.success("Coupon added");
      thunkAPI.dispatch(getAllCoupons());
    } catch (error) {
      //console.log("error is -", error);
    }
  }
);

export const addCustomerAddress = createAsyncThunk(
  "cart/addCustomerAddress",
  async (data, thunkAPI) => {
    try {
      return await axios.post(`${APIBASE}admin/user-addresses`, data);
      ////console.log("resonse in post", response);
      toast.success("Address added");
      thunkAPI(getAllShippingCharges());
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const postDiscount = createAsyncThunk(
  "admin/discount",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/discounts`, data);
      toast.success("Discount created");
      thunkAPI.dispatch(getAllDiscounts());
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const postSubsDiscount = createAsyncThunk(
  "admin/subsDiscount",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/subcriptionDiscounts`, data);
      toast.success("Subscription discount added");
      thunkAPI.dispatch(getAllSubsDiscounts());
      ////console.log("resonse in post", response);
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const createShipping = createAsyncThunk(
  "admin/createShipping",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/shippings`, data);
      toast.success("Shipping Charge added");
      thunkAPI.dispatch(getAllShippingCharges());
      ////console.log("resonse in post", response);
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const createBlog = createAsyncThunk(
  "admin/createBlog",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/blogs`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      toast.success("Blog added");
      thunkAPI.dispatch(getAllBlogs());
      ////console.log("resonse in post", response);
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const createSlider = createAsyncThunk(
  "admin/createSlider",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/sliders`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      toast.success("Slider added");
      thunkAPI.dispatch(getAllSliders());
      ////console.log("resonse in post", response);
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "admin/createOrder",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${APIBASE}admin/pos/cash-payment`, data);
      toast.success("Order added");
    } catch (error) {
      //console.log("Error is", error);
    }
  }
);

//POST APIS <----

//DELETE APIS ---->
export const deleteCustomer = createAsyncThunk(
  "admin/deleteCustomer",

  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/users/${id}`);
      toast.success("Customer deleted");
      thunkAPI.dispatch(getAllCustomers());
    } catch (error) {
      //console.log("error is ", error);
    }
  }
);

export const deleteSlider = createAsyncThunk(
  "admin/deleteSlider",

  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/sliders/${id}`);
      toast.success("Slider deleted");
      thunkAPI.dispatch(getAllSliders());
    } catch (error) {
      //console.log("error is ", error);
    }
  }
);

export const deletePickUpPoint = createAsyncThunk(
  "admin/deletePickUpPoint",

  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/pickuppoints/${id}`);
      toast.success("Pickup Point deleted");
      thunkAPI.dispatch(getAllPickUpPoints());
    } catch (error) {
      //console.log("error is ", error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "admin/deleteBlog",

  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/blogs/${id}`);
      toast.success("Blog deleted");
      thunkAPI.dispatch(getAllBlogs());
    } catch (error) {
      //console.log("error is ", error);
    }
  }
);
export const deleteShipping = createAsyncThunk(
  "admin/deleteShipping",

  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/shippings/${id}`);
      toast.success("Shipping Charge deleted");
      thunkAPI.dispatch(getAllShippingCharges());
    } catch (error) {
      //console.log("error is ", error);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "admin/deleteCoupon",

  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/coupons/${id}`);
      toast.success("Coupon deleted");
      thunkAPI.dispatch(getAllCoupons());
    } catch (error) {
      //console.log("error is ", error);
    }
  }
);
export const deleteDiscount = createAsyncThunk(
  "admin/deleteDiscount",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/discounts/${id}`);
      toast.success("Discount deleted");
      thunkAPI.dispatch(getAllDiscounts());
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const deleteSubsDiscount = createAsyncThunk(
  "admin/deleteSubsDiscount",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/subcriptionDiscounts/${id}`);
      toast.success("Subscription Discount deleted");
      thunkAPI.dispatch(getAllSubsDiscounts());
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const deleteWishlist = createAsyncThunk(
  "admin/deleteWishlist",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${APIBASE}admin/wishlists/${id}`);
      toast.success("Wishlist deleted");
      thunkAPI.dispatch(getWishlist());
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
//${APIBASE}admin/wishlists/$id
//DELETE APIS <----

//PUT APIS ---->
export const changeBlogStatus = createAsyncThunk(
  "admin/changeBlogStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${APIBASE}admin/update-blog-status/${data.id}`,
        {
          status: data.status,
        }
      );
      toast.success("Blog status updated successfully.");
      thunkAPI.dispatch(getAllBlogs());
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      return; //console.log("error", error);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "admin/updateCustomer",
  async ({ data, id }, thunkAPI) => {
    try {
      await axios.put(`${APIBASE}admin/users/${id}`, data);
      toast.success("Customer updated");
      thunkAPI.dispatch(getAllCustomers());
      ////console.log("resonse in post", response);
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

export const updateSlider = createAsyncThunk(
  "admin/updateSlider",
  async ({ data, id }, thunkAPI) => {
    try {
      await axios.put(`${APIBASE}admin/sliders/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      thunkAPI.dispatch(getAllSliders());
      ////console.log("resonse in post", response);
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

//https://snapi.quicsy/api/admin/sliders/$id
export const changeStatus = createAsyncThunk(
  "admin/changeStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${APIBASE}admin/update-discount-status/${data.id}`,
        { status: data.status }
      );

      thunkAPI.dispatch(getAllDiscounts());
      return response;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);
export const changeSubsStatus = createAsyncThunk(
  "admin/changeSubsStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${APIBASE}admin/update-subscription-discount-status/${data.id}`,
        { status: data.status }
      );

      thunkAPI.dispatch(getAllSubsDiscounts());
      return response;
    } catch (error) {
      return; //console.log("error", error);
    }
  }
);

//PUT APIS <----

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload.product;

      const existingProduct = state.cartItems?.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        // Product already exists, update its quantity;
        state.cartItems = state.cartItems?.map((item) =>
          item.id === existingProduct.id
            ? {
                ...item,
                itemCount: +item.itemCount + 1,
                totalPrice: item.selling_price * (+item.itemCount + 1),
              }
            : item
        );
      } else {
        // Product does not exist, add it to the cart with quantity and totalPrice
        state.cartItems?.push({
          ...product,
          itemCount: 1,
          totalPrice: product.selling_price,
        });
      }
    },
    increaseQty: (state, action) => {
      const product = action.payload.product;
      const value = action.payload.value;
      const existingProduct = state.cartItems?.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        // Product already exists, update its quantity;
        state.cartItems = state.cartItems.map((item) =>
          item.id === existingProduct.id
            ? {
                ...item,
                itemCount: value,
                totalPrice: item.selling_price * value,
              }
            : item
        );
      }
    },
    changeCartType: (state, action) => {
      state.cartType = action.payload.cartType;
    },
    makeCartItemsEmpty: (state, action) => {
      state.cartItems = action.payload;
    },
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    addAddress: (state, action) => {
      state.shippingAddress = action.payload.address;
    },
    addAddressInStore: (state, action) => { 
      state.shippingAddress = action.payload.address;
    },
    addPickupAddress: (state, action) => {
      state.pickupAddress = action.payload;
    },
    addDiscount: (state, action) => {
      state.discount = action.payload.discount;
    },
    addAgent: (state, action) => {
      state.agent = action.payload;
    },
    setBackedOrder: (state, action) => {
      state.backedOrder = action.payload;
    },
    setInStoreInCart: (state, action) => {
      state.inStore = action.payload.value;
    },

    changeDiscountType: (state, action) => {
      state.discountType = action.payload.discountType;
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.itemCount = quantity;
        item.totalPrice = item.selling_price * quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubscriptionProducts.fulfilled, (state, action) => {
        state.subscriptionProducts = action.payload;
      })
      .addCase(getAllActiveProducts.fulfilled, (state, action) => {
        state.allActiveProducts = action.payload;
      })
      .addCase(getAllDiscounts.fulfilled, (state, action) => {
        state.allDiscounts = action.payload;
      })
      .addCase(getAllSubsDiscounts.fulfilled, (state, action) => {
        state.allSubsDiscount = action.payload;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.allCoupons = action.payload;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.allEmployees = action.payload;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.allPosOrders = action.payload;
      })
      .addCase(changeStatus.pending, (state, action) => {
        state.isLoadingStatus = true;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isLoadingStatus = false;
      })
      .addCase(changeSubsStatus.pending, (state, action) => {
        state.isLoadingStatus = true;
      })
      .addCase(changeSubsStatus.fulfilled, (state, action) => {
        state.isLoadingStatus = false;
      })
      .addCase(changeBlogStatus.pending, (state, action) => {
        state.isLoadingStatus = true;
      })
      .addCase(changeBlogStatus.fulfilled, (state, action) => {
        state.isLoadingStatus = false;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.allCustomers = action.payload;
      })
      .addCase(getAllSliders.fulfilled, (state, action) => {
        state.allSliders = action.payload;
      })
      .addCase(getAllPickUpPoints.fulfilled, (state, action) => {
        state.allPickUpPoints = action.payload;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.allTasks = action.payload;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.allAdmins = action.payload;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.allCategory = action.payload;
      })
      .addCase(getAllShippingCharges.fulfilled, (state, action) => {
        state.allShippingCharges = action.payload;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload;
      });
  },
});

export const {
  addItem,
  removeItem,
  addAddress,
  addAddressInStore,
  updateQuantity,
  clearCart,
  setBackedOrder,
  increaseQty,
  changeCartType,
  addDiscount,
  selectCustomer,
  makeCartItemsEmpty,
  setInStoreInCart,
  changeDiscountType,
  addPickupAddress,
  addAgent

} = cartSlice.actions;
export default cartSlice.reducer;
