const db =require('../config/connection')
const collection =require('../config/collection');
const { ObjectId } = require('mongodb');



module.exports={

    displayUser:()=>{
        return new Promise( async(resolve,reject)=>{
            let user= await db.get().collection(collection.USER).find().toArray()
            resolve(user)
        })
    
    },
    deleteUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.USER).deleteOne({_id:ObjectId(userId)}).then((response)=>{
            resolve(response)
          })
        })
    }
}