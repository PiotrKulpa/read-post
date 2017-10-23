(function ($) {
function Post() {

}


Post.prototype.check = function () {
  var title = $('#input-title').val(),
  textarea = $('#input-txt').val(),
  titleRegex = /\w/,
  textareaRegex = /^$|[#$%&*^]/;






  if (titleRegex.test(title) && textareaRegex.test(textarea) === false) {
    console.log( 'true' );
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
  $.post( host + "api/add_posts", data )
  .done( function () {
    $('.msg').text('Post zostal wyslany.');
    $('#input-title').val('');
    $('#input-txt').val('');
  })
  .fail( function () {
    $('.msg').text('Wysylanie nie powiodlo się, spróbuj ponownie.');
  });
  console.log( $( "form" ).serialize() );
};

var sendf = new Post();
$( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  $('#input-title').css('background-color', 'white');
  $('#input-txt').css('background-color', 'white');
  if (sendf.check()) {
    sendf.send()
  } else {
  };
});

}) ( jQuery );
