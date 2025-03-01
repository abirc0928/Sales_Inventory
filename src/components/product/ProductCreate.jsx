import React, { useState, useRef, useEffect } from "react";
import myaxios from "../../utils/myaxios";
import { errorToast, successToast } from "../../utils/toast";

const ProductCreate = ({ loadAllData }) => {
  const [categories, setCategories] = useState([]);
  const closeBtn = useRef();

  // Load categories
  useEffect(() => {
    myaxios.get("/list-category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    const formData = new FormData(e.target);

    try {
        const response = await myaxios.post('/create-product', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 201) {
            e.target.reset();
            successToast("Product created successfully");
            closeBtn.current.click();
            loadAllData();
        } else {
            console.error(response);
            errorToast("Failed to create product ");
        }
    } catch (error) {
        console.error(error);
        errorToast("Failed to create product ");
    }
};
  return (
    <div className="modal animated zoomIn" id="create-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Product</h5>
          </div>
          <div className="modal-body">
            <form id="save-form" onSubmit={handleCreate} encType="multipart/form-data">
              <div className="container">
                <div className="row">
                  <div className="col-12 p-1">
                    <label className="form-label">Category</label>
                    <select className="form-control form-select" name="category_id" required>
                      <option value="">Select Category</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>

                    <label className="form-label mt-2">Name</label>
                    <input type="text" className="form-control" name="name" required />

                    <label className="form-label mt-2">Price</label>
                    <input type="number" className="form-control" name="price" required />

                    <label className="form-label mt-2">Unit</label>
                    <input type="text" className="form-control" name="unit" required />

                    <br />
                    <img className="w-15" src="/images/default.jpg" alt="Preview" id="previewImage" />
                    <br />

                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="img"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          document.getElementById("previewImage").src = URL.createObjectURL(file);
                        } else {
                          document.getElementById("previewImage").src = "/images/default.jpg";
                        }
                      }}
                    />
                    
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              id="modal-close"
              className="btn bg-gradient-primary"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeBtn}
            >
              Close
            </button>
            <button type="submit" form="save-form" id="save-btn" className="btn bg-gradient-success">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
