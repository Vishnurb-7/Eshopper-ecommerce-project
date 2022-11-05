const { response } = require('express')
const userDetails= require('../Model/userBasic')
const nodemailer =require('nodemailer')
const userProductDisplay=require('../Model/userProductDisplayModel')
const categoryDisplay=require('../Model/adminCategory')
const banner =require('../Model/bannerModel')





let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vishnurb4vishnu@gmail.com',
        pass: 'wkwhsremxdzqqjsg'
    }
});

const OTP = `${Math.floor(1000+ Math.random() * 9000 )}`;

const showLandingPage =(req,res)=>{
    let userData =req.session.user;
    
    userProductDisplay.displayProduct().then((productDetails)=>{
    categoryDisplay.showCategory().then((category)=>{
        banner.showBanner().then((banner)=>{
            res.render("user/index",{admin:false,user:true,productDetails,category,banner,userData})
        })
        
    })
    })
   
}

const showLoginPage =(req,res)=>{
    
    res.render('user/userLoginPage',{admin:false,user:false})
}

const showSignUpPage =(req,res)=>{
    res.render('user/userSignUpPage',{admin:false,user:false})
}

const userSignupAction=(req,res)=>{
    let verified = 0
    const {firstName,lastName,email,password}=req.body

    let mailDetails = {
        from: 'vishnurb4vishnu@gmail.com',
        to: email,
        subject: 'Eshopper registration',
        html: `<p>your otp for registration is ${OTP}</p>`
    };
     
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });

    userDetails.insertUserCredentials(verified,firstName,lastName,email,password).then((response)=>{

        userID=response.insertedId
     
        res.render("user/useOtpVerificationPage",{admin:false,user:false})
    })

}
const userLoginAction =(req,res)=>{
    let userData=req.session.user;
    userDetails.doLogin(req.body).then((response)=>{
        if(response.status)
        {
            userProductDisplay.displayProduct().then((productDetails)=>{
                categoryDisplay.showCategory().then((category)=>{
                    banner.showBanner().then((banner)=>{
                        res.redirect("/")
                    })
                    console.log('hh',category)

                    
                })
            })
           
        }else{
            res.render('user/userLoginPage',{admin:false,user:false})
        }
    })
}

const verifyOtp=(req,res)=>{
    console.log("hh",userID)
    if(OTP==req.body.otp){
    userDetails.userVerified(userID).then((response)=>{
        userProductDisplay.displayProduct().then((productDetails)=>{
        categoryDisplay.showCategory().then((category)=>{
            banner.showBanner().then((banner)=>{
                res.render('user/indexLanding',{admin:false,user:true,productDetails,category,banner})
            })
           
        })
        })
       
    })
       
    }else
    {
        
        console.log("otp verification false")
    }
}


module.exports ={
    showLandingPage,
    showLoginPage,
    showSignUpPage,
    userSignupAction,
    userLoginAction,
    verifyOtp
}