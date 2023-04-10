import { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



export class AppListener {
  private port: string | number;

  constructor (private app: Express) {
    this.port = process.env.PORT || 3001;
    this.useCors();
    this.useCookieParser();
    this.initListen();
  }

  private useCors (): void {
    this.app.use(cors({
      origin: true,
      credentials: true
    }));
  }

  private useCookieParser (): void {
    this.app.use(cookieParser('randomString'));
  }

  private initListen (): void {
    this.app.listen(this.port, () => {
      console.log(`Application started on port ${this.port}!`);
    })
  }
}