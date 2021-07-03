package domain

import (
	"time"
)

type User struct {
	ID        int       `gorm:"primary_key" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	LINEID    string    `json:"lineID"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
