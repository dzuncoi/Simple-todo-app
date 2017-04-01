/*
* @author: dzuncoi
* @date: April 1 2017
*/

import path from 'path';
import { Server } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import Category from './server/schema/category';
import Todo from './server/schema/todo';

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = new Server(app);
let db;

// ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// folder for static assets
app.use(express.static(path.join(__dirname, 'src/static')));

app.get('/', (req, res) => {
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

// CATEGORIES
app.get('/categories', (req, res) => {
  const query = req.query || {};
  const conditions = query.conditions || {},
        skip = query.skip || 0,
        limit = query.limit || 30,
        sort = query.sort || '-created_at';
  Category
  .find(conditions)
  .skip(skip)
  .limit(limit)
  .sort(sort)
  .exec((err, categories) => {
    if (err) return res.status(400);
    res.send(categories);
  })
})

app.post('/categories', (req, res) => {
  const body = req.body;
  Category
  .create(body, (err, newCategory) => {
    if (err) return res.status(400);
    res.send(newCategory);
  })
})

// TODOS
app.get('/todos', (req, res) => {
  const query = req.query || {};
  // return console.log(query.conditions);
  let conditions = query.conditions || {};
  const skip = query.skip || 0,
        limit = query.limit || 30,
        sort = query.sort || '-created_at';
  try {
    conditions = JSON.parse(conditions)
  } catch(err) {
    conditions = {};
  }
  console.log('category', conditions.category);
  Todo
  .find(conditions)
  .skip(skip)
  .limit(limit)
  .sort(sort)
  .exec((err, todos) => {
    if (err) return res.status(400);
    res.send(todos);
  })
})

app.get('/todo/:id', (req, res) => {
  const id = req.params.id;
  Todo
  .findOne({_id: id}, (err, todo) => {
    if (err) return res.status(400);
    res.send(todo);
  })
})

app.post('/todos', (req, res) => {
  const body = req.body;
  Todo
  .create(body, (err, newTodo) => {
    if (err) return res.status(400);
    res.send(newTodo);
  })
})
