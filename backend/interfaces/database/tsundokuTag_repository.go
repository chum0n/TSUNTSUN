package database

import "github.com/yot-sailing/TSUNTSUN/domain"

type TsundokuTagRepository struct {
	SqlHandler
}

func (db *TsundokuTagRepository) Store(tsundokuTag domain.TsundokuTag) {
	db.Create(&tsundokuTag)
}

func (db *TsundokuTagRepository) Select(userID int) []domain.TsundokuTag {
	tsundokuTags := []domain.TsundokuTag{}
	db.FindAllUserItem(&tsundokuTags, userID)
	return tsundokuTags
}

func (db *TsundokuTagRepository) SelectByMultiIDs(tsundokuID, userID int) []domain.TsundokuTag {
	tsundokuTags := []domain.TsundokuTag{}
	db.FindObjByMultiIDs(&tsundokuTags, tsundokuID, userID)
	return tsundokuTags
}

func (db *TsundokuTagRepository) Delete(id int) {
	tsundokuTags := []domain.TsundokuTag{}
	db.DeleteById(&tsundokuTags, id)
}
