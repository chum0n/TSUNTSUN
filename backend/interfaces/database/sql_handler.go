package database

type SqlHandler interface {
	Create(object interface{})
	FindAll(object interface{})
	DeleteById(object interface{}, id int)
	FindAllUserItem(object interface{}, userID int)
	FindObjByIDs(object interface{}, ids []int)
	FindObjByMultiIDs(object interface{}, firstID int, secondID int)
}
