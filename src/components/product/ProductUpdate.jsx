import React, { useState, useEffect, useRef } from "react";
import myaxios from "../../utils/myaxios";
import { errorToast, successToast } from "../../utils/toast";

const ProductUpdate = ({ loadAllData, editData }) => {
  const [imagePreview, setImagePreview] = useState("/images/default.jpg");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const closeBtn = useRef(null);

  useEffect(() => {
    myaxios
      .get("/list-category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        errorToast("Failed to load categories");
      });
  }, []);

  useEffect(() => {
    if (editData?.img_url) {
      setImagePreview(
        `https://inventory-api.teamrabbil.com/${editData.img_url}`
      );
    }

    if (editData?.category_id) {
      setSelectedCategory(editData.category_id);
    }
  }, [editData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (image) {
      formData.append("img", image);
    } else {
      formData.append("img", editData.img_url);
    }

    myaxios
      .post("/update-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status === 200) {
          successToast("Product updated successfully");
          closeBtn.current.click();

          loadAllData();
          e.target.reset();
        } else {
          errorToast("Failed to update product");
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast("Failed to update product");
      });
  };

  return (
    <div>
      <div
        className="modal animated zoomIn"
        id="update-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Product
              </h5>
            </div>
            <div className="modal-body">
              <form id="update-form" onSubmit={handleUpdate}>
                <div className="container">
                  <div className="row">
                    <div className="col-12 p-1">
                      <label className="form-label">Category</label>
                      <select
                        className="form-control form-select"
                        id="productCategoryUpdate"
                        name="category_id" // Use name attribute for FormData
                        value={selectedCategory || ""} // Bind selected category as value
                        onChange={(e) => setSelectedCategory(e.target.value)} // Update category state
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                      <label className="form-label mt-2">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productNameUpdate"
                        name="name"
                        defaultValue={editData?.name || ""}
                      />

                      <label className="form-label mt-2">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="productPriceUpdate"
                        name="price"
                        defaultValue={editData?.price || ""}
                      />

                      <label className="form-label mt-2">Unit</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productUnitUpdate"
                        name="unit"
                        defaultValue={editData?.unit || ""}
                      />

                      <br />
                      <img
                        className="w-15"
                        id="oldImg"
                        src={imagePreview}
                        alt="Preview"
                      />
                      <br />

                      <label className="form-label mt-2">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="productImgUpdate"
                        name="img_url" // Use name attribute for FormData
                        onChange={handleImageChange}
                      />
                      {!image ? (
                        <small className="text-muted d-block mt-1">
                          Current image: {editData?.img_url || "No image"}
                        </small>
                      ) : (
                        <small></small>
                      )}

                      <input
                        type="hidden"
                        name="id"
                        defaultValue={editData?.id}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={closeBtn} // Reference to close the modal
                id="update-modal-close"
                className="btn bg-gradient-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
              <button
                type="submit"
                id="update-btn"
                className="btn bg-gradient-success"
                form="update-form" // Submit form when clicked
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
