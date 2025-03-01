
import React, {useState, useRef, useEffect} from 'react'
import myaxios from "../../utils/myaxios";
const CategoryUpdateModal = ({ data, loadAllData }) => {
    const closeBtn = useRef(null);

   
    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        myaxios.post("/update-category", formDataObj)
            .then((response) => {
                if (response.data === 1) {
                    successToast("Category updated successfully");
                    closeBtn.current.click();
                    loadAllData();
                } else {
                    console.error(response);
                    errorToast("Failed to update Category");
                }
            })
            .catch((error) => {
                console.error(error);
                errorToast("Failed to update Category");
            });
    }
    return (
        <>
            <div className="modal animated zoomIn" id="update-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                        </div>
                        <div className="modal-body">
                            <form id="update-form" onSubmit={handleUpdate}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 p-1">
                                            <label className="form-label">Category Name *</label>
                                            
                                            <input type="text" className="form-control" id="categoryNameUpdate" name="name" defaultValue={data.name} />

                                            <input type="text" className="d-none" id="updateID" name="id" defaultValue={data.id} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="update-modal-close" className="btn bg-gradient-primary" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn}>Close</button>
                            <button type="submit" id="update-btn" className="btn bg-gradient-success" form="update-form">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryUpdateModal