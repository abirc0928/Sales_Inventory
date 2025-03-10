import React, { useEffect, useState } from "react";
import { UserContext } from "../../pages/Dashboard/SalePage";
import { useContext } from "react";
import myaxios from "../../utils/myaxios";
import { errorToast, successToast } from "../../utils/toast";
import { useNavigate } from 'react-router';
const BillCreate = () => {
  const navigate = useNavigate();
  const { addProduct, addCustomer, setAddProduct } = useContext(UserContext);
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [discountPersent, setDiscountPersent] = useState(0);
  const [discountAmount, setDiscuntAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [tempTotal, setTempTotal] = useState(0);

  const handleRemove = (removeId) => {
    const updatedProducts = addProduct.filter((item) => item.id !== removeId);
    setAddProduct(updatedProducts);
  };

  useEffect(() => {
    let updateTotal = 0;
    addProduct.map((item) => {
      updateTotal += item.price * item.quantity;
    });
    setTotal(updateTotal);
    setTempTotal(updateTotal);
    setVat(updateTotal * 0.05);
  }, [addProduct]);

  const DiscountChange = (e) => {
    const newDiscount = parseFloat(e.target.value) || 0; // Ensure numerical input
    setDiscountPersent(newDiscount);
    const discountedTotal = tempTotal - (tempTotal * newDiscount) / 100;
    setTotalDiscount(discountedTotal);
    setDiscuntAmount(tempTotal - discountedTotal);
    setTotal(discountedTotal);
  };

  const createInvoice = async (e) => {
    console.log("Creating invoice...");

    if (addProduct.length !== 0 && addCustomer) {
      console.log("Adding products and customer to invoice...");

      const invoiceData = {
        total: Number(total),
        discount: Number(discountAmount),
        vat: Number(vat),
        payable: Number(total) + Number(vat),
        customer_id: addCustomer.id,
        products: addProduct.map(item => ({
          product_id: item.id,
          qty: item.quantity,
          sale_price: item.price
        }))
      };

      console.log(addProduct)
      console.log("Invoice Data: ", invoiceData);

      try {
        const response = await myaxios.post('/invoice-create', invoiceData);
        console.log("Response: ", response); // Check the full response

        if (response.status === 200) {
          successToast("Invoice created successfully");
          navigate("/dashboard/invoice");
        } else {
          console.error("Failed to create invoice: ", response.data);
          errorToast("Failed to create Invoice. Server returned invalid data.");
        }
      } catch (error) {
        console.error("Error while creating invoice: ", error);
        errorToast("Failed to create Invoice");
      }
    } else {
      console.log("No customer or products to create invoice.");
      errorToast("Please add a customer and products before creating an invoice.");
    }
  };

  return (
    <div className="col-md-4 col-lg-4 p-2">
      <div className="shadow-sm h-100 bg-white rounded-3 p-3">
        <div className="row">
          <div className="col-8">
            <span className="text-bold text-dark">BILLED TO </span>
            <p className="text-xs mx-0 my-1">
              Name: <span id="CName">{addCustomer?.name || "NaN"}</span>{" "}
            </p>
            <p className="text-xs mx-0 my-1">
              Email: <span id="CEmail">{addCustomer?.email || "NaN"}</span>
            </p>
            <p className="text-xs mx-0 my-1">
              User ID: <span id="CId">{addCustomer?.id || "NaN"}</span>{" "}
            </p>
          </div>
          <div className="col-4">
            <img className="w-50" src="images/logo.png" alt="Logo" />
            <p className="text-bold mx-0 my-1 text-dark">Invoice </p>
            <p className="text-xs mx-0 my-1">Date: 2024-08-20 </p>
          </div>
        </div>
        <hr className="mx-0 my-2 p-0 bg-secondary" />
        <div className="row">
          <div className="col-12">
            <table className="table w-100" id="invoiceTable">
              <thead className="w-100">
                <tr className="text-xs">
                  <td>Name</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Remove</td>
                </tr>
              </thead>
              <tbody className="w-100" id="invoiceList">
                {addProduct.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No product added
                    </td>
                  </tr>
                ) : (
                  addProduct.map((item, index) => (
                    <tr className="text-xs" key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <button
                          data-index={index}
                          className="btn remove text-xxs px-2 py-1 btn-sm m-0"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <hr className="mx-0 my-2 p-0 bg-secondary" />
        <div className="row">
          <div className="col-12">
            <p className="text-bold text-xs my-1 text-dark">
              {" "}
              TOTAL: <i className="bi bi-currency-dollar"></i>{" "}
              <span id="total">{total}</span>
            </p>
            <p className="text-bold text-xs my-2 text-dark">
              {" "}
              PAYABLE: <i className="bi bi-currency-dollar"></i>{" "}
              <span id="payable">{total + vat}</span>
            </p>
            <p className="text-bold text-xs my-1 text-dark">
              {" "}
              VAT(5%): <i className="bi bi-currency-dollar"></i>{" "}
              <span id="vat">{vat}</span>
            </p>
            <p className="text-bold text-xs my-1 text-dark">
              {" "}
              Discount: <i className="bi bi-currency-dollar"></i>{" "}
              <span id="discount">{discountAmount}</span>
            </p>
            <span className="text-xxs">Discount(%):</span>
            {addProduct.length === 0 ? (
              <input
                value="0"
                min="0"
                type="text"
                step="0.25"
                className="form-control w-40"
                id="discountP"
              />
            ) : (
              <input
                value={discountPersent}
                min="0"
                type="number"
                step="0.25"
                onChange={DiscountChange}
                className="form-control w-40"
                id="discountP"
              />
            )}
            <p>
              <button
                onClick={() => createInvoice()}
                className="btn my-3 bg-gradient-primary w-40"
              >
                Confirm
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillCreate;
