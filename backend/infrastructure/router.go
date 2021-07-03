package infrastructure

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/yot-sailing/TSUNTSUN/interfaces/controllers"
)

func Init() {
	e := echo.New()
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
		fmt.Println("aa")
		return c.String(http.StatusOK, "This is test!")
	})

	// ユーザー全取得
	e.GET("/api/users", func(c echo.Context) error {
		fmt.Println("aa")
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
	e.GET("api/users/:userID/tsundokus", func(c echo.Context) error {
		str_userID := c.Param("userID")
		// intに変換
		userID, err := strconv.Atoi(str_userID)
		if err != nil {
			fmt.Println(err)
		}
		tsundokus := tsundokuController.GetTsundoku(userID)
		c.Bind(&tsundokus)
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
		// str_userID := c.Param("userID")
		// // intに変換
		// userID, err := strconv.Atoi(str_userID)
		// if err != nil {
		// 	fmt.Println(err)
		// }
		// tagController.CreateTag(c, userID)
		return c.JSON(http.StatusOK, "created tag")
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
		tagController.CreateTag(c, userID, tsundokuID)
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
