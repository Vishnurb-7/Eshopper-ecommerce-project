
const cartModel = require('../Model/userCartModel')
const categoryModel =require('../Model/adminCategory')
const checkOutModel = require('../Model/userCheckOutModel')
const wishListModel = require('../Model/userWishLIstModel')


const showCheckOutPage = async (req, res) => {
    let products = await cartModel.getCartProducts(req.session.user._id)
    let cartCount = null;
    let wishListCount = null
    if (req.session.user) {
      cartCount = await cartModel.getCartCount(req.session.user._id);
      wishListCount = await wishListModel.getWishListCount(req.session.user._id) 

    }
    let total = await checkOutModel.TotalAmount(req.session.user._id)
    categoryModel.showCategory().then((category) => {
      let userData = req.session.user;
      res.render("user/checkOut", {
        admin: false,
        user: true,
        userData,
        cartCount,
        category,
        products,
        total,
        wishListCount
      });
    });
  };

  
const showCheckingOutPage = async(req,res)=>{
  
  let finalTotal = parseInt(req.body.TOTAL)//cart total
  let details = req.body
  details.TOTAL = parseInt(details.TOTAL)
  if(details.couponCode==='')
  {
    let shippingCharge =  (3/100)*details.TOTAL
    finalTotal = details.TOTAL + shippingCharge
    res.json(finalTotal)
  }
  else{
    let couponDetails = await couponModel.getCouponDetails(details.couponCode)
    if(couponDetails)
    {
      await couponModel.getDiscount(couponDetails, details.TOTAL).then((response) => {
        finalTotal = response.discountedTotal
        finalTotal = Math.round(finalTotal)
        res.json(finalTotal)

      });
    }
    else
    {
      let shippingCharge =  (3/100)*details.TOTAL
      finalTotal = details.TOTAL + shippingCharge
      res.json(finalTotal) 
    }
  }
}




  module.exports={
    showCheckOutPage,
    showCheckingOutPage
  }
  