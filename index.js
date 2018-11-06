// 1. Inside folder: yarn
// 2. Inside folder: yarn add express
// 3. nodemon index.js (or current file, e.g., nodemon server.js)
const express = require('express');

const db = require('./data/db.js'); // CommonJS for Node.js
// import db from './data/db.js'    // ES6 imports
const server = express();


// root of our site
// req is a requestHandler
server.get('/', (req, res) => {
  // console.log(db.find());
  res.send('<h2>API running on localhost:8000</h2><p>To see all posts: localhost:8000/api/posts</p></h2><p>To see a specific post by id (e.g., id = 1): localhost:8000/api/posts/1</p>')
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts)       
    })
    .catch(err => {
      res.status(500).json({ 
        message: "The posts information could not be retrieved.",
        error: err })
    })
})

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;     // const { id } = req.params
  console.log('params:', req.params); // params: { id: '1' }

  db.findById(id)
    .then(post => {
      console.log(post) // logs id, title, contents, create_at, updated_at
      // !(post.length) // fixed issue of empty array
      !(post.includes(post[0])) // alternative to !(post.length)
        ? res.status(404).json({ message: "The post with the specified ID does not exist."})
        : res.status(200).json(post[0]);
    })
    .catch(err => {
      res.status(500).json({ 
        message: "The post information could not be retrieved.",
        error: err })
    })
})


server.listen(8000, () => {console.log('API running on port 8000')})