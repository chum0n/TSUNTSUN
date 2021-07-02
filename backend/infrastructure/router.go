package infrastructure

import (
	"net/http"

	"github.com/labstack/echo"
)

func Init() {
	e := echo.New()

	e.GET("/api/test", func(c echo.Context) error {
		return c.String(http.StatusOK, "This is test!")
	})

	// start server
	e.Logger.Fatal(e.Start(":1323"))
}
