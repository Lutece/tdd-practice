const express = require('express');
const app = express();

const users = [
  {id: 1, name: '1'},
  {id: 2, name: '2'},
  {id: 3, name: '3'},
]

app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/users', (req, res) => {
  req.query.limit =  req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if(Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => {
    return user.id === id;
  })[0]; //API 내용도 정확히 알아야겠다.

  if(!user) return res.status(404).end();

  res.json(user);
});

app.listen(3000, () => {
  console.log('server is on')
})

module.exports = app;