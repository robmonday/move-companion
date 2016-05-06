
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    
    var fullAddress = streetStr + ' in ' + cityStr;

    $greeting.text('So you want to live at '+fullAddress+'?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+streetStr.split(" ").join("+")+','+cityStr;
    $body.append('<img class="bgimg" src='+streetviewUrl+'>');

    //NYT API

	$('#nytimes-header').text( "New York Times Articles for "+(cityStr) );

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({  
	  'api-key': "e99c2223728e47de96cf38e642e3c7c7",
	  'q': cityStr,
	  'fq': "type_of_material:News",
	  'sort': "newest",
	  'page': 0,
	  'callback': "svc_search_v2_articlesearch"
	});
	//console.log(url);
    $.getJSON(url, function(data){
    	// console.log(data.response.docs[0].headline.main);
    	// console.log(data.response.docs[0].snippet);
    	// console.log(data.response.docs[0].lead_paragraph);
    	// console.log(data.response.docs[0].web_url);

		var items = [];
		$.each( data.response.docs, function( key, val ) {
			items.push( "<li id='" 
				+ key + "' class='article'><a href="
				+ val.web_url +" target='_blank'>" 
				+ val.headline.main + "</a><p>"
				+ val.snippet +"</p></li>" 
				);
		});
		 
		$( "<ul/>", {"class": "my-new-list", html: items.join( "" )}
			).appendTo( "#nytimes-articles" );

    });

    return false;
};

$('#form-container').submit(loadData);
