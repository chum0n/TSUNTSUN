package main

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/infrastructure"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {
	dbinit()
	infrastructure.Init()
}

func dbinit() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("envファイルが見当たりません")
		panic(err.Error())
	}

	DBMS := os.Getenv("SQL_DBMS")

	db, err := gorm.Open(DBMS, os.Getenv("DATABASE_URL"))
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
