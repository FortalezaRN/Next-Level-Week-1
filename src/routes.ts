import express from 'express';
const routes = express.Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Alo vô' });
});

export default routes;