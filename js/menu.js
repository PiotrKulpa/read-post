(function () {
$(document).ready(function(){
  // Add smooth scrolling to all links
  $(".navbar a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      var hashposition = $(hash).offset().top - 50;
      //console.log(hashposition);

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({scrollTop: hashposition}, 'slow');

      window.location.hash = hash;
    } // End if
  });
});

} ());
