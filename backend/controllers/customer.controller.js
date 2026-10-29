const Customer = require("../models/customer.model");
const Invoice = require("../models/invoice.model");

const createCustomer = async function (req, res) {
  try {
    const { name, phone, email, address } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Customer name is required",
      });
    }

    const customer = await Customer.create({
      name,
      phone,
      email,
      address,
    });

    return res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getCustomers = async function (req, res) {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Customers fetched successfully",
      customers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getCustomerById = async function (req, res) {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer fetched successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateCustomer = async function (req, res) {
  try {
    const { name, phone, email, address } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        message: "Customer name is required",
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, address },
      { new: true, runValidators: true },
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteCustomer = async function (req, res) {
  try {
    const invoiceCount = await Invoice.countDocuments({
      customer: req.params.id,
    });

    if (invoiceCount > 0) {
      return res.status(400).json({
        message: `Cannot delete: ${invoiceCount} invoice(s) belong to this customer`,
      });
    }
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
