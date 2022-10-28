const { response } = require('express')
const adminCategory =require('../Model/adminCategory')


const adminCategoryPage=(req,res)=>{
    if(req.session.admin){
        adminCategory.showCategory().then((category)=>{
            res.render('admin/adminCategoryPage',{admin:true,title:'CATEGORY CONTROL PAGE',category})
    
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
}
const addNewCategory=(req,res)=>{
    if(req.session.admin){
        adminCategory.doCategory(req.body).then((response)=>{
            res.redirect('/admin/adminCategoryPage')
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
}
    const deleteCategory=(req,res)=>{
    if(req.session.admin){
        let CategoryId = req.query.id
    adminCategory.deleteCategory(CategoryId).then((response)=>{
      res.redirect('/admin/adminCategoryPage')
    })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
}
  



module.exports={
      adminCategoryPage,
      addNewCategory,
      deleteCategory
}