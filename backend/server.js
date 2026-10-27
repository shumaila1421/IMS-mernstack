require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongodb");
const app = express();
const cors = require("cors");

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", function (req, res) {
  return res.json({
    status: "OK",
  });
});

app.use("/api/auth", require("./routes/user.route"));
app.use("/api/products", require("./routes/product.route"));
app.use("/api/dashboard", require("./routes/dashboard.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/suppliers", require("./routes/supplier.route"));
app.use("/api/customers", require("./routes/customer.route"));

app.listen(process.env.PORT, function () {
  console.log("Server is running on port" + process.env.PORT);
});
