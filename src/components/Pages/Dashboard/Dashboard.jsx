import React, { useState } from "react";
import Cards from "./Cards/Cards";
import "./Dashboard.css";
// import { BiBarChartSquare } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import RecentActivitiesTable from "./TableData/RecentActivitiesTable";
import LineCharts from "./Chart/LineCharts";
import TopClients from "./TableData/TopClients";
import MainPopup from "./MainPopup/MainPopup";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
// import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeIcon from "@mui/icons-material/Home";
import TopLowStocks from "./TableData/LowStockProducts";
import TopNotifications from "./TableData/TopNotificatons";
import RecentSalesOrderExpected from "./TableData/RecentSalesOrderExpected";

import NewOrder from "./TableData/NewOrders";
import LastDeliverd from "./TableData/LastDeliverd";
import { useEffect } from "react";
import axios from "axios";
import { APIBASE } from "../../auth/apiConfig";
// import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [totalSalesThisMonth, setTotalSalesThisMonth] = useState(0);
  const [totalSalesAmountThisMonth, setTotalSalesAmountThisMonth] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [availableProducts, setAvailableProducts] = useState(0);
  const [recentInvoice, setRecentInvoice] = useState([]);
  const [lastDelivered, setLastDelivered] = useState([]);
  const [topClients, setTopClients] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [reminders, setReminders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [expiringSoon, setExpiringSoon] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [expiredStock, setExpiredStock] = useState([]);
  const [totalLowStock, setTotalLowStock] = useState(0);
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalExpired, setTotalExpired] = useState(0);
  const [totalOutOfStock, setTotalOutOfStock] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [totalSubs, setTotalSubs] = useState(0);
  const [allShippedOrders, setAllShippedOrders] = useState([]);
  const [stockOutNotif, setStockOutNotif] = useState([]);
  const [lowStockNotif, setLowStockNotif] = useState([]);
  const [expiredNotif, setExpiredNotif] = useState([]);

  const [totalBackOrders, setTotalBackOrders] = useState(0);
  const [totalInStore, setTotalInStore] = useState(0);
  const [totalPickupOrder, setTotalPickupOrder] = useState(0);

  useEffect(() => {
    getTotalSales();
    getTotalSalesAmount();
    getAvailableProducts();
    getLastDelivered();
    getLastInvoices();
    getTotalCustomers();
    getTotalEmployees();
    getTotalSalesAmountThisMonth();
    getTotalSalesThisMonth();
    getTopClients();
    getReminders();
    getExpiringSoon();
    getExpiredStock();
    getTotalLowStock();
    getTotalDelivered();
    getTotalPendingOrders();
    getTotalExpired();
    getTotalOutOfStock();
    getLowStockProducts();
    getNewOrders();
    getTotalSubscriptions();
    getAllShippedOrders();
    getAllLowStockNotif();
    getAllStockOutNotif();
    getAllExpiredNotif();
    getAllTotalBackOrders();
    getAllTotalPickupOrders();
    getAllTotalInStore();
  }, []);

  const getAllTotalBackOrders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-total-back-order`);
      setTotalBackOrders(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  const getAllTotalPickupOrders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-total-pickup-order`);
      setTotalPickupOrder(res.data);
    } catch (error) {
      //console.log(error);
    }
  };
  const getAllTotalInStore = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-total-instore-order`);
      setTotalInStore(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  const getAllExpiredNotif = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/expired-notify`);
      setExpiredNotif(res.data.expired);
    } catch (error) {
      //console.log(error);
    }
  };

  const getAllStockOutNotif = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/out-of-stock-notify`);
      setStockOutNotif(res.data.stock_out);
    } catch (error) {
      //console.log(error);
    }
  };

  const getAllLowStockNotif = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/low-stock-notify`);
      setLowStockNotif(res.data.low_stock);
    } catch (error) {
      //console.log(error);
    }
  };

  const getAllShippedOrders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-expected-shipped`);
      setAllShippedOrders(res.data.expected_shipped);
    } catch (error) {
      //console.log(error);
    }
  };

  const getTotalSubscriptions = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-total-subscriptions`);
      setTotalSubs(res.data.total_subsriptions);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total sales
  const getNewOrders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-new-order`);
      setNewOrders(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  //get total sales
  const getLowStockProducts = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-low-stock-product`);
      setLowStockProducts(res.data.products);
    } catch (error) {
      //console.log(error);
    }
  };
  //get total sales
  const getTotalOutOfStock = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-total-out-of-stock`);
      setTotalOutOfStock(res.data.total_stock_out);
    } catch (error) {
      //console.log(error);
    }
  };
  //get total sales
  const getTotalExpired = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-total-expired-stock`);
      setTotalExpired(res.data.total_expired);
    } catch (error) {
      //console.log(error);
    }
  };
  //get total sales
  const getTotalPendingOrders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-pending-status-order`);
      setTotalPendingOrders(res.data.pending_orders);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total sales
  const getTotalDelivered = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-delivered-status-order`);
      setTotalDelivered(res.data.delivered_orders);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total sales
  const getTotalLowStock = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-total-low-stock`);
      setTotalLowStock(res.data.total_low_stock);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total sales
  const getExpiredStock = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-expired-stock`);
      setExpiredStock(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total sales
  const getTotalSales = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/total-sales`);
      setTotalSales(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  // get total sale amount
  const getTotalSalesAmount = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/total-sales-amount`);
      setTotalSalesAmount(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  // get total sales this month
  const getTotalSalesThisMonth = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/this-month-sales`);
      setTotalSalesThisMonth(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total Customers

  const getTotalCustomers = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/total-customers`);
      setTotalCustomers(res.data);
    } catch (error) {
      //console.log(error);
    }
  };
  //get total Customers

  const getTotalEmployees = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/total-employees`);
      setTotalEmployees(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total products

  const getAvailableProducts = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/total-products`);
      setAvailableProducts(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  // get last invoices

  const getLastInvoices = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-invoices`);
      setRecentInvoice(res.data);
    } catch (error) {
      //console.log(error);
    }
  };
  //get last delivered

  const getLastDelivered = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/last-delivered-order`);
      setLastDelivered(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  //get total sales amount this month

  const getTotalSalesAmountThisMonth = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/total-earn-this-month`);
      setTotalSalesAmountThisMonth(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  //get top clients

  const getTopClients = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-top-customers`);
      setTopClients(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  // get reminder

  const getReminders = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/get-reminders`);
      setReminders(res.data);
    } catch (error) {
      //console.log(error);
    }
  };
  // get expiringSoon

  const getExpiringSoon = async () => {
    try {
      const res = await axios.get(
        `${APIBASE}admin/get-expiring-soon-product/5`
      );
      setExpiringSoon(res.data);
    } catch (error) {
      //console.log(error);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      {/* <MainPopup /> */}
      {isPopupVisible && (
        <MainPopup onSave={handleClosePopup} onCancel={handleClosePopup} />
      )}
      {/* Rest of the component code */}

      {/* Dashboard */}
      <div className="main-content">
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}> Shop Nmac Dashboard</h6>
        </div>
        <hr />
        <section className="card-section">
          <div className="row-conatiner mb-4 mt-4">
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total  Sales / Orders"
              link="/admin/Sales/all-orders"
              value={totalSales}
              icon={ShoppingBagOutlinedIcon}
              iconColor="#673AB7"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total Sales Amount"
              value={"$" + totalSalesAmount}
              icon={ShoppingBagOutlinedIcon}
              iconColor="#FF5722"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total Sales of This Month"
              value={totalSalesThisMonth}
              icon={ShoppingBagOutlinedIcon}
              iconColor="#118803"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Earning of this month"
              value={"$" + totalSalesAmountThisMonth}
              icon={AttachMoneyOutlinedIcon}
              iconColor="#2196f3"
            />
          </div>

          {/* secon row */}
          <div className="row-conatiner mb-4">
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total Customers"
              link="/admin/People/GeneralCustomers/all-customers"
              value={totalCustomers}
              icon={PeopleAltOutlinedIcon}
              iconColor="#673AB7"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total Employees"
              link="/admin/Basic-HR/Employees/list-employees"
              value={totalEmployees}
              icon={PeopleAltOutlinedIcon}
              iconColor="#FF5722"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total Subscriptions"
              link="/admin/Sales/subscription-orders"
              value={totalSubs}
              icon={ShoppingCartOutlinedIcon}
              iconColor="#118803"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Available Products"
              link="/admin/ProductManager/Products/list-products"
              value={availableProducts}
              icon={ShoppingCartOutlinedIcon}
              iconColor="#2196f3"
            />
          </div>
          {/* third row */}
          <div className="row-conatiner mb-4">
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total Low Stock"
              link="/admin/ProductManager/Inventory/low-stock"
              value={totalLowStock}
              icon={ShoppingBagOutlinedIcon}
              iconColor="#673AB7"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              link="/admin/ProductManager/Inventory/expired-stocks"
              title="Total Expired Product"
              value={totalExpired}
              icon={ShoppingBagOutlinedIcon}
              iconColor="#FF5722"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Out of Stock"
              link="/admin/ProductManager/Inventory/stockout-products"
              value={totalOutOfStock}
              icon={ShoppingBagOutlinedIcon}
              iconColor="#118803"
            />
            <Cards
              color="#333"
              backgroundColor="#fff"
              title="Total Delivered Order"
              value={totalDelivered}
              icon={ShoppingBagOutlinedIcon}
              iconColor="#2196f3"
            />
          </div>

          {/* coloured cards */}
          {/* coloured cards */}
          <div className="row-conatiner">
            {/* <Cards
              backgroundColor="#FF9B4A"
              title="Orders Received"
              className="iconsize"
              value={totalDelivered}
              icon={AiOutlineDollarCircle}
              color="#fff"
              iconColor="#ffffff80"
            /> */}
            <Cards
              backgroundColor="#ff5e52"
              title="Pending Orders"
              className="iconsize"
              value={totalPendingOrders}
              icon={AiOutlineDollarCircle}
              link="/admin/Sales/all-orders"
              color="#fff"
              iconColor="#ffffff80"
            />
            {/* <Cards
              backgroundColor="#ff5e52"
              title="Orders Deliverd"
              className="iconsize"
              value={totalDelivered}
              icon={AiOutlineDollarCircle}
              color="#fff"
              iconColor="#ffffff80"
            /> */}
            <Cards
              // backgroundColor="#32FF00"
              backgroundColor="#FFC800"
              title="Back Orders"
              className="iconsize"
              value={totalBackOrders}
              link="/admin/Sales/back-orders"
              icon={AiOutlineDollarCircle}
              color="#fff"
              iconColor="#ffffff80"
            />
            <Cards
              backgroundColor="#673ab7"
              title="Instore Orders"
              className="iconsize"
              value={totalInStore}
              link="/admin/Sales/all-orders"
              icon={AiOutlineDollarCircle}
              color="#fff"
              iconColor="#ffffff80"
            />
            <Cards
              backgroundColor="#00E5E5"
              title="Pickup Orders"
              className="iconsize"
              link= "/admin/Sales/pickup-orders"
              value={totalPickupOrder}
              icon={AiOutlineDollarCircle}
              color="#fff"
              iconColor="#ffffff80"
            />
          </div>
          {/* Coloured Cards 2 */}

          <div className="row-conatiner">
            {/* <Cards
              backgroundColor="#673ab7"
              title="Instore Orders"
              className="iconsize"
              value={totalDelivered}
              icon={AiOutlineDollarCircle}
              color="#fff"
              iconColor="#ffffff80"
            />
            <Cards
              backgroundColor="#FFC800"
              title="Pickup Orders"
              className="iconsize"
              value={totalPendingOrders}
              icon={AiOutlineDollarCircle}
              color="#fff"
              iconColor="#ffffff80"
            /> */}
          </div>
        </section>

        <section className="mt-4 mb-4">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <RecentActivitiesTable recentInvoice={recentInvoice} />
            </div>
          </div>
        </section>
        {/* <section className="mt-4 mb-4">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <RecentActivitiesTable />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12">
              <TopClients />
            </div>
          </div>
        </section> */}

        <section className="mt-4 mb-4">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <LineCharts />
            </div>
          </div>
        </section>

        <section className="mt-4 mb-4">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12">
              <LastDeliverd lastDelivered={lastDelivered} />
            </div>
            <div className="col-xl-8 col-lg-8 col-md-12">
              <NewOrder newOrders={newOrders} />
            </div>
          </div>
        </section>

        <section className="mt-4 mb-4">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <TopClients topClients={topClients} />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
              <TopLowStocks lowStockProducts={lowStockProducts} />
            </div>
          </div>
        </section>

        <section className="mt-4 mb-4">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <TopNotifications
                expiredNotif={expiredNotif}
                lowStockNotif={lowStockNotif}
                stockOutNotif={stockOutNotif}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
              <RecentSalesOrderExpected allShippedOrders={allShippedOrders} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
