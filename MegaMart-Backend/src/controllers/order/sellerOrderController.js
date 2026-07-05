const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const SellerOrder = require("../../models/SellerOrder");
const mongoose = require("mongoose");

// get all order api of seller

const getSellerOrder = asyncHandler(
    async (req, res) => {
        const {
            page = "1",
            limit = "10",
            sort = "latest",
            status = "all",
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const filter = {
            seller: req.user._id,
        };

        // page validation
        if (Number.isNaN(pageNumber) || pageNumber < 1) {
            throw new apiErrr(400, "page must be greater than or equal to 1");
        }

        // limit validation
        if (
            Number.isNaN(limitNumber) ||
            limitNumber < 1 ||
            limitNumber > 100
        ) {
            throw new apiErrr(
                400,
                "limit must be greater than or equal to 1 and less than or equal to 100"
            );
        }

        // validate status

        const validStatus = [
            "all",
            "pending",
            "confirmed",
            "packed",
            "shipped",
            "delivered",
            "cancelled",
        ];

        if (!validStatus.includes(status)) {
            throw new apiErrr(400, "Invalid status value");
        }

        // sorting validation

        const validSort = ["latest", "oldest"];

        if (!validSort.includes(sort)) {
            throw new apiErrr(
                400,
                "sort must be either latest or oldest"
            );
        }

        if (status !== "all") {
            filter.orderStatus = status;
        }

        // sort option object

        const sortOption = {};

        if (sort === "latest") {
            sortOption.createdAt = -1;
        } else {
            sortOption.createdAt = 1;
        }

        // pageing section

        const skip = (pageNumber - 1) * limitNumber;

        const totalOrders = await SellerOrder.countDocuments(filter);
        const totalPages = Math.ceil(totalOrders / limitNumber);

        // fetching data from DataBase

        const sellerOrders = await SellerOrder.find(filter)
            .populate("customer", "name email")
            .populate("parentOrder", "orderNumber")
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        return res.status(200).json({
            success: true,
            message: "Seller orders fetched successfully.",
            data: sellerOrders,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalOrders,
                limit: limitNumber,
            },
        });
    }
);




// this is part of get single order by using Id

const getSingleOrder = asyncHandler(
    async (req, res) => {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new apiErrr(
                409,
                "Invaild order ID...!"
            )
        };


        const sellerOrder = await SellerOrder.findOne({
            _id: orderId,
            seller: req.user._id
        })

        if (!sellerOrder) {
            throw new apiErrr(
                400,
                "order fond not..!"
            )
        }


        return res.status(200).json({
            success: true,
            message: "Seller order fetched successfully.",
            data: sellerOrder,
        });


    }



)

module.exports = {
    getSellerOrder,
      getSingleOrder,
};