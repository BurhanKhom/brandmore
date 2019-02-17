var links = document.querySelectorAll("a.dropdown-item"),
    select = document.getElementById("inputLink");
for(var i=0; i<links.length; i++)
{
  var opt = document.createElement('option');
  opt.value = links[i].pathname.substring(13);
  opt.innerHTML = links[i].pathname.substring(13);
  select.appendChild(opt);
}
$("#inputLink").change(function(){
  // console.log($(this).prop('selectedIndex'));
  var x = document.getElementById("inputName");
  x.setAttribute("value", links[$(this).prop('selectedIndex')-1].outerText);
});

document.getElementById('inputFabric').setAttribute("value", 'T-shirt - 100% Cotton\nColor- Black\nWASH CARE:\nHand wash\nMachine wash delicate\nDo not bleach\nDo not wring\nDo not tumble dry\nDo not brush\nDo not iron on print/embroidery');

var cBoxes = document.querySelectorAll('.cb');

cBoxes[1].setAttribute('value', "10");
