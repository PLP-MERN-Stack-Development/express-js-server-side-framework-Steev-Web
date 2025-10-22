// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     unique: true,
//     required: true,
//     default: () => Math.floor(1000 + Math.random() * 9000), // Auto-generate a 4-digit ID
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     trim: true
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   category: {
//     type: String,
//     trim: true
//   },
//   inStock: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });


// module.exports = mongoose.model("Product", productSchema);



const mongoose = require("mongoose");

// Create a counter schema to track the latest product ID
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// Define your Product schema
const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to auto-increment ID
productSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
