const productModel = require('../models/product');
const miscHelper = require('../helpers/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser')

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
            data['id'] = result.insertId
            res.json(data)
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
            image: `http://localhost:8080/upload/${req.file.filename}`,
            id_category
        }

        // get image
        productModel.getDetail(id_product)
        .then((result)=>{   
            productModel.updateProduct(data, id_product, result[0].image)
            .then((result)=>{
                data['id']=id_product
                res.json(data)
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
        const {id_user,qty} = req.body;

        //get detail user
        productModel.detailUser(id_user)
        .then((result)=>{
            const username = result[0].username;
        //     const id_user = result[0].id_user;
            
            productModel.groubCart(id_user)
            .then((result)=>{
                // console.log(result[0].price_total)
            let price_total = result[0].price_total;
            // if(result.length <=0){
            //     res.json('0')
            // }else{
            // const globTotal = result[0].total;
            productModel.getDetail(id_product)
            .then((result)=>{
                // let price_product = result[0].price;
                // let expense = globTotal;
                // let price_total = price_product * expense;
                // let stock_product = result[0].stock;
                // let stock = stock_product - expense;
                // console.log(result[0].stock)
                // let {qty} = req.body
                if( qty > result[0].stock){
                    // console.log('Kosong')
                    res.json(0)
                }else{
                    
                    // productModel.detailCart(id_user)
                    //     .then((result)=>{
                        // console.log(price_total)
                        // const price_total = result[0].price_total;
                        const input = {username,id_product, qty, price_total, id_user};

                        productModel.orderProduct(input, id_user, qty, id_product)
                        .then((result)=>{
                            res.json(result)
                        })
                        .catch(err=> console.log(err))
                    // })
                    // .catch(err=> console.log(err))
                }
            })
            .catch(err=> console.log(err))
        // }
        })
        .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
    },

    cartProduct: (req, res)=>{
        // const id_products = req.params.id_product;
        const {id_user,id_product,name,image,price}=req.body;
        const data = {id_user,id_product,name,image,price}
        // productModel.getDetail(id_products)
        // .then((result)=>{
        //     const id_product  = result[0].id;
        //     const data = {id_user,id_product}

        //     productModel.detailProductCart(data.id_product)
        //     .then((result)=>{
        //         // console.log(result)
        //         if(!result.length > 0){
                    // console.log('Beda')
                    productModel.cartProduct(data)
                    .then((result)=>{
                        // console.log(result.insertId)
                        data['id_cart'] = result.insertId
                        res.json(data)
                    })
                    .catch(err=> console.log(err))
                // }else{
                //     res.json('1')
                // }
            // })

            // productModel.stockOrder(id_products)
            // .then((result)=>{
            // console.log(result)
            // if(result[0].total_stock <= 0){
            //     res.json('Stock produck Empty !')
            // }else{
                    // productModel.cartProduct(data)
                    // .then((result)=>{
                    //     res.json(result)
                    // })
                    // .catch(err=> console.log(err))
                // }
            // })
        // })
        // .catch(err=> console.log(err))
    },

    getCarts:(req,res)=>{
        const id_user = req.params.id_user;
        productModel.getCarts(id_user)
        .then((result)=>{
            miscHelper.response(res, result, 200)
          })
        .catch(err=>console.log(err));
    },

    deleteCart:(req,res)=>{
        const id_user = req.params.id_user;
        productModel.deleteCart(id_user)
        .then((result)=>{
            res.json(result)
          })
        .catch(err=>console.log(err));
    },

    loginUser: (req, res)=>{
        const {username}= req.body;

        productModel.loginUser(username)
        .then((result)=>{
            const pass = result[0].pass;
            const {password}=req.body
            var cek = bcrypt.compareSync(password, pass);
            if(cek===true){
                const token = jwt.sign({username,pass}, process.env.PRIVATE_KEY , {expiresIn : '24h'})
                res.json({
                    result,
                    token:token
                })
            }else{
                res.json('Incorrect your username and password !')
            }
        })
        .catch(err=>console.log(err))
    },

    registerUser: (req,res)=>{
        const {username,password}=req.body;
        var salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);
        const data = {username,pass};
        productModel.loginUser(username)
        .then((result)=>{
            if(result.length == 0){
                // console.log('OK')
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
            res.json('Wes Update')
            // console.log(result)
            // console.log(result[0].total_order)
            let status = result[0].total_order;
            productModel.insHistoryOrder(status)
            .then((result)=>{
                res.json(result)
            })
        })
        .catch(err=>console.log(err))
    },

    detailCarts: (req, res)=>{
        const id_user = req.body.id_user;
        productModel.detailCart(id_user)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    productCart:(req,res)=>{
        const id_user = req.params.id_user;
        console.log(id_user)
        productModel.getCart(id_user)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    }
}