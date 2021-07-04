package database

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuRepository struct {
	SqlHandler
}

func (db *TsundokuRepository) Store(tsundoku domain.Tsundoku) {
	db.Create(&tsundoku)
}

func (db *TsundokuRepository) Select(userID int) []domain.Tsundoku {
	tsundokus := []domain.Tsundoku{}
	db.FindAllUserItem(&tsundokus, userID)
	return tsundokus
}

func (db *TsundokuRepository) Delete(id int) {
	tsundoku := []domain.Tsundoku{}
	db.DeleteById(&tsundoku, id)
}
