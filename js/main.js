function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getTracks(country){

    var countrySelect = document.getElementById("countrySelect");
    var tracksDoc = document.getElementById("tracks");
    var $footer = $("footer") ;
    
    tracksDoc.innerHTML = "";
    
    var lastfm = "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country="+country+"&api_key=2d996a50d61fd83ca3cffb400d3a504b&format=json" ;
    
    countrySelect.disabled = true;
    
    $footer.removeClass("desplazado") ;
    
    ajax_get(lastfm, function(data) {

        for (var i=0; i < data.tracks.track.length; i++) {

            const track = data.tracks.track[i];

            var cancion = "<div class='title'>" + track.name + "</div>";
            var image = "<div class='image'>";
            var artista = "<div class='cantante'>" + track.artist.name + "</div>";
            var escuchas = "<div class='listeners'><p>Reproducciones: " + track.listeners + "</p></div>";

            if(track.image.lenght > 1) {
                image += "<a href='" + track.url + "' target='_blank' ><img src='" + track.image[3]["#text"] + "' alt='' id='" + track.artist.name + "'/></a>";
            } else {
                image += "<a href='" + track.url + "' target='_blank'><img src='" + track.image[3]["#text"] + "' alt='' id='" + track.artist.name + "'/></a>";
            }

            image += "</div>";

            var caja = "<div class='track'>" + image + artista + cancion + escuchas + '</div>' ;

            tracksDoc.innerHTML += caja; 
  
            $footer.addClass("desplazado") ;
        }
    
        document.getElementById("start").removeAttribute("id");
        countrySelect.disabled = false;
        
    });
}

function init(){

    var countrySelect = document.getElementById("countrySelect");
    var countryName = document.getElementById("countryName");
  
    if(countrySelect.value !== ""){
    
        countryName.innerHTML = countrySelect.value;
        getTracks(countrySelect.value);
        
    } else {
        
        countryName.innerHTML = "";
    }
}

init();

$(document).ready(function(){
 
	$('.subir').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
 
	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.subir').slideDown(300);
		} else {
			$('.subir').slideUp(300);
		}
	});
 
});



$(document).ready(function(){
	var altura = $('header').offset().top;
	
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura ){
			$('header').addClass('scrolled');
		} else {
			$('header').removeClass('scrolled');
		}
	});
 
});