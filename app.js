const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();
const PORT = process.env.PORT || 3001;
const mongodb = require("mongodb");
const Product = require("./models/productModel");
const DB =
  "mongodb+srv://admin:admin1122@cluster0.ytnqn8p.mongodb.net/Node-API?retryWrites=true&w=majority";

//middleware
app.use(express.json());
app.use(cors())
//product get request
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
});

//product get request by single id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//product update request by single id
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //we cannot find data in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product of this id ${id}` });
    }
    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//product delete request by single id
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    //we cannot find data in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product of this id ${id}` });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Product Post request
app.post("/products", async (req, res) => {
  const { name, quantity, price, image } = req.body;

  try {
    const product = await Product.create({
      name,
      quantity,
      price,
      image,
    });
    res.status(201).json({ data: product, message: "Data added successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
});

//MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Not Connect", err));

// Start your Express.js server
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
