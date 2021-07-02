package domain

type TsundokuTag struct {
	TsundokuID int `gorm:"primary_key" json:"tsundokuID"`
	TagID      int `gorm:"primary_key" json:"tagID"`
	UserID     int `json:"userID"`
}
