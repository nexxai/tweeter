/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const displayError = function (container, error) {
    // Display an error in a normally-hidden <error> container
    $(container).addClass("show-error").text(error);
  };

  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();

    // Clear out any existing error messages
    $("#tweet-error").empty().removeClass("show-error");

    // Validate that the tweet has at least one and no more than 140 chars
    if ($("#tweet-text").val().length > 140) {
      // Display an error
      displayError("#tweet-error", "Tweet too long.  Maximum: 140 characters");
      return;
    } else if ($("#tweet-text").val().length === 0) {
      // Display an error
      displayError("#tweet-error", "Tweets must contain at least 1 character");
      return;
    }

    // Prepare the data to post back to the server
    $formData = $("#new-tweet-form").serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $formData,
      success: () => {
        // If the post was successful, refresh the tweets...
        loadTweets();
        // ...and clear the entry field
        $("#tweet-text").val("");
      },
    });
  });

  const loadTweets = function () {
    // Reach out to the tweet API and get all the tweets
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (data) => {
        // Display the returned tweets
        renderTweets(data);
      },
    });
  };

  const renderTweets = function (tweets) {
    // Make sure all the tweets are in reverse chronological order
    tweets.sort((a, b) => {
      return b.created_at - a.created_at;
    });

    $container = $("#tweets");

    // Clear the container first
    $container.empty();

    for (let tweet of tweets) {
      // ...and add each successive tweet to it
      $container.append(createTweetElement(tweet));
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    // Make sure we're not allowing any XSS
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    // Build up the concept of a single tweet element
    return `
      <article class="tweet">
        <header class="tweet">
          <div class="avatar">
            <img src="${escape(tweet.user.avatars)}" />
            <div class="realName">${escape(tweet.user.name)}</div>
          </div>
          <div class="username">
            ${escape(tweet.user.handle)}
          </div>
        </header>
        <p class="tweet">
          ${escape(tweet.content.text)}
        </p>
        <footer class="tweet">
          <div class="timeago timeAgo">${timeago.format(tweet.created_at)}</div>
          <div class="shareLinks">
            <div class="shareLink"><i class="fa-solid fa-2xs fa-flag"></i></div>
            <div class="shareLink"><i class="fa-solid fa-2xs fa-retweet"></i></div>
            <div class="shareLink"><i class="fa-solid fa-2xs fa-heart"></i></div>
          </div>
        </footer>
      </article>`;
  };

  loadTweets();
});
