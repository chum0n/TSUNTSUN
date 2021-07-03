package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuTagRepository interface {
	Store(tsundokuTag domain.TsundokuTag)
	Select(userID int) []domain.TsundokuTag
	Delete(id int)
}
