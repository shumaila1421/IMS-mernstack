const Product = require("../models/product.model");

const createProduct = async function (req, res) {
  try {
    const { name, sku, description, price, quantity } = req.body;

    const product = await Product.create({
      name,
      sku,
      description,
      price,
      quantity,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This SKU already exists",
      });
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Please fill all required fields",
        });
      }
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getProducts = async function (req, res) {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("supplier", "name");

    return res.json({
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateProduct = async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    })
      .populate("category", "name")
      .populate("supplier", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteProduct = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
