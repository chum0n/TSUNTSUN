package usecase

import (
	"github.com/yot-sailing/TSUNTSUN/body"
	"github.com/yot-sailing/TSUNTSUN/domain"
)

type UserRepository interface {
	Store(domain.User)
	Select() []domain.User
	Prepare(body.VerifyResponseBody) domain.User
	Delete(id int)
}
