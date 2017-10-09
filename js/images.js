(function ($) {

	function Images (src) {
		this.src = src;
		};

		Images.prototype.doAjax = function () {
			$.getJSON(this.src, this.loadData)
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
						$('#gallery').append(html);
						$('.img-loader').hide();
					}
				}
				img[i].src = 'images/thumbs/' + c.name;
				});
		};

	var loadImages = new Images("data-img.json");
	loadImages.doAjax();

}) ( jQuery );
