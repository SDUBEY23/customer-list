import React from "react";

const Customers = ({ customers, loading }) => {
  if (loading) {
    return <h2>Loading.....</h2>;
  }
  return (
    <div className="blogs">
      <div className="container grid grid-3 my-3 ">
        {customers.map((customer) => (
          <div className="flex" key={customer.id}>
            {customer.id}
            {customer.firstname}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Customers;
