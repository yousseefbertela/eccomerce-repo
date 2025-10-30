import Notification from '../models/Notification.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const listNotifications = asyncHandler(async (req, res) => {
  const notes = await Notification.find({ to: req.user._id }).sort({ createdAt: -1 });
  res.json(notes);
});

export const markRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Notification.findOne({ _id: id, to: req.user._id });
  if (!note) return res.status(404).json({ message: 'Notification not found' });
  note.read = true;
  await note.save();
  res.json({ message: 'Marked as read' });
});
