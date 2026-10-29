const Product = require("../models/product.model");
const Invoice = require("../models/invoice.model");

const LOW_STOCK_LIMIT = 5;
const TIMEZONE = "Asia/Karachi";

function dayString(date) {
  return date.toLocaleDateString("en-CA", { timeZone: TIMEZONE });
}

const getDashboardStats = async function (req, res) {
  try {
    const [
      totals,
      lowStockCount,
      outOfStockCount,
      recentProducts,
      lowStockProducts,
      dailySales,
      statusTotals,
      recentInvoices,
    ] = await Promise.all([
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          },
        },
      ]),

      Product.countDocuments({ quantity: { $gt: 0, $lte: LOW_STOCK_LIMIT } }),

      Product.countDocuments({ quantity: 0 }),

      Product.find().sort({ createdAt: -1 }).limit(5),

      Product.find({ quantity: { $lte: LOW_STOCK_LIMIT } })
        .sort({ quantity: 1 })
        .limit(5),

      Invoice.aggregate([
        {
          $match: {
            status: { $ne: "Cancelled" },
            createdAt: { $gte: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: TIMEZONE,
              },
            },
            total: { $sum: "$grandTotal" },
          },
        },
      ]),

      Invoice.aggregate([
        {
          $group: {
            _id: "$status",
            total: { $sum: "$grandTotal" },
            count: { $sum: 1 },
          },
        },
      ]),

      Invoice.find()
        .populate("customer", "name")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const summary = totals[0] || { totalProducts: 0, totalStockValue: 0 };

    const salesByDay = new Map(dailySales.map((day) => [day._id, day.total]));
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = dayString(new Date(Date.now() - i * 24 * 60 * 60 * 1000));
      last7Days.push({ date, total: salesByDay.get(date) || 0 });
    }

    const empty = { total: 0, count: 0 };
    const byStatus = Object.fromEntries(
      statusTotals.map((item) => [item._id, item]),
    );
    const paid = byStatus.Paid || empty;
    const pending = byStatus.Pending || empty;
    const cancelled = byStatus.Cancelled || empty;

    return res.json({
      totalProducts: summary.totalProducts,
      totalStockValue: summary.totalStockValue,
      lowStockCount,
      outOfStockCount,
      lowStockLimit: LOW_STOCK_LIMIT,
      recentProducts,
      lowStockProducts,
      sales: {
        todaySales: last7Days[6].total,
        totalRevenue: paid.total,
        pendingAmount: pending.total,
        paidCount: paid.count,
        pendingCount: pending.count,
        cancelledCount: cancelled.count,
        last7Days,
      },
      recentInvoices,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { getDashboardStats };
