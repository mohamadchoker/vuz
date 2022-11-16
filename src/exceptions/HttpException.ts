export class HttpException extends Error {
  public statusCode: number;
  public title: string;
  public message: string;
  public errors?: { [key: string]: string[] };

  constructor(statusCode: number, message: string, errors?: { [key: string]: string[] }) {
    super(message);
    this.statusCode = statusCode;
    this.title = 'Error';
    this.message = message;
    this.errors = errors;
  }
}
