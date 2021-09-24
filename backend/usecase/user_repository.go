package usecase

import (
	"github.com/yot-sailing/TSUNTSUN/domain"
)

type UserRepository interface {
	Store(domain.User)
	Select() []domain.User
	Prepare(userID string, userName string) domain.User
	Delete(id int)
}
