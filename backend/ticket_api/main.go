package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

const ENV string = "local"

var db_name string
var db_uri string

func getAllTicketTemplates(c *gin.Context) {
	records := GetAllRecords("ticket_templates")
	var templates []Ticket
	if err := records.All(context.TODO(), &templates); err != nil {
		panic(err)
	}
	fmt.Println(templates)
	c.IndentedJSON(http.StatusOK, templates)
}

func CreateTicket() {

}

func main() {
	fmt.Println("Hello Ticket_API")
	err := godotenv.Load(fmt.Sprintf(".env.%s", ENV))
	if err != nil {
		log.Fatal("Could Not Load .env file for env:", ENV)
	}
	db_name = os.Getenv("DATABASE_NAME")
	db_uri = os.Getenv("MONGODB_URI")
	if db_uri == "" {
		log.Fatal("MONGODB_URI not set")
	}
	if db_name == "" {
		log.Fatal("DATABASE_NAME not set")
	}

	router := gin.Default()
	router.Use(corsMiddleware())
	router.GET("/api/tickets/templates", getAllTicketTemplates)

	router.Run("localhost:8080")

	//fmt.Println(GetRecordByProperty("tickets", "title", "cum"))
	// m := gomail.NewMessage()
	// m.SetHeader("From", "charlie.mortimer.18@gmail.com")
	// m.SetHeader("To", "charlie_mort@outlook.com", "charlie_mort@gmail.com")
	// m.SetHeader("Subject", "Hello!")
	// m.SetBody("text/html", "Hello <b>Bob</b> and <i>Cora</i>!")

	// d := gomail.NewDialer("smtp.gmail.com", 587, "charlie.mortimer.18@gmail.com", "udka lsjk xyxm czgj")

	// // Send the email to Bob, Cora and Dan.
	// if err := d.DialAndSend(m); err != nil {
	// 	panic(err)
	// }
}

func corsMiddleware() gin.HandlerFunc {
	// Define allowed origins as a comma-separated string
	originsString := "http://localhost:5173"
	var allowedOrigins []string
	if originsString != "" {
		// Split the originsString into individual origins and store them in allowedOrigins slice
		allowedOrigins = strings.Split(originsString, ",")
	}

	// Return the actual middleware handler function
	return func(c *gin.Context) {
		// Function to check if a given origin is allowed
		isOriginAllowed := func(origin string, allowedOrigins []string) bool {
			for _, allowedOrigin := range allowedOrigins {
				if origin == allowedOrigin {
					return true
				}
			}
			return false
		}

		// Get the Origin header from the request
		origin := c.Request.Header.Get("Origin")

		// Check if the origin is allowed
		if isOriginAllowed(origin, allowedOrigins) {
			// If the origin is allowed, set CORS headers in the response
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		}

		// Handle preflight OPTIONS requests by aborting with status 204
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		// Call the next handler
		c.Next()
	}
}
