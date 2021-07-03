package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TagRepository interface {
	Store(tag domain.Tag)
	Select(userID int) []domain.Tag
	Delete(id int)
}
