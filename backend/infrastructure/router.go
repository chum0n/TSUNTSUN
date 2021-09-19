package infrastructure

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/yot-sailing/TSUNTSUN/body"
	"github.com/yot-sailing/TSUNTSUN/interfaces/controllers"
	authMiddleware "github.com/yot-sailing/TSUNTSUN/middleware"
)

func Init() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	userController := controllers.NewUserController(NewSqlHandler())
	tsundokuController := controllers.NewTsundokuController(NewSqlHandler())
	tagController := controllers.NewTagController(NewSqlHandler())
	tsundokuTagController := controllers.NewTsundokuTagController(NewSqlHandler())

	// Middleware
	logger := middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: logFormat(),
		Output: os.Stdout,
	})
	e.Use(logger)
	e.Use(middleware.Recover())

	// 接続テスト
	e.GET("/api/test", func(c echo.Context) error {
		return c.String(http.StatusOK, "This is test!")
	})

	// LINE
	// ログイン
	e.POST("/api/line_login", func(c echo.Context) error {
		user, err := authMiddleware.AuthUser(c.FormValue("access_token"))
		if err != nil {
			return err
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

		// fmt.Println("router.goのuserLine", verifyResponseBody)
		// 該当のLINEユーザーIDを持つユーザーが存在すればその情報を取得。存在しなければ作成したのちその情報を取得。
		userExcludeLine := body.UesrExcludeLine{
			ID:        user.ID,
			Name:      user.Name,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		}

		return c.JSON(http.StatusOK, userExcludeLine)
	})

	// ログアウト
	e.POST("line_logout", func(c echo.Context) error {
		accessToken := c.FormValue("access_token")

		revokeRequestBody := &body.RevokeRequestBody{
			ClientID:      os.Getenv("CHANNEL_ID"),
			ClientSercret: os.Getenv("CHANNEL_SECRET"),
			AccessToken:   accessToken,
		}

		revokeJsonString, err := json.Marshal(revokeRequestBody)
		if err != nil {
			fmt.Println(err)
		}

		endpoint := "https://api.line.me/oauth2/v2.1/revoke"
		req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(revokeJsonString))
		if err != nil {
			fmt.Println(err)
		}
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

		client := new(http.Client)
		resp, err := client.Do(req)
		if err != nil {
			fmt.Println(err)
		}
		defer resp.Body.Close()

		// // 成功していたら空
		// byteArray, err := ioutil.ReadAll(resp.Body)
		// if err != nil {
		// 	fmt.Println(err)
		// }

		return c.String(resp.StatusCode, "logout")
	})

	// ユーザー全取得
	e.GET("/api/users", func(c echo.Context) error {
		users := userController.GetUser()
		c.Bind(&users)
		return c.JSON(http.StatusOK, users)
	})

	// ユーザー作成
	e.POST("/api/users", func(c echo.Context) error {
		userController.Create(c)
		return c.String(http.StatusOK, "created")
	})

	// ユーザー削除
	e.DELETE("/api/users/:id", func(c echo.Context) error {
		id := c.Param("id")
		// intに変換
		userID, err := strconv.Atoi(id)
		if err != nil {
			fmt.Println(err)
		}
		userController.Delete(userID)
		return c.String(http.StatusOK, "deleted")
	})

	// 積読全取得
	e.GET("api/tsundokus", func(c echo.Context) error {
		user, err := authMiddleware.AuthUser(c.Request().Header.Get("Authorization"))
		if err != nil {
			return err
		}

		tsundokus := tsundokuController.GetTsundoku(user.ID)
		c.Bind(&tsundokus)
		for i, tsundoku := range tsundokus {
			tsundokuTags := tsundokuTagController.GetTsundokuTagsByTsundokuIDandUserID(tsundoku.ID, user.ID)
			var tagIDs []int
			for _, tsundokuTag := range tsundokuTags {
				tagIDs = append(tagIDs, tsundokuTag.TagID)
			}
			tsundokus[i].Tags = tagController.GetTags(tagIDs)
		}
		return c.JSON(http.StatusOK, tsundokus)
	})

	// 積読追加
	e.POST("api/users/:userID/tsundokus", func(c echo.Context) error {
		str_userID := c.Param("userID")
		// intに変換
		userID, err := strconv.Atoi(str_userID)
		if err != nil {
			fmt.Println(err)
		}
		tsundokuController.CreateTsundoku(c, userID)
		return c.String(http.StatusOK, "created tsundoku")
	})

	// 積読削除
	e.DELETE("api/users/:userID/tsundokus/:tsundokuID", func(c echo.Context) error {
		// str_userID := c.Param("userID")
		str_tsundokuID := c.Param("tsundokuID")
		// intに変換
		// userID, err := strconv.Atoi(str_userID)
		// if err != nil {
		// 	fmt.Println(err)
		// }
		tsundokuID, err := strconv.Atoi(str_tsundokuID)
		if err != nil {
			fmt.Println(err)
		}
		tsundokuController.Delete(tsundokuID)
		return c.String(http.StatusOK, "deleted tsundoku")
	})

	// ある時間以内に読める本を取得
	e.GET("api/users/:userID/time/:time", func(c echo.Context) error {
		str_userID := c.Param("userID")
		// intに変換
		userID, err := strconv.Atoi(str_userID)
		if err != nil {
			fmt.Println(err)
		}
		total_min, _ := strconv.Atoi(c.Param("time"))
		tsundokus := tsundokuController.GetFreeTsundoku(c, userID, total_min)
		c.Bind(&tsundokus)
		return c.JSON(http.StatusOK, tsundokus)
	})

	// ユーザーが管理するタグ全取得
	e.GET("api/users/:userID/tags", func(c echo.Context) error {
		str_userID := c.Param("userID")
		// intに変換
		userID, err := strconv.Atoi(str_userID)
		if err != nil {
			fmt.Println(err)
		}

		// TsundokuTagテーブルのユーザーの管理下のものを取得
		tsundokuTags := tsundokuTagController.GetTsundokuTags(userID)
		var tagIDs []int
		for _, tsundokuTag := range tsundokuTags {
			tagIDs = append(tagIDs, tsundokuTag.TagID)
		}
		// tagIDからtagを取得
		tags := tagController.GetTags(tagIDs)
		// c.Bind(&tags)
		return c.JSON(http.StatusOK, tags)
	})

	// ユーザーが管理する積読についているタグ全取得
	e.GET("api/users/:userID/tsundokus/:tsundokuID/tags", func(c echo.Context) error {
		str_userID := c.Param("userID")
		str_tsundokuID := c.Param("tsundokuID")
		// intに変換
		userID, err := strconv.Atoi(str_userID)
		if err != nil {
			fmt.Println(err)
		}
		tsundokuID, err := strconv.Atoi(str_tsundokuID)
		if err != nil {
			fmt.Println(err)
		}

		tsundokuTags := tsundokuTagController.GetTsundokuTagsByTsundokuIDandUserID(tsundokuID, userID)
		var tagIDs []int
		for _, tsundokuTag := range tsundokuTags {
			tagIDs = append(tagIDs, tsundokuTag.TagID)
		}
		// tagIDからtagを取得
		tags := tagController.GetTags(tagIDs)

		return c.JSON(http.StatusOK, tags)
	})

	// タグ追加
	e.POST("api/users/:userID/tsundokus/:tsundokuID/tags", func(c echo.Context) error {
		str_userID := c.Param("userID")
		str_tsundokuID := c.Param("tsundokuID")
		// intに変換
		userID, err := strconv.Atoi(str_userID)
		if err != nil {
			fmt.Println(err)
		}
		tsundokuID, err := strconv.Atoi(str_tsundokuID)
		if err != nil {
			fmt.Println(err)
		}

		// Tagsテーブルにレコードを追加
		tagID := tagController.CreateTag(c, userID)
		// TsundokuTagsテーブルにレコードを追加
		tsundokuTagController.CreateTsundokuTag(c, tsundokuID, userID, tagID)

		return c.JSON(http.StatusOK, "created tag")
	})

	// タグ削除
	e.DELETE("api/users/:userID/tsundokus/:tsundokuID/tags/:tagID", func(c echo.Context) error {
		// str_userID := c.Param("userID")
		str_tagID := c.Param("tagID")
		// intに変換
		// userID, err := strconv.Atoi(str_userID)
		// if err != nil {
		// 	fmt.Println(err)
		// }
		tagID, err := strconv.Atoi(str_tagID)
		if err != nil {
			fmt.Println(err)
		}
		tagController.Delete(tagID)
		return c.String(http.StatusOK, "deleted tag")
	})

	port := os.Getenv("PORT")
	// start server
	e.Logger.Fatal(e.Start(":" + port))
}

func logFormat() string {
	// Refer to https://github.com/tkuchiki/alp
	var format string
	format += "time:${time_rfc3339}\t"
	format += "host:${remote_ip}\t"
	format += "forwardedfor:${header:x-forwarded-for}\t"
	format += "req:-\t"
	format += "status:${status}\t"
	format += "method:${method}\t"
	format += "uri:${uri}\t"
	format += "size:${bytes_out}\t"
	format += "referer:${referer}\t"
	format += "ua:${user_agent}\t"
	format += "reqtime_ns:${latency}\t"
	format += "cache:-\t"
	format += "runtime:-\t"
	format += "apptime:-\t"
	format += "vhost:${host}\t"
	format += "reqtime_human:${latency_human}\t"
	format += "x-request-id:${id}\t"
	format += "host:${host}\n"

	return format
}
