const express =require ('express')
const router =express.Router()
const admin=require('../Controllers/adminLoginController')
const addCategory=require('../Controllers/adminCategoryController')
const addBrand=require('../Controllers/adminBrandController')
const addProduct=require('../Controllers/adminProductController')
const user= require('../Controllers/adminUserController')
const banner =require('../Controllers/adminBannerController')
const { Router } = require('express')
const multer = require('multer')
const path =require('path')

//muter

const storage = multer.diskStorage({
    destination: './public/images',
    filename:(req,file,cb)=>{
  cb(null,Date.now()+file.originalname)
    }  
  })
  
  
  // product image uploading code
  const upload = multer({
    storage: storage,
    fileFilter:(req,file,cb)=>{
      if(
        file.mimetype == 'image/jpeg'|| 
        file.mimetype == 'image/jpg'||
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/gif' ||
        file.mimetype == 'image/webp'
      ){
        cb(null,true)
      }
      else
      {
        cb(null,false);
        cb(new Error('Only jpeg, jpg, png and gif Image allowed'))
      }
    }
  })

router.get('/',admin.adminLoginPage)

router.post('/adminLoginAction',admin.adminLoginAction)


router.get('/adminHome',admin.adminHome)

router.get('/adminOrderListPage',admin.adminOrderListPage)
router.get('/adminSignOut',admin.adminSignOut)

//category router.......


router.get('/adminCategoryPage',addCategory.adminCategoryPage)
router.post('/addNewCategory',addCategory.addNewCategory)
router.get("/deleteOneCategory",addCategory.deleteCategory)

// brand router............

router.get('/adminBrandPage',addBrand.adminBrandPage)
router.post('/addBrand',addBrand.adminShowBrand)
router.get("/deleteOneBrand",addBrand.adminDeleteBrand)


//product router

router.get('/adminProductPage',addProduct.adminProductPage)
router.get('/adminAddProduct',addProduct.adminAddProductPage)
// router.post('/adminAddNewProduct',addProduct.addNewProduct)
router.get("/adminDeleteOneProduct",addProduct.adminDeleteProduct)
router.post("/adminAddNewProduct",upload.single('image'),addProduct.addNewProduct)
router.get("/adminGetOneProduct",addProduct.updateProductDetails)
router.post('/updateProductDetails',upload.single('image'),addProduct.updateProductionDetailsAction)


//admin user router

router.get('/adminUserPage',user.adminUserPage)
router.get('/adminDeleteOneUser',user.deleteUser)


//admin banner router

router.get("/adminBannerPage",banner.adminBannerPage)
router.post('/addNewBanner',upload.single('image'),banner.addNewBanner)
router.delete("/deleteBanner",banner.deleteBanner)

module.exports=router