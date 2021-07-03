package database

import "github.com/yot-sailing/TSUNTSUN/domain"

type TagRepository struct {
	SqlHandler
}

func (db *TagRepository) Store(tag domain.Tag) int {
	db.Create(&tag)
	return tag.ID
}

func (db *TagRepository) Select(tagIDs []int) []domain.Tag {
	tags := []domain.Tag{}
	db.FindObjByIDs(&tags, tagIDs)
	return tags
}

func (db *TagRepository) Delete(id int) {
	tags := []domain.Tag{}
	db.DeleteById(&tags, id)
}
