import express from 'express';
import { DatabaseHandler } from './databaseHandler';
import { ImageUploader } from './imageUploader';
import { AppListener } from './appListener';
import { MongoClient } from 'mongodb';
import { AuthorizationHandler } from './authorizationHandler';


const app = express();
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/');


const appListener = new AppListener(app);
const imageUploader = new ImageUploader(app);
const databaseHandler = new DatabaseHandler(app, mongoClient);
const authorizationHandler = new AuthorizationHandler(app, mongoClient);