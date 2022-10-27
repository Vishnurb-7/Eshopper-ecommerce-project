const db =require('../config/connection')
const collection =require('../config/collection');
const { ObjectId } = require('mongodb');

module.exports ={
    doCategory:(addCategory)=>{
        return new Promise (async(resolve,reject)=>{
           
            db.get().collection(collection.ADD_CATEGORY).insertOne(addCategory).then((data)=>{
                resolve (data)
            })
        })
    },
    showCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let Category= await db.get().collection(collection.ADD_CATEGORY).find().toArray()
            resolve(Category)
        })
    },
    deleteCategory:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.ADD_CATEGORY).deleteOne({_id:ObjectId(categoryId)}).then((response)=>{
            resolve(response)
          })
        })
      }
}