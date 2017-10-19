//(function ($) {


	function Cookies () {};
	//metoda do ustawiania ciasteczek
	Cookies.prototype.setCookie = function (name, val, days) {
		if (days) {
        var data = new Date();
        data.setTime(data.getTime() + (days * 24*60*60*1000));
        var expires = "; expires="+data.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + val + expires + "; path=/";
	};
	//metoda so sprawdzania czy sa ustawione ciasteczka
	Cookies.prototype.showCookie = function (name) {
		if (document.cookie!="") { //jeżeli document.cookie w ogóle istnieje
        var cookies=document.cookie.split("; ");  //tworzymy z niego tablicę ciastek
        for (var i=0; i<cookies.length; i++) { //i robimy po niej pętlę
            var cookieName=cookies[i].split("=")[0]; //nazwa ciastka
            var cookieVal=cookies[i].split("=")[1]; //wartość ciastka
            if (cookieName===name) {
                return decodeURI(cookieVal) //jeżeli znaleźliśmy ciastko o danej nazwie, wtedy zwracamy jego wartość
            }
        }
    }
	};




var cookies = new Cookies();
//check if cookie exist
if (cookies.showCookie('visited')) {
	$('.cookies').hide();
} else {
	console.log('nie istnieje');
}
//if there is no cookie then set cookie
	$('.cookies-btn').on('click', function () {
		$('.cookies').hide();
		cookies.setCookie('visited', 'yes', 356);
	});

//}) ( jQuery );
