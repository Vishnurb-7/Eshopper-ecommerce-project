const db =require('../config/connection')
const collection =require('../config/collection');
const { ObjectId } = require('mongodb');


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
      }
}