const db =require('../config/connection')
const collection =require('../config/collection');
const { ObjectId } = require('mongodb');
const bcrypt=require('bcrypt')

module.exports ={
    insertUserCredentials:(newuser)=>{
        return new Promise (async(resolve,reject)=>{
           newuser.password = await bcrypt.hash(newuser.password,10)
           newuser.confirmPassword = await bcrypt.hash(newuser.confirmPassword,10)

            db.get().collection(collection.USER).insertOne(newuser).then((data)=>{
                resolve .apply(data)
            })
        })
    },
    doLogin:(userData)=>{
        return new Promise (async (resolve,reject)=>{
            let response={}
            let user =await db.get().collection(collection.USER).findOne({email:userData.userEmail})
        
            if(user){
                bcrypt.compare(userData.password,user.password).then((status=>{
                    if(status){
                        
                        response.status=true
                        resolve(response)
                    }else{
                        resolve({
                            status:false
                        })
                    }
                }))
            }else{
                resolve({
                    status:false
                })
            }
        
        })
    }

}




// module.exports={
//     doLogin:(admindata)=>{
//         return new Promise (async (resolve,reject)=>{
           
//             let response={}
//             let admin =await db.get().collection('details').findOne({username:admindata.username})
//             if(admin){
//                 bcrypt.compare(admindata.password,admin.password).then((status=>{
//                     if(status){
//                         response.user=admin
//                         response.status=true
//                         resolve(response)
//                     }else{
//                         resolve({
//                             status:false
//                         })
//                     }
//                 }))
//             }else{
//                 resolve({
//                     status:false
//                 }) 
//             }
//         })
//     },

