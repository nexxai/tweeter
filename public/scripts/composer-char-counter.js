$(document).ready(function () {
  $(".new-tweet").on("keyup", function (event) {
    let element = $(this).find("#tweet-text");

    // How many characters have been entered?
    let charCount = element.val().length;

    // Remaining is just the max length - total entered
    let charsRemaining = 140 - charCount;

    // Find and update the counter
    let counterEl = $(this).find(".counter");
    counterEl.text(charsRemaining);

    // Set the color of the counter based on how many are remaining
    if (charsRemaining < 0) {
      counterEl.css("color", "red");
    } else {
      counterEl.css("color", "#545149");
    }
  });
});
