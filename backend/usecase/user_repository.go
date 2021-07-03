package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type UserRepository interface {
	Store(domain.User)
	Select() []domain.User
	Delete(id int)
}
