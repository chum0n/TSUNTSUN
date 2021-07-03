$(document).ready(function () {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      $("input#title").val(tabs[0].title);
    }
  );

  $("button.add").on("click", () => {
    const newTag = $("input#new-tag").val();
    if (newTag !== "") {
      $(".tag-area").append('<div class="tag">' + newTag + "</div>");
      $("input#new-tag").val("");
    }
  });

  $(".old-tag").on("click", function () {
    const newTag = $(this).val();
    $(".tag-area").append('<div class="tag">' + newTag + "</div>");
  });

  $("button.save").on("click", () => {
    $(".add-view").hide();
    $(".done-view").show();
  });
});
