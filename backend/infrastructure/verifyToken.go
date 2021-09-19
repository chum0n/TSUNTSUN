package infrastructure

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type VerifyAccessTokenResponseBody struct {
	scope      string
	client_id  string
	expired_in int
}

type LINEUser struct {
	UserID        string
	DisplayName   string
	PictureUrl    string
	StatusMessage string
}

func VerifyAccessToken(access_token string) (int, VerifyAccessTokenResponseBody) {
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

func GetLINEProfile(access_token string) (string, string, error) {
	endpoint := "https://api.line.me/v2/profile"
	var line_user_profile LINEUser

	req, _ := http.NewRequest("GET", endpoint, nil)
	req.Header.Set("Authorization", access_token)

	client := new(http.Client)
	resp, err := client.Do(req)
	if err != nil {
		return "", "", err
	}
	defer resp.Body.Close()
	byteArray, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", "", err
	}

	err = json.Unmarshal(byteArray, &line_user_profile)
	if err != nil {
		return "", "", err
	}
	return line_user_profile.UserID, line_user_profile.DisplayName, nil
}
