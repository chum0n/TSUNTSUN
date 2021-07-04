package database

import (
	"github.com/yot-sailing/TSUNTSUN/body"
	"github.com/yot-sailing/TSUNTSUN/domain"
)

type SqlHandler interface {
	Create(object interface{})
	FindAll(object interface{})
	DeleteById(object interface{}, id int)
	FindAllUserItem(object interface{}, userID int)
	FindObjByIDs(object interface{}, ids []int)
	FindObjByMultiIDs(object interface{}, firstID int, secondID int)
	FindOrCreateUser(user *domain.User, userLine body.VerifyResponseBody)
}
