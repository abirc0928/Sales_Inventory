import React, { useContext, useRef } from 'react'
import { UserContext } from '../../pages/Dashboard/SalePage'

const QuentityModal = ({ selectedProduct }) => {
    const { setAddProduct } = useContext(UserContext)  // ✅ Correctly getting setAddProduct
    const closeBtn = useRef(null);
    const quentityRef = useRef(null)
    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log("Form Data:", formDataObj);

        setAddProduct(prevProducts => [...prevProducts, formDataObj]); // ✅ Adding new product
        quentityRef.current.value = null
        closeBtn.current.click();
       
    }

    return (
        <div className="modal animated zoomIn" id="create-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="exampleModalLabel">Add Product</h6>
                    </div>
                    <div className="modal-body">
                        <form id="add-form" onSubmit={handleAdd}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label" htmlFor="PId">Product ID *</label>
                                        <input type="text" className="form-control" id="PId" name="id" defaultValue={selectedProduct.id} />
                                        <label className="form-label mt-2" htmlFor="PName">Product Name *</label>
                                        <input type="text" className="form-control" id="PName" name="name" defaultValue={selectedProduct.name} />
                                        <label className="form-label mt-2" htmlFor="PPrice">Product Price *</label>
                                        <input type="text" className="form-control" id="PPrice" name="price" defaultValue={selectedProduct.price} />
                                        <label className="form-label mt-2" htmlFor="PQty">Product Qty *</label>
                                        <input type="text" className="form-control" name="quantity" id="PQty" ref={quentityRef}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button id="modal-close" className="btn bg-gradient-primary" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn}>Close</button>
                        <button type="submit" id="save-btn" className="btn bg-gradient-success" form="add-form">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuentityModal
