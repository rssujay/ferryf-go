package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rssujay/ferryf-go/api/service"
	"gorm.io/gorm"
)

// StartAPI starts serving incoming requests on the provided router using the active db connection
func StartAPI(db *gorm.DB, router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		api.POST("/upload", func(c *gin.Context) {
			type fileInput struct {
				Name string `json:"name" binding:"required"`
			}

			var fileInp fileInput

			err := c.BindJSON(&fileInp)
			if err != nil {
				c.SecureJSON(http.StatusNotFound, gin.H{})
				return
			}

			c.SecureJSON(200, gin.H{
				"URL": service.HandleUpload(db, fileInp.Name),
			})
		})
	}
}
