import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';



const app = express();
const port = process.env.PORT || 3001;

app.use(cors()).listen(port, () => {
  console.log(`Application started on port ${port}!`);
})



app.get('/', (req: Request, res: Response) => {
  res.send(`Application started!`);
});