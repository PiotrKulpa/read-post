(function ($) {
function Post() {

}


Post.prototype.check = function () {
  var title = $('#input-title').val(),
  textarea = CKEDITOR.instances.inputtxt.getData(),
  titleRegex = /\w/,
  textareaRegex = /^$|[#$%&*^{}] /;

  if (titleRegex.test(title) && textareaRegex.test(textarea) === false) {
    console.log( 'true' );
    //need this for updating instances in ckeditor
    for ( instance in CKEDITOR.instances )
        CKEDITOR.instances[instance].updateElement();
    return true;
  } else {
    console.log( 'false' );
    if (!titleRegex.test(title) && textareaRegex.test(textarea)) {
      $('#input-title').css('background-color', 'red');
      $('#input-txt').css('background-color', 'red');
    } else if (!titleRegex.test(title)){
      $('#input-title').css('background-color', 'red');
    } else if (textareaRegex.test(textarea)){
      $('#input-txt').css('background-color', 'red');
    }
    return false;
  };
};

Post.prototype.send = function(  ) {
  var data = $( "form" ).serialize(),
  host = window.location.href;
  $.post("http://localhost/formtest/api/login/add_posts", data )
  .done( function () {
    $('.msg').text('Post zostal wyslany.');
    $('#input-title').val('');
    $('#inputtxt').val('');
  })
  .fail( function () {
    $('.msg').text('Wysylanie nie powiodlo się, spróbuj ponownie.');
  });

};

var sendf = new Post();
$( "#formpost" ).on( "submit", function( event ) {
  event.preventDefault();
  if (sendf.check()) {
    console.log('ok');
    sendf.send()
  } else {
  };

});

}) ( jQuery );
