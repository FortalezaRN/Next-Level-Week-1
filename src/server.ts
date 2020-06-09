import express from 'express';

const app = express();
3
app.use(express.json())

const users = ['Fortaleza', 'DD', 'Danilo', 'Washigton']

app.get('/users', (request, response) => {
  const search = String(request.query.search);
  const filterUsers = search ? users.filter(user => user.includes(search)) : users;
  console.log('listagem de usuário');
  return response.json(filterUsers);
});

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id);
  const user = users[id];
  console.log('listagem de usuário');
  return response.json(user);
});

app.post('/users', (request, response) => {
  const data = request.body;
  const user = {
    name: data.name,
    email: data.email
  }
  return response.json(user);
});

app.listen(3333);