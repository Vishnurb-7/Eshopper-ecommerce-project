const { response } = require('express')
const userCategory = require('../Model/adminCategory')
const userCart=require('../Model/userCartModel')
const checkOut =require('../Model/userCheckOutModel')
const wishListModel=require('../Model/userWishLIstModel')
const cartModel=require('../Model/userCartModel')


const userCartPage = async (req,res)=>{
    let products = await userCart.getCartProducts(req.session.user._id)
    console.log('hhhproductssss',products);
    let cartCount =null
    let wishListCount =null
   
    // console.log(total,'toooooootalllllll');
 
    if(req.session.user){
       
        wishListCount = await wishListModel.getWishListCount(req.session.user._id)
        
    }
    
   
    userCategory.showCategory().then(async(category)=>{
    let userData=req.session.user
    let userDetails = req.session.user._id
    
    cartCount = await userCart.getCartCount(req.session.user._id)
    // console.log("hellpo"+products);
     let total = await checkOut.TotalAmount(req.session.user._id) 
     console.log('total mk',total);
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
    
    let userData=req.session.user
    userCart.changeProductQuantity(req.body).then(async (response)=>{
       checkOut.TotalAmount(userData._id).then((result)=>{

        // let toAmount = result.toAmount
        // console.log('totalllllllllllllllllllllllllllll',toAmount);
        console.log('result mk',result);
        console.log(response);
        res.json({ response , result })
       })
        
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