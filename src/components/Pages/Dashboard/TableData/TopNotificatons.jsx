import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

const TopNotifications = ({lowStockNotif,expiredNotif,stockOutNotif}) => {
  const columns = ["Message"];
  const data = [
    {
      Message: "Oily Skin Kit Oily Skin Kit Oily Skin Kit Oily Skin Kit",
    },
    {
      Message: "Oily Skin Kit Oily Skin Kit Oily Skin Kit Oily Skin Kit",
    },
    {
      Message: "Oily Skin Kit Oily Skin Kit Oily Skin Kit Oily Skin Kit",
    },
    {
      Message: "Oily Skin Kit Oily Skin Kit Oily Skin Kit Oily Skin Kit",
    },
    {
      Message: "Oily Skin Kit Oily Skin Kit Oily Skin Kit Oily Skin Kit",
    },
    // Add more data rows here
  ];
  function formatDate(inputDate) {
    try {
        const dateObj = new Date(inputDate);
        
        // Array of month names
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Get day, month, and year from the date object
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        
        // Formatted date string
        const formattedDate = `${day} ${month} ${year}`;
        
        return formattedDate;
    } catch (error) {
        return "-";
    }
}
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Notifications</h3>
          <Link to="/admin/miscellaneous/notifications" className="bt">Notification</Link>
        </div>
        <div className="main-body2">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ background: "#444444" }}>
              
                
                    <TableCell
                    
                      style={{ fontFamily: "Poppins", color: "#FFFFFF" }}
                    >
                     Item
                    </TableCell>
                    <TableCell
                   
                      style={{ fontFamily: "Poppins", color: "#FFFFFF" }}
                    >
                     Notification
                    </TableCell>
               
                </TableRow>
              </TableHead>
              <TableBody>
                {lowStockNotif?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>Low Stock ({row.quantity})</TableCell>
                  </TableRow>
                ))}
                  {expiredNotif?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>Expired on ({formatDate(row.expiry_date)})</TableCell>
                  </TableRow>
                ))}
                  {stockOutNotif?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>Stock Out</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <br />
    </>
  );
};

export default TopNotifications;
