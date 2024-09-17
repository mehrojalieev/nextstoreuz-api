const mongoose = require('mongoose')

// Category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    imagesUrl: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


productSchema.pre("save", function(next) {
    const product = this;
    if(product.category.name === "mobile"){
        product.category.image = "https://basket-10.wb.ru/vol1410/part141005/141005659/images/big/1.jpg";
    }
   else if(product.category.name === "laptop"){
        product.category.image = "https://agroup.by/upload/Sh/imageCache/415/282/2820983455529034.webp";
    }
   else if(product.category.name === "watch"){
        product.category.image = "https://static.insales-cdn.com/images/products/1/7963/669277979/1.jpg";
    }
   else if(product.category.name === "television"){
        product.category.image = "https://minio.alifshop.uz/shop/products/wZqO8UbKouZBArs78ziI4zvfqAh9NN02DRcqfb3l.png";
    }
  else  if(product.category.name === "muzlatgich"){
        product.category.image = "https://st3.stpulscen.ru/images/product/048/896/251_original.jpg";
    }
    else {
        product.category.image = "https://via.placeholder.com/150";
    }
        next()
})

const ProductSchema = mongoose.model('products', productSchema)

module.exports = ProductSchema