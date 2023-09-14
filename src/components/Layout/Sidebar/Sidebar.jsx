import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { GiBugleCall } from "react-icons/gi";
import { CgUserList } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TbDashboard, TbCoins } from "react-icons/tb";
import {
  MdMiscellaneousServices,
  MdOutlineInventory,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";

import { useSelector } from "react-redux";

const Sidebar = ({ children }) => {
  const permissions = useSelector((state) => state.auth.user.data.permissions);

  //console.log("permissions", permissions);
  const user = useSelector((state) => state.auth.user.data.roles[0]);

  //Dashboard
  const viewDashboard = permissions.includes("View Dashboard");

  //Miscellaneous
  const viewNotification = permissions.includes("View All Notification");
  const viewTask = permissions.includes("View All Tasks");
  const viewBlog = permissions.includes("View All Blog");
  const viewMiscellaneous = viewBlog || viewNotification || viewTask;

  //sales
  const viewPos = permissions.includes("Access POS");

  const viewAllOrders = permissions.includes("View All Orders");
  const viewSubsOrders = permissions.includes("View All Subscription Orders");
  const viewAllPosOrders = permissions.includes("View All POS Orders");
  const viewAllBackOrders = permissions.includes("View All Back Orders");
  const viewAllPickupOrders = permissions.includes("View All Pick-Up Orders");
  const viewInvoice = permissions.includes("View All Invoice");

  const viewSalesChild =
    viewAllBackOrders ||
    viewAllOrders ||
    viewAllPickupOrders ||
    viewAllPosOrders ||
    viewSubsOrders ||
    viewInvoice;

  const viewSalesMain = viewSalesChild || viewPos;

  //productManager

  const viewAllInv = permissions.includes("View All Inventory");
  const viewStockIn = permissions.includes("Stock In Inventory");
  const viewExpiring = permissions.includes("View Expiring Inventory");
  const viewExpired = permissions.includes("View Expired Inventory");
  const viewOutOfStock = permissions.includes("View Out-of-Stock Inventory");
  const viewLowStock = permissions.includes("View Low Stock Inventory");

  const viewInvMain =
    viewAllInv ||
    viewStockIn ||
    viewExpired ||
    viewExpiring ||
    viewOutOfStock ||
    viewLowStock;

  const viewAddProd = permissions.includes("Create Product");
  const viewProdList = permissions.includes("View All Product");
  const viewCat = permissions.includes("View All Category");
  const viewBrand = permissions.includes("View All Brand");
  const viewUnits = permissions.includes("View All Unit");
  const viewSuppliers = permissions.includes("View All Supplier");
  const viewReviews = permissions.includes("View All Review");

  const viewProdMain =
    viewAddProd ||
    viewProdList ||
    viewCat ||
    viewBrand ||
    viewUnits ||
    viewSuppliers ||
    viewReviews;

  const viewProdManager = viewInvMain || viewProdMain;

  //people
  const viewCus = permissions.includes("View All Customer");
  const viewAddCus = permissions.includes("Create Customer");
  const viewDelCus = permissions.includes("View Deleted Customer");

  const viewGenCus = viewCus || viewAddCus || viewDelCus;

  const viewPeople = viewGenCus;

  //Promotions

  const viewWishlist = permissions.includes("View All Wishlist ");
  const viewSubscribers = permissions.includes("View All Email Subscriber ");
  const viewCoupons = permissions.includes("View All Coupon");
  const viewDiscounts = permissions.includes("View All Discount");
  const viewSubsDiscounts = permissions.includes(
    "View All Subscription Discount"
  );

  const viewUserSearch = permissions.includes("View User Searches Marketing ");
  const viewFailedOrders = permissions.includes("View Failed Order Marketing ");
  const viewOnCart = permissions.includes("View On Cart Marketing ");

  const viewMarketing = viewUserSearch || viewFailedOrders || viewOnCart;

  const viewPromotion =
    viewMarketing ||
    viewWishlist ||
    viewSubscribers ||
    viewCoupons ||
    viewDiscounts ||
    viewSubsDiscounts;

  //Basic Hr

  const viewEmp = permissions.includes("View All Employee");
  const viewAddEmp = permissions.includes("Create Employee");

  const viewEmpMain = viewEmp || viewAddEmp;

  const viewBasicHr = viewEmpMain;

  //Reports

  const viewSalesReports = permissions.includes("View Sales Report");
  const viewUserReports = permissions.includes("View User Report");
  const viewIncomeReport = permissions.includes("View Income Report");
  const viewPosReports = permissions.includes("POS Sales Report");
  const viewProdWiseReports = permissions.includes(
    "View Product-Wise Sales Report"
  );
  const viewWishListReports = permissions.includes("View Wishlist Report");

  const viewReportsMain =
    viewSalesReports ||
    viewUserReports ||
    viewIncomeReport ||
    viewPosReports ||
    viewProdWiseReports ||
    viewWishListReports;

  //Administrative

  const viewPickupPoints = permissions.includes("View All Pick-Up Point");
  const viewShipping = permissions.includes("View All Shipping Charges");

  const viewSetUp = viewPickupPoints || viewShipping;

  const viewRoles = permissions.includes("View All Role & Permissions");
  const viewPrefixes = permissions.includes("View All Prefix");

  const viewSlider = permissions.includes("View All Website Slider");
  const viewMeta = permissions.includes("View All Website Meta");
  const viewPages = permissions.includes("View All Website Pages");

  const viewWebSetup = viewSlider || viewMeta || viewPages;

  const viewDeletedProd = permissions.includes("View Product Trash");
  const viewDeletedOrd = permissions.includes("View Order Trash");
  const viewDeletedCat = permissions.includes("View Category Trash");

  const viewTrash = viewDeletedCat || viewDeletedProd || viewDeletedOrd;

  //------------------------------------
  const routes =
    user == "Super Admin"
      ? [
          {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <TbDashboard />,
          },
          {
            path: "/admin/miscellaneous",
            name: "Miscellaneous",
            icon: <MdMiscellaneousServices />,
            subRoutes: [
              {
                path: "/admin/miscellaneous/notifications",
                name: "Notifications",
              },
              {
                path: "/admin/miscellaneous/tasks",
                name: "Tasks",
              },
              {
                path: "/admin/miscellaneous/blogs",
                name: "Blogs",
              },
            ],
          },

          {
            path: "/sales",
            name: "Sales",
            icon: <TbCoins />,
            subRoutes: [
              {
                path: "/admin/sales/pos",
                name: "POS",
              },
              {
                // path: "/admin/miscellaneous/sales",
                name: "Orders",
                subRoutes: [
                  {
                    path: "/admin/Sales/all-orders",
                    name: "All Orders",
                  },
                  {
                    path: "/admin/Sales/subscription-orders",
                    name: "Subscription Orders",
                  },
                  {
                    path: "/admin/Sales/pos-orders",
                    name: "POS Orders",
                  },

                  {
                    path: "/admin/Sales/pickup-orders",
                    name: "Pick up Point Orders",
                  },
                  {
                    path: "/admin/Sales/back-orders",
                    name: "Back Orders",
                  },
                  {
                    path: "/admin/Sales/Invoice-list",
                    name: "Invoice List",
                  },
                ],
              },
              {
                path: "/admin/Sales/user-subscriptions",
                name: "User Subscriptions",
              },
            ],
          },
          {
            name: "Product Manager",
            icon: <MdOutlineInventory />,
            subRoutes: [
              {
                name: "Inventory",
                subRoutes: [
                  {
                    path: "/admin/ProductManager/Inventory/product-inventory",
                    name: "Product Inventory",
                  },
                  {
                    path: "/admin/ProductManager/Inventory/expiring-soon",
                    name: "Expiring Soon",
                  },
                  {
                    path: "/admin/ProductManager/Inventory/expired-stocks",
                    name: "Expired Stock",
                  },
                  {
                    path: "/admin/ProductManager/Inventory/stockout-products",
                    name: "Stockout Products",
                  },

                  {
                    path: "/admin/ProductManager/Inventory/low-stock",
                    name: "Low Stock",
                  },
                ],
              },
              {
                // path: "/product-manager/products",
                name: "Products",
                subRoutes: [
                  {
                    path: "/admin/ProductManager/Products/add-products",
                    name: "Add Products",
                  },
                  {
                    path: "/admin/ProductManager/Products/list-products",
                    name: "List of Products",
                  },
                  {
                    path: "/admin/ProductManager/Products/categories",
                    name: "Categories",
                  },

                  {
                    path: "/admin/ProductManager/Products/brands",
                    name: "Brands",
                  },
                  {
                    path: "/admin/ProductManager/Products/units",
                    name: "Unit",
                  },
                  {
                    path: "/admin/ProductManager/Products/suppliers-list",
                    name: "Suppliers List",
                  },
                  {
                    path: "/admin/ProductManager/Products/show-reviews",
                    name: "Product Reviews",
                  },
                  {
                    path: "/admin/ProductManager/Products/set-alerts",
                    name: "Set Quantity Alerts",
                  },
                ],
              },
            ],
          },
          {
            // path: "/people",
            name: "People",
            icon: <FiUsers />,
            subRoutes: [
            
                {
                // path: "/people/general-customers",
                name: "General Customers",
                subRoutes: [
                  {
                    path: "/admin/People/GeneralCustomers/add-customers",
                    name: "Add Customer",
                  },
                  {
                    path: "/admin/People/GeneralCustomers/all-customers",
                    name: "All Customers",
                  },
                  {
                    path: "/admin/People/GeneralCustomers/deleted-customers",
                    name: "Deleted Customers",
                  },
                ],
              },
              {
                // path: "/people/general-customers",
                name: "Agents",
                subRoutes: [
                  {
                    path: "/admin/People/add-agent",
                    name: "Add Agent",
                  },
                  {
                    path: "/admin/People/all-agents",
                    name: "All Agents",
                  }
                ],
              },
              {
                // path: "/basic-hr/employee",
                name: "Employee",
                subRoutes: [
                  {
                    path: "/admin/Basic-HR/Employees/list-employees",
                    name: "List of Employees",
                  },
                  {
                    path: "/admin/Basic-HR/Employees/add-employees",
                    name: "Add Employee",
                  },
                ],
              },
            ],
          },
          {
            // path: "/marketing-promotions",
            name: "Promotions",
            icon: <GiBugleCall />,
            exact: true,
            subRoutes: [
              {
                path: "/admin/Marketing-Promotions/contact-us",
                name: "Contact Us",
              },
              {
                path: "/admin/Marketing-Promotions/product-wishlist",
                name: "Product Wishlist",
              },
              {
                path: "/admin/Marketing-Promotions/all-subscribers",
                name: "Subscribers",
              },

              {
                path: "/admin/Marketing-Promotions/periodic-discounts",
                name: "Discounts",
              },

              {
                path: "/admin/marketing-promotions/coupons",
                name: "Coupons",
              },
              {
                path: "/admin/marketing-promotions/deals",
                name: "Deals",
              },
              {
                path: "/admin/Marketing-Promotions/subscription-discount",
                name: "Subscription Discount",
              },
              {
                name: "Ads",
                subRoutes: [
                  {
                    path: "/admin/Marketing-Promotions/headline-ads",
                    name: "Headline Ads",
                  },
                  {
                    path: "/admin/Marketing-Promotions/center-ads",
                    name: "Center Ads",
                  },
                ],
              },
              {
                name: "Marketing",
                subRoutes: [
                  {
                    path: "/admin/Marketing-Promotions/Marketing/user-searches",
                    name: "User Searches",
                  },
                  {
                    path: "/admin/Marketing-Promotions/Marketing/fail-orders",
                    name: "Failed Orders",
                  },
                  {
                    path: "/admin/Marketing-Promotions/Marketing/on-cart",
                    name: "On Cart",
                  },
                ],
              },
            ],
          },
          // {
            // path: "/basic-hr",
            // name: "Basic Hr",
            // icon: <CgUserList />,
            // subRoutes: [
              // {
              //   // path: "/basic-hr/employee",
              //   name: "Employee",
              //   subRoutes: [
              //     {
              //       path: "/admin/Basic-HR/Employees/list-employees",
              //       name: "List of Employees",
              //     },
              //     {
              //       path: "/admin/Basic-HR/Employees/add-employees",
              //       name: "Add Employee",
              //     },
              //   ],
              // },
            // ],
          // },
          {
            // path: "/basic-hr",
            name: "Reoprt",
            icon: <HiOutlineDocumentReport />,
            subRoutes: [
              {
                // path: "/basic-hr/employee",
                name: "Sales Report",
                subRoutes: [
                  {
                    path: "/admin/Report/Sales-Report/all-sales",
                    name: "All Sales",
                  },
                  {
                    path: "/admin/Report/Sales-Report/user-report",
                    name: "User Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/income-report",
                    name: "Income Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/pos-report",
                    name: "POS - sales",
                  },
                  {
                    path: "/admin/Report/Sales-Report/product-wise-report",
                    name: "Product wise sales",
                  },
                  {
                    path: "/admin/Report/Sales-Report/inventory-report",
                    name: "Inventory Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/product-report",
                    name: "Product Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/back-order-report",
                    name: "Back Order Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/subscription-report",
                    name: "Subscription Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/payment-report",
                    name: "Payment Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/Employee-sales-report",
                    name: "Employee Sales Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/Agent-sales-report",
                    name: "Agent Sales Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/card-report",
                    name: "Card Report",
                  },
                  {
                    path: "/admin/Report/Sales-Report/wishlist-report",
                    name: "Wishlist Report",
                  },
                ],
              },
            ],
          },

          {
            name: "Administrative",
            icon: <MdOutlineAdminPanelSettings />,
            subRoutes: [
              {
                name: "Setup",
                subRoutes: [
                  {
                    path: "/admin/Administrative/Setup/pick-up-point",
                    name: "Pickup Point",
                  },
                  {
                    name: "Shipping",
                    hasSubRoutes: true,
                    subRoutes: [
                      {
                        path: "/admin/Administrative/Setup/Shipping/shipping-config",
                        name: "Shipping Configuration",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Settings",
                subRoutes: [
                  {
                    path: "/admin/Administrative/Settings/roles-permission",
                    name: "Roles & Permission",
                  },
                  {
                    path: "/admin/Administrative/Settings/prefixes",
                    name: "Prefixes",
                  },
                  {
                    name: "Account Settings",
                    hasSubRoutes: true,
                    subRoutes: [
                      {
                        path: "/admin/Administrative/Settings/account-settings/profile",
                        name: "Profile",
                      },
                      {
                        path: "/admin/Administrative/Settings/account-settings/profile/change-profile",
                        name: "Change Password",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Website Setup",
                subRoutes: [
                  {
                    path: "/admin/Administrative/Website-Setup/sliders",
                    name: "Sliders",
                  },
                  {
                    path: "/admin/Administrative/Website-Setup/meta",
                    name: "Meta",
                  },
                  {
                    path: "/admin/Administrative/Website-Setup/pages",
                    name: "Pages",
                  },
                ],
              },
              {
                name: "Trash",
                subRoutes: [
                  {
                    path: "/admin/Administrative/Trash/deleted-orders",
                    name: "Deleted Orders",
                  },
                  {
                    path: "/admin/Administrative/Trash/deleted-products",
                    name: "Deleted Products",
                  },
                  {
                    path: "/admin/Administrative/Trash/deleted-categories",
                    name: "Deleted Categories",
                  },
                ],
              },
            ],
          },
        ]
      : [
          viewDashboard && {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <TbDashboard />,
          },
          viewMiscellaneous && {
            path: "/admin/miscellaneous",
            name: "Miscellaneous",
            icon: <MdMiscellaneousServices />,
            subRoutes: [
              viewNotification && {
                path: "/admin/miscellaneous/notifications",
                name: "Notifications",
              },
              viewTask && {
                path: "/admin/miscellaneous/tasks",
                name: "Tasks",
              },
              viewBlog && {
                path: "/admin/miscellaneous/blogs",
                name: "Blogs",
              },
            ],
          },

          viewSalesMain && {
            path: "/sales",
            name: "Sales",
            icon: <TbCoins />,
            subRoutes: [
              viewPos && {
                path: "/admin/sales/pos",
                name: "POS",
              },
              viewSalesChild && {
                // path: "/admin/miscellaneous/sales",
                name: "Orders",
                subRoutes: [
                  permissions.includes("View All Orders") && {
                    path: "/admin/Sales/all-orders",
                    name: "All Orders",
                  },
           
                  {
                    path: "/admin/Sales/subscription-orders",
                    name: "Subscription Orders",
                  },
                  permissions.includes("View All POS Orders") && {
                    path: "/admin/Sales/pos-orders",
                    name: "POS Orders",
                  },

                  permissions.includes("View All Pick-Up Orders") && {
                    path: "/admin/Sales/pickup-orders",
                    name: "Pick up Point Orders",
                  },
                  permissions.includes("View All Back Orders") && {
                    path: "/admin/Sales/back-orders",
                    name: "Back Orders",
                  },
                  permissions.includes("View All Invoice") && {
                    path: "/admin/Sales/Invoice-list",
                    name: "Invoice List",
                  },
                ],
              },
              permissions.includes("View All Subscription Orders") &&  {
                path:  "/admin/Sales/user-subscriptions",
                name: "User Subscriptions",
              },
            ],
          },
          viewProdManager && {
            name: "Product Manager",
            icon: <MdOutlineInventory />,
            subRoutes: [
              viewInvMain && {
                name: "Inventory",
                subRoutes: [
                  permissions.includes("View All Inventory") && {
                    path: "/admin/ProductManager/Inventory/product-inventory",
                    name: "Product Inventory",
                  },
                  permissions.includes("View Expiring Inventory") && {
                    path: "/admin/ProductManager/Inventory/expiring-soon",
                    name: "Expiring Soon",
                  },
                  permissions.includes("View Expired Inventory") && {
                    path: "/admin/ProductManager/Inventory/expired-stocks",
                    name: "Expired Stock",
                  },
                  permissions.includes("View Out-of-Stock Inventory") && {
                    path: "/admin/ProductManager/Inventory/stockout-products",
                    name: "Stockout Products",
                  },

                  permissions.includes("View Low Stock Inventory") && {
                    path: "/admin/ProductManager/Inventory/low-stock",
                    name: "Low Stock",
                  },
                ],
              },
              viewProdMain && {
                // path: "/product-manager/products",
                name: "Products",
                subRoutes: [
                  permissions.includes("Create Product") && {
                    path: "/admin/ProductManager/Products/add-products",
                    name: "Add Products",
                  },
                  permissions.includes("View All Product") && {
                    path: "/admin/ProductManager/Products/list-products",
                    name: "List of Products",
                  },
                  permissions.includes("View All Category") && {
                    path: "/admin/ProductManager/Products/categories",
                    name: "Categories",
                  },

                  permissions.includes("View All Brand") && {
                    path: "/admin/ProductManager/Products/brands",
                    name: "Brands",
                  },
                  permissions.includes("View All Unit") && {
                    path: "/admin/ProductManager/Products/units",
                    name: "Unit",
                  },
                  permissions.includes("View All Supplier") && {
                    path: "/admin/ProductManager/Products/suppliers-list",
                    name: "Suppliers List",
                  },
                  permissions.includes("View All Review") && {
                    path: "/admin/ProductManager/Products/show-reviews",
                    name: "Product Reviews",
                  },
                  permissions.includes("Set Quantity Alert Product") && {
                    path: "/admin/ProductManager/Products/set-alerts",
                    name: "Set Quantity Alerts",
                  },
                ],
              },
            ],
          },
          viewPeople && {
            // path: "/people",
            name: "People",
            icon: <FiUsers />,
            subRoutes: [
              viewGenCus && {
                // path: "/people/general-customers",
                name: "General Customers",
                subRoutes: [
                  permissions.includes("Create Customer") && {
                    path: "/admin/People/GeneralCustomers/add-customers",
                    name: "Add Customer",
                  },
                  permissions.includes("View All Customer") && {
                    path: "/admin/People/GeneralCustomers/all-customers",
                    name: "All Customers",
                  },
                  permissions.includes("View All Customer") && {
                    path: "/admin/People/GeneralCustomers/deleted-customers",
                    name: "Deleted Customers",
                  },
                ],
              },
              
              {
                // path: "/people/general-customers",
                name: "Agents",
                subRoutes: [
                  {
                    path: "/admin/People/add-agent",
                    name: "Add Agent",
                  },
                  {
                    path: "/admin/People/all-agents",
                    name: "All Agents",
                  }
                ],
              },
              viewEmpMain && {
                // path: "/basic-hr/employee",
                name: "Employee",
                subRoutes: [
                  permissions.includes("View All Employee") && {
                    path: "/admin/Basic-HR/Employees/list-employees",
                    name: "List of Employees",
                  },
                  permissions.includes("Create Employee") && {
                    path: "/admin/Basic-HR/Employees/add-employees",
                    name: "Add Employee",
                  },
                ],
              },
            ],
          },
          viewPromotion && {
            // path: "/marketing-promotions",
            name: "Promotions",
            icon: <GiBugleCall />,
            exact: true,
            subRoutes: [
              {
                path: "/admin/Marketing-Promotions/contact-us",
                name: "Contact Us",
              },
              permissions.includes("View All Wishlist") && {
                path: "/admin/Marketing-Promotions/product-wishlist",
                name: "Product Wishlist",
              },

              permissions.includes("View All Email Subscriber") && {
                path: "/admin/Marketing-Promotions/all-subscribers",
                name: "Subscribers",
              },

              permissions.includes("View All Discount") && {
                path: "/admin/Marketing-Promotions/periodic-discounts",
                name: "Discounts",
              },

              permissions.includes("View All Coupon") && {
                path: "/admin/marketing-promotions/coupons",
                name: "Coupons",
              },
              {
                path: "/admin/marketing-promotions/deals",
                name: "Deals",
              },
              permissions.includes("View All Subscription Discount") && {
                path: "/admin/Marketing-Promotions/subscription-discount",
                name: "Subscription Discount",
              },
              {
                name: "Ads",
                subRoutes: [
                  {
                    path: "/admin/Marketing-Promotions/headline-ads",
                    name: "Headline Ads",
                  },
                  {
                    path: "/admin/Marketing-Promotions/center-ads",
                    name: "Center Ads",
                  },
                ],
              },
              viewMarketing && {
                name: "Marketing",
                subRoutes: [
                  permissions.includes("View User Searches Marketing ") && {
                    path: "/admin/Marketing-Promotions/Marketing/user-searches",
                    name: "User Searches",
                  },
                  permissions.includes("View Failed Order Marketing ") && {
                    path: "/admin/Marketing-Promotions/Marketing/fail-orders",
                    name: "Failed Orders",
                  },
                  permissions.includes("View On Cart Marketing ") && {
                    path: "/admin/Marketing-Promotions/Marketing/on-cart",
                    name: "On Cart",
                  },
                ],
              },
            ],
          },
          // viewBasicHr && {
            // path: "/basic-hr",
            // name: "Basic Hr",
            // icon: <CgUserList />,
            // subRoutes: [
              // viewEmpMain && {
              //   // path: "/basic-hr/employee",
              //   name: "Employee",
              //   subRoutes: [
              //     permissions.includes("View All Employee") && {
              //       path: "/admin/Basic-HR/Employees/list-employees",
              //       name: "List of Employees",
              //     },
              //     permissions.includes("Create Employee") && {
              //       path: "/admin/Basic-HR/Employees/add-employees",
              //       name: "Add Employee",
              //     },
              //   ],
              // },
            // ],
          // },
          viewReportsMain && {
            // path: "/basic-hr",
            name: "Reoprt",
            icon: <HiOutlineDocumentReport />,
            subRoutes: [
              viewReportsMain && {
                // path: "/basic-hr/employee",
                name: "Sales Report",
                subRoutes: [
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/all-sales",
                    name: "All Sales",
                  },
                  permissions.includes("View User Report") && {
                    path: "/admin/Report/Sales-Report/user-report",
                    name: "User Report",
                  },
                  permissions.includes("View Income Report") && {
                    path: "/admin/Report/Sales-Report/income-report",
                    name: "Income Report",
                  },
                  permissions.includes("POS Sales Report") && {
                    path: "/admin/Report/Sales-Report/pos-report",
                    name: "POS - sales",
                  },
                  permissions.includes("View Product-Wise Sales Report") && {
                    path: "/admin/Report/Sales-Report/product-wise-report",
                    name: "Product wise sales",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/inventory-report",
                    name: "Inventory Report",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/product-report",
                    name: "Product Report",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/back-order-report",
                    name: "Back Order Report",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/subscription-report",
                    name: "Subscription Report",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/payment-report",
                    name: "Payment Report",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/Employee-sales-report",
                    name: "Employee Sales Report",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/Agent-sales-report",
                    name: "Agent Sales Report",
                  },
                  permissions.includes("View Sales Report") && {
                    path: "/admin/Report/Sales-Report/card-report",
                    name: "Card Report",
                  },
                  permissions.includes("View Wishlist Report") && {
                    path: "/admin/Report/Sales-Report/wishlist-report",
                    name: "Wishlist Report",
                  },
                ],
              },
            ],
          },

          {
            name: "Administrative",
            icon: <MdOutlineAdminPanelSettings />,
            subRoutes: [
              viewSetUp && {
                name: "Setup",
                subRoutes: [
                  permissions.includes("View All Pick-Up Point") && {
                    path: "/admin/Administrative/Setup/pick-up-point",
                    name: "Pickup Point",
                  },
                  permissions.includes("View All Shipping Charges") && {
                    name: "Shipping",
                    hasSubRoutes: true,
                    subRoutes: [
                      permissions.includes("View All Shipping Charges") && {
                        path: "/admin/Administrative/Setup/Shipping/shipping-config",
                        name: "Shipping Configuration",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Settings",
                subRoutes: [
                  permissions.includes("View All Role & Permissions") && {
                    path: "/admin/Administrative/Settings/roles-permission",
                    name: "Roles & Permission",
                  },
                  permissions.includes("View All Prefix") && {
                    path: "/admin/Administrative/Settings/prefixes",
                    name: "Prefixes",
                  },
                  {
                    name: "Account Settings",
                    hasSubRoutes: true,
                    subRoutes: [
                      {
                        path: "/admin/Administrative/Settings/account-settings/profile",
                        name: "Profile",
                      },
                      {
                        path: "/admin/Administrative/Settings/account-settings/profile/change-profile",
                        name: "Change Password",
                      },
                    ],
                  },
                ],
              },
              viewWebSetup && {
                name: "Website Setup",
                subRoutes: [
                  permissions.includes("View All Website Slider") && {
                    path: "/admin/Administrative/Website-Setup/sliders",
                    name: "Sliders",
                  },
                  permissions.includes("View All Website Meta") && {
                    path: "/admin/Administrative/Website-Setup/meta",
                    name: "Meta",
                  },
                  permissions.includes("View All Website Pages") && {
                    path: "/admin/Administrative/Website-Setup/pages",
                    name: "Pages",
                  },
                ],
              },
              viewTrash && {
                name: "Trash",
                subRoutes: [
                  permissions.includes("View Order Trash") && {
                    path: "/admin/Administrative/Trash/deleted-orders",
                    name: "Deleted Orders",
                  },
                  permissions.includes("View Product Trash") && {
                    path: "/admin/Administrative/Trash/deleted-products",
                    name: "Deleted Products",
                  },
                  permissions.includes("View Category Trash") && {
                    path: "/admin/Administrative/Trash/deleted-categories",
                    name: "Deleted Categories",
                  },
                ],
              },
            ],
          },
        ];
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("sidebar-closed");
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "260",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="top_section">
        <AnimatePresence />
        <div className="bars">
          <HiOutlineBars3 onClick={toggle} />
        </div>
      </div>

      <div className="main">
        <motion.div
          animate={{
            width: isOpen ? "260px" : "80px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar ${isOpen ? "" : "sidebar-closed"}`}
        >
          <section>
            <div className="routes">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      key={index}
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  route && (
                    <NavLink to={route.path} key={index} className="menu-link">
                      <div className="icon">{route.icon}</div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text"
                          >
                            {route.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  )
                );
              })}
            </div>

            <hr />
            <div>
              <p className="help-text">
                <Link className="help-text" to="mailto:info@designdot.co">
                  Help
                </Link>
              </p>
              <span className="small-text">
                Copyright © 2023 <b>DesignDot</b>
              </span>
            </div>
          </section>
        </motion.div>

        <main className={`main-container ${isOpen ? "" : "sidebar-closed"}`}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
