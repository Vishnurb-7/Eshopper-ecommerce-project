
const cartModel = require('../Model/userCartModel')
const categoryModel =require('../Model/adminCategory')
const checkOutModel = require('../Model/userCheckOutModel')


const showCheckOutPage = async (req, res) => {
    let products = await cartModel.getCartProducts(req.session.user._id)
    let cartCount = null;
    if (req.session.user) {
      cartCount = await cartModel.getCartCount(req.session.user._id);
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
        total
      });
    });
  };

  module.exports={
    showCheckOutPage
  }
  