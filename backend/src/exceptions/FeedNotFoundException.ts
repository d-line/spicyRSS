import HttpException from "./HttpException";

class FeedNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Feed with id ${id} not found`);
  }
}

export default FeedNotFoundException;
