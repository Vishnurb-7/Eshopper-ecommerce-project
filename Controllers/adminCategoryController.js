const { response } = require('express')
const adminCategory =require('../Model/adminCategory')


const adminCategoryPage=(req,res)=>{
    adminCategory.showCategory().then((category)=>{
        res.render('admin/adminCategoryPage',{admin:true,title:'CATEGORY CONTROL PAGE',category})

    })
}
const addNewCategory=(req,res)=>{
    adminCategory.doCategory(req.body).then((response)=>{
        res.redirect('/admin/adminCategoryPage')
    })
}
    const deleteCategory=(req,res)=>{
    let CategoryId = req.query.id
    adminCategory.deleteCategory(CategoryId).then((response)=>{
      res.redirect('/admin/adminCategoryPage')
    })
}
  



module.exports={
      adminCategoryPage,
      addNewCategory,
      deleteCategory
}