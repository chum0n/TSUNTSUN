$(document).ready(function () {
  var url = "";
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      $("input#title").val(tabs[0].title);
      url = tabs[0].url;
    }
  );

  $("button.add").on("click", () => {
    const newTag = $("input#new-tag").val();
    if (newTag !== "") {
      $(".tag-area").append('<div class="tag">' + newTag + "</div>");
      $("input#new-tag").val("");
    }
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      console.log("need to line login")
      
    } else {
      const data = {URL:url, Title:$("input#title").val(), Tags:$("tags").val()};
      const param  = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer "+accessToken,
        },
      
        // リクエストボディ
        body: JSON.stringify(data)
      };
      
      // paramを付ける以外はGETと同じ
      fetch("https://tsuntsun-api.herokuapp.com/api/tsunokus", param)
        .then((res)=>{
          return( res.json() );
        }).catch((err)=>{
          console.log(err)
        });
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
