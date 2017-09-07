//(function ($) {
//$(document).ready(function () {

	function Pagination (src, range) {
		this.src = src;
		this.range = range;

		var that = this;
		that.x = 666;


		this.jF = function () {

			this.x = 333;
			console.log(that.x);
		};

		this.jF();


	};

	Pagination.prototype.doAjax = function (){
		$.getJSON(this.src, this.loadData);

	};

	Pagination.prototype.loadData = function (data) {

		var html = '',
        pag = '',

        tempPag = {},
        tempPagDef = {},
        range = loadPost.range, //articles per page
        numOfArticles = data.length,
        //pagButtons = Math.ceil(data.length / range), //number of pagination buttons
        minRange = 0,
        maxRange = 10,
        minBtnRange = 0,
        maxBtnRange = 10,
        j = 0;

				temp = {};
				pagButtons = Math.ceil(data.length / range);


		$.each(data, function (key, val) {
			//creating content change this to goal different content elements
			html += '<div class="articles"><h1>Article title: ' + val.title + '</h1>';
			html += '<p>id: ' + val.id + '</p>';
			html += '<p>Article content: ' + val.content + '</p></div>';
		});
			//console.log(temp);

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

	};

	Pagination.prototype.buttonsEvent = function (e) {
		//metoda odpowiedzialna za obsugę kolejnych przyciskow paginacji
		e.preventDefault();
		range = loadPost.range;
		console.log(pagButtons);
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

			$('span.pagination >a').remove();
			$('span.pagination').prepend(tempPag);
			} else if ($(this).is('.pagination a:last') && currentPage > pagButtons -10) {
			//last buttons
			minBtnRange = pagButtons - 10;
			maxBtnRange = pagButtons;
			tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();

			$('span.pagination > a').remove();
			$('span.pagination').prepend(tempPag);
		} else if ($(this).is('.pagination a:first')) {
			//first button shows back 10
			minBtnRange = currentPage - 10;
			maxBtnRange = currentPage;
			tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();

			$('span.pagination > a').remove();
			$('span.pagination').prepend(tempPag);
		} else if ($(this).is('.pagination a:last')) {
			//last button shows next 10
			minBtnRange = currentPage;
			maxBtnRange = minBtnRange + 10;
			tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();

			$('span.pagination > a').remove();
			$('span.pagination').prepend(tempPag);
		} else {
			//last button shows next 10
			minBtnRange = currentPage;
			maxBtnRange = minBtnRange + 10;
			tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();

			$('span.pagination > a').remove();
			$('span.pagination').prepend(tempPag);
		}
	};

	Pagination.prototype.firstButtonEvent = function (e) {
		e.preventDefault();
		minBtnRange = 0;
		maxBtnRange = 10;
		tempPag = $(temp).find('a').slice( minBtnRange, maxBtnRange ).css('display', 'inline').clone();
		console.log(maxBtnRange);
		$('span.pagination > a').remove();
		$('span.pagination').prepend(tempPag);
		$( ".articles" ).hide(); //hide to prevent double
		$( ".articles" ).slice( 0, 10 ).show( ); //setting range by pagination button

	};

	Pagination.prototype.lastButtonEvent = function (e) {
		e.preventDefault();
		range = loadPost.range;
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
	};






	var loadPost = new Pagination("data.json", 10);

	loadPost.doAjax();
	$('.pagination').on('click', 'a', loadPost.buttonsEvent);
	$('.first-button').on('click', loadPost.firstButtonEvent);
	$('.last-button').on('click', loadPost.lastButtonEvent);


//})
//}) ( jQuery );
