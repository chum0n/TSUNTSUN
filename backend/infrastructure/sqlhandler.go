package infrastructure

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/yot-sailing/TSUNTSUN/body"
	"github.com/yot-sailing/TSUNTSUN/domain"
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

func (handler *SqlHandler) DeleteById(obj interface{}, id int) {
	handler.db.Delete(obj, id)
}

func (handler *SqlHandler) FindAllUserItem(obj interface{}, userID int) {
	handler.db.Find(obj, "user_id=?", userID)
}

func (handler *SqlHandler) FindObjByIDs(obj interface{}, ids []int) {
	handler.db.Find(obj, ids)
}

func (handler *SqlHandler) FindObjByMultiIDs(obj interface{}, tsundokuID int, userID int) {
	handler.db.Where("tsundoku_id=? AND user_id=?", tsundokuID, userID).Find(obj)
}

func (handler *SqlHandler) FindOrCreateUser(user *domain.User, newUser *domain.User, userLine body.VerifyResponseBody) int {
	lineUserID := userLine.Sub
	result := handler.db.Where("line_id = ?", lineUserID).First(&user)
	affect := result.RowsAffected
	if affect == 0 {
		newUser := domain.User{
			Name:   userLine.Name,
			LINEID: userLine.Sub,
		}
		handler.db.Create(&newUser)
	}
	return int(affect)
}
