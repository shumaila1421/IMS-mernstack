const mongoose = require("mongoose");
const Invoice = require("../models/invoice.model");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");

async function restoreStock(items) {
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { quantity: item.quantity },
    });
  }
}

const createInvoice = async (req, res) => {
  const reserved = [];

  try {
    const { customer, items } = req.body;

    if (
      !mongoose.isValidObjectId(customer) ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Customer and invoice items are required",
      });
    }

    const customerDoc = await Customer.findById(customer);

    if (!customerDoc) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const merged = new Map();

    for (const item of items) {
      if (
        !mongoose.isValidObjectId(item.product) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "Valid product and quantity are required",
        });
      }

      const key = String(item.product);
      merged.set(key, (merged.get(key) || 0) + item.quantity);
    }

    const invoiceItems = [];
    let grandTotal = 0;

    for (const [productId, quantity] of merged) {
      // Stock check aur stock kam karna ek hi qadam mein (atomic)
      const product = await Product.findOneAndUpdate(
        { _id: productId, quantity: { $gte: quantity } },
        { $inc: { quantity: -quantity } },
        { returnDocument: "after" },
      );

      if (!product) {
        await restoreStock(reserved);

        const existing = await Product.findById(productId);

        if (!existing) {
          return res.status(404).json({
            message: "Product not found",
          });
        }

        return res.status(400).json({
          message: `Insufficient stock for ${existing.name}`,
        });
      }

      reserved.push({ product: product._id, quantity });

      const total = product.price * quantity;
      grandTotal += total;

      invoiceItems.push({
        product: product._id,
        name: product.name,
        sku: product.sku,
        quantity,
        price: product.price,
        total,
      });
    }

    const invoice = await Invoice.create({
      invoiceNumber: `INV-${Date.now()}`,
      customer: customerDoc._id,
      customerName: customerDoc.name,
      createdBy: req.user._id,
      items: invoiceItems,
      grandTotal,
    });

    return res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    console.log(error);

    await restoreStock(reserved);

    return res.status(500).json({
      message: "Failed to create invoice",
    });
  }
};

const getInvoices = async (req, res) => {
  try {
    const filter = req.user.role === "staff" ? { createdBy: req.user._id } : {};

    const invoices = await Invoice.find(filter)
      .populate("customer", "name email phone")
      .populate("items.product", "name sku price")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Invoices fetched successfully",
      invoices,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch invoices",
    });
  }
};

const getSingleInvoice = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    const filter = { _id: req.params.id };

    if (req.user.role === "staff") {
      filter.createdBy = req.user._id;
    }

    const invoice = await Invoice.findOne(filter)
      .populate("customer", "name email phone")
      .populate("items.product", "name sku price")
      .populate("createdBy", "name");

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      message: "Invoice fetched successfully",
      invoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch invoice",
    });
  }
};

const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    if (!["Paid", "Cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Paid or Cancelled",
      });
    }

    const allowedFrom = status === "Paid" ? ["Pending"] : ["Pending", "Paid"];

    const updated = await Invoice.findOneAndUpdate(
      { _id: req.params.id, status: { $in: allowedFrom } },
      { status },
      { returnDocument: "after" },
    );

    if (!updated) {
      const existing = await Invoice.findById(req.params.id);

      if (!existing) {
        return res.status(404).json({
          message: "Invoice not found",
        });
      }

      return res.status(400).json({
        message: `Cannot change status from ${existing.status} to ${status}`,
      });
    }

    if (status === "Cancelled") {
      await restoreStock(updated.items);
    }

    const invoice = await Invoice.findById(updated._id)
      .populate("customer", "name email phone")
      .populate("items.product", "name sku price")
      .populate("createdBy", "name");

    return res.status(200).json({
      message: `Invoice marked as ${status}`,
      invoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update invoice status",
    });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getSingleInvoice,
  updateInvoiceStatus,
};
