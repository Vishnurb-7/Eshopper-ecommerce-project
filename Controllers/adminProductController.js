const {response}= require('express')
const addProduct=require('../Model/adminProduct')
const category= require('../Model/adminCategory')
const Brand =require('../Model/adminBrand')



const adminProductPage=(req,res)=>{
    if(req.session.admin){
        addProduct.showProduct().then((product)=>{
            res.render('admin/adminProductPage',{admin:true,title:'PRODUCT CONTROL PAGE',product})
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
  
    
}

const adminAddProductPage=(req,res)=>{ 
    if(req.session.admin){
        category.showCategory().then((categoryDetails)=>{
            Brand.showBrand().then((brandDetails)=>{
                res.render('admin/adminAddProductPage',{admin:true,title:'ADD PRODUCT PAGE',categoryDetails,brandDetails})
            })
            })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
}

  const addNewProduct=(req,res)=>{
    if(req.session.admin){
        const {
            productName,
            actualPrice,
            sellingPrice,
            categoryName,
            brandName,
            quantityName,
            productDescription,
        }=req.body
        console.log(req.file)
    
        addProduct.insertProduct({
            picture:req.file.filename,
            productName,
            actualPrice,
            sellingPrice,
            categoryName,
            brandName,
            quantityName,
            productDescription
            
        }).then((response)=>{
            res.redirect('/admin/adminProductPage')
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
  }

  const updateProductionDetailsAction =(req,res)=>{
    if(req.session.admin){
        let id  =req.body.id;
        let newProductData =req.body;
        let newImageId =req.file.filename;
        console.log("data",newImageId)
        addProduct.editProduct(id, newProductData, newImageId).then(()=>{
            addProduct.showProduct().then((product)=>{
                res.render('admin/adminProductPage',{admin:true,title:'PRODUCT CONTROL PAGE',product})
        
            })
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
   
  }

const adminDeleteProduct=(req,res)=>{
    if(req.session.admin){
        let productId = req.query.id
        addProduct.deleteProduct(productId).then((response)=>{
            res.redirect('/admin/adminProductPage')
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
   
}
const updateProductDetails =async(req,res)=>{
    if(req.session.admin){
        let productid =req.query.id
    let product = await addProduct.showOneProduct(productid)

    category.showCategory().then((categoryDetails)=>{
    Brand.showBrand().then((brandDetails)=>{
       
        res.render("admin/adminEditProduct",{admin:true,user:false,title:"EDIT PRODUCT PAGE",categoryDetails,brandDetails,product})
    })
    })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
}



module.exports={
    adminProductPage,
    adminAddProductPage,
    addNewProduct,
    adminDeleteProduct,
    updateProductDetails,
    updateProductionDetailsAction

   }