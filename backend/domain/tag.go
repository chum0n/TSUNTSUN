package domain

type Tag struct {
	ID   int    `gorm:"primary_key" json:"id"`
	Name string `gorm:"not null" json:"name"`
}
