const express =require('express')
const router= express.Router()
const userBasic=require('../Controllers/userBasicController')
const userProductDetails=require('../Controllers/userProductDisplay')
const sessionChecker=require('../middleware/sessionMiddleware')
const userCart=require('../Controllers/userCartController')
const wishList=require('../Controllers/userWishListController')


//user router

router.get("/",userBasic.showLandingPage)
router.get('/showUserLoginPage',userBasic.showLoginPage)
router.get('/showUserSignUpPage',userBasic.showSignUpPage)
router.get('/userLogoutAction',userBasic.userLogout)
router.post('/signupAction',userBasic.userSignupAction)
router.post('/userNewLoginAction',userBasic.userLoginAction)
router.post("/otpVerification",userBasic.verifyOtp)


//userSideSingleProductDetails

router.get('/viewProductDetailsPage',sessionChecker.userSessionChecker,userProductDetails.showProductDetails)


//userCart

router.get('/userCart',sessionChecker.userSessionChecker,userCart.userCartPage)

router.post('/add-to-cart/:id',sessionChecker.userSessionChecker,userCart.addToCart)
router.post('changeProductQuantity',userCart.cartChangeProductQuantity)
router.delete('/removeCartProduct',userCart.removeCartOneProduct)



//user wishlist
router.get("/showWishListPage",wishList.userWishListPage)
router.post('/addToWishList',wishList.addToWishList)
router.delete('/removeWishListProduct',wishList.removeWishListProduct)


module.exports=router