require('dotenv').config();
const connecting = require('../config/db');
const fs = require('fs')

module.exports = {
    getProduct: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM products", (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    insertProduct: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("INSERT INTO products SET ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    getDetail: (id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT products.*, category.name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = ?", id_product, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    updateProduct: (data, id_product,image)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("UPDATE products SET ? WHERE id = ?",[data, id_product], (err, result)=>{
                if(!err){
                    resolve(result)
                    const path = image.replace('http://localhost:8080', '.')
                    fs.unlink(path, function (err) {
                        if (err) throw err;
                        return
                      });
                }else{
                    reject(err)
                }
            })
        })
    },
    deleteProduct: (id_product, image)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("DELETE FROM `products` WHERE `products`.`id` = ?", id_product, (err, result)=>{
                if(!err){
                    resolve(result)
                    //replace http to '.'
                    const path = image.replace('http://localhost:8080', '.')
                    fs.unlink(path, function (err) {
                        if (err) throw err;
                        return
                      });

                }else{
                    reject(err)
                }
            })
        })
    },

    searchProduct: (name)=>{
        return new Promise((resolve,reject)=>{
            connecting.query(`SELECT * FROM products WHERE name LIKE '%${name}%'`, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    sortProduct: data=>{
        return new Promise((resolve,reject)=>{
            connecting.query(`SELECT * FROM products ORDER BY ${data}`, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    countProduct:()=>{
        return new Promise((resolve, reject)=>{
            connecting.query('SELECT COUNT(*) AS id FROM products', (err, result)=>{
              resolve(result);
            });
        });
    },

    paginationProduct :(page, perpage)=>{
        return new Promise((resolve, reject)=>{
          connecting.query(`SELECT * FROM products LIMIT ${page+", "+perpage}`, (err, result)=>{
            if(!err){
              resolve(result);
            }else{
              reject(new Error(err));
            }
          });
        });
      },
    
    orderProduct: (input, id_user, stock,id_product)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("INSERT INTO orders SET ?",input, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            }),
            connecting.query(`UPDATE products SET stock = ? WHERE id = ?`, [stock, id_product], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            }),
            connecting.query(`DELETE FROM cart WHERE id_user = ?`, id_user, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
            
        })
    },

    cartProduct: (data)=>{
        return new Promise((resolve,reject)=>{
            connecting.query(`INSERT INTO cart SET ?`, data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    detailCart: (id_user)=>{
        return new Promise((resolve,reject)=>{
            connecting.query(`SELECT * FROM cart WHERE id_user =?`, id_user, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    detailUser: (id_user)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM users WHERE id_user =?`, id_user, (err,result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    groubCart: (id_user)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT id_user, SUM(total)AS total FROM cart WHERE id_user= ? GROUP BY id_user`, id_user, (err,result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    loginUser: (username)=>{
        return new Promise((resolve, reject)=>{
            connecting.query(`SELECT * FROM users WHERE username = ?`, username, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    registerUser: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query('INSERT INTO users SET ?', data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    histoyOrder: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query('SELECT COUNT(*) AS id FROM orders;', (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
}