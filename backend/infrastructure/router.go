package infrastructure

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
	"github.com/yot-sailing/TSUNTSUN/interfaces/controllers"
)

func Init() {
	e := echo.New()
	e.HideBanner = true
	e.HidePort = true
	userController := controllers.NewUserController(NewSqlHandler())

	// 接続テスト
	e.GET("/api/test", func(c echo.Context) error {
		fmt.Println("aa")
		return c.String(http.StatusOK, "This is test!")
	})

	e.GET("/api/users", func(c echo.Context) error {
		fmt.Println("aa")
		users := userController.GetUser()
		c.Bind(&users)
		return c.JSON(http.StatusOK, users)
	})

	e.POST("/api/users", func(c echo.Context) error {
		userController.Create(c)
		return c.String(http.StatusOK, "created")
	})

	e.DELETE("/api/users/:id", func(c echo.Context) error {
		id := c.Param("id")
		userController.Delete(id)
		return c.String(http.StatusOK, "deleted")
	})

	// start server
	e.Logger.Fatal(e.Start(":1323"))
}
