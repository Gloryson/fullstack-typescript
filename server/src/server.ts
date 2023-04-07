import express, { Request, Response } from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import multer from 'multer';
import path from 'path';



const app = express();
const port = process.env.PORT || 3001;
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/');


const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'uploaded_images/'),
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + Date.now() + extension;
    callback(null, filename);
  },
});
const upload = multer({ storage });


app.use(cors()).listen(port, () => {
  console.log(`Application started on port ${port}!`);
})



async function connect () {

  app.post('/upload-image', upload.single('uploaded-file'), (req, res, next) => {
    res.send({ success: true });
  })

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