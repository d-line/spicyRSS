import * as mongoose from "mongoose";
import { Story } from "./story.interface";

const storySchema = new mongoose.Schema(
  {
    title: String,
    permalink: String,
    body: String,
    feed: {
      ref: "Feed",
      type: mongoose.Schema.Types.ObjectId,
    },
    published: Date,
    isRead: {
      type: Boolean,
      default: false
    },
    keepUnread: {
      type: Boolean,
      default: false
    },
    isStarred: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

const storyModel = mongoose.model<Story & mongoose.Document>(
  "Story",
  storySchema
);

export default storyModel;
