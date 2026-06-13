const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {admin} = require("../../middlewares/adminMiddleware");


const {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    getCategoryTree,
} = require("../../controllers/product/categoryController");


router.post(
    "/create",
    protect,
    admin,
    createCategory
);

router.get(
  "/tree",
  getCategoryTree
);

// get all cotegory router

router.get(
    "/all",
    getAllCategories,
);



// update category router

router.put(
    "/update/:id",
    protect,
    admin,
    updateCategory
);


// get single cotegory router

router.get(
    "/:id",
    getSingleCategory
)



// delete Category router

router.delete(
    "/delete/:id",
    protect,
    admin,
    deleteCategory,
);


module.exports = router;