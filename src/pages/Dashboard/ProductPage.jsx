import React, { useEffect, useRef, useState } from 'react';
import { destroyDataTable, makeDataTable } from "../../utils/datatable";
import myaxios from "../../utils/myaxios";
import ProductCreate from '../../components/product/ProductCreate';
import ProductDelete from '../../components/product/ProductDelete';
import ProductUpdate from '../../components/product/ProductUpdate';

const ProductPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dataTable = useRef(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [dataToUpdate, setDataToUpdate] = useState(null);

    // Load product data
    const loadData = () => {
        setIsLoading(true);
        myaxios.get("/list-product")
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    // Initialize DataTable
    useEffect(() => {
        if (data.length > 0) { // Ensure data exists before initializing DataTable
            const dt = makeDataTable(dataTable.current);
            return () => {
                destroyDataTable(dt);
            };
        }
    }, [data]); // Run when `data` changes

    // Fetch product data on mount
    useEffect(() => {
        loadData();
    }, []);

    

    const handleDelete = (itemId) => {
        setIdToDelete(itemId);
    };

    const handleUpdate = (itemId) => {
        itemId = parseInt(itemId);
        const item = data.find((item) => item.id === itemId);
        setDataToUpdate({ ...item });

    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-12">
                        <div className="card px-5 py-5">
                            <div className="row justify-content-between">
                                <div className="align-items-center col">
                                    <h4>Product</h4>
                                </div>
                                <div className="align-items-center col">
                                    <button data-bs-toggle="modal" data-bs-target="#create-modal" className="float-end btn m-0 bg-gradient-primary">
                                        Create
                                    </button>
                                </div>
                            </div>
                            <hr className="bg-dark" />
                            <table className="table" id="tableData" ref={dataTable}>
                                <thead>
                                    <tr className="bg-light">
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Unit</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tableList">
                                    {/* Fixed: map function should return JSX */}
                                    {data.slice().reverse().map((item, index) => (
                                        <tr key={index} className="odd">
                                            <td className="sorting_1">
                                                <img className="w-15 h-auto" alt="Product" src={item.img_url ? `https://inventory-api.teamrabbil.com/${item.img_url}` : "/images/default.jpg"} />
                                            </td>

                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.unit}</td>
                                            <td>
                                                <button data-bs-toggle="modal" data-bs-target="#update-modal" type="button" className="btn editBtn btn-sm btn-outline-success" onClick={() => handleUpdate(item.id)}>Edit</button>
                                                <button data-bs-toggle="modal" data-bs-target="#delete-modal" type="button" className="btn deleteBtn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pass loadAllData to refresh data when a product is created */}
            <ProductCreate loadAllData={loadData} />
            <ProductDelete loadAllData={loadData} idToDelete={idToDelete} />
            <ProductUpdate loadAllData={loadData} editData={dataToUpdate} />
        </>
    );
};

export default ProductPage;
