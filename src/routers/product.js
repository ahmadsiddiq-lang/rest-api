const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './upload')
  },

  filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname)
  }
})
const upload = multer({
  storage : storage,
  fileFilter : (req, file, cb)=>{
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== 'jpeg'){
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits:{
    fileSize: 1024 * 1024
}
})

const Router = express.Router();
const productController = require('../controllers/product');



Router
  .get('/', cors(),productController.getProduct)
  .get('/detail/:id_product', productController.getDetail)
  .post('/insert', upload.single('image'), productController.insertProduct)
  .put('/update/:id_product',upload.single('image'), productController.updateProduct)
  .delete('/delete/:id_product', productController.deleteProduct)
  .get('/search/:name', productController.searchProduct)
  .get('/sort/:data', productController.sortProduct)
  .get('/pagination/:page', productController.paginationProduct)
  .post('/order/:id_product', productController.orderProduct)
  .post('/cart/:id_product', productController.cartProduct)
  .post('/login', productController.loginUser)
  .post('/register', productController.registerUser)
  .get('/historyOrder', productController.historyOrder)

module.exports = Router;