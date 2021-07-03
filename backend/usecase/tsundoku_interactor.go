package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuInteractor struct {
	TsundokuRepository TsundokuRepository
}

func (interactor *TsundokuInteractor) Add(tusndoku domain.Tsundoku) {
	interactor.TsundokuRepository.Store(tusndoku, userID)
}

func (interactor *TsundokuInteractor) GetInfo(userID int) []domain.Tsundoku {
	return interactor.TsundokuRepository.Select(userID)
}

func (interactor *TsundokuInteractor) Delete(id int) {
	interactor.TsundokuRepository.Delete(id)
}
