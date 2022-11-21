const placeOrderModel = require('../Model/userPlaceOrderModel')
const checkOut = require('../Model/userCheckOutModel')
const cartModel = require('../Model/userCartModel')
const wishListModel = require('../Model/userWishLIstModel')
const category = require('../Model/adminCategory')
const { response } = require('express')


const placeOrder = async (req,res)=>{
    console.log(" kjbjk",req.body);
    let products = await placeOrderModel.getCartProductsList(req.body.userId)
    let totalPrice = await checkOut.TotalAmount(req.body.userId)
    placeOrderModel.  placeOrder(req.body,products,totalPrice).then((orderId)=>{
        if(req.body.payment_method == 'cash_on_delivery')
        {
            console.log('mmmmmmmm');
            
            res.json({codeSuccess:true}) 
        }
        else
        {
            console.log('fffffffffffffff');
            placeOrderModel.generateRazorpay(orderId,totalPrice).then((response)=>{
                res.json(response)
            })
        }
    })
} 


const showOrderPlaced = async(req,res)=>{
    let cartCount = null;
    let wishListCount = null
    if (req.session.user) {
      cartCount = await cartModel.getCartCount(req.session.user._id);
      wishListCount = await wishListModel.getWishListCount(req.session.user._id)
    }

    category.showCategory().then((category)=>{
        let userData = req.session.user;

        res.render('user/orderPlacedPage',{admin:false,
            user:true,
            userData,
            cartCount,
            category,
            wishListCount
        })
    })
}  

const verifyPayment = (req,res)=>{
    placeOrderModel.verifyPayment(req.body).then(()=>{
        placeOrderModel.changePaymentStatus(req.body.order.receipt).then(()=>{
            console.log("Payment SuccessFull");
          res.json({status:true})
        })
    }).catch((err)=>{
        console.log(err);
        res.json({status:false,errMsg: ""})
    })


}

module.exports={
    placeOrder,
    showOrderPlaced,
     verifyPayment
}