/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {

  // loops through tweets
  for (const i of tweets) {
    const new_tweet = createTweetElement(i);
    // console.log("thisi is the new_tweet element:", new_tweet);
    //change it in here


    $(".tweetcontainer").prepend(new_tweet);
    // $(".tweetcontainer").prepend(document.createTextNode(new_tweet).innerHTML);
    // $('tweetcontainter').prepend('<div/>'.text(new_tweet))  
  }

  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}


//this is to remove the cross scripting attacks
function stripScripts(s) {
  var div = document.createElement('div');
  div.innerHTML = s;
  var scripts = div.getElementsByTagName('script');
  var i = scripts.length;
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i]);
  }
  return div.innerHTML;
}

const createTweetElement = function (tweet) {

  const $tweet = $(`
    <article>
          <div class="tweetcontainer_header">
            <div class="user_info">
              <img class="avatar" src="${tweet.user.avatars}"></span>
              <span class="name">${tweet.user.name}</span>
            </div>

            <span class="handle">${tweet.user.handle}</span>
          </div>
          <div class="tweeted_msg">

            <p class="msg">${stripScripts(tweet.content.text)}</p>

          </div>
          <footer>
          ${timeago.format(tweet.created_at)}
            <span class="socials">
              <i class="fas fa-heart"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-flag"></i>
            </span>

          </footer>
    </article>
  `);

  return $tweet;
}


const loadTweets = () => {
  $.ajax("/tweets", { method: 'GET', dataType: "json" })
    .then((all_the_tweets) => {
      // console.log("data received: ", all_the_tweets);
      // all_the_tweets= all_the_tweets.text();
      renderTweets(all_the_tweets);

    })
}



$(document).ready(function () {

  $.ajax("/tweets", { method: 'GET' })
    .then(function (submitted_tweet) {
      // console.log('Success: ', submitted_tweet);
    });

  loadTweets();
  // $("#errorMsg").html("");

  $(".text_area").submit((event) => {
    event.preventDefault();
    const textArea = $("#tweet-text");

    if (textArea.val().length > 140) {
      $('#errorMsg').text("");
      $('#errorMsg').show();
      $("#errorMsg").append("Nahh you wrote too much, cut the tweet to less that 140 chars");
      setTimeout(()=> {
        $("#errorMsg").fadeOut("fast",function(){
        })}, 3000);

      //instead of sliding down, use a create element and append it to the unique ID tag
      // message is over 140 characters, cannot submit???
    }

    else if (textArea.val().length === 0) {
      $('#errorMsg').text("");
      $('#errorMsg').show();
      $("#errorMsg").append("This tweet is empty, therefore cannot submit");
      //alert("Please enter something");
      setTimeout(()=> {
        $("#errorMsg").fadeOut("fast",function(){
        });
      }, 3000);
    }

    else {

      $("#errorMsg").text("");
      $.ajax("/tweets", { method: 'POST', data: $(".text_area").serialize() })
        .then(function (submitted_tweet) {
          console.log('Success: ', submitted_tweet);
          
          document.getElementById("tweet-text").value = "";
          document.getElementById("counter").value = "140"
          loadTweets();
        });

    }
    return false;
  })



});


