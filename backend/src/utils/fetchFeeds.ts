// #!/usr/bin/env node
// // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// require('tls').DEFAULT_MIN_VERSION = 'TLSv1';
// require('../models/db');
// const url = require('url');
// const mongoose = require('mongoose');
// const Parser = require('rss-parser');
// const ctrlFeeds = require('../controllers/feeds');
import * as mongoose from "mongoose";
import "dotenv/config";
import feedModel from "../feeds/feeds.model";
import storyModel from "../stories/stories.model";
import * as Parser from "rss-parser";
import { Feed } from "feeds/feed.interface";

setTimeout(() => {
  console.log("KILLING THE FETCH");
  process.exit(0);
}, 1000 * 60 * 9);

const { MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    feedModel
      .find({})
      .lean()
      .then((feeds) => {
        const parser = new Parser({
          "headers": {
            "Accept": "*/*",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15",
          },
        });

        feeds.forEach((feed) => {
          parser.parseURL(feed.url).then(data => {
            const maxDate = data.items.map(d => d.pubDate).sort((a, b) => (new Date(b).getTime()) - (new Date(a).getTime()))[0];
            addStories(feed, data.items);
            feedModel.findByIdAndUpdate(feed._id, {lastFetched: new Date(maxDate)}).then(() => {
              console.log(`Feed [${feed.name}] updated at ${maxDate}`);
            }).catch(err => {
              console.error(`Failed to update feed ===> ${err}`);
            })
          }).catch(err => {
            console.error(`[ERROR] => ${err}`);
          });
        });
        console.table(feeds);
      });
  })
  .catch((err) => {
    console.error(`[ERROR] => ${err}`);
    process.exit(1);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addStories = (feed: Feed, stories: any[]) => {
    stories.forEach((story) => {
      const newStory = {
        title: story.title,
        permalink: story.link,
        body: story['content:encoded'] || story.content,
        published: story.pubDate,
        feed: feed._id
      };
      storyModel.create(newStory, (err) => {
        if (!err) {
          // eslint-disable-next-line
          console.log(`${feed.name} => ${newStory.title} [${newStory.permalink}]`);
        } else {
          console.error(`\t[SAVE ERROR] => ${newStory.permalink}`);
        }
      });
    });
  };
