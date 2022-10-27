const { response } = require('express')
const userDetails= require('../Model/userBasic')



const showLandingPage =(req,res)=>{
    res.render("user/index",{admin:false,user:true})
}

const showLoginPage =(req,res)=>{
    res.render('user/userLoginPage',{admin:false,user:false})
}

const showSignUpPage =(req,res)=>{
    res.render('user/userSignUpPage',{admin:false,user:false})
}

const showLandingPageAfterSignup=(req,res)=>{
    userDetails.insertUserCredentials(req.body).then((response)=>{
        // res.redirect('/')
        res.render("user/indexLanding",{admin:false,user:true})
    })

}
const userLoginAction =(req,res)=>{
    userDetails.doLogin(req.body).then((response)=>{
        if(response.status)
        {
            res.render("user/indexLanding",{admin:false,user:true})
        }else{
            res.render('user/userLoginPage',{admin:false,user:false})
        }
    })
}


module.exports ={
    showLandingPage,
    showLoginPage,
    showSignUpPage,
    showLandingPageAfterSignup,
    userLoginAction
}