var dotenv 		= require("dotenv").config();
var Twitter 	= require('twitter');
var Spotify 	= require('node-spotify-api');
var request 	= require("request");
var command 	= process.argv[2];
var songName	= process.argv[3];



var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var spotify = new Spotify({
  	id: process.env.SPOTIFY_ID,
  	secret: process.env.SPOTIFY_SECRET
});

/////////////////////////////////////////////////////////
////////////////////my-tweets////////////////////////////
/////////////////////////////////////////////////////////

if (command == 'my-tweets') {
	client.get('statuses/home_timeline', function(error, tweets, response) {
		
		if(error) throw error;
	
		for(var i = 0; i < tweets.length; i++){
			console.log(tweets[i].created_at + ': ' + tweets[i].text);
		}
  		
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

	  		// album name
			console.log(response.tracks.items[0].album.name);

			// preview link
			console.log(response.tracks.items[0].album.external_urls.spotify);

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
	
	var movieName	= process.argv[3];

	if (movieName != null) {
		request("http://www.omdbapi.com/?t="+movieName+"=&plot=short&apikey=trilogy", function(error, response, body) {

			  // If the request is successful (i.e. if the response status code is 200)
			if (!error && response.statusCode === 200) {

			    console.log('===============');
			    console.log(JSON.parse(body).Title);
			    console.log('===============');
			    console.log(JSON.parse(body).Released);
			    console.log('===============');
			    console.log(JSON.parse(body).imdbRating);
			    console.log('===============');
			    console.log(JSON.parse(body).Ratings[2].Source);
			    console.log('===============');
			    console.log(JSON.parse(body).Country);
			    console.log('===============');
			    console.log(JSON.parse(body).Language);
			    console.log('===============');
			    console.log(JSON.parse(body).Plot);
			    console.log('===============');
			    console.log(JSON.parse(body).Actors);
			    console.log('===============');
			    
			} 
		});
	} else if(movieName == null) {
		console.log(`If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>`)
		console.log("It's on Netflix!");
	}
	
}








//////////////////////////////testing//////////////////////////////

// var keys    	= require('./keys.js');
// var fs 			= require('fs');
// var request     = require('request');

// client.get('statuses/home_timeline', function(error, tweets, response) {
//   if(error) throw error;
//   console.log(tweets);  // The favorites.
//   console.log('===============');
//   console.log(response);  // Raw response object.
// });

// var processENV  = process.env;

// console.log('======Twitter========');

// console.log(processENV);



// console.log(processENV.TWITTER_CONSUMER_KEY);

// console.log('=======Keys========');

// console.log(dotenv);

// console.log('===============');

// console.log(keys.twitter);

// console.log('=======Client========');

// var spotify = new Spotify(keys.spotify);

// var client = new Twitter(keys.twitter);

// console.log(client);

// console.log('===============');

// client.get('favorites/list', function(error, tweets, response) {
//   if(error) throw error;
//   console.log(tweets);  // The favorites.

//   console.log('===============');

//   console.log(response);  // Raw response object.
// });


// client.post('statuses/update', {status: 'Hi'}, function(error, tweet, response) {
//   if (!error) {
//     console.log(tweet);
//   }
// });


// var request = require('request');

// request("https://api.twitter.com/1.1/statuses/home_timeline.json", function(error, response, body) {

//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log(response);
//     console.log(body);
//   }
// });






