'use strict'
let Data = {"Title": "", "URL": ""}
chrome.tabs.query({active: true, lastFocusedWindow:true}, tabs => {
  Data.URL = tabs[0].url;
  Data.Title = tabs[0].title
});

var added = false;
$(document).ready(function () {
  if (localStorage.getItem("access_token") != null) {
    $(".login_container").show();
  }
  $("input#title").val(Data.Title);
  $("input#url").val(Data.URL);

  localStorage.setItem("pre_url", Data.URL);

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

  $(".login_button").on("click", function () {
    const login_url = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656173858&redirect_uri=https://tsuntsun.herokuapp.com&state="+Math.random().toString(32).substring(2)+"&scope=profile%20openid&nonce="+Math.random().toString(32).substring(2)+"&bot_prompt=aggressive"

    chrome.tabs.query({'active': true}, function(tabs) {
      // chrome.tabs.update(tabs[0].id, {url: login_url } )
      chrome.tabs.create({url : login_url});
    });
  });

  $("button.save").on("click", () => {
    // $(".add-view").hide();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) { // not login 
      alert("ログインしてください");
      // const data = {"grant_type":'authorization_code', "code":"", "redirect_uil":Data.URL, "client_id": 1656173858, "client_secret":"e07ff58ce5052f7a5698319b3ec8493c"};
      // const param  = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json; charset=utf-8",
      //   },
      //   // リクエストボディ
      //   body: JSON.stringify(data)
      // };
      // fetch('https://api.line.me/oauth2/v2.1/token', param).then(token => {
      //   console.log(token);
      //   localStorage.setItem("access_token", token);
      // })
    } else { //loginしていたらTODOここの動作の確認
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
      
      fetch("https://tsuntsun-api.herokuapp.com/api/tsunokus", param)
        .then((res)=>{
          console.log( res.json() );
          $(".done-view").show();
          $(".add-view").hide();
        }).catch((err)=>{
          console.log(err);
          $(".done-view").show();
          $(".done").val("追加できなかった、、");
        });
    }
    
  });
});
