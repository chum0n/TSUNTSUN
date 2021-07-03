package domain

import "time"

type Tsundoku struct {
	ID          int       `gorm:"primary_key" json:"id"`
	UserID      int       `json:"userID"`
	Category    string    `gorm:"not null" json:"category"`
	Title       string    `gorm:"not null" json:"title"`
	Author      string    `json:"author"`
	URL         string    `json:"url"`
	Deadline    time.Time `json:"deadline"`
	ReqiredTime string    `json:"requiredTime"`
	CreatedAt   time.Time `json:"createdAt"`
}