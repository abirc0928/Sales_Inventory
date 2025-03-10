import React from 'react'
import { useEffect, useRef, useState } from "react";
import { destroyDataTable, makeDataTable } from "../../utils/datatable";
import myaxios from '../../utils/myaxios';
// import QuentityModal from "./QuentityModal";

import QuentityModal from './QuentityModal'

const ProductList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({})
    const dataTable = useRef(null);

    const loadData = () => {
        setIsLoading(true);
        myaxios.get("/list-product")
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

    const handleAddProduct = (id) => {
        const productID = parseInt(id);
     
        const item = data.find((item) => item.id === productID);
        setSelectedProduct({ ...item })
    }

   

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
        <>
            <div className="col-md-4 col-lg-4 p-2">
                <div className="shadow-sm h-100 bg-white rounded-3 p-3">
                    <div id="productTable_wrapper" className="dataTables_wrapper no-footer">
                        {/* <div id="productTable_filter" className="dataTables_filter">
                        <label>Search:
                            <input type="search" className="" placeholder="" aria-controls="productTable" />
                        </label>
                    </div> */}
                        <table className="table w-100 no-footer dataTable" id="productTable" ref={dataTable}>
                            <thead className="w-100">
                                <tr className="text-xs text-bold">
                                    <td>Product</td>
                                    <td>Pick</td>
                                </tr>
                            </thead>
                            <tbody className="w-100" id="productList">
                                {data.map((item) => (
                                    <tr className="text-xs odd" key={item.id}>
                                        <td><img className="w-10" src={`https://inventory-api.teamrabbil.com/${item.img_url}`} alt="Product" /> {item.name} (${item.price})</td>
                                        <td><button data-name="sd" data-bs-toggle="modal" data-bs-target="#create-modal" data-price="52" data-id="2" className="btn btn-outline-dark text-xxs px-2 py-1 addProduct btn-sm m-0" onClick={() => handleAddProduct(item.id)}>Add</button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <QuentityModal selectedProduct={selectedProduct}/> */}
            <QuentityModal selectedProduct={selectedProduct}/>
        </>
    )
}

export default ProductList