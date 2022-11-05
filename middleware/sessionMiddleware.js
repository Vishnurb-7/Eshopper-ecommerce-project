

const userSessionChecker=(req,res,next)=>{
    if (req.session.user){
        next()
    }else{

    }
}

const adminSessionChecker = (req,res,next)=>{
    if(req.session.admin){
        next()
    }else{
        res.render("admin/adminLogin",{admin:false,user:false})
    }
}


module.exports={
    userSessionChecker,
    adminSessionChecker
}