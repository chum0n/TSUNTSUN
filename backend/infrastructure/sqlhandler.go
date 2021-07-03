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
		panic(err.Error())
	}

	DBMS := os.Getenv("SQL_DBMS")
	connection := fmt.Sprintf("user=%s dbname=%s password=%s sslmode=disable", os.Getenv("SQL_USERNAME"), os.Getenv("SQL_DBNAME"), os.Getenv("SQL_PASSWORD"))
	db, err := gorm.Open(DBMS, connection)
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

func (handler *SqlHandler) FindAllUserItem(obj interface{}, userID string) {
	handler.db.Find(obj, "user_id=", userID)
}
