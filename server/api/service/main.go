package service

import (
	"errors"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lithammer/shortuuid/v3"
	"github.com/rssujay/ferryf-go/api/constants"
	"github.com/rssujay/ferryf-go/data"
	"gorm.io/gorm"
)

// HandleMetaDataUpload takes in a db connection, filename
// and does the following:
// 1. create a url-safe + human-friendly link to the file
// 2. create a db entry to record these information
// 3. returns the url for subsequent file upload and association
func HandleMetaDataUpload(db *gorm.DB, name string) string {
	entry := data.FileLink{
		Name: name,
		URL:  shortuuid.New(),
		Path: constants.InvalidPath,
	}
	result := db.Create(&entry)
	if result.Error != nil {
		return ""
	}
	return entry.URL
}

// HandleFileUpload allows for the upload and association of
// a file with a previously generated URL.
// It cannot overwrite previously uploaded files (a URL is for one-time use only).
func HandleFileUpload(f *multipart.FileHeader, c *gin.Context, db *gorm.DB, URL string) error {
	entry := data.FileLink{
		URL: URL,
	}

	result := db.Take(&entry)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return errors.New("Unassociated URL")
	} else if entry.Path != constants.InvalidPath {
		return errors.New("Previously associated URL")
	}
	storagePath := filepath.Join(constants.FSPathPrefix, time.Now().Format(constants.TimeFormat), URL)

	// Create required directories, as needed
	err := os.MkdirAll(storagePath, os.FileMode(constants.Perms))
	if err != nil {
		return err
	}

	// Concat with file name
	storagePath = filepath.Join(storagePath, entry.Name)
	if err := c.SaveUploadedFile(f, storagePath); err != nil {
		return err
	}
	result.Update("Path", storagePath)
	return nil
}

// RetrieveFile retrieves a file from the fs if it is available.
// Todo: serve as redirect for nginx to serve instead
func RetrieveFile(db *gorm.DB, URL string) (string, string, error) {
	entry := data.FileLink{
		URL: URL,
	}

	result := db.Take(&entry)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) || entry.Path == constants.InvalidPath {
		return "", "", errors.New("Unassociated URL")
	}
	return entry.Path, entry.Name, nil
}
