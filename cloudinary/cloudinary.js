
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')

cloudinary.config({ 
    cloud_name: 'dnh79zoop', 
    api_key: '982324558377763', 
    api_secret: c``
  });


  const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'pictures',
        allowedFormat:['jpeg','png','jpg','gif','webp','avif']

    }
  })
  module.exports={
    cloudinary,
    storage
  }