function Form() {

}


Form.prototype.check = function () {
  var email = $('.email').val(),
  textarea = $('.textarea').val(),
  mailRegex = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/,
  textareaRegex = /^$|[#$%&*^]/;

  function IsRecapchaValid()
      {
      var res = grecaptcha.getResponse();
      if (res == "" || res == undefined || res.length == 0)
         {
           console.log('rekapcza niezaliczona');
          return false;
         }
         console.log('rekapcza zaliczona');
       return true;
     };




  if (mailRegex.test(email) && textareaRegex.test(textarea) === false && IsRecapchaValid()) {
    console.log( 'true' );
    return true;
  } else {
    console.log( 'false' );
    if (!mailRegex.test(email) && textareaRegex.test(textarea)) {
      $('.email').css('background-color', 'red');
      $('.textarea').css('background-color', 'red');
    } else if (!mailRegex.test(email)){
      $('.email').css('background-color', 'red');
    } else if (textareaRegex.test(textarea)){
      $('.textarea').css('background-color', 'red');
    }
    return false;
  };
};

Form.prototype.send = function(  ) {
  var data = $( "form" ).serialize(),
  host = window.location.href;
  $.post( host + "api/form", data )
  .done( function () {
    $('.msg').text('Mail zostal wyslany.');
    $('.email').val('');
    $('.textarea').val('');
  })
  .fail( function () {
    $('.msg').text('Wysylanie nie powiodlo się, spróbuj ponownie.');
  });
  console.log( $( "form" ).serialize() );
};

var sendf = new Form();
$( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  $('.email').css('background-color', 'white');
  $('.textarea').css('background-color', 'white');
  if (sendf.check()) {
    sendf.send()
  } else {
  };
});
