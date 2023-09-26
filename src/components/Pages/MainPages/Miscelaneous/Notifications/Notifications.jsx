// import NotifiTable from "../../Tables/NotifiTable";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Pagination from "@mui/material/Pagination";
import "./Notification.css";
import InputAdornment from "@mui/material/InputAdornment";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { useEffect } from "react";
import { APIBASE } from "../../../../auth/apiConfig";

function createData(message, date) {
  return { message, date };
}

const rows = [
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
  createData(
    "The product Zinc Picolinate 50 mg 120 caps is expired.",
    "Jun 1, 2023"
  ),
  createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
];

const Notifications = () => {
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [stockOutNotif, setStockOutNotif] = useState([]);
  const [lowStockNotif, setLowStockNotif] = useState([]);
  const [expiredNotif, setExpiredNotif] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getAllLowStockNotif();
  //   getAllStockOutNotif();
  //   getAllExpiredNotif();
  // }, []);

  useEffect(() => {
    // Inside useEffect, set isLoading to false when data fetching is complete
    getAllLowStockNotif()
      .then(() => getAllStockOutNotif())
      .then(() => getAllExpiredNotif())
      .finally(() => setIsLoading(false)); // Set loading to false when done
  }, []);

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

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1); // Reset page when search text changes
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset page when rows per page changes
  };

  const filteredRows = rows.filter((row) =>
    row.message.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // console.log(expiredNotif, stockOutNotif, lowStockNotif);

  function formatDate(inputDateTime) {
    try {
      const dateTimeObj = new Date(inputDateTime);

      // Array of month names
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Get day, month, year, hour, minute, and second from the date object
      const day = dateTimeObj.getDate();
      const month = months[dateTimeObj.getMonth()];
      const year = dateTimeObj.getFullYear();

      // Formatted date and time string
      const formattedDateTime = `${day} ${month} ${year}`;

      return formattedDateTime;
    } catch (error) {
      return "-";
    }
  }

  return (
    <>
      <div
        className="mb-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <HomeIcon /> -{" "}
          <h6 className="mb-0"> Miscellaneous{" "} - Notifications</h6>
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

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Notification</h3>
        </div>
        <div className="main-body2">
          {/* <NotifiTable /> */}
          {isLoading ? ( // Conditionally render a loader while loading
            <div className="pl-3">Loading...</div>
          ) : (
            <div className="NotifyTable">
              {/* <div className="seachAndNos">
              <div className="nos-notify"></div>
            </div> */}
              <TableContainer
                component={Paper}
                style={{ boxShadow: "gray", fontSize: "12px" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Message
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Quantity
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="left">
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expiredNotif?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          fontSize: "12",
                        }}
                        style={{ fontSize: "12px" }}
                      >
                        <TableCell component="th" scope="row">
                          {row.product_name} is Expired.
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>-</TableCell>
                        <TableCell align="left">
                          {formatDate(row.expiry_date)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {stockOutNotif?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          fontSize: "12",
                        }}
                        style={{ fontSize: "12px" }}
                      >
                        <TableCell component="th" scope="row">
                          {row.product_name} is Stock Out.
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>-</TableCell>
                        <TableCell align="left">-</TableCell>
                      </TableRow>
                    ))}
                    {lowStockNotif?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          fontSize: "12",
                        }}
                        style={{ fontSize: "12px" }}
                      >
                        <TableCell component="th" scope="row">
                          {row.product_name} is Low Stock.
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {row.quantity}
                        </TableCell>
                        <TableCell align="left">-</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              className="pagination-style"
              style={{
                display: "flex",
                justifyContent: "right",
              }}
            /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;


// // import NotifiTable from "../../Tables/NotifiTable";
// import React, { useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Pagination from "@mui/material/Pagination";
// import "./Notification.css";
// import InputAdornment from "@mui/material/InputAdornment";
// import HomeIcon from "@mui/icons-material/Home";
// import axios from "axios";
// import { useEffect } from "react";
// import { APIBASE } from "../../../../auth/apiConfig";

// function createData(message, date) {
//   return { message, date };
// }

// const rows = [
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
//   createData(
//     "The product Zinc Picolinate 50 mg 120 caps is expired.",
//     "Jun 1, 2023"
//   ),
//   createData("The product Yeast Arrest 14 supp is expired.", "Jun 2, 2023"),
// ];

// const Notifications = () => {
//   const [searchText, setSearchText] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [stockOutNotif, setStockOutNotif] = useState([]);
//   const [lowStockNotif, setLowStockNotif] = useState([]);
//   const [expiredNotif, setExpiredNotif] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // useEffect(() => {
//   //   getAllLowStockNotif();
//   //   getAllStockOutNotif();
//   //   getAllExpiredNotif();
//   // }, []);

//   useEffect(() => {
//     // Inside useEffect, set isLoading to false when data fetching is complete
//     getAllLowStockNotif()
//       .then(() => getAllStockOutNotif())
//       .then(() => getAllExpiredNotif())
//       .finally(() => setIsLoading(false)); // Set loading to false when done
//   }, []);

//   const getAllExpiredNotif = async () => {
//     try {
//       const res = await axios.get(`${APIBASE}admin/expired-notify`);
//       setExpiredNotif(res.data.expired);
//     } catch (error) {
//       //console.log(error);
//     }
//   };

//   const getAllStockOutNotif = async () => {
//     try {
//       const res = await axios.get(`${APIBASE}admin/out-of-stock-notify`);
//       setStockOutNotif(res.data.stock_out);
//     } catch (error) {
//       //console.log(error);
//     }
//   };

//   const getAllLowStockNotif = async () => {
//     try {
//       const res = await axios.get(`${APIBASE}admin/low-stock-notify`);
//       setLowStockNotif(res.data.low_stock);
//     } catch (error) {
//       //console.log(error);
//     }
//   };

//   const handleGoBack = () => {
//     // Go back to the previous page in the history
//     window.history.go(-1);
//   };

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//     setPage(1); // Reset page when search text changes
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(event.target.value);
//     setPage(1); // Reset page when rows per page changes
//   };

//   const filteredRows = rows.filter((row) =>
//     row.message.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const startIndex = (page - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const displayedRows = filteredRows.slice(startIndex, endIndex);

//   const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   // console.log(expiredNotif, stockOutNotif, lowStockNotif);

//   function formatDate(inputDateTime) {
//     try {
//       const dateTimeObj = new Date(inputDateTime);

//       // Array of month names
//       const months = [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ];

//       // Get day, month, year, hour, minute, and second from the date object
//       const day = dateTimeObj.getDate();
//       const month = months[dateTimeObj.getMonth()];
//       const year = dateTimeObj.getFullYear();

//       // Formatted date and time string
//       const formattedDateTime = `${day} ${month} ${year}`;

//       return formattedDateTime;
//     } catch (error) {
//       return "-";
//     }
//   }

//   return (
//     <>
//       <div
//         className="mb-3"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <HomeIcon /> -{" "}
//           <h6 className="mb-0"> Miscellaneous - Notifications</h6>
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

//       <div className="card">
//         <div className="card-header">
//           <h3 className="card-title">Notification</h3>
//         </div>
//         <div className="main-body2">
//           {/* <NotifiTable /> */}
//           <div className="NotifyTable">
//             {/* <div className="seachAndNos">
//               <div className="nos-notify"></div>
//             </div> */}
//             <TableContainer
//               component={Paper}
//               style={{ boxShadow: "gray", fontSize: "12px" }}
//             >
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell style={{ fontWeight: "bold" }}>
//                       Message
//                     </TableCell>
//                     <TableCell style={{ fontWeight: "bold" }}>
//                       Quantity
//                     </TableCell>
//                     <TableCell style={{ fontWeight: "bold" }} align="left">
//                       Date
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 {isLoading ? ( // Conditionally render a loader while loading
//                   <TableBody>
//                     <TableRow>Loading...</TableRow>
//                   </TableBody>
//                 ) : (
//                   <TableBody>
//                     {expiredNotif?.map((row, index) => (
//                       <TableRow
//                         key={index}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                           fontSize: "12",
//                         }}
//                         style={{ fontSize: "12px" }}
//                       >
//                         <TableCell component="th" scope="row">
//                           {row.product_name} is Expired.
//                         </TableCell>
//                         <TableCell style={{ fontWeight: "bold" }}>-</TableCell>
//                         <TableCell align="left">
//                           {formatDate(row.expiry_date)}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                     {stockOutNotif?.map((row, index) => (
//                       <TableRow
//                         key={index}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                           fontSize: "12",
//                         }}
//                         style={{ fontSize: "12px" }}
//                       >
//                         <TableCell component="th" scope="row">
//                           {row.product_name} is Stock Out.
//                         </TableCell>
//                         <TableCell style={{ fontWeight: "bold" }}>-</TableCell>
//                         <TableCell align="left">-</TableCell>
//                       </TableRow>
//                     ))}
//                     {lowStockNotif?.map((row, index) => (
//                       <TableRow
//                         key={index}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                           fontSize: "12",
//                         }}
//                         style={{ fontSize: "12px" }}
//                       >
//                         <TableCell component="th" scope="row">
//                           {row.product_name} is Low Stock.
//                         </TableCell>
//                         <TableCell style={{ fontWeight: "bold" }}>
//                           {row.quantity}
//                         </TableCell>
//                         <TableCell align="left">-</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 )}
//               </Table>
//             </TableContainer>
//             {/* <Pagination
//               count={pageCount}
//               page={page}
//               onChange={handlePageChange}
//               className="pagination-style"
//               style={{
//                 display: "flex",
//                 justifyContent: "right",
//               }}
//             /> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Notifications;
