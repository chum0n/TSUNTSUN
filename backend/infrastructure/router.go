package infrastructure

import (
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/yot-sailing/TSUNTSUN/interfaces/controllers"
)

func Init() {
	e := echo.New()
	userController := controllers.NewUserController(NewSqlHandler())
	tsundokuController := controllers.NewTsundokuController(NewSqlHandler())

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
		userController.Delete(id)
		return c.String(http.StatusOK, "deleted")
	})

	// 積読全取得
	e.GET("api/users/:userID/tsundokus", func(c echo.Context) error {
		userID := c.Param("userID")
		tsundokus := tsundokuController.GetTsundoku(userID)
		c.Bind(&tsundokus)
		return c.JSON(http.StatusOK, tsundokus)
	})

	// start server
	e.Logger.Fatal(e.Start(":1323"))
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
