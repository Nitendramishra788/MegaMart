const Category = require("../../models/Category");
const mongoose = require("mongoose");
const ApiError = require(
  "../../utils/apiErrr"
);

const asyncHandler = require("../../utils/asyncHandler");
const slugify = require("slugify");
const apiErrr = require("../../utils/apiErrr");

const createCategory = asyncHandler(
  async (req, res) => {

    const {
      name,
      parentCategory,
    } = req.body;

    // CHECK NAME
    if (!name) {
     throw new apiErrr(
      400,
      "Category name is required",
     )
    }

    // DUPLICATE CHECK
    const existingCategory =
      await Category.findOne({ name });

    if (existingCategory) {
      throw new  apiErrr(
        400,
        "Category already exists",
      )
    }

    let level = 0;

    // IF CHILD CATEGORY
    if (parentCategory) {

      if (
  parentCategory &&
  !mongoose.Types.ObjectId.isValid(
    parentCategory
  )
) {
 
  throw new apiErrr(
    400,
    "Invalid parent category ID",
  )
}

      const parent =
        await Category.findById(
          parentCategory
        );

      if (!parent) {
       throw new apiErrr(
        404,
        "Invalid parent category ID",
       )
      }

      level = parent.level + 1;
    }

    const slug = slugify(name, {
  lower: true,
  strict: true,
});

    // CREATE CATEGORY
    const category =
      await Category.create({
        name,
        parentCategory:
          parentCategory || null,
        level,
      });

    res.status(201).json({
      success: true,
      message:
        "Category created successfully",
      category,
    });

  }
);


module.exports = {
    createCategory,
}