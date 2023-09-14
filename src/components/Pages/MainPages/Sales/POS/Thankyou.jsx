import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Thankyou.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import { APIBASE, IMAGEURL } from "../../../../auth/apiConfig";

const POSManager = () => {
  const search = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const res = await axios.get(
          `${APIBASE}admin/get-order-by-id/${search.id}`
        );
        setOrder(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrderDetail();
  }, []);
  const generatePrint = () => {
    if (order.invoice_pdf) {
      let pdfWindow = window.open(`${IMAGEURL}${order.invoice_pdf}`, "_blank");
      pdfWindow.onload = () => {
        pdfWindow.print();
        pdfWindow.close();
      };
    }
  };

  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-body">
                <div className="tahnkyou-info">
                  <h1>Thank You For Purchase !</h1>

                  <div className="invoice-print pt-4 pb-2">
                    <button
                      className="print-invoice"
                      onClick={() => generatePrint()}
                    >
                      Print Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSManager;
