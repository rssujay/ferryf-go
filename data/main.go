package data

import (
	"github.com/rssujay/ferryf-go/secrets"
	"gorm.io/gorm"
)

// FileLink is a table that maps a file's name to a url and stored path on local fs
type FileLink struct {
	gorm.Model
	Name string
	URL  string
	Path string
}

// InitDB sets up the database connection
func InitDB() (*gorm.DB, error) {
	db, err := gorm.Open(secrets.DBConfig, &gorm.Config{})
	if err != nil {
		return db, err
	}

	db.AutoMigrate(&FileLink{})
	return db, err
}
