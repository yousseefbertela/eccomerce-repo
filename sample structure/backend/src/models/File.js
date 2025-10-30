import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, default: '' },
  category: { 
    type: String, 
    enum: ['document', 'policy', 'manual', 'report'], 
    default: 'document' 
  },
  visibility: { 
    type: String, 
    enum: ['private', 'department', 'public'], 
    default: 'private' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'draft'], 
    default: 'draft' 
  },
  requiresApproval: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  isActive: { type: Boolean, default: true },
  permissions: {
    canView: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    canEdit: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    canDelete: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }
}, { timestamps: true });

export default mongoose.model('File', fileSchema);
