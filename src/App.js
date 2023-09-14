import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/Layout/Header/Header";
import Sidebar from "./components/Layout/Sidebar/Sidebar";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Tasks from "./components/Pages/MainPages/Miscelaneous/Tasks/Tasks";
import Notifications from "./components/Pages/MainPages/Miscelaneous/Notifications/Notifications.jsx";
import Blogs from "./components/Pages/MainPages/Miscelaneous/Blogs/Blogs";
import AddBlog from "./components/Pages/MainPages/Miscelaneous/Blogs/AddBlog";
import PoS from "./components/Pages/MainPages/Sales/POS/Pos";
import POSThankyou from "./components/Pages/MainPages/Sales/POS/Thankyou.jsx";

import AllOrder from "./components/Pages/MainPages/Sales/Sale/Orders/Allorder";
import SubsOrder from "./components/Pages/MainPages/Sales/Sale/Orders/UserSubscriptions";
import PickupOrder from "./components/Pages/MainPages/Sales/Sale/Orders/PickupOrders";
import PosOrder from "./components/Pages/MainPages/Sales/Sale/Orders/PosOrder";
import BackOrder from "./components/Pages/MainPages/Sales/Sale/Orders/BackOrders";
import InvoiceList from "./components/Pages/MainPages/Sales/Sale/Invoice/InvoiceList";

import ProductInventory from "./components/Pages/MainPages/ProductManager/Inventory/Inventores/ProductInventory";
import ExpiredStocks from "./components/Pages/MainPages/ProductManager/Inventory/Expired/ExpiredStock";
import ExpiringSoon from "./components/Pages/MainPages/ProductManager/Inventory/Expiring/ExpiringSoon";
import LowStock from "./components/Pages/MainPages//ProductManager/Inventory/Low/LowStock";
import StockoutProducts from "./components/Pages/MainPages/ProductManager/Inventory/Stockout/StockoutProducts";

import AddProducts from "./components/Pages/MainPages/ProductManager/Products/Add/AddProducts";
import EditProducts from "./components/Pages/MainPages/ProductManager/Products/Add/EditProducts";
import ViewProduct from "./components/Pages/MainPages/ProductManager/Products/Add/ViewProduct";
import ListOfProducts from "./components/Pages/MainPages/ProductManager/Products/List/ListProducts";
import Categories from "./components/Pages/MainPages/ProductManager/Products/Categories/Categories";
import AddCategories from "./components/Pages/MainPages/ProductManager/Products/Categories/AddCategories";
import EditCategories from "./components/Pages/MainPages/ProductManager/Products/Categories/EditCategories";

import ProductHistory from "./components/Pages/MainPages/ProductManager/Products/History/ProductHistory";

import Brands from "./components/Pages/MainPages/ProductManager/Products/Brand/Brands";
import AddBrand from "./components/Pages/MainPages/ProductManager/Products/Brand/AddBrands";
import EditBrand from "./components/Pages/MainPages/ProductManager/Products/Brand/EditBrands";

import Units from "./components/Pages/MainPages/ProductManager/Products/Unit/Unit";
import AddUnit from "./components/Pages/MainPages/ProductManager/Products/Unit/AddUnit";
import EditUnit from "./components/Pages/MainPages/ProductManager/Products/Unit/EditUnit";

import Suppliers from "./components/Pages/MainPages/ProductManager/Products/Supplier/SuppliersList";
import EditSuppliers from "./components/Pages/MainPages/ProductManager/Products/Supplier/EditSuppliers";

import AddSuppliers from "./components/Pages/MainPages/ProductManager/Products/Supplier/AddSuppliers";
import ProductReiews from "./components/Pages/MainPages/ProductManager/Products/Reviews/ProductReviews";
import SetAlerts from "./components/Pages/MainPages/ProductManager/Products/Alerts/SetAlert";

import CustomerForm from "./components/Pages/MainPages/People/Customers/AddCustomers";

import AllCustomers from "./components/Pages/MainPages/People/Customers/AllCustomers";
import DeletedCustomers from "./components/Pages/MainPages/People/Customers/DeletedCustomers";
// import EditCustomers from "./components/Pages/MainPages/People/Customers/EditCustomers";

import ProductWishlist from "./components/Pages/MainPages/MarketingPromotions/Wishlist/ProductWishlist";
import AddtoWislist from "./components/Pages/MainPages/MarketingPromotions/Wishlist/AddtoWishlist";
import AllSubscribers from "./components/Pages/MainPages/MarketingPromotions/Subscribers/AllSubscribers";
import SubscriptionDiscount from "./components/Pages/MainPages/MarketingPromotions/SubsDiscount/SubscriptionDiscount";
import AddSubscriptionDiscount from "./components/Pages/MainPages/MarketingPromotions/SubsDiscount/AddSubsDiscount";

import Discount from "./components/Pages/MainPages/MarketingPromotions/Discount/Discount";
import AddPeriodicDiscount from "./components/Pages/MainPages/MarketingPromotions/Discount/AddDiscount";

import Coupons from "./components/Pages/MainPages/MarketingPromotions/Coupon/Coupon";
import AddCoupons from "././components/Pages/MainPages/MarketingPromotions/Coupon/AddCoupon";

import UserSearches from "./components/Pages/MainPages/MarketingPromotions/Marketing/UserSearch/UserSearches";
import FailOrders from "./components/Pages/MainPages/MarketingPromotions/Marketing/FailOrder/FailedOrders";
import OnCart from "./components/Pages/MainPages/MarketingPromotions/Marketing/OnCart/OnCart";

import ListEmployees from "./components/Pages/MainPages/BasicHR/Employee/ListEmployees";
import AddEmployees from "./components/Pages/MainPages/BasicHR/Employee/AddEmployee";

import AllSales from "./components/Pages/MainPages/Reports/SalesReport/AllSales/AllSales";
import UserReport from "./components/Pages/MainPages/Reports/SalesReport/UserReport/UserReport";
import IncomeReport from "./components/Pages/MainPages/Reports/SalesReport/IncomeReport/IncomeReport";
import PosReport from "./components/Pages/MainPages/Reports/SalesReport/PosReport/PosReport";
import ProductWiseReport from "./components/Pages/MainPages/Reports/SalesReport/ProductWiseReport/ProductWiseReport";
import BackOrderReport from "./components/Pages/MainPages/Reports/SalesReport/BackOrderReport/BackOrderReport";
import SubscriptionReport from "./components/Pages/MainPages/Reports/SalesReport/SubscriptionReport/SubscriptionReport";
import PaymentReport from "./components/Pages/MainPages/Reports/SalesReport/PaymentReport/PaymentReport";
import EmployeeSalesReport from "./components/Pages/MainPages/Reports/SalesReport/EmpSalesReport/EmpSalesReport";
import AgentSalesReport from "./components/Pages/MainPages/Reports/SalesReport/AgentSales/AgentSales";
import WishlistReport from "./components/Pages/MainPages/Reports/SalesReport/WishlistReport/WishlistReport";
import PickupPoint from "./components/Pages/MainPages/Administrative/Setup/PickupPoint/PickupPoint";
import AddPickupPoint from "./components/Pages/MainPages/Administrative/Setup/PickupPoint/AddPickupPoint";
import ShippingConfiguration from "./components/Pages/MainPages/Administrative/Setup/Shipping/ShippingConfig";
import RolesPermissions from "./components/Pages/MainPages/Administrative/Settings/RolesPermissions/RolesPermissions";
import AddRoleAndPremissions from "./components/Pages/MainPages/Administrative/Settings/RolesPermissions/AddRolePermission";
import Prefixes from "./components/Pages/MainPages/Administrative/Settings/Prefixes/Prefixes";
import Profile from "./components/Pages/MainPages/Administrative/Settings/AccountSettings/Profile";
import ChangePassword from "./components/Pages/MainPages/Administrative/Settings/AccountSettings/ChangePassword";
import Sliders from "./components/Pages/MainPages/Administrative/WebsiteSetup/Sliders/Sliders";
import AddSlider from "./components/Pages/MainPages/Administrative/WebsiteSetup/Sliders/AddSlider";
import Meta from "./components/Pages/MainPages/Administrative/WebsiteSetup/Meta/Meta";
import AddMeta from "./components/Pages/MainPages/Administrative/WebsiteSetup/Meta/AddMeta";

import DeletedOrders from "./components/Pages/MainPages/Administrative/Trash/DeletedOrders";
import DeletedProducts from "./components/Pages/MainPages/Administrative/Trash/DeletedProducts";
import DeletedCategories from "./components/Pages/MainPages/Administrative/Trash/DeletedCategories";

import ViewOrderDetails from "./components/Pages/MainPages/ViewDetails/ViewOrderDetails";
import ViewInvoiceDetails from "./components/Pages/MainPages/ViewDetails/ViewInvoice";
import ViewAndUpdateStatus from "./components/Pages/MainPages/ViewDetails/ViewStatus";

import LoginForm from "./features/auth/LoginForm";
import ForgotPasswordForm from "./features/auth/ForgotPassword";
import AuthLayout from "./components/Layout/AuthLayout/AuthLayout";
import { useSelector } from "react-redux";
import OrdersPerCustomer from "./components/Pages/MainPages/Sales/Sale/Orders/OrdersPerCustomer";
import ViewNotes from "./components/Pages/MainPages/ViewDetails/ViewNotes";
import CardReport from "./components/Pages/MainPages/Reports/SalesReport/CardReport/CardReport";
import ProductReport from "./components/Pages/MainPages/Reports/SalesReport/ProductReport/ProductReport";
import InventoryReport from "./components/Pages/MainPages/Reports/SalesReport/InventoryReport/InventoryReport";
import HeadlineAds from "./components/Pages/MainPages/MarketingPromotions/Ads/Headline/HeadlineAds";
import AddHeadlineAds from "./components/Pages/MainPages/MarketingPromotions/Ads/Headline/AddHeadlineAds";
import CenterAds from "./components/Pages/MainPages/MarketingPromotions/Ads/Center/CenterAds";
import AddCenterAds from "./components/Pages/MainPages/MarketingPromotions/Ads/Center/AddCenterAds";
import ContactUs from "./components/Pages/MainPages/MarketingPromotions/ContactUs/ContactUs";
import Deals from "./components/Pages/MainPages/MarketingPromotions/Deals/Deals";
import AddDeals from "./components/Pages/MainPages/MarketingPromotions/Deals/AddDeals";
import SetupPages from "./components/Pages/MainPages/PagesStup/PagesSetup";
import AddAgent from "./components/Pages/MainPages/Agents/AddAgent";
import Agents from "./components/Pages/MainPages/Agents/Agent";
import UserSubscriptions from "./components/Pages/MainPages/Sales/Sale/Orders/UserSubscriptions";
import SubscriptionOrders from "./components/Pages/MainPages/Sales/Sale/Orders/SubscriptionOrders";
// import NotFound from "./components/Pages/NotFound";

const MainLayout = ({ children }) => (
  <>
    <Header />
    <Sidebar>{children}</Sidebar>
  </>
);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // ProtectedRoute component to handle conditional rendering based on authentication
  // eslint-disable-next-line no-unused-vars
  const ProtectedRoute = ({ element, ...rest }) => {
    if (isLoggedIn) {
      return <Route {...rest} element={element} />;
    } else {
      return <Navigate to="/admin" replace />;
    }
  };
  // ProtectedRoute()

  return (
    <Routes>
      <Route
        path="/admin/"
        element={
          <AuthLayout>
            <LoginForm />
          </AuthLayout>
        }
      />
      <Route
        path="/admin/adminpanel/forgot-password"
        element={
          <AuthLayout>
            <ForgotPasswordForm />
          </AuthLayout>
        }
      />
      {/* <Route path="/admin" element={<Dashboard />} /> */}

      {/* Main Layout */}
   
        <Route path="/admin/*" element={  isLoggedIn ? <MainLayout> {/* Note the <Outlet> component here */}
          <Outlet />

          {/* Main Pages */}
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="miscellaneous/tasks" element={<Tasks />} />
            <Route path="miscellaneous/notifications" element={<Notifications />} />
            <Route path="miscellaneous/blogs" element={<Blogs />} />
            <Route path="miscellaneous/addBlogs" element={<AddBlog />} />
            <Route path="miscellaneous/editBlog/:id" element={<AddBlog />} />
          </Routes>

          {/* Sales */}
          <Routes>
            <Route path="Sales/PoS" element={<PoS />} />
            <Route path="Sales/all-orders" element={<AllOrder />} />

            <Route path="Sales/subscription-orders" element={<SubscriptionOrders />} />

            <Route path="Sales/user-subscriptions" element={<UserSubscriptions />} />
            <Route path="Sales/pickup-orders" element={<PickupOrder />} />
            <Route path="Sales/customer-orders/:id" element={<OrdersPerCustomer />} />

            <Route path="Sales/pos-orders" element={<PosOrder />} />
            <Route path="Sales/back-orders" element={<BackOrder />} />
            <Route path="Sales/Invoice-list" element={<InvoiceList />} />
            <Route path="Sales/pos-thankyou/:id" element={<POSThankyou />} />
          </Routes>

          {/* Product Manager */}
          <Routes>
            <Route path="ProductManager/Inventory/product-inventory" element={<ProductInventory />} />
            <Route path="ProductManager/Inventory/expired-stocks" element={<ExpiredStocks />} />
            <Route path="ProductManager/Inventory/expiring-soon" element={<ExpiringSoon />} />
            <Route path="ProductManager/Inventory/low-stock" element={<LowStock />} />
            <Route path="ProductManager/Inventory/stockout-products" element={<StockoutProducts />} />
            <Route path="ProductManager/Products/add-products" element={<AddProducts />} />
            <Route path="ProductManager/Products/edit-products/:id" element={<EditProducts />} />
            <Route path="ProductManager/Products/view-products/:id" element={<ViewProduct />} />

            <Route path="ProductManager/Products/list-products" element={<ListOfProducts />} />
            <Route path="ProductManager/Products/categories" element={<Categories />} />
            <Route path="ProductManager/Products/add-categories" element={<AddCategories />} />
            <Route path="ProductManager/Products/edit-categories/:id" element={<EditCategories />} />
            <Route path="ProductManager/Products/brands" element={<Brands />} />
            <Route path="ProductManager/Products/add-brands" element={<AddBrand />} />
            <Route path="ProductManager/Products/edit-brands/:id" element={<EditBrand />} />
            <Route path="ProductManager/Products/units" element={<Units />} />
            <Route path="ProductManager/Products/add-unit" element={<AddUnit />} />
            <Route path="ProductManager/Products/edit-unit/:id" element={<EditUnit />} />
            <Route path="ProductManager/Products/suppliers-list" element={<Suppliers />} />
            <Route path="ProductManager/Products/add-supplierslist" element={<AddSuppliers />} />
            <Route path="ProductManager/Products/edit-supplier/:id" element={<EditSuppliers />} />

            <Route path="ProductManager/Products/show-reviews" element={<ProductReiews />} />
            <Route path="ProductManager/Products/set-alerts" element={<SetAlerts />} />
          </Routes>

          {/* People */}
          <Routes>
            <Route path="People/GeneralCustomers/add-customers" element={<CustomerForm />} />
            <Route path="People/GeneralCustomers/all-customers" element={<AllCustomers />} />
            <Route path="People/GeneralCustomers/deleted-customers" element={<DeletedCustomers />} />
            <Route path="People/GeneralCustomers/edit-customers/:id" element={<CustomerForm />} />
            <Route path="People/add-agent" element={<AddAgent />} />
            <Route path="People/all-agents" element={<Agents />} />
            <Route path="People/edit-agent/:id" element={<AddAgent />} />
          </Routes>
          {/* People */}

          {/* Marketing Promotions */}
          <Routes>
            <Route path="Marketing-Promotions/product-wishlist" element={<ProductWishlist />} />
            <Route path="Marketing-Promotions/product-wishlist/add-to-products" element={<AddtoWislist />} />
            <Route path="Marketing-Promotions/all-subscribers" element={<AllSubscribers />} />
            <Route path="Marketing-Promotions/subscription-discount" element={<SubscriptionDiscount />} />
            <Route path="Marketing-Promotions/add-subscription-discount" element={<AddSubscriptionDiscount />} />
            <Route path="Marketing-Promotions/edit-subscription-discount/:id" element={<AddSubscriptionDiscount />} />
            <Route path="Marketing-Promotions/periodic-discounts" element={<Discount />} />
            <Route path="Marketing-Promotions/add-periodic-discount" element={<AddPeriodicDiscount />} />
            <Route path="Marketing-Promotions/edit-periodic-discount/:id" element={<AddPeriodicDiscount />} />
            <Route path="Marketing-Promotions/coupons" element={<Coupons />} />
            <Route path="Marketing-Promotions/add-coupons" element={<AddCoupons />} />
            <Route path="Marketing-Promotions/deals" element={<Deals />} />
            <Route path="Marketing-Promotions/add-deals" element={<AddDeals />} />
            <Route path="Marketing-Promotions/edit-deals/:id" element={<AddDeals />} />
            <Route path="Marketing-Promotions/Marketing/user-searches" element={<UserSearches />} />
            <Route path="Marketing-Promotions/Marketing/fail-orders" element={<FailOrders />} />
            <Route path="Marketing-Promotions/Marketing/on-cart" element={<OnCart />} />
            <Route path="Marketing-Promotions/headline-ads" element={<HeadlineAds />} />
            <Route path="Marketing-Promotions/add-headline-ads/:id" element={<AddHeadlineAds />} />
            <Route path="Marketing-Promotions/center-ads" element={<CenterAds />} />
            <Route path="Marketing-Promotions/add-center-ads/:id" element={<AddCenterAds />} />
            <Route path="Marketing-Promotions/contact-us" element={<ContactUs />} />
          </Routes>

          {/* Basic HR */}
          <Routes>
            <Route path="Basic-HR/Employees/list-employees" element={<ListEmployees />} />
            <Route path="Basic-HR/Employees/add-employees" element={<AddEmployees />} />
            <Route path="Basic-HR/Employees/edit-employees/:id" element={<AddEmployees />} />
          </Routes>

          {/* Administrative */}
          <Routes>
            <Route path="Administrative/Setup/pick-up-point" element={<PickupPoint />} />
            <Route path="Administrative/Setup/add-pick-up-point" element={<AddPickupPoint />} />
            <Route path="Administrative/Setup/Shipping/shipping-config" element={<ShippingConfiguration />} />
            <Route path="Administrative/Settings/roles-permission" element={<RolesPermissions />} />
            <Route path="Administrative/Settings/add-roles" element={<AddRoleAndPremissions />} />
            <Route path="Administrative/Settings/edit-roles/:id" element={<AddRoleAndPremissions />} />
            <Route path="Administrative/Settings/prefixes" element={<Prefixes />} />
            <Route path="Administrative/Settings/account-settings/profile" element={<Profile />} />
            <Route path="Administrative/Settings/account-settings/profile/change-profile" element={<ChangePassword />} />
            <Route path="Administrative/Website-Setup/sliders" element={<Sliders />} />
            <Route path="Administrative/Website-Setup/add-sliders" element={<AddSlider />} />
            <Route path="Administrative/Website-Setup/sliders/edit-sliders/:id" element={<AddSlider />} />
            <Route path="Administrative/Website-Setup/meta" element={<Meta />} />
            <Route path="Administrative/Website-Setup/pages" element={<SetupPages />} />
            <Route path="Administrative/Website-Setup/add-meta" element={<AddMeta />} />

            <Route path="Administrative/Website-Setup/edit-meta/:id" element={<AddMeta />} />
          </Routes>

          {/* Administrative */}
          {/* Reports */}
          <Routes>
            <Route path="Report/Sales-Report/all-sales" element={<AllSales />} />
            <Route path="Report/Sales-Report/user-report" element={<UserReport />} />
            <Route path="Report/Sales-Report/income-report" element={<IncomeReport />} />
            <Route path="Report/Sales-Report/pos-report" element={<PosReport />} />
            <Route path="Report/Sales-Report/product-wise-report" element={<ProductWiseReport />} />
            <Route path="Report/Sales-Report/back-order-report" element={<BackOrderReport />} />
            <Route path="Report/Sales-Report/subscription-report" element={<SubscriptionReport />} />
            <Route path="Report/Sales-Report/payment-report" element={<PaymentReport />} />
            <Route path="Report/Sales-Report/Employee-sales-report" element={<EmployeeSalesReport />} />
            <Route path="Report/Sales-Report/Agent-sales-report" element={<AgentSalesReport />} />
            <Route path="Report/Sales-Report/wishlist-report" element={<WishlistReport />} />
            <Route path="Report/Sales-Report/card-report" element={<CardReport />} />
            <Route path="Report/Sales-Report/product-report" element={<ProductReport />} />
            <Route path="Report/Sales-Report/inventory-report" element={<InventoryReport />} />
          </Routes>
          {/* Reports */}

          {/* Trash */}
          <Routes>
            <Route path="Administrative/Trash/deleted-orders" element={<DeletedOrders />} />
            <Route path="Administrative/Trash/deleted-products" element={<DeletedProducts />} />
            <Route path="Administrative/Trash/deleted-categories" element={<DeletedCategories />} />
          </Routes>

          {/* Admin */}
          <Routes>
            <Route path="Admin/view-order-details/:id" element={<ViewOrderDetails />} />
            <Route path="Admin/view-invoice-details/:id" element={<ViewInvoiceDetails />} />
            <Route path="Admin/view-and-update-status/:id" element={<ViewAndUpdateStatus />} />
            <Route path="Admin/view-and-take-notes/:id" element={<ViewNotes />} />
          </Routes>

          {/* History */}
          <Routes>
            <Route path="History/product-history/:id" element={<ProductHistory />} />
          </Routes>

          {/* Catch-all for 404 routes */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </MainLayout>:(
            <Navigate to="/admin" replace />
          )} />

       


    </Routes>
  );
}

export default App;
