package database

type SqlHandler interface {
	Create(object interface{})
	FindAll(object interface{})
	DeleteById(object interface{}, id string)
	FindAllUserItem(object interface{}, userID string)
}
