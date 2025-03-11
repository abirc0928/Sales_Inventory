import React, { useState, useEffect } from "react";

import myaxios from "../../utils/myaxios";
import { successToast, errorToast } from "../../utils/toast";

const ReportPage = () => {
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fromDate = formData.get("FormDate");
    const toDate = formData.get("ToDate");
  
    try {
      const { data, status } = await myaxios.get(`/sales-report/${fromDate}/${toDate}`, { responseType: "blob" });
  
      if (status === 200) {
        const url = URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
        Object.assign(document.createElement("a"), { href: url, download: `sales_report_${fromDate}_to_${toDate}.pdf` }).click();
        URL.revokeObjectURL(url);
        successToast("Report downloaded successfully!");
      } else {
        errorToast("Failed to download the report.");
      }
    } catch (error) {
      errorToast("An error occurred while downloading the report.");
      console.error("Error:", error);
    }
  };


  return (
    <div>
      <div className="row">
        <div className="col-md-4 mx-3">
          <div className="card">
            <div className="card-body">
              <h4>Sales Report</h4>
              <form onSubmit={handleSubmit}>
                <label className="form-label mt-2">Date From</label>
                <input
                  name="FormDate"
                  type="date"
                  className="form-control"
                  required
                />

                <label className="form-label mt-2">Date To</label>
                <input
                  name="ToDate"
                  type="date"
                  className="form-control"
                  required
                />

                <button
                  type="submit"
                  className="btn mt-3 w-100 bg-gradient-primary"
                >
                  Download
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
