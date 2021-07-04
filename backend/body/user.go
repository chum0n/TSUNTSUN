package body

import "time"

type UesrExcludeLine struct {
	ID        int       `gorm:"primary_key" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
