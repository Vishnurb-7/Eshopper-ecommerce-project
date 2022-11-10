
const { response } = require('express')
const Banner =require('../Model/bannerModel')


const adminBannerPage=(req,res)=>{
  
        Banner.showBanner().then((banner)=>{
            res.render('admin/adminBannerPage',{admin:true,title:'BANNER CONTROL PAGE',banner})
        })
    }

const addNewBanner=(req,res)=>{
    
        const {
            newBanner

        }=req.body
        Banner.insertBanner({
            picture:req.file.filename,
            newBanner
        }).then((response)=>{
            res.redirect('/admin/adminBannerPage')
        })
    }
    
const deleteBanner=(req,res)=>{
    let id = req.body.bannerId
    // console.log("hhh",id)

    Banner.deleteBanner(id).then((response)=>{
        res.json(response)
    })

}




// const deleteBanner = (req,res)=>{
//     let id = req.body.bannerId
//     console.log("bannererrrrrr",id)
//     bannerModel.deleteBanner(id).then((response)=>{
    
//       res.json(response)
//     })
//     }


// const adminDeleteProduct=(req,res)=>{
//     if(req.session.admin){
//         let productId = req.query.id
//         addProduct.deleteProduct(productId).then((response)=>{
//             res.redirect('/admin/adminProductPage')
//         })
//     }else{
//         res.render('admin/adminLogin',{admin:false,user:false})
//     }
   
// }



module.exports={
    adminBannerPage,
    addNewBanner,
    deleteBanner
}

