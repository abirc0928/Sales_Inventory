import React from 'react'

const InvoiceDetails = () => {
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
                                    <p className="text-xs mx-0 my-1">Name: <span id="CName">IRS IT</span> </p>
                                    <p className="text-xs mx-0 my-1">Email: <span id="CEmail">sdsd@sd.com</span></p>
                                    <p className="text-xs mx-0 my-1">User ID: <span id="CId">1</span> </p>
                                </div>
                                <div className="col-4">
                                    <img className="w-40" src="images/logo.png" />
                                    <p className="text-bold mx-0 my-1 text-dark">Invoice </p>
                                    <p className="text-xs mx-0 my-1">Date: 2024-08-20 </p>
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
                                            <tr className="text-xs">
                                                <td>sd</td>
                                                <td>7</td>
                                                <td>364.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr className="mx-0 my-2 p-0 bg-secondary" />
                            <div className="row">
                                <div className="col-12">
                                    <p className="text-bold text-xs my-1 text-dark"> TOTAL: <i
                                        className="bi bi-currency-dollar"></i> <span id="total">364</span></p>
                                    <p className="text-bold text-xs my-2 text-dark"> PAYABLE: <i
                                        className="bi bi-currency-dollar"></i> <span id="payable">382.20</span></p>
                                    <p className="text-bold text-xs my-1 text-dark"> VAT(5%): <i
                                        className="bi bi-currency-dollar"></i> <span id="vat">18.20</span></p>
                                    <p className="text-bold text-xs my-1 text-dark"> Discount: <i
                                        className="bi bi-currency-dollar"></i> <span id="discount">0</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal">Close</button>
                        <button onclick="PrintPage()" className="btn bg-gradient-success">Print</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails