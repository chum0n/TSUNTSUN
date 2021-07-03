package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuRepository interface {
	Store(tsundoku domain.Tsundoku)
	Select(userID int) []domain.TsundokuTag
	Delete(id int)
}
