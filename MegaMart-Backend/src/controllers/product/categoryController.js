const Category = require("../../models/Category");
const mongoose = require("mongoose");

const asyncHandler = require("../../utils/asyncHandler");
const slugify = require("slugify");

const createCategory = asyncHandler(
  async (req, res) => {

    const {
      name,
      parentCategory,
    } = req.body;

    // CHECK NAME
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // DUPLICATE CHECK
    const existingCategory =
      await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
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
  return res.status(400).json({
    success: false,
    message: "Invalid parent category ID",
  });
}

      const parent =
        await Category.findById(
          parentCategory
        );

      if (!parent) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found",
        });
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