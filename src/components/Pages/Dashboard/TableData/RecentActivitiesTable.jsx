import React from "react";
import Table from "../../Table/Table";
import { Link } from "react-router-dom";
// import { Button } from '@mui/material';

const RecentActivitiesTable = ({recentInvoice}) => {



  const columns = ["Invoice No", "Date", "Client", "Subtotal", "Net Total"];
  function formatDateToDayMonthYear(dateString) {
    const dateObject = new Date(dateString);
  
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const year = dateObject.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  const mapped=recentInvoice?.map((elem)=> ({"Invoice No":elem.invoice_no,Date:formatDateToDayMonthYear(elem.invoice_date),Client:JSON.parse(elem.billing_address).first_name?(JSON.parse(elem.billing_address)?.first_name +" "+JSON.parse(elem.billing_address)?.last_name):(JSON.parse(elem.billing_address)?.name ),Subtotal:"$"+elem.sub_total,"Net Total":"$"+elem.grand_total,pdf:elem.invoice_pdf}) )
 



  return (
    <>
      <Table
        title="Recent Invoices"
        buttonLabel="Invoices"
        columns={columns}
        data={mapped}
      />
    </>
  );
};

export default RecentActivitiesTable;
