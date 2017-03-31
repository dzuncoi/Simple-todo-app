/*
* @author: dzuncoi
* @date: April 1 2017
*/

import path from 'path';
import { Server } from 'http';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = new express();
const server = new Server(app);

// ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// folder for static assets
app.use(express.static(path.join(__dirname, 'src/static')));

app.get('*', (req, res) => {
  let markup = '';
  let status = 200;
  // Do server-side rendering task here
  return res.status(status).render('index', { markup });
});

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Let's go http://localhost:${port}`);
});
