const Supplier = require("../models/supplier.model");
const Product = require("../models/product.model");

const createSupplier = async function (req, res) {
  try {
    const { name, phone, email, address } = req.body;

    const supplier = await Supplier.create({ name, phone, email, address });

    return res.status(201).json({
      message: "Supplier created successfully",
      supplier,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This supplier already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Supplier name is required",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getSuppliers = async function (req, res) {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });

    return res.json({
      suppliers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateSupplier = async function (req, res) {
  try {
    const { name, phone, email, address } = req.body;

    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, address },
      { new: true, runValidators: true },
    );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    return res.json({
      message: "Supplier updated successfully",
      supplier,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This supplier already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Supplier name is required",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteSupplier = async function (req, res) {
  try {
    const productCount = await Product.countDocuments({
      supplier: req.params.id,
    });
    if (productCount > 0) {
      return res.status(400).json({
        message: `Cannot delete: ${productCount} product(s) use this supplier`,
      });
    }
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    return res.json({
      message: "Supplier deleted successfully",
      supplier,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
};
