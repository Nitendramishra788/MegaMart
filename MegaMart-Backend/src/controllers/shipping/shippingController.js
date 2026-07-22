const SellerOrder = require("../../models/SellerOrder");
const Shipping = require("../../models/Shipping");

const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const mongoose = require("mongoose");
const generateSequence = require("../../utils/generateSequence");

const createShipping = asyncHandler(async (req, res) => {
    const { sellerOrderId } = req.body;


    // VALIDATE OBJECT ID


    if (!mongoose.Types.ObjectId.isValid(sellerOrderId)) {
        throw new apiErrr(
            400,
            "Invalid seller order ID. Please recheck."
        );
    }


    // FIND SELLER ORDER


    const sellerOrder = await SellerOrder.findById(sellerOrderId);

    if (!sellerOrder) {
        throw new apiErrr(
            404,
            "Seller order not found."
        );
    }


    // CHECK OWNERSHIP


    if (!sellerOrder.seller.equals(req.user._id)) {
        throw new apiErrr(
            403,
            "Unauthorized access."
        );
    }


    // CHECK SELLER ORDER STATUS


    if (sellerOrder.orderStatus !== "packed") {
        throw new apiErrr(
            409,
            "Cannot create shipment at the moment."
        );
    }


    // EXISTING SHIPMENT CHECK


    const existingShipment = await Shipping.findOne({
        sellerOrder: sellerOrder._id,
    });

    if (existingShipment) {
        throw new apiErrr(
            409,
            "Shipment already exists for this seller order."
        );
    }


    // GENERATE SHIPMENT NUMBER


    const shipmentNumber = await generateSequence(
        "shipmentNumber",
        "SHI"
    );


    // CREATE SHIPMENT


    const shipping = await Shipping.create({
        order: sellerOrder.parentOrder,
        sellerOrder: sellerOrder._id,
        seller: sellerOrder.seller,
        customer: sellerOrder.customer,
        shipmentNumber,
        shippingAddress: sellerOrder.shippingAddress,
        status: "created",
    });


    // RESPONSE


    return res.status(201).json({
        success: true,
        message: "Shipment created successfully.",
        shipping,
    });
});



const updateShipmentStatus = asyncHandler(async (req, res) => {
    const { shipmentId } = req.params;
    const { status } = req.body;

    //  Validate Shipment ID
    if (!mongoose.Types.ObjectId.isValid(shipmentId)) {
        throw new apiErrr(
            400,
            "Invalid shipment ID. Please recheck."
        );
    }

    //  Validate Status
    const allowedStatuses = [
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
        throw new apiErrr(
            400,
            "Invalid shipment status."
        );
    }

    //  Find Shipment
    const shipment = await Shipping.findById(shipmentId);

    if (!shipment) {
        throw new apiErrr(
            404,
            "Shipment not found."
        );
    }

    //  Seller Ownership Check
    if (!shipment.seller.equals(req.user._id)) {
        throw new apiErrr(
            403,
            "Unauthorized access."
        );
    }

    //  Valid Status Transitions
    const validTransitions = {
        created: ["picked_up"],
        picked_up: ["in_transit"],
        in_transit: ["out_for_delivery"],
        out_for_delivery: ["delivered"],
        delivered: [],
        cancelled: [],
    };

    const currentStatus = shipment.status;

    if (!validTransitions[currentStatus].includes(status)) {
        throw new apiErrr(
            409,
            `Cannot change shipment status from ${currentStatus} to ${status}.`
        );
    }

    //  Update Shipment Status
    shipment.status = status;

    //  Add Timeline Entry
    shipment.timeline.push({
        status,
        updatedAt: new Date(),
    });

    //  If Delivered
    if (status === "delivered") {
        shipment.deliveredAt = new Date();
    }

    //  Save Shipment
    await shipment.save();

    //  Response
    res.status(200).json({
        success:true,
        message:"Shipment status updated successfully.",
        shipment,
    })

    
   
});

module.exports = {
   createShipping,
   updateShipmentStatus,
}