package infrastructure

import (
	"github.com/jinzhu/gorm"
	"github.com/yot-sailing/TSUNTSUN/interfaces/database"
)

type SqlHandler struct {
	db *gorm.DB
}

func NewSqlHandler() database.SqlHandler {
	DBMS := "postgres"
	USER := "daisuke"
	db, err := gorm.Open(DBMS, "user="+USER+" dbname=TSUNTSUN password=daisuke sslmode=disable")
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
