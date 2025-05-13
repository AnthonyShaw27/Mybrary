import 'dotenv/config';

import express from 'express';
const app = express();
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'

import indexRouter from './routes/index.mjs'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.on('open', () => console.log('Connected to Mongoose') )

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000);

