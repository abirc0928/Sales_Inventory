import React from 'react'
import { useEffect, useRef, useState, useContext } from "react";
import { destroyDataTable, makeDataTable } from "../../utils/datatable";
import myaxios from '../../utils/myaxios';
import { UserContext } from '../../pages/Dashboard/SalePage';
const CustomerList = () => {

    const { setAddaddCustomer } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const dataTable = useRef(null);

    const loadData = () => {
        setIsLoading(true);
        myaxios.get("/list-customer")
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) { // Ensure data exists before initializing DataTable
            const dt = makeDataTable(dataTable.current);
            return () => {
                destroyDataTable(dt);
            };
        }
    }, [data]);

    const handleAddCustomer = (id) => {
        const customerID = parseInt(id);
        console.log('c', customerID)
        const selectedCustomer = data.find((item) => item.id === customerID);
        if (selectedCustomer) {
            setAddaddCustomer(selectedCustomer); // Set directly instead of wrapping in an object
        }
    };
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
        <div className="col-md-4 col-lg-4 p-2">
            <div className="shadow-sm h-100 bg-white rounded-3 p-3">
                <div id="customerTable_wrapper" className="dataTables_wrapper no-footer">
                    {/* <div id="customerTable_filter" className="dataTables_filter">
                        <label>Search:
                            <input type="search" className="" placeholder="" aria-controls="customerTable" />
                        </label>
                    </div> */}
                    <table className="table table-sm w-100 no-footer dataTable" id="customerTable" ref={dataTable}>
                        <thead className="w-100">
                            <tr className="text-xs text-bold">
                                <td>Customer</td>
                                <td>Pick</td>
                            </tr>
                        </thead>
                        <tbody className="w-100" id="customerList">
                            {data.map((customer) => (
                                <tr className="text-xs odd" key={customer.id}>
                                    <td><i className="bi bi-person"></i> {customer.name}</td>
                                    <td><button data-name="IRS IT" data-email="sdsd@sd.com" data-id="1" className="btn btn-outline-dark addCustomer text-xxs px-2 py-1 btn-sm m-0" onClick={() => handleAddCustomer(customer.id)}>Add</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerList