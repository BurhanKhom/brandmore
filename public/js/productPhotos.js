$("img.img-thumbnail").on("click", function(e){
  console.log(e.target.src);
  $("img.img-thumbnail").css("opacity", 0.3);
  var bg_img = e.target.src;
  $("div.photo").css("background-image", 'url('+bg_img+')');
  $(this).css("opacity", 1);
});
