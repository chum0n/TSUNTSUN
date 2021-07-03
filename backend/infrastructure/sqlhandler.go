package infrastructure

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/yot-sailing/TSUNTSUN/interfaces/database"
)

type SqlHandler struct {
	db *gorm.DB
}

func NewSqlHandler() database.SqlHandler {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("envファイルが見当たりません")
	}

	DBMS := os.Getenv("SQL_DBMS")
	db, err := gorm.Open(DBMS, os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err.Error())
	}
	db.LogMode(true)
	sqlHandler := new(SqlHandler)
	sqlHandler.db = db
	return sqlHandler
}

func (handler *SqlHandler) Create(obj interface{}) {
	handler.db.Create(obj)
}

func (handler *SqlHandler) FindAll(obj interface{}) {
	handler.db.Find(obj)
}

func (handler *SqlHandler) DeleteById(obj interface{}, id string) {
	handler.db.Delete(obj, id)
}
