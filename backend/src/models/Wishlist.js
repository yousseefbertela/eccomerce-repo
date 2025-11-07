import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    // Store product names for human-readable wishlist items
    products: [{
      type: String,
      required: true
    }]
  },
  {
    timestamps: true
  }
);

// We rely on controller logic to prevent duplicates in the products array

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
