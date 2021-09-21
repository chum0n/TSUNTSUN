package middleware

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
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

func AuthUser(accessToken string, userContoroller *controllers.UserController) (user domain.User, err error) {
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
	// var userController controllers.UserController
	user = userContoroller.PrepareUser(lineUser)
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

// IDトークンでの認証
// 現在は使ってない
func verifyIDToken(id_token string) body.VerifyResponseBody {
	// 受け取るもの
	// idToken := c.FormValue("id_token")
	url_target := "https://api.line.me/oauth2/v2.1/verify"
	args := url.Values{}
	args.Add("id_token", id_token)
	args.Add("client_id", os.Getenv("CHANNEL_ID"))
	resp, err := http.PostForm(url_target, args)
	if err != nil {
		fmt.Println("Request error:", err)
		fmt.Println(err)
	}
	defer resp.Body.Close()

	byteArray, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}
	var verifyResponseBody body.VerifyResponseBody
	err = json.Unmarshal(byteArray, &verifyResponseBody)
	if err != nil {
		fmt.Println(err)
	}

	return verifyResponseBody
}
