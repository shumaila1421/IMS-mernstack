const Category = require("../models/category.model");
const Product = require("../models/product.model");

const createCategory = async function (req, res) {
  try {
    const { name, description } = req.body;

    const category = await Category.create({ name, description });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This category already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getCategories = async function (req, res) {
  try {
    const categories = await Category.find().sort({ name: 1 });

    return res.json({
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateCategory = async function (req, res) {
  try {
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true },
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This category already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteCategory = async function (req, res) {
  try {
    const productCount = await Product.countDocuments({
      category: req.params.id,
    });

    if (productCount > 0) {
      return res.status(400).json({
        message: `Cannot delete: ${productCount} product(s) use this category`,
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.json({
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
