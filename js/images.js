(function ($) {

function Images (src) {
		this.src = src;
		};

		Images.prototype.doAjax = function () {
			var that = this;
			var html = '';
			$.getJSON(this.src, this.loadData).done(function (data) {

				//sorting helper
				function sortHelper(c, asc){

					//clear html from old stuff
					html = '';
					data.sort(function(a, b){
						if(a[c] < b[c]) return -1 * asc;
						if(a[c] > b[c]) return 1 * asc;
						return 0;
					});
					//create new html in loop
					$.each(data, function(i,c){
					html += '<a class="example-image-link" href="images/original/' + c.name + '" data-lightbox="example-2" data-title="Optional caption.">';
					html += '<img class="example-image" src="images/thumbs/' + c.name +'" alt="Two men in bicycle jerseys sitting outside at table having coffee">';
					html += '</a>';
				});

				//remove old content and add new one
				$('.gallery-images').find('a').remove().end();
				$('.gallery-images').append(html);
				$('a').hide();
				$('a').show();
				};

				//tutaj dodaj uchwyty sortujace
				$("#type").on('change', function(e){
					e.preventDefault();
				  var id = $(this).find("option:selected").attr("id");

				  switch (id){
				    case "asc-name":
				      that.sortAscName(data, sortHelper);
				      break;
						case "dsc-name":
				      that.sortDscName(data, sortHelper);
				      break;
						case "asc-date":
				      that.sortAscDate(data, sortHelper);
				      break;
						case "dsc-date":
				      that.sortDscDate(data, sortHelper);
				      break;
				  }
				});

			});
		};

		Images.prototype.loadData = function (data) {
			var html = '',
			img = [],
			imgCounter = data.length;

			$.each(data, function(i,c){
				html += '<a class="example-image-link" href="images/original/' + c.name + '" data-lightbox="example-2" data-title="Optional caption.">';
				html += '<img class="example-image" src="images/thumbs/' + c.name +'" alt="Two men in bicycle jerseys sitting outside at table having coffee">';
				html += '</a>';

				img[i] = new Image();
				img[i].onload = function(){
					imgCounter--;
					console.log(imgCounter);
					if (imgCounter === 0) {
						$('#gallery .gallery-images').append(html);
						$('.img-loader').hide();
					}
				}
				img[i].src = 'images/thumbs/' + c.name;
				});

		};

		Images.prototype.sortAscName = function (data, sortHelper) {
			console.log('sortAscName');
			sortHelper('title', 1);
		};

		Images.prototype.sortDscName = function (data, sortHelper) {
			console.log('sortDscName');
			sortHelper('title', -1);
		};

		Images.prototype.sortAscDate = function (data, sortHelper) {
			console.log('sortAscDate');
			sortHelper('date', 1);
		};

		Images.prototype.sortDscDate = function (data, sortHelper) {
			console.log('sortDscDate');
			sortHelper('date', -1);
		};

	var loadImages = new Images("data-img.json");
	loadImages.doAjax();

}) ( jQuery );
