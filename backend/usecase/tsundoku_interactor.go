package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuInteractor struct {
	TsundokuRepository TsundokuRepository
}

func (interactor *TsundokuInteractor) Add(tusndoku domain.Tsundoku) {
	interactor.TsundokuRepository.Store(tusndoku)
}

func (interactor *TsundokuInteractor) GetInfo(userID string) []domain.Tsundoku {
	return interactor.TsundokuRepository.Select(userID)
}

func (interactor *TsundokuInteractor) Delete(id string) {
	interactor.TsundokuRepository.Delete(id)
}
