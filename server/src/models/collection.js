import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  source: { type: String, required: true },
  title: { type: String, required: true },
  season: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export default mongoose.models.collection ||
  mongoose.model('collection', schema);
