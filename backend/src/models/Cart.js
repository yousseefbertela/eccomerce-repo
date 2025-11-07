import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  // Snapshots for string-based identification/display
  productName: {
    type: String,
    default: null
  },
  productSlug: {
    type: String,
    default: null
  },
  // Optional variant selections
  size: {
    type: String,
    required: false,
    default: null
  },
  color: {
    type: String,
    required: false,
    default: null
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0
    },
    totalItems: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
