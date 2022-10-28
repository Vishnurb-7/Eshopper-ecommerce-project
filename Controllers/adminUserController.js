const {response}= require('express')
const addUser= require('../Model/adminUser')



const adminUserPage=(req,res)=>{
    if(req.session.admin){
        addUser.displayUser().then((Users)=>{
            res.render('admin/adminUserPage',{admin:true,user:false,title:'USER CONTROL PAGE',Users})
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
   
    
}

const deleteUser=(req,res)=>{
    let userId = req.query.id
    addUser.deleteUser(userId).then((response)=>{
        res.redirect("/admin/adminUserPage")
    })
}








module.exports={
    adminUserPage,
    deleteUser
}

