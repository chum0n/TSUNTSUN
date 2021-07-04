package database

import (
	"github.com/yot-sailing/TSUNTSUN/body"
	"github.com/yot-sailing/TSUNTSUN/domain"
)

type UserRepository struct {
	SqlHandler
}

func (db *UserRepository) Store(u domain.User) {
	db.Create(&u)
}

func (db *UserRepository) Select() []domain.User {
	users := []domain.User{}
	db.FindAll(&users)
	return users
}

func (db *UserRepository) Prepare(userLine body.VerifyResponseBody) domain.User {
	user := domain.User{}
	db.FindOrCreateUser(&user, userLine)
	return user
}

func (db *UserRepository) Delete(id int) {
	user := []domain.User{}
	db.DeleteById(&user, id)
}
