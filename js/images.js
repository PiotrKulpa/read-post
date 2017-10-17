(function ($) {


function Images (src) {
		this.src = src;
		};

		Images.prototype.doAjax = function () {
			var that = this;
			return $.getJSON(this.src, this.loadData).done(function (data) {
				//tutaj dodaj uchwyty sortujace


				$("#type").change(function(){
				  var id = $(this).find("option:selected").attr("id");

				  switch (id){
				    case "asc-name":
				      that.sortAscName(data);
				      break;
						case "dsc-name":
				      that.sortDscName(data);
				      break;
						case "asc-date":
				      that.sortAscDate(data);
				      break;
						case "dsc-date":
				      that.sortDscDate(data);
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
						$('#gallery').append(html);
						$('.img-loader').hide();
					}
				}
				img[i].src = 'images/thumbs/' + c.name;
				});

		};

		Images.prototype.sortAscName = function (data) {
			console.log('sortAscName');
		};

		Images.prototype.sortDscName = function (data) {
			console.log('sortDscName');
		};

		Images.prototype.sortAscDate = function (data) {
			console.log('sortAscDate');
		};

		Images.prototype.sortDscDate = function (data) {
			console.log('sortDscDate');
		};

	var loadImages = new Images("data-img.json");
	loadImages.doAjax();


	// wazne! referencje wykonujemy wewnatrz medoty ktora potrzebuje dostepu do zmiennej prywatnej


}) ( jQuery );
