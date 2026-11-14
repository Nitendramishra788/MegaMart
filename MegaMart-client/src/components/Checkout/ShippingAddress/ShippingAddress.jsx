import React, { useState } from "react";
import AddressCard from "../ShippingAddress/AddressCard"

// import "./ShippingAddress.css";

function ShippingAddress() {

  const [selectedAddress, setSelectedAddress] = useState(1);

  const addresses = [
    {
      id: 1,
      name: "John Doe",
      type: "Home",
      phone: "+91 98765 43210",
      address: "123, Green Park, Near Metro Station",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110016",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      type: "Office",
      phone: "+91 98765 43210",
      address: "45, Business Tower, Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      isDefault: false,
    },
  ];


  return (
    <section className="shippingAddress">

      {/* Section Header */}
      <div className="shippingAddressHeader">

        <div>
          <h2>Shipping Address</h2>
          <p>Select your delivery address</p>
        </div>

        <button className="addAddressBtn">
          + Add New Address
        </button>

      </div>

      {/* Address List */}
      <div className="shippingAddressList">
        {/* Address cards will come here */}
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selectedAddress === address.id}
            onSelect={() => setSelectedAddress(address.id)}
          />
        ))}


      </div>

    </section>
  );
}

export default ShippingAddress;