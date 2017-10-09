(function ($) {
	//dodaj mozliwosc zapamietywania
	function setCookie(name, val, days) {
    if (days) {
        var data = new Date();
        data.setTime(data.getTime() + (days * 24*60*60*1000));
        var expires = "; expires="+data.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + val + expires + "; path=/";
}

function showCookie(name) {
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
}

if (showCookie('visited')) {
	$('.cookies').hide();
} else {
	console.log('nie istnieje');
}

	$('.cookies-btn').on('click', function () {
		$('.cookies').hide();
		setCookie('visited', 'yes', 356);

	})
}) ( jQuery );
