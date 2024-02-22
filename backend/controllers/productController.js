import Product from '../models/products.js'
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../utils/errorHandler.js';
import APIFilters from "../utils/apiFilters.js";



// Create new Product   =>  /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query).search().filters();
  
    let products = await apiFilters.query;
    let filteredProductsCount = products.length;
  
    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();
  
    res.status(200).json({
      resPerPage,
      filteredProductsCount,
      products,
    });
  });


  export const getAdminProducts = catchAsyncErrors(async (req, res) => {
    const resPerPage = 20;
    const apiFilters = new APIFilters(Product, req.query).search().filters();
  
    let products = await apiFilters.query;
    let filteredProductsCount = products.length;
  
    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();
  
    res.status(200).json({
      resPerPage,
      filteredProductsCount,
      products,
    });
  });

//to get single product details /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req?.params?.id);
    
    if(!product)
    {
       return next(new ErrorHandler("Product Not found"),404)
    }
    res.status(200).json({
         product,
    })
})


//to get single product details /api/v1/products/:id
export const updateProductDetails = async(req,res)=>{
    let product = await Product.findById(req?.params?.id);
    
    if(!product)
    {
        res.status(404).send({
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body ,{new: true})
    res.status(200).json({
        message: product,
    })
}

// create new product /api/v1/admin/products
export const newProduct = async(req,res)=>{
    req.body.user = req.user._id
    const product= await Product.create(req.body)

    res.status(200).send({
        product
    })
}


//delete Product

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req?.params?.id);

        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        await product.deleteOne();
        return res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the product"
        });
    }
}



// Create/Update product review   =>  /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req?.user?._id,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const isReviewed = product?.reviews?.find(
      (r) => r.user.toString() === req?.user?._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review?.user?.toString() === req?.user?._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get product reviews   =>  /api/v1/reviews
  export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      reviews: product.reviews,
    });
  });
  
  // Delete product review   =>  /api/v1/admin/reviews
  export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product?.reviews?.filter(
      (review) => review._id.toString() !== req?.query?.id.toString()
    );
  
    const numOfReviews = reviews.length;
  
    const ratings =
      numOfReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          numOfReviews;
  
    product = await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, numOfReviews, ratings },
      { new: true }
    );
  
    res.status(200).json({
      success: true,
      product,
    });
  });