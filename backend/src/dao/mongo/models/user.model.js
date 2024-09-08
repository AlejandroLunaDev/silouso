const mongoose = require("mongoose");

const collection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  avatar: {
    type: String,
    default: '',
  },
  documents: [
    {
      reference: {
        dniFront: {
          type: String,
          required: false,
        },
        dniBack: {
          type: String,
          required: false,
        }
      },
      fullName: {
        type: String,
        required: false,
      },
      dni: {
        type: String,
        required: false,
        unique: true,
      },
      birthDate: {
        type: Date,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      postalCode: {
        type: String,
        required: false,
      },
      neighborhood: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      province: {
        type: String,
        required: false,
      },
      bankCard: {
        cardNumber: {
          type: String,
          required: false,
        },
        cardHolderName: {
          type: String,
          required: false,
        },
        expirationDate: {
          type: Date,
          required: false,
        },
        cvv: {
          type: String,
          required: false,
        }
      }
    },
  ],
  last_connection: {
    type: Date,
    default: Date.now,
  },
  isPremium: {
    type: Boolean,
    default: false,
  }
});

const userModel = mongoose.model(collection, userSchema);

module.exports = userModel;
