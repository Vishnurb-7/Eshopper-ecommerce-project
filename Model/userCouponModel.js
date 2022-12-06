
const db = require('../config/connection')
const collection = require('../config/collection')
const { response } = require("express");

module.exports = {
    getCouponDetails: (couponCode) => {
        // console.log("coupon code ==> ", couponCode);
        return new Promise(async (resolve, reject) => {
          let couponDetails = await db
            .get()
            .collection(collection.COUPON)
            .findOne({ couponCode: couponCode });
          // console.log("Copupon details = ", couponDetails);
          resolve(couponDetails)
        });
      },



  getDiscount:(couponDetails,total)=>{
    return new Promise(async(resolve,reject)=>{
 
    //  console.log('couuuuuuuuuuuuuuuuuuuuuuupppon',couponDetails);
      if(couponDetails)
      {
        let discount = couponDetails.discount
        let endDate = Date.parse(couponDetails.endDate)
        let todayDate = new Date()
        let discountedTotal
        todayDate = todayDate.toLocaleDateString("en-US")
        todayDate = Date.parse(todayDate)
        if(todayDate<=endDate)
        {
          discountedTotal = total - (discount/100)*total + (3/100)*total
          // console.log('discountedTotal ===>>> ',discountedTotal);
          response.discountedTotal = discountedTotal
          response.couponStatus = true
          response.discount = discount
          // console.log('discount response 1st => ',response);
          resolve(response)
        }
        else
        {
          response.couponStatus = false
          response.discountedTotal = total + (3/100)*total
          response.discount = 0
          // console.log('discount response 2st => ',response);
          resolve(response)
        }
      }
      else
      {
        response.couponStatus = false
        response.discountedTotal = total + (3/100)*total
        response.discount = 0
        // console.log('discount response 3rd => ',response);
        resolve(response)
      }

  
    })

  }

}