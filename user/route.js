const express = require('express');
const route = express.Router();
const { User } = require('./controller');
const validation = require('./validation');
const { auth } = require('../middeware/auth');

route.get('/', auth, User.index);
route.get('/:id', auth, User.show);
route.post('/', validation.create, User.create);
route.post('/login', User.login);
route.put('/:id', validation.update, User.update);
route.delete('/:id', User.destroy);

module.exports = { route }