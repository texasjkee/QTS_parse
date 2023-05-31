require('dotenv').config();

const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

//Middleware
server.use(express.json()); //parse json bodies in the request object

//Static
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

//View engine ejs
server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');

//Redirect requests to endpoint starting with /posts to postRoutes.js
server.use('/posts', require('./routes/postRoutes'));

//Home page
server.get('/', (req, res) => {
  res.render('index');
});

//Global Error Handler. IMPORTANT  function params MUST start with err
server.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);
  
  res.status(500).json({
    message: 'Something went really wrong'
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});