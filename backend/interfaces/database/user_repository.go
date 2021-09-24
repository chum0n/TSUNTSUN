package database

import (
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

func (db *UserRepository) Prepare(userID string, userName string) domain.User {
	user := domain.User{}
	newUser := domain.User{
		Name:   userName,
		LINEID: userID,
	}
	affect := db.FindOrCreateUser(&user, &newUser)
	if affect == 0 {
		return newUser
	}
	return user
}

func (db *UserRepository) Delete(id int) {
	user := []domain.User{}
	db.DeleteById(&user, id)
}
