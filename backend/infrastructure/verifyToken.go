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

func VerifyAccessToken(access_token string) (int, VerifyAccessTokenResponseBody) {
	endpoint := "https://api.line.me/oauth2/v2.1/verify?access_token=" + access_token
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
