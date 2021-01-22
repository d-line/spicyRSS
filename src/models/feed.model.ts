import * as mongoose from 'mongoose';
import { Feed } from './feed';

const feedSchema = new mongoose.Schema({
  name: String,
  url: String,
  lastFetched: Date,
  status: Number
}, {
  timestamps: true
});

const feedModel = mongoose.model<Feed & mongoose.Document>('Feed', feedSchema);
export default feedModel;
