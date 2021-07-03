package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuRepository interface {
	Store(domain.Tsundoku)
	Select(userID string) []domain.Tsundoku
	Delete(id string)
}
