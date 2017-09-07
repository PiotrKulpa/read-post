//(function ($) {
//$(document).ready(function () {

var testObj = function  () {
  this.a = 1;
  this.b = 2;
  this.c = {
    par1: 'tekst',
    par2: 1,
    par3: function () {
      alert('dziala');
    }
  };


}

testObj.prototype.dodaj = function () {
  console.log(this.a);
}




//)};


//}) ( jQuery );
