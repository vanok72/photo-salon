import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  source: { type: String, required: true },
  title: { type: String, required: true },
  priority: { type: Number},
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export default mongoose.models.sponsor || mongoose.model('sponsor', schema);
