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
            const user = await collection.findOne({email: email});
            if (user) {
              if (user.password === password) {
                res.cookie('authTokenFuckMyBrain', user.token, {maxAge: 600000});
                res.send(user);
              } else {
                res.send({alert: 'Wrong password!'});
              } 
            } else {
              res.send({alert: 'The user with such email does not exist!'});
            }
            break;
          }

          case 'check': {
            const authToken = req.cookies.authTokenFuckMyBrain;
            const user = await collection.findOne({token: authToken});
            if (user) res.send(user);
            else res.send({alert: 'Not authorized!'});
            break;
          }

          case 'register': {
            const { email, password, confirm } = req.query;
            const user = await collection.findOne({email: email});
            if (user) {
              res.send({alert: 'The user with such email is already registered!'});
            } else {
              if (password === confirm) {
                const user = { email: email, password: password, token: `${email}${new Date().toISOString()}${password}` };
                await collection.insertOne(user);
                res.cookie('authTokenFuckMyBrain', user.token, {maxAge: 600000});
                res.send(user);
              } else {
                res.send({alert: 'Password is not confirmed!'});
              }
            }
            break;
          }

          case 'sign-out': {
            res.clearCookie('authTokenFuckMyBrain');
            res.send({ alert: 'You are logged out!' });
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