import HttpException from "./HttpException";

class FeedAlreadyExistsException extends HttpException {
  constructor(url: string) {
    super(409, `Feed with url ${url} already exists`);
  }
}

export default FeedAlreadyExistsException;
