class HttpException extends Error {
  public status: number;

  public message: string;

  constructor (status: number, message: string) {
    // TODO: message is not send (WrongCredentials)
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
