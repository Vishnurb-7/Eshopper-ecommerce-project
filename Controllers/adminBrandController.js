const {response}= require('express')
const adminBrand =require('../Model/adminBrand')


const adminBrandPage=(req,res)=>{
    if(req.session.admin){
        adminBrand.showBrand().then((brand)=>{
            res.render('admin/adminBrandPage',{admin:true,title:'BRAND PAGE',brand})
        }) 
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
}

const adminShowBrand=(req,res)=>{
    if(req.session.admin){
        adminBrand.insertBrand(req.body).then((response)=>{
            res.redirect('/admin/adminBrandPage')
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
   
}

const adminDeleteBrand=(req,res)=>{
    if(req.session.admin){
        let brandId = req.query.id
    adminBrand.deleteBrand(brandId).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
    
}



module.exports={
    adminBrandPage,
    adminShowBrand,
    adminDeleteBrand
}