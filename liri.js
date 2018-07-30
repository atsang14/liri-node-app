var dotenv 		= require("dotenv").config();
var Twitter 	= require('twitter');
var keys    	= require('./keys.js');
var fs 			= require('fs');
var command 	= process.argv[2];
var request     = require('request');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

////////////////////my tweets//////////////////////////////
if (command == 'my-tweets') {
	client.get('statuses/home_timeline', function(error, tweets, response) {
		
		if(error) throw error;
	
		for(var i = 0; i < tweets.length; i++){
			console.log(tweets[i].created_at + ': ' + tweets[i].text);
		}
  		
	});
} 
















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






