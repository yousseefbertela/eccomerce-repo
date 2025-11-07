import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  }
});

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    orderNumber: {
      type: String,
      unique: true
    },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String },
      country: { type: String, required: true, default: 'Egypt' }
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cash_on_delivery'],
      default: 'cash_on_delivery'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0
    },
    taxPrice: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: {
      type: Date
    },
    notes: {
      type: String
    },
    statusHistory: [{
      status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      note: String
    }]
  },
  {
    timestamps: true
  }
);

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `ORD${year}${month}${day}${random}`;
  }
  next();
});

// Add status to history when status changes
orderSchema.pre('save', function(next) {
  if (this.isModified('orderStatus')) {
    this.statusHistory.push({
      status: this.orderStatus,
      updatedAt: new Date()
    });
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
