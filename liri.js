require("dotenv").config();
var Twitter 	= require('twitter');
var Spotify 	= require('node-spotify-api');
var request 	= require("request");
var fs 			= require('fs');
var keys 		= require('./keys.js')
var command 	= process.argv[2];
var songName	= process.argv[3];

//////////////////////Keys////////////////////////////////
var spotify		= new Spotify(keys.spotify);
var client 		= new Twitter(keys.twitter);

/////////////////////////////////////////////////////////
////////////////////my-tweets////////////////////////////
/////////////////////////////////////////////////////////

if (command == 'my-tweets') {
	client.get('statuses/home_timeline', function(error, tweets, response) {
		
		if(error) throw error;
		
		fs.appendFile("log.txt", command +' ', function(err) {
		    // If there was an error, we log it and return immediately
		    if (err) {
		      return console.log(err);
		    }

		});

		for(var i = 0; i < tweets.length; i++) {

			console.log(tweets[i].created_at + ': ' + tweets[i].text);
			var text = JSON.stringify(tweets[i].text);
			
			fs.appendFile("log.txt", text+' ', function(err) {
		    // If there was an error, we log it and return immediately
			    if (err) {
			      return console.log(err);
			    }

			});
		}	

		fs.appendFile("log.txt", '\n');
	});
} 

/////////////////////////////////////////////////////////
////////////////////Spotify//////////////////////////////
/////////////////////////////////////////////////////////

else if(command == 'spotify-this-song') {
	if(songName != null) {

		spotify.search({ type: 'track', query: songName })
	  	.then(function(response) {
	  		
	  		var artists = response.tracks.items[0].album.artists;
			
			// loops over all the artists  	
	  		for(var i = 0; i < artists.length; i++) {
	  		
	  			console.log(response.tracks.items[0].album.artists[i].name);	
	  		
	  		}

	  		// song name
			console.log(response.tracks.items[0].name)
			console.log('===============');

	  		// album name
			console.log(response.tracks.items[0].album.name);
			console.log('===============');

			// preview link
			console.log(response.tracks.items[0].album.external_urls.spotify);
			console.log('===============');

	  		}).catch(function(err) {
	    	console.log(err);
		});
  	} else if (songName == null || songName == '') {
  		spotify.search({ type: 'track', query: 'The Sign', limit: 50 })
	  	.then(function(response) {
	  		
	  		var x = '';

			for(var i = 0; i <response.tracks.items.length; i++ ) {
				
				for(var j = 0; j < response.tracks.items[i].artists.length; j++ ) {
					
					if ((response.tracks.items[i].artists[j].name == 'Ace of Base') && (response.tracks.items[i].name == 'The Sign')) {
						x = i;
					}
				}
			}	

	  		var artists = response.tracks.items[x].album.artists;
			
			// loops over all the artists  	
	  		for(var i = 0; i < artists.length; i++) {
	  		
	  			console.log('artists ' + response.tracks.items[x].album.artists[i].name);	
	  		
	  		}

	  		// song name
			console.log(response.tracks.items[x].name)
			console.log('===============');

	  		// album name
			console.log(response.tracks.items[x].album.name);
			console.log('===============');
			
			// preview link
			console.log(response.tracks.items[x].album.external_urls.spotify);
			console.log('===============');

	  		}).catch(function(err) {
	    	console.log(err);
		});
  	}
}
/////////////////////////////////////////////////////////
////////////////////Movie////////////////////////////////
/////////////////////////////////////////////////////////
else if(command == 'movie-this') {
	
	var movieName = process.argv[3];

	if (movieName != null) {
		request("http://www.omdbapi.com/?t="+movieName+"=&plot=short&apikey=trilogy", function(error, response, body) {

			  // If the request is successful (i.e. if the response status code is 200)
			if (!error && response.statusCode === 200) {
				
				var json = JSON.parse(body);
			    
			    console.log('===============');
			    console.log(json.Title);
			    console.log('===============');
			    console.log(json.Released);
			    console.log('===============');
			    console.log(json.imdbRating);
			    console.log('===============');
			    console.log(json.Ratings[2].Source);
			    console.log('===============');
			    console.log(json.Country);
			    console.log('===============');
			    console.log(json.Language);
			    console.log('===============');
			    console.log(json.Plot);
			    console.log('===============');
			    console.log(json.Actors);
			    console.log('===============');
			    
			} 
		});
	} else if(movieName == null) {
		console.log(`If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>`)
		console.log("It's on Netflix!");
	}
	
} 
/////////////////////////////////////////////////////////
//////////////////do-what-it-says////////////////////////
/////////////////////////////////////////////////////////
else if(command == 'do-what-it-says') {

	fs.readFile('random.txt', "utf8", function(error, data) {
		 // If the code experiences any errors it will log the error to the console.
  		if (error) {
    		return console.log(error);
  		}

  		console.log(data);

		spotify.search({ type: 'track', query: data })
	  	.then(function(response) {
	  		
	  		var artists = response.tracks.items[0].album.artists;
			
			// loops over all the artists  	
	  		for(var i = 0; i < artists.length; i++) {
	  		
	  			console.log(response.tracks.items[0].album.artists[i].name);	
	  		
	  		}

	  		// song name
			console.log(response.tracks.items[0].name)

	  		// album name
			console.log(response.tracks.items[0].album.name);

			// preview link
			console.log(response.tracks.items[0].album.external_urls.spotify);

	  		}).catch(function(err) {

	    		console.log(err);

		});
	});

}




