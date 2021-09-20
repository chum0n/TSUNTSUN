package middleware

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/yot-sailing/TSUNTSUN/body"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/interfaces/controllers"
)

type VerifyAccessTokenResponseBody struct {
	scope      string
	client_id  string
	expired_in int
}

func AuthUser(accessToken string) (user domain.User, err error) {
	var lineUser body.LINEUser
	// アクセストークンの有効性のチェック
	accessTokenStatus, accessTokenResponse := verifyAccessToken(accessToken)
	if accessTokenStatus != 200 {
		fmt.Println("アクセストークンが有効でありません。")
		fmt.Println("status : " + strconv.Itoa(accessTokenStatus))
		fmt.Println(accessTokenResponse)
		return user, err
	}

	// アクセストークンからLINEのプロフィール情報を取得
	lineUser, err = getLINEProfile(accessToken)
	if err != nil {
		return user, err
	}

	// LINEのユーザー情報からTSUNTSUNのユーザー情報に変換
	var userController *controllers.UserController
	user = userController.PrepareUser(lineUser)
	return user, nil
}

func verifyAccessToken(access_token string) (int, VerifyAccessTokenResponseBody) {
	endpoint := "https://api.line.me/oauth2/v2.1/verify?access_token=" + access_token[7:]
	resp, err := http.Get(endpoint)
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()
	byteArray, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}
	var verifyAccessTokenResponseBody VerifyAccessTokenResponseBody
	err = json.Unmarshal(byteArray, &verifyAccessTokenResponseBody)
	if err != nil {
		fmt.Println(err)
	}

	return resp.StatusCode, verifyAccessTokenResponseBody
}

func getLINEProfile(access_token string) (body.LINEUser, error) {
	endpoint := "https://api.line.me/v2/profile"
	var line_user_profile body.LINEUser

	req, _ := http.NewRequest("GET", endpoint, nil)
	req.Header.Set("Authorization", access_token)

	client := new(http.Client)
	resp, err := client.Do(req)
	if err != nil {
		return line_user_profile, err
	}
	defer resp.Body.Close()
	byteArray, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return line_user_profile, err
	}

	err = json.Unmarshal(byteArray, &line_user_profile)
	if err != nil {
		return line_user_profile, err
	}
	return line_user_profile, nil
}

// IDトークンでの認証はここ。後でやる。
func idToken() {

}

// idToken := c.FormValue("id_token")
// LINEのユーザー情報を取得
// verifyRequestBody := &body.VerifyRequestBody{ --ここから
// 	IDToken:  idToken,
// 	ClientID: os.Getenv("CHANNEL_ID"),
// }

// verifyJsonString, err := json.Marshal(verifyRequestBody)
// if err != nil {
// 	fmt.Println(err)
// }
// fmt.Println("router.goのverifyReqBody", verifyRequestBody)
// fmt.Println("router.goのverifyJSON", verifyJsonString) --ここまでいらなくない？？

// endpoint := "https://api.line.me/oauth2/v2.1/verify"
// req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(verifyJsonString))
// if err != nil {
// 	fmt.Println(err)
// }
// req.Header.Set("Content-Type", "application/json")

// client := new(http.Client)
// resp, err := client.Do(req)
// if err != nil {
// 	fmt.Println(err)
// }

// url_target := "https://api.line.me/oauth2/v2.1/verify"
// args := url.Values{}
// args.Add("id_token", idToken)
// args.Add("client_id", os.Getenv("CHANNEL_ID"))
// fmt.Println("id_token", idToken)
// fmt.Println("client_id", os.Getenv("CHANNEL_ID"))
// resp, err := http.PostForm(url_target, args)
// if err != nil {
// 	fmt.Println("Request error:", err)
// 	return err
// }
// defer resp.Body.Close()

// fmt.Println("router.goのresp", resp)
// byteArray, err := ioutil.ReadAll(resp.Body)
// if err != nil {
// 	fmt.Println(err)
// }
// var verifyResponseBody body.VerifyResponseBody
// err = json.Unmarshal(byteArray, &verifyResponseBody)
// if err != nil {
// 	fmt.Println(err)
// }
