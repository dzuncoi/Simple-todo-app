/*
* @author: dzuncoi
* @date: April 1 2017
*/

import path from 'path';
import { Server } from 'http';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import Category from './server/schema/category';
import Todo from './server/schema/todo';

const app = new express();
const server = new Server(app);
let db;

// ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// folder for static assets
app.use(express.static(path.join(__dirname, 'src/static')));

app.get('*', (req, res) => {
  let markup = '';
  let status = 200;
  // Do server-side rendering task here with the markup and renderToString method - but not now
  return res.status(status).render('index', { markup });
});

mongoose.connect('mongodb://dzuncoi:dzuncoi123@ds147900.mlab.com:47900/dh-todo-app');
db = mongoose.connection;
db.once('open', () => {
  console.log('MONGOOSE CONNECTED');
  const port = process.env.PORT || 3000;
  server.listen(port, err => {
    if (err) return console.log(err);
    console.log(`Let's go http://localhost:${port}`);
  })
})

app.post('/category', (req, res) => {
  db.collection('categories').save(req.body, (err, res) => {
    if (err) return res.send(400);
    res.send(200)
  })
})
