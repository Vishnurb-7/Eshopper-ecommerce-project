const {response}= require('express')
const adminBrand =require('../Model/adminBrand')


const adminBrandPage=(req,res)=>{
    adminBrand.showBrand().then((brand)=>{
        res.render('admin/adminBrandPage',{admin:true,title:'BRAND PAGE',brand})
    })
}

const adminShowBrand=(req,res)=>{
    adminBrand.insertBrand(req.body).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
}

const adminDeleteBrand=(req,res)=>{
    let brandId = req.query.id
    adminBrand.deleteBrand(brandId).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
}



module.exports={
    adminBrandPage,
    adminShowBrand,
    adminDeleteBrand
}