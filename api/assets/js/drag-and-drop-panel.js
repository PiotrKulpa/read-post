(function ($) {
function Drop() {
}

//zgarnij nazwe pliku i caption, serializuj i przeslij post

$('.loader').css('display', 'none');
 $("#drop-area").on('dragenter', function (e){
  e.preventDefault();
  $(this).css('background', '#EFECCA');
 });
 $("#drop-area").on('dragover', function (e){
  e.preventDefault();
 });
 $("#drop-area").on('drop', function (e){
  $(this).css('background', '#EFECCA');
  $('.loader').fadeIn();
  e.preventDefault();
  var image = e.originalEvent.dataTransfer.files;
  var fL = e.originalEvent.dataTransfer.files.length;

  createFormData(image, fL);
 });

 $("#drop-btn").on('click', function (e){
  $('.loader').fadeIn();
  e.preventDefault();
  var image = $('#select-btn').prop('files');
  console.log(image);
  var fL = image.length;

  createFormData(image, fL);
 });


function createFormData(image, fL)
{
 var formImage = new FormData();

 for(var i = 0; i < fL; i++){
 formImage.append('userImage' + i, image[i]);
 }
 uploadFormData(formImage);
}

function uploadFormData(formData)
{
    console.log(formData);
 $.ajax({
 url: "http://localhost/formtest/api/login/add_gallery",
 type: "POST",
 data: formData,
 contentType:false,
 cache: false,
 processData: false
})
.done(function(data){
 $('#drop-area').html(data);
})
.fail(function(data){
 $('#drop-area').text('Wystąpił błąd podczas przesyłania');
});
}




}) ( jQuery );
