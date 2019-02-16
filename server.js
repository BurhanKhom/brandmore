var express = require('express');
var app = express();
console.log("Hello world")
app.use(express.static(__dirname + '/public'));
var mongo = require('mongodb');
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/brandmore");
mongoose.connect("mongodb+srv://burhankhom:Burhan123@cluster0-tzgdv.mongodb.net/test?retryWrites=true");
var productSchema = new mongoose.Schema({
  link: String,
  name: String,
  title: String,
  type: String,
  price: Number,
  fabric: String,
  fit: String,
  relation1: String,
  relation2: String,
  relation1Size:{
        size: [],
        stock: []
  },
  relation2Size:{
      size: [],
      stock: []
  },
  description: String,
  image: []
});
var Product = mongoose.model("Product", productSchema);

var product = new Product({
  link: "dad-like-son",
  name: "Dad and Son Tees",
  title: "Black My Son/Dad My Hero Father-Son Tees",
  type: "Combo Collection",
  price: 1199,
  fabric: "T-shirt - 100% Cotton\nColor- Black\nWASH CARE:\nHand wash\nMachine wash delicate\nDo not bleach\nDo not wring\nDo not tumble dry\nDo not brush\nDo not iron on print/embroidery",
  fit: "Regular Fit: Choose your regular size. Refer to Size chart if a looser fit is desired",
  relation1: "Father",
  relation2: "Son",
  relation1Size:{
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: [0, 50, 200, 10, 0]
  },
    // S: 0,
    // M: 50,
    // L: 200,
    // XL: 10,
    // XXL: 0
  relation2Size:{
      size: ['6-12M', '12-24M', '2-4Y', '4-6Y', '6-8Y', '8-10Y', '10-12Y', 'S', 'M', 'L', 'XL', 'XXL'],
      stock: [1, 2, 2, 5, 10, 20, 30, 40, 20, 10, 10]
  },
  description: "Our first hero will always be our dad & for a dad his only hero will be his son.These matching set combo of “My Son/My Dad Hero Tees” by BrandMore. Memories to cherish for a lifetime.",
  image: [
    "https://cdn.shopify.com/s/files/1/0399/6361/products/Black-My-SonDad-My-Hero-Father-Son-Tees.jpg?v=1550263626",
    "https://cdn.shopify.com/s/files/1/0399/6361/products/My-son-my-hero-black-2.jpg?v=1550263626",
    "https://cdn.shopify.com/s/files/1/0399/6361/products/My-son-my-hero-black-3.jpg?v=1550263626",
    "https://cdn.shopify.com/s/files/1/0399/6361/products/My-son-my-hero-black-1_2233084e-1965-4ddb-b82f-05f3d19250e4.jpg?v=1550263626"
    ]
});
product.save(function(err, product){
  if(err){
    console.log(err);
  } else {
    // console.log(product);
  }
  }
);

app.get('/', function(req, res){
    res.render("index.ejs");
});
app.get('/collections/:link', function(req, res){
    Product.find({link:req.params.link}, function(err, products){
      if(err)
      {
        // console.log(err);
      } else {
        // console.log(products);
        res.render("content.ejs", {products:products});
      }
    });
    // res.render("content.ejs", {data:req.body});
});
app.get('/collections/:link/product', function(req, res){
    // console.log(req.query.id);
    Product.findById(req.query.id, function(err, product){
      res.render("productDetails.ejs", {product:product});
    });
});

// app.listen(5000, function(){
//   console.log("listening on port 5000")
// });
app.listen(process.env.PORT, function(){console.log("BrandMore Server Started: "+process.env.PORT);});
