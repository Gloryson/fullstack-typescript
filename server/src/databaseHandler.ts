import { Express, Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';


export class DatabaseHandler {

  constructor(private app: Express, private mongoClient: MongoClient) {
    this.initRoutes();
  }

  private async initRoutes(): Promise<void> {

    this.app.get('/db/:string', async (req: Request, res: Response) => {
      try {
        const db = this.mongoClient.db('fullstack-typescript');
        const collection = db.collection('todo-list');

        switch (req.params.string) {
          case 'add': {
            await collection.insertOne({ text: req.query.text });
            res.send({ success: true });
            break;
          }
          case 'del': {
            const id = req.query.id as string;
            await collection.deleteOne({ _id: new ObjectId(id) });
            res.send({ success: true });
            break;
          }
          case 'edit': {
            const id = req.query.id as string;
            const newText = req.query.text;
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: { text: newText } });
            res.send({ success: true });
            break;
          }
          case 'get': {
            const list = await collection.find().toArray();
            res.send(list);
            break;
          }
          default: res.send('Invalid request');
        } 
      } catch (error) {
        res.send(error);
      }
    });
  }
}