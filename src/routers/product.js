const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const auth = require('../helpers/auth')


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
  .get('/', cors(),auth.verify,productController.getProduct)
  .get('/detail/:id_product',auth.verify, productController.getDetail)
  .post('/insert',auth.verify, upload.single('image'), productController.insertProduct)
  .put('/update/:id_product',auth.verify,upload.single('image'), productController.updateProduct)
  .delete('/delete/:id_product',auth.verify, productController.deleteProduct)
  .get('/search/:name',auth.verify, productController.searchProduct)
  .get('/sort/:data',auth.verify, productController.sortProduct)
  .get('/pagination/:page',auth.verify, productController.paginationProduct)
  .post('/order/:id_product',auth.verify, productController.orderProduct)
  .post('/cart',auth.verify, productController.cartProduct)
  .post('/login', productController.loginUser)
  .post('/register', productController.registerUser)
  .get('/historyOrder',auth.verify, productController.historyOrder)
  .get('/data/cart', auth.verify,productController.detailCarts)
  .get('/product/cart/:id_user',auth.verify, productController.productCart)
  .get('/carts/:id_user',auth.verify,productController.getCarts)
  .get('/carts/:id_user',auth.verify,productController.getCarts)
  .delete('/delete/carts/:id_user',auth.verify,productController.deleteCart)

module.exports = Router;