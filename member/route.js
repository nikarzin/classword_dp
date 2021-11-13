const express = require('express');
const route = express.Router();
const { Member } = require('./controller');
const validation = require('./validation');

route.get('/', Member.index);
route.get('/:id', Member.show);
route.post('/', validation.create, Member.create);
route.put('/:id', validation.update, Member.update);
route.delete('/:id', Member.destroy);

module.exports = { route }