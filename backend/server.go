package main

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/infrastructure"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {
	dbinit()
	infrastructure.Init()
}

func dbinit() {
	// DBMS := "postgres"
	// USER := "daisuke"
	// PASS := "daisuke"
	// HOST := "localhost"
	// PORT := "5432"
	// DBNAME := "TSUNTSUN"
	// db, err := gorm.Open(DBMS, DBMS+"://"+USER+":"+PASS+"@"+HOST+":"+PORT+"/"+DBNAME)
	// db, err := gorm.Open("postgres", "host=localhost port=5432 user=daisuke dbname=ex4 password=daisuke sslmode=disable")
	db, err := gorm.Open("postgres", "user=daisuke dbname=TSUNTSUN password=daisuke sslmode=disable")

	if err != nil {
		panic(err.Error())
	}
	db.LogMode(true)
	db.AutoMigrate(domain.User{})
	db.AutoMigrate(domain.Tsundoku{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	db.AutoMigrate(domain.Tag{})
	db.AutoMigrate(domain.TsundokuTag{}).AddForeignKey("tsundoku_id", "tsundokus(id)", "CASCADE", "CASCADE").AddForeignKey("tag_id", "tags(id)", "CASCADE", "CASCADE").AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	fmt.Println("db connected: ", &db)
}

// package main

// import (
// 	"fmt"
// 	"net/http"
// 	"os"

// 	"github.com/labstack/echo"
// 	"github.com/labstack/echo/middleware"
// 	"github.com/yot-sailing/TSUNTSUN/sql2"
// )

// func main() {
// 	// Echoのインスタンス
// 	e := echo.New()

// 	// Middleware
// 	logger := middleware.LoggerWithConfig(middleware.LoggerConfig{
// 		Format: logFormat(),
// 		Output: os.Stdout,
// 	})
// 	e.Use(logger)
// 	e.Use(middleware.Recover())

// 	// ルーティング
// 	e.GET("/sql/record/:id", sql2.GetPost()) //プレースホルダでidをもらってくる
// 	e.GET("/sql/table", sql2.GetPosts())
// 	// e.GET("/api/users", func(c echo.Context) error {
// 	// 	fmt.Println("aa")
// 	// 	users := userController.GetUser()
// 	// 	c.Bind(&users)
// 	// 	return c.JSON(http.StatusOK, users)
// 	// })

// 	// サーバー起動
// 	e.Logger.Fatal(e.Start(":1323"))
// }
