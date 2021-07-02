package domain

import "time"

type User struct {
	ID        int       `gorm:"primary_key" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Token     string    `json:"token"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	DeletedAt time.Time `json:"deletedAt"`
}
