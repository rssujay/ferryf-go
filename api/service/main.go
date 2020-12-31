package service

import (
	"github.com/lithammer/shortuuid/v3"
	"github.com/rssujay/ferryf-go/api/constants"
	"github.com/rssujay/ferryf-go/data"
	"gorm.io/gorm"
)

// HandleUpload takes in a db connection, filename, file (TODO)
// and does the following:
// 1. create a url-safe + human-friendly link to the file
// 2. store the file in dynamically generated filepath (TODO)
// 3. create a db entry to record these information
func HandleUpload(db *gorm.DB, name string) string {
	entry := data.FileLink{
		Name: name,
		URL:  shortuuid.New(),
		Path: constants.InvalidPath,
	}
	result := db.Create(&entry)
	if result.Error != nil {
		return "File upload failed"
	}
	return entry.URL
}
