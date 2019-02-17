var express = require('express');
var app = express();
console.log("Hello world")
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
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
app.get('/', function(req, res){
    res.render("index.ejs");
});
app.get('/new', function(req, res){
  res.render("new.ejs")
});
app.post('/new', function(req, res){

var imgs = req.body.imageUrls;
var images = [];
console.log(imgs);
var start=0, end=0;

for(var i=0; i<imgs.length; i++)
{
  if(imgs[i] == ',')
  {
    images.push(imgs.substring(start, i));
    start = i+1;
  }
}
images.push(imgs.substring(start));
console.log(images);
  var product = new Product({
    link: req.body.link,
    name: req.body.linkTitle,
    title: req.body.title,
    type: req.body.type,
    price: req.body.price,
    fabric: req.body.fabric,
    fit: req.body.fit,
    relation1: req.body.relation1,
    relation2: req.body.relation2,
    relation1Size:{
        size: ['S', 'M', 'L', 'XL', 'XXL', '6-12M', '12-24M', '2-4Y', '4-6Y', '6-8Y', '8-10Y'],
        stock: [
            req.body.S,
            req.body.M,
            req.body.L,
            req.body.XL,
            req.body.XXL,
            req.body.o12M,
            req.body.o24M,
            req.body.o4Y,
            req.body.o6Y,
            req.body.o8Y,
            req.body.o10Y
        ]
    },
    relation2Size:{
        size: ['S', 'M', 'L', 'XL', 'XXL', '6-12M', '12-24M', '2-4Y', '4-6Y', '6-8Y', '8-10Y'],
        stock: [
          req.body.S2,
          req.body.M2,
          req.body.L2,
          req.body.XL2,
          req.body.XXL2,
          req.body.t12M2,
          req.body.t24M2,
          req.body.t4Y2,
          req.body.t6Y2,
          req.body.t8Y2,
          req.body.t10Y2
        ]
    },
    description: req.body.description,
    image: images
  });
  product.save(function(err, product){
    if(err){
      console.log(err);
    } else {
      // console.log(product);
    }
    }
  );
  res.redirect("/new");
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
