import React, { useEffect, useRef, useState } from 'react';
import { destroyDataTable, makeDataTable } from "../../utils/datatable";
import myaxios from "../../utils/myaxios";
import InvoiceDelete from '../../components/invoice/InvoiceDelete';
import InvoiceDetails from '../../components/invoice/InvoiceDetails';

const InvoicePage = () => {
    const dataTable = useRef(null);
    const [data, setData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = () => {
        setIsLoading(true);
        myaxios.get("/invoice-select")
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    const loadCustomerData = () => {
        myaxios.get("/list-customer")
            .then((response) => setCustomerData(response.data))
            .catch(() => {});
    };

    const findCustomer = (customerId, field) => {
        if (customerData.length === 0) return "Loading...";
        const customer = customerData.find((customer) => customer.id === customerId);
        if (customer) {
            return field === 'name' ? customer.name : field === 'mobile' ? customer.mobile : "";
        } 
        return "Customer not found";
    };

    useEffect(() => {
        loadData();
        loadCustomerData();
    }, []);

    useEffect(() => {
        const dt = makeDataTable(dataTable.current);
        return () => destroyDataTable(dt);
    }, [data]);

    if (isLoading) {
        return (
            <div id="loader" className="LoadingOverlay">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12">
                    <div className="card px-5 py-5">
                        <div className="row justify-content-between">
                            <div className="align-items-center col">
                                <h5>Invoices</h5>
                            </div>
                            <div className="align-items-center col">
                                <a href="salePage.html" className="float-end btn m-0 bg-gradient-primary">Create Sale</a>
                            </div>
                        </div>
                        <hr className="bg-dark" />
                        <table className="table" id="dataTable" ref={dataTable}>
                            <thead>
                                <tr className="bg-light">
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Total</th>
                                    <th>Vat</th>
                                    <th>Discount</th>
                                    <th>Payable</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="tableList">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{findCustomer(item.customer_id, 'name')}</td>
                                        <td>{findCustomer(item.customer_id, 'mobile')}</td>
                                        <td>{item.total}</td>
                                        <td>{item.vat}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.payable}</td>
                                        <td>
                                            <button type="button" className="viewBtn btn btn-outline-dark text-sm px-3 py-1 btn-sm m-0" data-bs-target=".details-modal" data-bs-toggle="modal"><i className="fa text-sm fa-eye"></i></button>
                                            <button type="button" className="deleteBtn btn btn-outline-dark text-sm px-3 py-1 btn-sm m-0" data-bs-target=".deleteModal" data-bs-toggle="modal"><i className="fa text-sm fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <InvoiceDelete />
            <InvoiceDetails />
        </div>
    );
}

export default InvoicePage;
