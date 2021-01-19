import mongoose from 'mongoose';
import { Feed } from './feed';

const feedsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  lastFetched: Date,
  status: Number
}, {
  timestamps: true
});

const FeedModel = mongoose.model<Feed & mongoose.Document>('Feed', feedsSchema);
export default FeedModel;
