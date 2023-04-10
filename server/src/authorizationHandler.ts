import { Express, Request, Response } from 'express';
import { MongoClient } from 'mongodb';




export class AuthorizationHandler {
  constructor(private app: Express, private mongoClient: MongoClient) {
    this.initRoutes();
  }

  private async initRoutes(): Promise<void> {
    this.app.get('/auth/:string', async (req: Request, res: Response) => {
      try {
        const db = this.mongoClient.db('fullstack-typescript');
        const collection = db.collection('users');

        switch (req.params.string) {
          case 'login': {
            const { email, password } = req.query;
            const user = await collection.findOne({email: email, password: password});
            if (user) {
              res.cookie('authTokenFuckMyBrain', user.token, {maxAge: 3600000});
              res.send(user);
            }
            else res.send({alert: 'Wrong data!'});
            break;
          }
          case 'check': {
            const authToken = req.cookies.authTokenFuckMyBrain;
            const user = await collection.findOne({token: authToken});
            if (user) res.send(user);
            else res.send({alert: 'Not authorized!'});
            break;
          }
          case 'edit': {
            const id = req.query.id as string;
            const newText = req.query.text;
            // await collection.updateOne({ _id: new ObjectId(id) }, { $set: { text: newText } });
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