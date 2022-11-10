const { response } = require('express')
const userCategory = require('../Model/adminCategory')
const userCart=require('../Model/userCartModel')
const checkOut =require('../Model/userCheckOutModel')
const wishListModel=require('../Model/userWishLIstModel')


const userCartPage = async (req,res)=>{
    let products = await userCart.getCartProducts(req.session.user._id)
    console.log('hhhproductssss',products);
    let cartCount =null
    let wishListCount =null
    let total = await checkOut.TotalAmount(req.session.user._id) 
 
    if(req.session.user){
        cartCount = await userCart.getCartCount(req.session.user._id)
        wishListCount = await wishListModel.getWishListCount(req.session.user._id)
        
    }
   
    userCategory.showCategory().then((category)=>{
    let userData=req.session.user
    let userDetails = req.session.user._id
    
    // console.log("hellpo"+products);
    res.render('user/cart',{user:true,admin:false,userData,userDetails,category,products,cartCount,total,wishListCount})
    })
}

const addToCart=(req,res)=>{
    
    let productid = req.body.productId

    userCart.addToCarts(productid,req.session.user._id).then(()=>{
        res.json({status:true})
    })
}

const cartChangeProductQuantity = (req,res,next)=>{
    userCart.changeProductQuantity(req.body).then(()=>{
        res.json(response)
    })
}

const removeCartOneProduct = (req,res)=>{
  
    // console.log('remove cart ==========>>>>>>>>>>>>>>      ',req.body);
   cartModel.removeCartProduct(req.body).then((response)=>{
    res.json(response)
   })
  }

module.exports={
    userCartPage,
    addToCart,
    cartChangeProductQuantity,
    removeCartOneProduct
    
}