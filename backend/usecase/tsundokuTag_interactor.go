package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuTagInteractor struct {
	TsundokuTagRepository TsundokuTagRepository
}

func (interactor *TsundokuTagInteractor) Add(tsundokuTag domain.TsundokuTag) {
	interactor.TsundokuTagRepository.Store(tsundokuTag)
}

func (interactor *TsundokuTagInteractor) GetInfo(userID int) []domain.TsundokuTag {
	return interactor.TsundokuTagRepository.Select(userID)
}

func (interactor *TsundokuTagInteractor) GetInfoByMultiIDs(tsundokuID, userID int) []domain.TsundokuTag {
	return interactor.TsundokuTagRepository.SelectByMultiIDs(tsundokuID, userID)
}

func (interactor *TsundokuTagInteractor) Delete(id int) {
	interactor.TsundokuTagRepository.Delete(id)
}
