import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const permissionSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  canView: { type: Boolean, default: true },
  canEdit: { type: Boolean, default: false },
  canCreate: { type: Boolean, default: false },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['boss', 'staff'], default: 'staff' },
  department: { type: String },
  position: { type: String },
  approved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  canCreateFiles: { type: Boolean, default: false },
  permissions: { type: [permissionSchema], default: [] },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

// Removed password hashing - SECURITY WARNING: Passwords stored in plain text
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.methods.comparePassword = function (candidate) {
  // Direct comparison instead of bcrypt.compare for plain text passwords
  return Promise.resolve(candidate === this.password);
};

export default mongoose.model('User', userSchema);
