require('dotenv').config();
const connecting = require('../config/db');

module.exports = {
    getCategory: ()=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT * FROM category", (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    getDetail: (id_category)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("SELECT id, name_category FROM category WHERE id =?", id_category, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    updateCategory: (data,id_category)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("UPDATE category SET ? WHERE id=?", [data, id_category], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    insertCategory: (data)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("INSERT INTO category SET ?",data, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },

    deleteCategory: (id_category)=>{
        return new Promise((resolve, reject)=>{
            connecting.query("DELETE FROM category WHERE id =?", id_category, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    }
}