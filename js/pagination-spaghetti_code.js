$(document).ready(function () {

$.getJSON("data.json", function (data) {
    var html = '',
        pag = '',
        temp = {},
        tempPag = {},
        tempPagDef = {},
        range = 10, //articles per page
        numOfArticles = data.length,
        pagButtons = Math.ceil(data.length / range), //number of pagination buttons
        minRange = 0,
        maxRange = 10,
        minBtnRange = 0,
        maxBtnRange = 10,
        j = 0;


  $.each(data, function (key, val) {
    //creating content
    html += '<div class="articles"><h1>Article title: ' + val.title + '</h1>';
    html += '<p>id: ' + val.id + '</p>';
    html += '<p>Article content: ' + val.content + '</p></div>';
  });

  //creating pag buttons
  for (var i=0; i <  pagButtons; i++) {
    j++;
    pag += '<a href="#" data-pagnum="'+ i + '">' + j + ' </a>';
  };

  //append title and content of article
  $('.result').append(html);
  $( ".articles" ).slice( minRange, maxRange ).show( );

  // default: shows only range of pagination buttons from 1-10
  temp = $('<div></div>').prepend(pag);
  tempPagDef = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
  //console.log(tempPag);
   $('.pagination').prepend(tempPagDef);

  //replace .pagination by current set of buttons
  //$('.pagination a').replaceWith(defPagButtons);


  $('.pagination').on('click', 'a', function (e) {
    e.preventDefault();

    //events for articles
    var currentPage = $(this).data('pagnum'); //catch button number from data-pagnum
    minRange = currentPage * range;
    maxRange = minRange + range;
    $( ".articles" ).hide(); //hide to prevent double
    $( ".articles" ).slice( minRange, maxRange ).show( ); //setting range by pagination button

    //events for pagination buttons
    //prevent to count -10 if current button is less than 10
    if ($(this).is('.pagination a:first') && currentPage < 10) {
      minBtnRange = 0;
      maxBtnRange = 10;
      tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
      console.log(maxBtnRange);
      $('span.pagination >a').remove();
      $('span.pagination').prepend(tempPag);
      } else if ($(this).is('.pagination a:last') && currentPage > pagButtons -10) {
      //last buttons
      minBtnRange = pagButtons - 10;
      maxBtnRange = pagButtons;
      tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
      console.log(maxBtnRange);
      $('span.pagination > a').remove();
      $('span.pagination').prepend(tempPag);
    } else if ($(this).is('.pagination a:first')) {
      //first button shows back 10
      minBtnRange = currentPage - 10;
      maxBtnRange = currentPage;
      tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
      console.log(maxBtnRange);
      $('span.pagination > a').remove();
      $('span.pagination').prepend(tempPag);
    } else if ($(this).is('.pagination a:last')) {
      //last button shows next 10
      minBtnRange = currentPage;
      maxBtnRange = minBtnRange + 10;
      tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
      console.log(maxBtnRange);
      $('span.pagination > a').remove();
      $('span.pagination').prepend(tempPag);
    }


  });

  $('.outer-pagination').on('click', '.first-button', function (e) {
    e.preventDefault();
    minBtnRange = 0;
    maxBtnRange = 10;
    tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
    console.log(maxBtnRange);
    $('span.pagination > a').remove();
    $('span.pagination').prepend(tempPag);
    $( ".articles" ).hide(); //hide to prevent double
    $( ".articles" ).slice( 0, 10 ).show( ); //setting range by pagination button
    });

    $('.outer-pagination').on('click', '.last-button', function (e) {
      e.preventDefault();
      minBtnRange = pagButtons - 10;
      maxBtnRange = pagButtons;
      maxRange = pagButtons * range;
      minRange = maxRange - range;
      tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
      console.log(maxBtnRange);
      $('span.pagination > a').remove();
      $('span.pagination').prepend(tempPag);
      $( ".articles" ).hide(); //hide to prevent double
      $( ".articles" ).slice( minRange, maxRange ).show( ); //setting range by pagination button
      });

});

})
