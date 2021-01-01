package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rssujay/ferryf-go/api/view"
	"github.com/rssujay/ferryf-go/data"
	"gorm.io/gorm"
)

var db *gorm.DB

func main() {
	db, err := data.InitDB()
	if err != nil {
		panic("Could not connect to database")
	}
	r := gin.Default()
	view.StartAPI(db, r)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
