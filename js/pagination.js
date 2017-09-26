//(function ($) {
//$(document).ready(function () {

	function Pagination (src, range) {
		this.src = src;// source data to load
		this.range = range;//articels per page
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


		var that = this;

		this.doAjax = function () {
			$.getJSON(this.src, this.loadData)
		};



		//main method for doing AJAX
		this.loadData = function (data) {

			this.numOfArticles = data.length;//number of all articles
			var pagButtons = Math.ceil(data.length / that.range);//number of all pagination buttons


			$.each(data, function (key, val) {
				//creating content change this to goal different content elements
				that.html += '<div class="articles"><h1>Article title: ' + val.title + '</h1>';
				that.html += '<p>id: ' + val.id + '</p>';
				that.html += '<p>Article content: ' + val.content + '</p></div>';
			});

				//creating pag buttons
				for (var i = 0; i <  pagButtons; i++) {
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


				 //helpers
				  function buttonsEvent(e) {
			 			//events for pagination buttons
			 			e.preventDefault();
			 			//events for articles
			 			var currentPage = $(this).data('pagnum'); //catch button number from data-pagnum
			 			that.minRange = currentPage * that.range;
			 			that.maxRange = that.minRange + that.range;
			 			$( ".articles" ).hide(); //hide to prevent double
			 			$( ".articles" ).slice( that.minRange, that.maxRange ).show( ); //setting range by pagination button

			 			//prevent to count -10 if current button is less than 10
		 			if ($(this).is('.pagination a:first') && currentPage < 10) {
		 				that.minBtnRange = 0;
		 				that.maxBtnRange = 10;
		 				that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();
		 				$('span.pagination >a').remove();
		 				$('span.pagination').prepend(that.tempPag);
		 			} else if ($(this).is('.pagination a:last') && currentPage > pagButtons -10) {
		 				//last buttons
		 				that.minBtnRange = pagButtons - 10;
		 				that.maxBtnRange = pagButtons;
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
				//return to first page
				function firstButtonEvent (e) {
					console.log(pagButtons);
					e.preventDefault();
					that.minBtnRange = 0;
					that.maxBtnRange = 10;
					that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();
					$('span.pagination > a').remove();
					$('span.pagination').prepend(that.tempPag);
					$( ".articles" ).hide(); //hide to prevent double
					$( ".articles" ).slice( 0, 10 ).show( ); //setting range by pagination button
				};
				//go to last page
				 function lastButtonEvent (e) {
					e.preventDefault();
					that.minBtnRange = pagButtons - 10;
					that.maxBtnRange = pagButtons;
					that.maxRange = pagButtons * that.range;
					that.minRange = that.maxRange - that.range;
					that.tempPag = $(that.temp).find('a').slice( that.minBtnRange, that.maxBtnRange ).css('display', 'inline').clone();
					$('span.pagination > a').remove();
					$('span.pagination').prepend(that.tempPag);
					$( ".articles" ).hide(); //hide to prevent double
					$( ".articles" ).slice( that.minRange, that.maxRange ).show( ); //setting range by pagination button
				};
				//show hide articles
				 function articleToggle () {
						$(this).parent().find('p').slideToggle();
				};
				//events handlers
				$('.articles').on('click', 'h1', articleToggle);
				$('.pagination').on('click', 'a', buttonsEvent);
			 	$('.first-button').on('click', firstButtonEvent);
			 	$('.last-button').on('click', lastButtonEvent);
		};


	};
//end of main object

	var loadPost = new Pagination("data.json", 10);
	loadPost.doAjax();







//})
//}) ( jQuery );
