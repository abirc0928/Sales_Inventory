import React, { createContext, useState } from "react";
import BillCreate from "../../components/create_sales/BillCreate";
import ProductList from "../../components/create_sales/ProductList";
import CustomerList from "../../components/create_sales/CustomerList";

const UserContext = createContext();

const SalePage = () => {
  const [addProduct, setAddProduct] = useState([]);
  const [addCustomer, setAddaddCustomer] = useState([]);

  return (
    <UserContext.Provider
      value={{ addProduct, setAddProduct, addCustomer, setAddaddCustomer }}
    >
      <div id="contentRef" className="">
        <div className="container-fluid">
          <div className="row">
            <BillCreate />
            {/* Product Table */}
            <ProductList />
            {/* Customer Table */}
            <CustomerList />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default SalePage;
export { UserContext };
