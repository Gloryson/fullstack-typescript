import express, { Request, Response } from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import { upload } from './middlewares';



const app = express();
const port = process.env.PORT || 3001;
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/');


app.use(cors()).listen(port, () => {
  console.log(`Application started on port ${port}!`);
});



async function connect () {

  app.post('/upload-image', upload.single('image'), (req, res, next) => {
    res.send({ success: true });
  })

  app.get('/db/:string', async (req: Request, res: Response) => {

    try {
      let db = mongoClient.db('fullstack-typescript');
		  let collection = db.collection('todo-list');

      switch (req.params.string) {

        case 'add': {
          await collection.insertOne({text: req.query.text});
          res.send({ success: true });
          break;
        }

        case 'del': {
          let id = req.query.id as string;
          await collection.deleteOne({_id: new ObjectId(id)});
          res.send({ success: true });
          break;
        }

        case 'edit': {
          let id = req.query.id as string;
          let newText = req.query.text;
          await collection.updateOne({_id: new ObjectId(id)}, {$set: {text: newText}});
          res.send({ success: true });
          break;
        }

        case 'get': {
          let list = await collection.find().toArray();
          res.send(list);
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