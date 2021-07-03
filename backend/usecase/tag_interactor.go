package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TagInteractor struct {
	TagRepository TagRepository
}

func (interactor *TagInteractor) Add(tag domain.Tag) {
	interactor.TagRepository.Store(tag)
}

func (interactor *TagInteractor) GetInfo(userID int) []domain.Tag {
	return interactor.TagRepository.Select(userID)
}

func (interactor *TagInteractor) Delete(id int) {
	interactor.TagRepository.Delete(id)
}
