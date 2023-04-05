import express, { Request, Response } from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';


const app = express();
const port = process.env.PORT || 3001;
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/');


app.use(cors()).listen(port, () => {
  console.log(`Application started on port ${port}!`);
})



async function connect () {

  app.get('/db/:string', async (req: Request, res: Response) => {

    try {
      let db = mongoClient.db('fullstack-typescript');
		  let collection = db.collection('todo-list');

      switch (req.params.string) {

        case 'add': {
          await collection.insertOne({text: 'Lorem', completed: true});
          res.redirect('/db/show');
          break;
        }

        case 'del': {
          await collection.deleteOne({text: 'Lorem'});
          res.redirect('/db/show');
          break;
        }

        case 'show': {
          let goods = await collection.find().toArray();
          res.send(goods);
          break;
        }

        default: res.send('You are idiot!');

      }
      
    } catch (error) {
        res.send(error);
    }

  })

}

connect();