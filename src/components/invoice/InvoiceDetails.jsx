import React, { useState, useEffect } from 'react'
import { destroyDataTable, makeDataTable } from "../../utils/datatable";
import myaxios from "../../utils/myaxios";

const InvoiceDetails = ({ invoiceId, customerId }) => {
    const [customerData, setCustomerData] = useState([])
    const [products, setProducts] = useState([])
    const [invoiceDetails, setInvoiceDetails] = useState([])

    useEffect(() => {
        myaxios.post("/invoice-details", { inv_id: invoiceId, cus_id: customerId })
            .then((response) => {
                if (response) {
                    setInvoiceDetails(response.data)
                    // successToast("Invoice Delete successfully");
                    // closeBtn.current.click();
                    // loadData();
                    // loadCustomerData()
                } else {
                    console.error(response);
                    errorToast("Failed to delete invoice");
                }
            })
            .catch((error) => {
                console.error(error);
                errorToast("Failed to delete invoice");
            });
    }, [invoiceId, customerId])

    useEffect(() => {
        myaxios.get("/list-product")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [invoiceId, customerId])

    const findProductName = (id) => {
        if (!products || products.length === 0) return "Loading..."; // Ensure products is defined and not empty
        const product = products.find((product) => product.id === id);
        console.log(product);
        return product ? product.name : "Product not found"; // Fixed return message
    };

    console.log(invoiceDetails)

    return (
        <div className="modal animated zoomIn details-modal" id="details-modal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="invoice" className="modal-body p-3">
                        <div className="container-fluid">
                            <br />
                            <div className="row">
                                <div className="col-8">
                                    <span className="text-bold text-dark">BILLED TO </span>
                                    <p className="text-xs mx-0 my-1">Name: <span id="CName">{invoiceDetails.customer?.name || ""}</span> </p>
                                    <p className="text-xs mx-0 my-1">Email: <span id="CEmail">{invoiceDetails.customer?.email || ""}</span></p>
                                    <p className="text-xs mx-0 my-1">User ID: <span id="CId">{invoiceDetails.customer?.id || ""}</span> </p>
                                </div>
                                <div className="col-4">
                                    <img className="w-40" src="images/logo.png" />
                                    <p className="text-bold mx-0 my-1 text-dark">Invoice </p>
                                    <p className="text-xs mx-0 my-1">
                                        Date: {invoiceDetails?.invoice?.created_at?.split("T")[0] || ""}
                                    </p>
                                </div>
                            </div>
                            <hr className="mx-0 my-2 p-0 bg-secondary" />
                            <div className="row">
                                <div className="col-12">
                                    <table className="table w-100" id="invoiceTable">
                                        <thead className="w-100">
                                            <tr className="text-xs text-bold">
                                                <td>Name</td>
                                                <td>Qty</td>
                                                <td>Total</td>
                                            </tr>
                                        </thead>
                                        <tbody className="w-100" id="invoiceList">
                                            {
                                                invoiceDetails.product?.map((item) => (
                                                    <tr className="text-xs">
                                                        <td>{findProductName(item.product_id)}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.sale_price}</td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr className="mx-0 my-2 p-0 bg-secondary" />
                            <div className="row">
                                <div className="col-12">
                                    <p className="text-bold text-xs my-1 text-dark"> TOTAL: <i
                                        className="bi bi-currency-dollar"></i> <span id="total">{invoiceDetails.invoice?.total || ""}</span></p>
                                    <p className="text-bold text-xs my-2 text-dark"> PAYABLE: <i
                                        className="bi bi-currency-dollar"></i> <span id="payable">{invoiceDetails.invoice?.payable || ""}</span></p>
                                    <p className="text-bold text-xs my-1 text-dark"> VAT(5%): <i
                                        className="bi bi-currency-dollar"></i> <span id="vat">{invoiceDetails.invoice?.vat || ""}</span></p>
                                    <p className="text-bold text-xs my-1 text-dark"> Discount: <i
                                        className="bi bi-currency-dollar"></i> <span id="discount">{invoiceDetails.invoice?.discount || 0}</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal">Close</button>
                        <button onclick="PrintPage()" className="btn bg-gradient-success" onClick={()=>print()}>Print</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails