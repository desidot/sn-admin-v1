import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const RecentSalesOrderExpected = ({ allShippedOrders }) => {
  const filter = allShippedOrders?.map((elem) => ({
    OrderNumber: elem?.order_no,
    Customer: JSON.parse(JSON.parse(elem?.billing_address))?.name,
    ExpectedShipmentDate: JSON.parse(elem?.picked_up_details)?.expected_date
      ? JSON.parse(elem?.picked_up_details)?.expected_date
      : JSON.parse(elem?.picked_up_details)?.expected_date_d
      ? JSON.parse(elem?.picked_up_details)?.expected_date_d
      : "-",
  }));
  //console.log(filter)
  const columns = ["Order Number", "Customer", "Expected Shipment Date"];
  const data = [
    {
      OrderNumber: "123456",
      Customer: "#OIL910221",
      ExpectedShipmentDate: "12 August 2023",
    },
    {
      OrderNumber: "649498",
      Customer: "#OIL910221",
      ExpectedShipmentDate: "12 August 2023",
    },
    {
      OrderNumber: "684947",
      Customer: "#OIL910221",
      ExpectedShipmentDate: "12 August 2023",
    },
    {
      OrderNumber: "898874",
      Customer: "#OIL910221",
      ExpectedShipmentDate: "12 August 2023",
    },
    {
      OrderNumber: "778788",
      Customer: "#OIL910221",
      ExpectedShipmentDate: "12 August 2023",
    },
    // Add more data rows here
  ];

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Sales Order Expected Shipment</h3>
        </div>
        <div className="main-body2">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ background: "#444444" }}>
                  <TableCell
                    style={{ fontFamily: "Poppins", color: "#FFFFFF" }}
                  >
                    #
                  </TableCell>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      style={{ fontFamily: "Poppins", color: "#FFFFFF" }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filter?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.OrderNumber}</TableCell>
                    <TableCell>{row?.Customer}</TableCell>
                    <TableCell>{row?.ExpectedShipmentDate}</TableCell>
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

export default RecentSalesOrderExpected;
