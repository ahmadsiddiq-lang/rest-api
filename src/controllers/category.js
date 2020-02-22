const categoryModel = require('../models/category');
const miscHelper = require('../helpers/helpers');


module.exports ={
    getCategory: (req, res)=>{
        categoryModel.getCategory()
        .then((result)=>{
            miscHelper.response(res, result, 200)
          })
          .catch(err=>console.log(err));
    },

    getDetail :(req, res)=>{
        const id_category = req.params.id_category;
        categoryModel.getDetail(id_category)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
    
    insertCategory :(req, res)=>{
        const nama = req.body;
        const data = nama;
        categoryModel.insertCategory(data)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    updateCategory :(req, res)=>{
        const id_category = req.params.id_category;
        const nama = req.body;
        const data = nama;
        categoryModel.updateCategory(data,id_category)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    deleteCategory :(req, res)=>{
        const id_category = req.params.id_category;
        categoryModel.deleteCategory(id_category)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    }
}