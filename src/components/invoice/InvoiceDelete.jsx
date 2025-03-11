import React, {useRef} from 'react'
import { destroyDataTable, makeDataTable } from "../../utils/datatable";
import myaxios from "../../utils/myaxios";
const InvoiceDelete = ({id, loadData, loadCustomerData}) => {
    const closeBtn = useRef(null);

    const handleDelete = (e) => {
        e.preventDefault();

        myaxios.post("/invoice-delete", { inv_id: id })
            .then((response) => {
                if (response.data === 1) {
                    successToast("Invoice Delete successfully");
                    closeBtn.current.click();
                    loadData();
                    loadCustomerData()
                } else {
                    console.error(response);
                    errorToast("Failed to delete invoice");
                }
            })
            .catch((error) => {
                console.error(error);
                errorToast("Failed to delete invoice");
            });
    };

    return (
        <div class="modal animated zoomIn deleteModal" id="delete-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <h3 class=" mt-3 text-warning">Delete !</h3>
                        <p class="mb-3">Once delete, you can't get it back.</p>
                        <input class="d-none" id="deleteID" />
                    </div>
                    <div class="modal-footer justify-content-end">
                        <div>
                            <button type="button" id="delete-modal-close" class="btn bg-gradient-success" data-bs-dismiss="modal" ref={closeBtn}>Cancel</button>
                            <button onClick={handleDelete} type="button" id="confirmDelete" class="btn bg-gradient-danger" >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDelete