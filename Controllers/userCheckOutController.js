
const cartModel = require('../Model/userCartModel')
const categoryModel =require('../Model/adminCategory')
const checkOutModel = require('../Model/userCheckOutModel')
const wishListModel = require('../Model/userWishLIstModel')
const checkOut =require("../Model/userCheckOutModel")

const showCheckOutPage = async (req, res) => {
  // console.log('***************************',req.query.total)
    let products = await cartModel.getCartProducts(req.session.user._id)
    let cartCount = null;
    let wishListCount = null
    if (req.session.user) {
      cartCount = await cartModel.getCartCount(req.session.user._id);
      wishListCount = await wishListModel.getWishListCount(req.session.user._id) 

    }
    // let total = await checkOutModel.TotalAmount(req.session.user._id)
    let finalTotal = Math.round(req.query.finalTotal)
    // console.log('checkouttttTotal',req.query);
    categoryModel.showCategory().then((category) => {
      let userData = req.session.user;
      res.render("user/checkOut", {
        admin: false,
        user: true,
        userData,
        cartCount,
        category,
        products,
        finalTotal,
        wishListCount
      });
    });
  };

  const showProceedToCheckOutPage = (req,res)=>{
    let finalTotal = req.query.FINALTOTAL
    res.json(finalTotal)
    }




  module.exports={
    showCheckOutPage,
    showProceedToCheckOutPage
  }
  