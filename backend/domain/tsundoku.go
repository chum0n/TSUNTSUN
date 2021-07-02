package domain

import "time"

type Tsundoku struct {
	ID          int       `gorm:"primary_key" json:"id"`
	UserID      int       `json:"userID"`
	Category    string    `gorm:"type: enum('site', 'book'); default: 'site'; not null" json:"category"`
	Title       string    `gorm:"not null" json:"title"`
	Author      string    `json:"author"`
	URL         string    `json:"url"`
	Deadline    time.Time `json:"deadline"`
	ReqiredTime string    `json:"requiredTime"`
	CreatedAt   time.Time `json:"createdAt"`
	DeletedAt   time.Time `json:"deletedAt"`
}
