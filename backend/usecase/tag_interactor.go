package usecase

import "github.com/yot-sailing/TSUNTSUN/domain"

type TagInteractor struct {
	TagRepository TagRepository
}

func (interactor *TagInteractor) Add(tag domain.Tag) int {
	return interactor.TagRepository.Store(tag)
}

func (interactor *TagInteractor) GetInfo(tagID []int) []domain.Tag {
	return interactor.TagRepository.Select(tagID)
}

func (interactor *TagInteractor) Delete(id int) {
	interactor.TagRepository.Delete(id)
}
