const { response } = require('express')
const userDetails= require('../Model/userBasic')
const nodemailer =require('nodemailer')




let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vishnurb4vishnu@gmail.com',
        pass: 'wkwhsremxdzqqjsg'
    }
});

const OTP = `${Math.floor(1000+ Math.random() * 9000 )}`;

const showLandingPage =(req,res)=>{
    res.render("user/index",{admin:false,user:true})
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

        userID=response.insertedID
     
        res.render("user/useOtpVerificationPage",{admin:false,user:false})
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

const verifyOtp=(req,res)=>{
    if(OTP==req.body.otp){
    userDetails.userVerified(userID).then((response)=>{
        res.render('user/indexLanding',{admin:false,user:true})
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