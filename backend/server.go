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
	db, err := gorm.Open("postgres", "host=localhost port=5432 user=daisuke dbname=ex4 password=daisuke sslmode=disable")
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
