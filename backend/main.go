package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
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

func getAllTickets(c *gin.Context) {
	records := GetAllRecords("tickets")
	var tickets []Ticket
	if err := records.All(context.TODO(), &tickets); err != nil {
		panic(err)
	}
	fmt.Println(tickets)
	c.IndentedJSON(http.StatusOK, tickets)
}

func createTicket(c *gin.Context) {
	var newTicket Ticket
	if err := c.BindJSON(&newTicket); err != nil {
		return
	}

	result := AddRecordToCollection("tickets", newTicket)

	c.IndentedJSON(http.StatusCreated, result)
}

func updateTicket(c *gin.Context) {
	id := c.Param("id")

	var newTicket Ticket
	if err := c.BindJSON(&newTicket); err != nil {
		return
	}

	result := ReplaceRecordInCollection("tickets", id, newTicket)

	c.IndentedJSON(http.StatusOK, result)
}

func deleteTicket(c *gin.Context) {
	id := c.Param("id")

	result := DeleteRecordInCollection("tickets", id)
	fmt.Println(result)
	c.IndentedJSON(http.StatusOK, result)
}

func createTemplate(c *gin.Context) {
	var newTemplate Ticket
	if err := c.BindJSON(&newTemplate); err != nil {
		return
	}

	result := AddRecordToCollection("ticket_templates", newTemplate)

	c.IndentedJSON(http.StatusCreated, result)
}

func main() {
	fmt.Println("Hello Ticket_API")
	err := godotenv.Load(fmt.Sprintf("/usr/bin/.env.%s", ENV))
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

	client, err := mongo.Connect(options.Client().ApplyURI(db_uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/api/tickets/", getAllTickets)
	router.POST("/api/tickets/templates/create", createTemplate)
	router.GET("/api/tickets/templates", getAllTicketTemplates)
	router.POST("/api/tickets/create", createTicket)
	router.PUT("/api/tickets/update/:id", updateTicket)
	router.DELETE("/api/tickets/delete/:id", deleteTicket)

	router.Static("/page", "/usr/bin/dist")
	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/page")
	})
	router.Run("0.0.0.0:8080")

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
