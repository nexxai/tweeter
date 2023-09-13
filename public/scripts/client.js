/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $();

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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
          <div class="timeAgo">${tweet.created_at}</div>
          <div class="shareLinks">
            <div class="shareLink"><i class="fa-solid fa-2xs fa-flag"></i></div>
            <div class="shareLink"><i class="fa-solid fa-2xs fa-retweet"></i></div>
            <div class="shareLink"><i class="fa-solid fa-2xs fa-heart"></i></div>
          </div>
        </footer>
      </article>`;
  };

  renderTweets(data);
});
