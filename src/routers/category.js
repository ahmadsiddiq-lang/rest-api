const express = require('express');
const auth = require('../helpers/auth')

const Router = express.Router();
const categoryController = require('../controllers/category');

Router
  .get('/',auth.verify, categoryController.getCategory)
  .get('/detail/:id_category', categoryController.getDetail)
  .post('/insert', categoryController.insertCategory)
  .put('/update/:id_category', categoryController.updateCategory)
  .delete('/delete/:id_category', categoryController.deleteCategory)

module.exports = Router;