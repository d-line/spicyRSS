import HttpException from "./HttpException";

class StoryNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Story with id ${id} not found`);
  }
}

export default StoryNotFoundException;
