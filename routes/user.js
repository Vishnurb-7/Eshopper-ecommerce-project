const express =require('express')
const router= express.Router()
const userBasic=require('../Controllers/userBasicController')

router.get("/",userBasic.showLandingPage)
router.get('/showLoginAction',userBasic.showLoginPage)
router.get('/showSignUpAction',userBasic.showSignUpPage)
router.get('/userSignOutAction',userBasic.showLandingPage)
router.post('/signupAction',userBasic.showLandingPageAfterSignup)
router.post('/userNewLoginAction',userBasic.userLoginAction)



module.exports=router