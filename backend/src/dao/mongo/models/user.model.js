const mongoose = require("mongoose");

const collection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false, // Cambiado a false por si quieres permitir usuarios sin apellido
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
        type: String,
        required: true,
      },
      // Nuevos campos relacionados con la certificación
      fullName: {
        type: String,
        required: true,
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
      // Campos adicionales para la dirección
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
      // Campos adicionales para datos bancarios
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
});

const userModel = mongoose.model(collection, userSchema);

module.exports = userModel;
