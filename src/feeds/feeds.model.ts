import * as mongoose from "mongoose";
import { Feed } from "./feed.interface";

const feedSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
    lastFetched: Date,
  },
  {
    timestamps: true,
  }
);

const feedModel = mongoose.model<Feed & mongoose.Document>("Feed", feedSchema);

export default feedModel;
