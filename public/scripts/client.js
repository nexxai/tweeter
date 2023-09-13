/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();

    if ($("#tweet-text").val().length > 140) {
      alert("Tweet too long.  Maximum: 140 characters");
      return;
    } else if ($("#tweet-text").val().length === 0) {
      alert("Tweets must contain at least 1 character");
      return;
    }

    $formData = $("#new-tweet-form").serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $formData,
      success: () => {
        console.log("Tweet stored on server");
      },
    });
  });

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (data) => {
        renderTweets(data);
      },
    });
  };

  const renderTweets = function (tweets) {
    $container = $("#tweets");

    for (let tweet of tweets) {
      $container.append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function (tweet) {
    return `
      <article class="tweet">
        <header class="tweet">
          <div class="avatar">
            <img src="${tweet.user.avatars}" />
            <div class="realName">${tweet.user.name}</div>
          </div>
          <div class="username">
            ${tweet.user.handle}
          </div>
        </header>
        <p class="tweet">
          ${tweet.content.text}
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
