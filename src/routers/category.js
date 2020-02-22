const express = require('express');
const auth = require('../helpers/auth')

const Router = express.Router();
const categoryController = require('../controllers/category');

Router
  .get('/',auth.verify, categoryController.getCategory)
  // .get('/', categoryController.getCategory)
  .get('/detail/:id_category',auth.verify, categoryController.getDetail)
  .post('/insert',auth.verify, categoryController.insertCategory)
  .put('/update/:id_category',auth.verify, categoryController.updateCategory)
  .delete('/delete/:id_category',auth.verify, categoryController.deleteCategory)

module.exports = Router;