(function ($) {

function Images (src) {
		this.src = src;
		};

		Images.prototype.doAjax = function () {
			var that = this;
			//var html = '';
			$.getJSON(this.src, this.loadData).done(function (data) {

				//tutaj dodaj uchwyty sortujace
				$("#type").on('change', function(e){
					e.preventDefault();
				  var id = $(this).find("option:selected").attr("id");

				  switch (id){
				    case "asc-name":
				      that.sortData(data, 'title', 1);
				      break;
						case "dsc-name":
				      that.sortData(data, 'title', -1);
				      break;
						case "asc-date":
				      that.sortData(data, 'date', 1);
				      break;
						case "dsc-date":
				      that.sortData(data, 'date', -1);
				      break;
				  }
				});

			});
		};

		Images.prototype.loadData = function (data) {
			var html = '',
			img = [],
			imgCounter = data.length;

			data.sort(function(a, b){
				if(a['date'] < b['date']) return 1;
				if(a['date'] > b['date']) return -1;
				return 0;
			});

			$.each(data, function(i,c){
				html += '<a class="example-image-link" href="api/uploads/images/original/' + c.src + '" data-lightbox="example-2" data-title="Optional caption.">';
				html += '<img class="example-image" src="api/uploads/images/thumbs/' + c.src +'" alt="Two men in bicycle jerseys sitting outside at table having coffee">';
				html += '</a>';

				img[i] = new Image();
				img[i].onload = function(){
					imgCounter--;
						if (imgCounter === 0) {
						$('#gallery .gallery-images').append(html);
						$('.img-loader').hide();
					}
				}
				img[i].src = 'api/uploads/images/thumbs/' + c.src;
				});

		};

		Images.prototype.sortData = function (data, by, order) {

			//clear html from old stuff
			html = '';
			data.sort(function(a, b){
				if(a[by] < b[by]) return -1 * order;
				if(a[by] > b[by]) return 1 * order;
				return 0;
			});
			//create new html in loop
			$.each(data, function(i,c){
			html += '<a class="example-image-link" href="api/uploads/images/original/' + c.src + '" data-lightbox="example-2" data-title="Optional caption.">';
			html += '<img class="example-image" src="api/uploads/images/thumbs/' + c.src +'" alt="Two men in bicycle jerseys sitting outside at table having coffee">';
			html += '</a>';
		});

		//remove old content and add new one
		$('.gallery-images').find('a').remove().end();
		$('.gallery-images').append(html);
		$('a').hide();
		$('a').show();
		};



	var loadImages = new Images("http://localhost/formtest/api/login/gallery");
	loadImages.doAjax();

}) ( jQuery );
