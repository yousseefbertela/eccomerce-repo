import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['NEW_USER', 'PERMISSION_GRANTED'], required: true },
  message: { type: String, required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Object },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
