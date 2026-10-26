const Product = require("../models/product.model");

const LOW_STOCK_LIMIT = 5;

const getDashboardStats = async function (req, res) {
  try {
    const [
      totals,
      lowStockCount,
      outOfStockCount,
      recentProducts,
      lowStockProducts,
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
    ]);

    const summary = totals[0] || { totalProducts: 0, totalStockValue: 0 };

    return res.json({
      totalProducts: summary.totalProducts,
      totalStockValue: summary.totalStockValue,
      lowStockCount,
      outOfStockCount,
      lowStockLimit: LOW_STOCK_LIMIT,
      recentProducts,
      lowStockProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { getDashboardStats };
