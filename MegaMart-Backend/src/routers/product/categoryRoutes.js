const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {admin} = require("../../middlewares/adminMiddleware");


const {
    createCategory,
} = require("../../controllers/product/categoryController");


router.post(
    "/create",
    protect,
    admin,
    createCategory
);



module.exports = router;