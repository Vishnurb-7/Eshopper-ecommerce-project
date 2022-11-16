const express =require ('express')
const router =express.Router()

const admin=require('../Controllers/adminLoginController')
const addCategory=require('../Controllers/adminCategoryController')
const addBrand=require('../Controllers/adminBrandController')
const addProduct=require('../Controllers/adminProductController')
const user= require('../Controllers/adminUserController')
const banner =require('../Controllers/adminBannerController')
const sessionChecker =require('../middleware/sessionMiddleware')
const { Router } = require('express')
const multer = require('multer')
const path =require('path')
const methodOverride = require('method-override')


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

 router.use(methodOverride('_method')) ;

router.get('/', sessionChecker.adminSessionChecker,admin.adminLoginPage)

router.post('/adminLoginAction',admin.adminLoginAction)


router.get('/adminHome',sessionChecker.adminSessionChecker,admin.adminHome)

router.get('/adminOrderListPage',sessionChecker.adminSessionChecker,admin.adminOrderListPage)
router.get('/adminSignOut',admin.adminSignOut)

//category router.......


router.get('/adminCategoryPage',sessionChecker.adminSessionChecker,addCategory.adminCategoryPage)
router.post('/addNewCategory',sessionChecker.adminSessionChecker,addCategory.addNewCategory)
router.get("/deleteOneCategory",sessionChecker.adminSessionChecker,addCategory.deleteCategory)

// brand router............

router.get('/adminBrandPage',sessionChecker.adminSessionChecker,addBrand.adminBrandPage)
router.post('/addBrand',sessionChecker.adminSessionChecker,addBrand.adminShowBrand)
router.get("/deleteOneBrand",sessionChecker.adminSessionChecker,addBrand.adminDeleteBrand)


//product router

router.get('/adminProductPage',sessionChecker.adminSessionChecker,addProduct.adminProductPage)
router.get('/adminAddProduct',sessionChecker.adminSessionChecker,addProduct.adminAddProductPage)
// router.post('/adminAddNewProduct',addProduct.addNewProduct)
router.get("/adminDeleteOneProduct",sessionChecker.adminSessionChecker,addProduct.adminDeleteProduct)
router.post("/adminAddNewProduct",sessionChecker.adminSessionChecker,upload.single('image'),addProduct.addNewProduct)
router.get("/adminGetOneProduct",sessionChecker.adminSessionChecker,addProduct.updateProductDetails)
// router.post('/updateProductDetails',sessionChecker.adminSessionChecker,upload.single('image'),addProduct.updateProductionDetailsAction)
router.put('/editData/:id',upload.single('image'),sessionChecker.adminSessionChecker,addProduct.updateProductionDetailsAction)

//admin user router

router.get('/adminUserPage',sessionChecker.adminSessionChecker,user.adminUserPage)
router.get('/adminDeleteOneUser',sessionChecker.adminSessionChecker,user.deleteUser)


//admin banner router

router.get("/adminBannerPage",sessionChecker.adminSessionChecker,banner.adminBannerPage)
router.post('/addNewBanner',sessionChecker.adminSessionChecker,upload.single('image'),banner.addNewBanner)
router.delete("/deleteBanner",sessionChecker.adminSessionChecker,banner.deleteBanner)

module.exports=router