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
      throw new apiErrr(
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


// get all category 

const getAllCategories =
  asyncHandler(async (
    req,
    res
  ) => {

    const categories =
      await Category.find()

        .populate(
          "parentCategory",
          "name slug"
        )

        .sort({
          createdAt: -1,
        });


    res.status(200).json({
      success: true,

      count:
        categories.length,

      categories,
    });

  });


// find by id Single cetegory

const getSingleCategory = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiErrr(
        400,
        "inValid Category ID !"
      )
    }


    const category = await Category.findById(id)

      .populate("parentCategory", "name slug");

    if (!category) {
      throw new apiErrr(
        404,

        "Category not Found !"
      )
    }


    res.status(200).json({
      success: true,
      category,
    })


  }
)

// update Router

const updateCategory = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    const {
      name,
      parentCategory,
    } = req.body;

    // valiad category 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiErrr(
        400,
        "Invalid Category ID"
      )
    };


    const category = await Category.findById(id);

    if (!category) {
      throw new apiErrr(
        404,
        "category not found"
      );


      // check dublicate name 

      if (name) {
        const alreadyExist = await Category.findOne({
          name,
          _id: {
            $ne: id,
          },
        });

        if (alreadyExist) {
          throw new apiErrr(
            400,
            "this name of category already exist!"
          )
        }


      }

    }


    category.name = name;

    category.slug = slugify(name,
      {
        lower: true,
        strict: true,
      }
    );


    // parent Category update

    if (parentCategory != undefined) {

      // safe protection
      if (parentCategory === id) {
        throw new apiErrr(
          400,
          "Category cannot be its own parent"
        )
      }


      // check validation of ID

      if (

        parentCategory &&
        !mongoose.Types.ObjectId.isValid(parentCategory)

      ) {

        throw new apiErrr(
          400,
          "invalid Parent category ID !"
        );

      }

      if (parentCategory) {

        const parent = await Category.findById(
          parentCategory
        );

        if (!parent) {

          throw new apiErrr(
            404,
            "parent Category not found"
          )
        }

        category.level = parent.level + 1;

      } else {
        category.level = 0;
      }

      category.parentCategory = parentCategory || null;
    }

    // save update in the database

    await category.save();

    res.status(200).json({
      success: true,
      message: "category updated successFully..",
      category,
    })

  }
)


// delete category router

const deleteCategory = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    // valiad objectId

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiErrr(
        400,
        "Invalid category ID !"
      )
    }

    // find category

    const category = await Category.findById(id);

    if (!category) {
      throw new apiErrr(
        404,
        "category not found"
      )
    }

    // check child category 

    const hasChild = await Category.findOne({
      parentCategory: id
    })

    if (hasChild) {
      throw new apiErrr(
        400,
        "Cannot delete category with subcategories"
      );
    }

    // now delte

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Category deleted successfully",
    });


  }
)



//  category tree 


const getCategoryTree = asyncHandler(
  async (req, res) => {

    // get all category 

    const categories = await Category.find()

      .sort({ createdAt: 1 });

    // recursive function

    // RECURSIVE FUNCTION
    const buildTree = (
      parentId = null
    ) => {

      return categories

        .filter((cat) =>

          String(
            cat.parentCategory
          ) === String(parentId)
        )

        .map((cat) => ({

          _id: cat._id,

          name: cat.name,

          slug: cat.slug,

          level: cat.level,

          children:
            buildTree(cat._id),

        }));

    };

    const tree = buildTree(null);

    res.status(200).json({

      success: true,

      message:
        "Category tree fetched",

      categories:
        tree,

    });

  }
)



module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree
}