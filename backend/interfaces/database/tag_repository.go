package database

import "github.com/yot-sailing/TSUNTSUN/domain"

type TagRepository struct {
	SqlHandler
}

func (db *TagRepository) Store(tag domain.Tag) {
	db.Create(&tag)
}

func (db *TagRepository) Select(userID int) []domain.Tag {
	tags := []domain.Tag{}
	db.FindAllUserItem(&tags, userID)
	return tags
}

func (db *TagRepository) Delete(id int) {
	tags := []domain.Tag{}
	db.DeleteById(&tags, id)
}
