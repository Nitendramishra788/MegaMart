import React from "react";
import "./AddressCard.css";

function AddressCard({ address, selected, onSelect }) {
  return (
    <div
      className={`addressCard ${selected ? "selectedAddress" : ""}`}
      onClick={onSelect}
    >

      <div className="addressCardContent">

        <input
          type="radio"
          name="shippingAddress"
          checked={selected}
          onChange={onSelect}
        />

        <div className="addressDetails">

          <div className="addressCardTop">

            <h3>{address.name}</h3>

            <span className="addressType">
              {address.type}
            </span>

            {address.isDefault && (
              <span className="defaultBadge">
                Default
              </span>
            )}

          </div>

          <p>{address.address}</p>

          <p>
            {address.city}, {address.state} - {address.pincode}
          </p>

          <p className="addressPhone">
            Phone: {address.phone}
          </p>

        </div>

      </div>

      <button
        className="editAddressBtn"
        onClick={(e) => e.stopPropagation()}
      >
        Edit
      </button>

    </div>
  );
}

export default AddressCard;