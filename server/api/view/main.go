package view

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rssujay/ferryf-go/api/service"
	"gorm.io/gorm"
)

// StartAPI starts serving incoming requests on the provided router using the active db connection
func StartAPI(db *gorm.DB, router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		api.POST("/filedata", func(c *gin.Context) {
			type fileInput struct {
				Name string `json:"name" binding:"required"`
			}
			var fileInp fileInput

			err := c.BindJSON(&fileInp)
			if err != nil {
				c.SecureJSON(http.StatusNotFound, gin.H{})
				return
			}

			identifier := service.HandleMetaDataUpload(db, fileInp.Name)
			if identifier == "" {
				c.SecureJSON(http.StatusInternalServerError, gin.H{})
				return
			}
			c.SecureJSON(200, gin.H{
				"URL": identifier,
			})
		})

		api.POST("/files/:URL", func(c *gin.Context) {
			URL := c.Param("URL")
			file, err := c.FormFile("file")
			if err != nil {
				fmt.Println(err)
				c.SecureJSON(http.StatusBadRequest, gin.H{})
				return
			}

			err = service.HandleFileUpload(file, c, db, URL)
			if err != nil {
				fmt.Println(err)
				c.SecureJSON(http.StatusBadRequest, gin.H{})
				return
			}
			c.SecureJSON(http.StatusOK, gin.H{})
		})

		api.GET("/files/:URL", func(c *gin.Context) {
			URL := c.Param("URL")
			path, name, err := service.RetrieveFile(db, URL)
			if err != nil {
				fmt.Println(err)
				c.SecureJSON(http.StatusNotFound, gin.H{})
				return
			}
			c.FileAttachment(path, name)
		})
	}
}
