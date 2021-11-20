const express = require('express');
const route = express.Router();
const { User } = require('./controller');
const validation = require('./validation');
const {auth} = require("../middleware/auth");

route.get('/',auth, User.index);
route.get('/:id',auth, User.show);
route.post('/', validation.create, User.create);
route.post('/signin', validation.signin, User.signin);
route.put('/:id',auth, validation.update, User.update);
route.delete('/:id',auth, User.destroy);

module.exports = { route }