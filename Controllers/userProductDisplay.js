
const productDisplay=require('../Model/userProductDisplayModel')


const showProductDetails = async(req,res)=>{
    let productId = req.query.id
    console.log(productId)
    let product = await productDisplay.viewProductDetails(productId)
  
    res.render('user/productDetailsPage',{admin:false,user:false,product})
  }
  
  module.exports = {
    showProductDetails
  }