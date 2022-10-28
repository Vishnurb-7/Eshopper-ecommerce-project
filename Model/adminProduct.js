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

        editProduct:(productId,productDetails,image)=>{
            return new Promise((resolve,reject)=>{
                db.get().collection(collection.PRODUCT).updateOne({_id:ObjectId(productId)},{
                    $set: {
                        productName:productDetails.productName,
                        actualPrice:productDetails.actualPrice,
                        sellingPrice:productDetails.sellingPrice,
                        categoryName:productDetails.categoryName,
                        brandName:productDetails.brandName,
                        quantityName:productDetails.quantityName,
                        productDescription:productDetails.productDescription,
                        Picture:image
                    },
                }).then((response)=>{
                    resolve()
                })
            })
        }

}
