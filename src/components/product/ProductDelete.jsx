import React, { useEffect, useRef, useState } from 'react';
import { destroyDataTable, makeDataTable } from "../../utils/datatable";
import myaxios from "../../utils/myaxios";
const ProductDelete = ({ loadAllData, idToDelete }) => {
  const closeBtn = useRef();
  const handleDelete = (e) => {
    e.preventDefault();

    myaxios.post("/delete-product", { id: idToDelete })
        .then((response) => {
            if (response.data === 1) {
                successToast("Product removed successfully");
                closeBtn.current.click();
                loadAllData();
            } else {
                console.error(response);
                errorToast("Failed to remove Product");
            }
        })
        .catch((error) => {
            console.error(error);
            errorToast("Failed to remove Product");
        });
};
  return (

    <div className="modal animated zoomIn" id="delete-modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <h3 className=" mt-3 text-warning">Delete !</h3>
            <p className="mb-3">Once delete, you can't get it back.</p>
            <input className="d-none" id="deleteID" />
            <input className="d-none" id="deleteFilePath" />

          </div>
          <div className="modal-footer justify-content-end">
            <div>
              <button type="button" id="delete-modal-close" className="btn bg-gradient-success mx-2" data-bs-dismiss="modal" ref={closeBtn}>Cancel</button>
              <button type="button" id="confirmDelete" className="btn bg-gradient-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductDelete