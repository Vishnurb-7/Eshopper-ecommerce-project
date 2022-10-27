const db =require('../config/connection')
const collection =require('../config/collection');
const { ObjectId } = require('mongodb');
const { response } = require('express');


module.exports={
    insertProduct:(imageID,productionData)=>{
        return new Promise (async(resolve,reject)=>{   
                     
            db.get().collection(collection.PRODUCT).insertOne(imageID,productionData).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    showProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let product= await db.get().collection(collection.PRODUCT).find().toArray()
            resolve(product)
        })
    },
    deleteProduct:(productId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.PRODUCT).deleteOne({_id:ObjectId(productId)}).then((response)=>{
            resolve(response)
          })
        })
      },
      showOneProduct:(id)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.PRODUCT).findOne({_id:ObjectId(id)}).then((response)=>{
                resolve(response)
            })
        })
      },
      editProduct:(userid,productDetails)=>{
        return new Promise (async(resolve,reject)=>{
            console.log(productDetails)
            productDetails.Password=await bcrypt.hash(productDetails.Password,10)

            db.get().collection(collection.PRODUCT).updateOne({_id:ObjectId(userid)},{
                $set:{
                    
                }
            })
        })
      }

}

editUser:(userid,userDetails)=>{
    return new Promise(async(resolve,reject)=>{
        console.log(userDetails)
        userDetails.Password=await bcrypt.hash(userDetails.Password,10)
     db.get().collection('user').updateOne({_id:ObjectId(userid)},{
        $set:{
            Name:userDetails.Name,
            Email:userDetails.Email,
            Password:userDetails.Password
        }
     }).then((response)=>{
        resolve(response)
     })
    })
}




// showOneUser:(id)=>{
//     return new Promise((resolve,reject)=>{
//         db.get().collection('user').findOne({_id:ObjectId(id)}).then((response)=>{
//             resolve(response)
//         })
//     })
// },