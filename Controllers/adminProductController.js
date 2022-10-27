const {response}= require('express')
const addProduct=require('../Model/adminProduct')
const category= require('../Model/adminCategory')
const Brand =require('../Model/adminBrand')



const adminProductPage=(req,res)=>{
    addProduct.showProduct().then((product)=>{
        console.log(product);
        res.render('admin/adminProductPage',{admin:true,title:'PRODUCT CONTROL PAGE',product})
    })
    
}

const adminAddProductPage=(req,res)=>{ 
    category.showCategory().then((categoryDetails)=>{
    Brand.showBrand().then((brandDetails)=>{
        res.render('admin/adminAddProductPage',{admin:true,title:'ADD PRODUCT PAGE',categoryDetails,brandDetails})
    })
    })
}

  const addNewProduct=(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    addProduct.insertProduct({
        Picture:req.file.filename,
        productionData: req.body
    }).then((response)=>{
        res.redirect('/admin/adminProductPage')
    })
  }

const adminDeleteProduct=(req,res)=>{
    let productId = req.query.id
    addProduct.deleteProduct(productId).then((response)=>{
        res.redirect('/admin/adminProductPage')
    })
}


module.exports={
    adminProductPage,
    adminAddProductPage,
    addNewProduct,
    adminDeleteProduct,

   }