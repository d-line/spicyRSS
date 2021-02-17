import * as express from "express";
import Feed from "./feed.interface";

class FeedsController {
  public path = "/feeds";
  public router = express.Router();

  private feeds: Feed[] = [
    {
      name: "ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ ",
      url: "https://webs.com/in/faucibus/orci.aspx",
      lastFetched: "2021-02-04T00:33:55Z",
      createdAt: "2020-09-12T07:44:28Z",
      updatedAt: "2020-11-02T23:30:23Z",
    },
    {
      name: "<svg><script>0<1>alert('XSS')</script>",
      url: "https://mac.com/a/pede/posuere/nonummy/integer.html",
      lastFetched: "2020-06-13T00:55:21Z",
      createdAt: "2020-09-13T10:34:44Z",
      updatedAt: "2020-03-30T06:44:18Z",
    },
    {
      name: "(｡◕ ∀ ◕｡)",
      url:
        "http://theguardian.com/proin/leo/odio/porttitor/id/consequat/in.xml",
      lastFetched: "2020-11-25T13:35:25Z",
      createdAt: "2020-07-22T02:37:36Z",
      updatedAt: "2020-12-08T05:16:12Z",
    },
    {
      name: "1/2",
      url: "http://nifty.com/sit/amet/eros/suspendisse.jpg",
      lastFetched: "2020-04-23T15:13:48Z",
      createdAt: "2020-09-14T13:52:53Z",
      updatedAt: "2020-10-24T20:44:48Z",
    },
    {
      name: "👩🏽",
      url: "http://bloomberg.com/integer/pede/justo/lacinia/eget.jsp",
      lastFetched: "2020-04-01T12:12:50Z",
      createdAt: "2020-07-06T23:29:13Z",
      updatedAt: "2020-09-25T09:40:01Z",
    },
    {
      name: "울란바토르",
      url: "https://topsy.com/congue/vivamus.xml",
      lastFetched: "2020-06-18T01:51:41Z",
      createdAt: "2020-09-02T18:55:52Z",
      updatedAt: "2020-06-29T22:25:33Z",
    },
    {
      name: "　",
      url: "https://hp.com/consectetuer/adipiscing.jsp",
      lastFetched: "2021-01-06T04:21:16Z",
      createdAt: "2020-10-11T23:12:36Z",
      updatedAt: "2020-04-16T19:09:02Z",
    },
    {
      name: "\"''''\"'\"",
      url: "http://theglobeandmail.com/volutpat.aspx",
      lastFetched: "2021-01-13T22:33:19Z",
      createdAt: "2020-10-03T17:57:52Z",
      updatedAt: "2021-01-24T01:00:09Z",
    },
    {
      name: "̡͓̞ͅI̗̘̦͝n͇͇͙v̮̫ok̲̫̙͈i̖͙̭̹̠̞n̡̻̮̣̺g̲͈͙̭͙̬͎ ̰t͔̦h̞̲e̢̤ ͍̬̲͖f̴̘͕̣è͖ẹ̥̩l͖͔͚i͓͚̦͠n͖͍̗͓̳̮g͍ ̨o͚̪͡f̘̣̬ ̖̘͖̟͙̮c҉͔̫͖͓͇͖ͅh̵̤̣͚͔á̗̼͕ͅo̼̣̥s̱͈̺̖̦̻͢.̛̖̞̠̫̰",
      url: "http://friendfeed.com/vestibulum/ante/ipsum/primis/in/faucibus.png",
      lastFetched: "2020-09-23T06:51:32Z",
      createdAt: "2020-09-19T21:50:13Z",
      updatedAt: "2020-09-03T22:27:44Z",
    },
    {
      name: "-$1.00",
      url: "https://indiatimes.com/ante/nulla/justo/aliquam/quis.json",
      lastFetched: "2020-11-29T23:45:50Z",
      createdAt: "2020-08-18T21:59:43Z",
      updatedAt: "2020-08-23T03:15:14Z",
    },
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllFeeds);
    this.router.post(this.path, this.createAFeed);
  }

  getAllFeeds = (request: express.Request, response: express.Response) => {
    response.send(this.feeds);
  }
 
  createAFeed = (request: express.Request, response: express.Response) => {
    const feed: Feed = request.body;
    this.feeds.push(feed);
    response.send(feed);
  }
}

export default FeedsController;
