//(function ($) {
//$(document).ready(function () {

	function Pagination (src, range) {
		this.src = src;
		this.range = range;
		this.html2 = 'jakis text1';
		this.html = '';
		this.pag = '';
		this.tempPag = {};
		this.tempPagDef = {};
		this.minRange = 0;
		this.maxRange = 10;
		this.minBtnRange = 0;
		this.maxBtnRange = 10;
		this.j = 0;
		this.temp = {};
		this.pagButtons = 0;

		var that = this;

		this.doAjax = function () {
			$.getJSON(this.src, this.loadData);
		};

		this.loadData = function (data) {

			this.pagButtons = Math.ceil(data.length / that.range);
			this.numOfArticles = data.length;
			that.pagButtons = this.pagButtons;







			$.each(data, function (key, val) {
				//creating content change this to goal different content elements
				that.html += '<div class="articles"><h1>Article title: ' + val.title + '</h1>';
				that.html += '<p>id: ' + val.id + '</p>';
				that.html += '<p>Article content: ' + val.content + '</p></div>';
			});


				//creating pag buttons
				for (var i = 0; i <  this.pagButtons; i++) {
					that.j++;
					that.pag += '<a href="#" data-pagnum="'+ i + '">' + that.j + ' </a>';
				};

				//append title and content of article
				$('.result').append(that.html);
				$( ".articles" ).slice( that.minRange, that.maxRange ).show( );

				// default: shows only range of pagination buttons from 1-10
				that.temp = $('<div></div>').prepend(that.pag);
				that.tempPagDef = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();
				//console.log(tempPag);
				 $('.pagination').prepend(that.tempPagDef);

				//replace .pagination by current set of buttons

		};

		this.buttonsEvent = function (e) {
			//metoda odpowiedzialna za obsugę kolejnych przyciskow paginacji
			e.preventDefault();

			//events for articles
			var currentPage = $(this).data('pagnum'); //catch button number from data-pagnum
			that.minRange = currentPage * that.range;
			that.maxRange = that.minRange + that.range;
			$( ".articles" ).hide(); //hide to prevent double
			$( ".articles" ).slice( that.minRange, that.maxRange ).show( ); //setting range by pagination button

			//events for pagination buttons
			//prevent to count -10 if current button is less than 10
			if ($(this).is('.pagination a:first') && currentPage < 10) {
				that.minBtnRange = 0;
				that.maxBtnRange = 10;
				that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();

				$('span.pagination >a').remove();
				$('span.pagination').prepend(that.tempPag);
			} else if ($(this).is('.pagination a:last') && currentPage > that.pagButtons -10) {
				//last buttons

				that.minBtnRange = that.pagButtons - 10;
				that.maxBtnRange = that.pagButtons;
				that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();

				$('span.pagination > a').remove();
				$('span.pagination').prepend(that.tempPag);
			} else if ($(this).is('.pagination a:first')) {
				//first button shows back 10
				that.minBtnRange = currentPage - 10;
				that.maxBtnRange = currentPage;
				that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();

				$('span.pagination > a').remove();
				$('span.pagination').prepend(that.tempPag);
			} else if ($(this).is('.pagination a:last')) {
				//last button shows next 10
				that.minBtnRange = currentPage;
				that.maxBtnRange = that.minBtnRange + 10;
				that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();

				$('span.pagination > a').remove();
				$('span.pagination').prepend(that.tempPag);
			} else {
				//last button shows next 10
				that.minBtnRange = currentPage;
				that.maxBtnRange = that.minBtnRange + 10;
				that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();

				$('span.pagination > a').remove();
				$('span.pagination').prepend(that.tempPag);
			}

		};

		this.firstButtonEvent = function (e) {
			e.preventDefault();
			that.minBtnRange = 0;
			that.maxBtnRange = 10;
			that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();

			$('span.pagination > a').remove();
			$('span.pagination').prepend(that.tempPag);
			$( ".articles" ).hide(); //hide to prevent double
			$( ".articles" ).slice( 0, 10 ).show( ); //setting range by pagination button

		};

		this.lastButtonEvent = function (e) {
			e.preventDefault();
			
			that.minBtnRange = that.pagButtons - 10;
			that.maxBtnRange = that.pagButtons;
			that.maxRange = that.pagButtons * that.range;
			that.minRange = that.maxRange - that.range;
			that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();
			$('span.pagination > a').remove();
			$('span.pagination').prepend(that.tempPag);
			$( ".articles" ).hide(); //hide to prevent double
			$( ".articles" ).slice( that.minRange, that.maxRange ).show( ); //setting range by pagination button

		};



	};

	//koniec glownego obiektu

	var loadPost = new Pagination("data.json", 10);

	loadPost.doAjax();
	$('.pagination').on('click', 'a', loadPost.buttonsEvent);
	$('.first-button').on('click', loadPost.firstButtonEvent);
	$('.last-button').on('click', loadPost.lastButtonEvent);


//})
//}) ( jQuery );
