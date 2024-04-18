// $ node src/index.js

// const express = require('express');
// const dotenv = require('dotenv');
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Text => New text, Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
