import * as mongoose from "mongoose";
import { Feed } from "./feed.interface";

const feedSchema = new mongoose.Schema(
  {
    name: String,
    url: {
      type: String,
      unique: true
    },
    lastFetched: Date,
  },
  {
    timestamps: true,
  }
);

const feedModel = mongoose.model<Feed & mongoose.Document>("Feed", feedSchema);

export default feedModel;
