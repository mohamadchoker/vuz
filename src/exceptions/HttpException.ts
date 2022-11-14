export class HttpException extends Error {
  public status: number;
  public title: string;
  public message: string;
  public errors?: { [key: string]: string[] };

  constructor(status: number, message: string, errors?: { [key: string]: string[] }) {
    super(message);
    this.status = status;
    this.title = 'Error';
    this.message = message;
    this.errors = errors;
  }
}
