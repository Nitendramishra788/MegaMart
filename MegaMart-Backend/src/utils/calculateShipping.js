const calculateShippingCharge = (subTotal) => {
    if (subTotal >= 500) {
        return 0;
    }

    return 50;
};

module.exports = calculateShippingCharge;