import mongoose from 'mongoose';

const fileAuditSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE', 'UPDATE_SHARES'], required: true },
  changes: {
    oldName: String,
    newName: String,
    oldContent: String,
    newContent: String,
    sharedWith: Array, // For UPDATE_SHARES action
  },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

// Index for efficient queries
fileAuditSchema.index({ fileId: 1, timestamp: -1 });
fileAuditSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model('FileAudit', fileAuditSchema);