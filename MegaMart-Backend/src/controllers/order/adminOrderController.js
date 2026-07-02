const asyncHandler = require("../../utils/asyncHandler");
const Order = require("../../models/Order");
const apiErrr = require("../../utils/apiErrr");

// GET /admin/orders
const getAllOrders = asyncHandler(async (req, res) => {
    const {
        limit = "10",
        page = "1",
        sort = "latest",
        status = "all",
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // page validation
    if (Number.isNaN(pageNumber) || pageNumber < 1) {
        throw new apiErrr(400, "page must be greater than or equal to 1");
    }

    // limit validation
    if (Number.isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) {
        throw new apiErrr(
            400,
            "limit must be greater than or equal to 1 and less than or equal to 100"
        );
    }

    // sort validation
    if (sort !== "latest" && sort !== "oldest") {
        throw new apiErrr(400, "sort must be either latest or oldest");
    }

    // status validation
    if (
        status !== "all" &&
        status !== "pending" &&
        status !== "confirmed" &&
        status !== "packed" &&
        status !== "shipped" &&
        status !== "delivered" &&
        status !== "cancelled"
    ) {
        throw new apiErrr(400, "Invalid status value");
    }

    // filter
    const filter = {};
    if (status !== "all") {
        filter.orderStatus = status;
    }

    // sort option
    const sortOption = {};
    if (sort === "latest") {
        sortOption.createdAt = -1;
    } else {
        sortOption.createdAt = 1;
    }

    // pagination
    const skip = (pageNumber - 1) * limitNumber;

    // count total orders
    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / limitNumber);

    // fetch orders
    const orders = await Order.find(filter)
        .populate("user", "name email")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber);

    return res.status(200).json({
        status: "success",
        data: {
            orders,
            pagination: {
                totalOrders,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
            },
        },
    });
});

module.exports = {
    getAllOrders,
};