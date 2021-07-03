package database

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuRepository struct {
	SqlHandler
}

func (db *TsundokuRepository) Store(tsundoku domain.Tsundoku) {
	db.Create(&tsundoku)
}

func (db *TsundokuRepository) Select(userID int) []domain.Tsundoku {
	tsundoku := []domain.Tsundoku{}
	db.FindAllUserItem(&tsundoku, userID)
	return tsundoku
}

func (db *TsundokuRepository) Delete(id int) {
	tsundoku := []domain.Tsundoku{}
	db.DeleteById(&tsundoku, id)
}
