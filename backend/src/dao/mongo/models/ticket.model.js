const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 }
      }
    ],
    purchaser: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Middleware `pre` para `find` y `findOne` para hacer populate automáticamente
ticketSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.product',
    select: 'title price' // Incluye los campos que necesites
  });
  next();
});

module.exports = model("tickets", ticketSchema);
