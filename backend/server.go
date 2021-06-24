package main

import (
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo"
)

func main() {
	e := echo.New()

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	e.GET("/", handler)
	e.Start(":"+port)
}

func handler(c echo.Context) error{
	return c.JSON(http.StatusOK,  "Hello, world!")
}
