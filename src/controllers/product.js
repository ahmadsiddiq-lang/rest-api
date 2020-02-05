const productModel = require('../models/product');
const miscHelper = require('../helpers/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    getProduct: (req,res)=>{
        productModel.getProduct()
        .then((result)=>{
            miscHelper.response(res, result, 200)
          })
          .catch(err=>console.log(err));
    },

    getDetail :(req, res)=>{
        const id_product = req.params.id_product;
        productModel.getDetail(id_product)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    insertProduct: (req,res)=>{
        const {name, description, price,stock, id_category} = req.body;
        const data = {
            name,
            description,
            price,
            stock,
            image: `http://localhost:8080/upload/${req.file.filename}`,
            id_category
        }
        productModel.insertProduct(data)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    updateProduct: (req,res)=>{
        const id_product = req.params.id_product;
        const {name, description, price, id_category} = req.body;
        const data = {
            name,
            description,
            price,
            id_category
        }

        // get image
        productModel.getDetail(id_product)
        .then((result)=>{   
            productModel.updateProduct(data, id_product, result[0].image)
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    },

    deleteProduct: (req,res)=>{
        const id_product = req.params.id_product;
        // delete file 
        productModel.getDetail(id_product)
        .then((result)=>{
            productModel.deleteProduct(id_product,result[0].image)
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    },

    // search date by name
    searchProduct: (req, res)=>{
        const name = req.params.name;
        productModel.searchProduct(name)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    sortProduct: (req, res)=>{
        const data = req.params.data;
        productModel.sortProduct(data)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    paginationProduct: (req, res)=>{
        const page = req.params.page;
        const pages = 2;
        let offset = page > 1 ? (page*pages)-pages : 0;
        let totalRec = 0;
        let pageCount =0;
      productModel.countProduct()
      .then((result)=>{
        totalRec=result[0].id;
        pageCount = Math.ceil(totalRec /  pages);
        productModel.paginationProduct(offset, pages)
        .then((result)=>{
          res.json({
            page:parseInt(page),
            offset:offset,
            pages:parseInt(pages),
            total:parseInt(totalRec),
            total_page:parseInt(pageCount),
            next_page:page < pageCount - 1 ? parseInt(page)+1 : undefined,
            prev_page:page > 1 ? page - 1 : undefined,
            data:result 
          })
        })
      })
      .catch(err=>console.log(err))
    },

    orderProduct :(req, res)=>{
        const id_product = req.params.id_product;
        const {id_user} = req.body;

        //get detail user
        productModel.detailUser(id_user)
        .then((result)=>{
            const name_customer = result[0].username;
            const id_user = result[0].id_user;
            
            productModel.groubCart(id_user)
            .then((result)=>{
            const globTotal = result[0].total;
            productModel.getDetail(id_product)
            .then((result)=>{
                let price_product = result[0].price;
                let expense = globTotal;
                let price_total = price_product * expense;
                let stock_product = result[0].stock;
                let stock = stock_product - expense;

                    productModel.detailCart(id_user)
                        .then((result)=>{
                        const id_cart = result[0].id_cart;
                        const input = {name_customer,id_product, price_total, id_user, id_cart};

                        productModel.orderProduct(input, id_user, stock, id_product)
                        .then((result)=>{
                            res.json(result)
                        })
                        .catch(err=> console.log(err))
                })
                .catch(err=> console.log(err))
            })
            .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
    },

    cartProduct: (req, res)=>{
        const id_products = req.params.id_product;
        const {id_user,total}=req.body;
        
        productModel.getDetail(id_products)
        .then((result)=>{
            const id_product  = result[0].id;
            const data = {id_user,id_product, total}
            let stock_product = result[0].stock;
                if(stock_product <= 0 ){
                    res.json('Stock Empty...!');
                }else{
                    productModel.cartProduct(data)
                    .then((result)=>{
                        res.json(result)
                    })
                    .catch(err=> console.log(err))
                }
        })
        .catch(err=> console.log(err))
    },

    loginUser: (req, res)=>{
        const {username}= req.body;

        productModel.loginUser(username)
        .then((result)=>{
            const pass = result[0].password;
            var cek = bcrypt.compareSync(req.body.password, pass);
            if(cek=='true'){
                res.json('Incorrect your username and password !')
            }else{
                const token = jwt.sign({username,pass}, process.env.PRIVATE_KEY , {expiresIn : '30m'})
                res.json({
                    result,
                    token:token
                })
            }
        })
        .catch(err=>console.log(err))
    },

    registerUser: (req,res)=>{
        const {username,pass}=req.body;
        var salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(pass, salt);
        const data = {username,password};

        productModel.loginUser(username)
        .then((result)=>{
            if(result.length == 0){
                console.log('OK')
                productModel.registerUser(data)
                .then((result)=>{
                    res.json(result)
                })
                .catch(err=>console.log(err))
            }else{
                const user = req.body.username
                if(result[0].username !== user) {
                    productModel.registerUser(data)
                    .then((result)=>{
                        res.json(result)
                    })
                    .catch(err=>console.log(err))
                }else{
                    res.json('Username Exist !')
                }
            }
        })
        .catch(err=>console.log(err))
    },

    historyOrder: (req, res)=>{
        productModel.histoyOrder()
        .then((result)=>{
            res.json({
                TotalOrder: result[0].id
                })
            console.log(result)
        })
    }
}