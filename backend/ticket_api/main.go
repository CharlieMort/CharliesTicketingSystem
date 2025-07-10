package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

const ENV string = "local"

var db_name string
var db_uri string

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

	fmt.Println(GetRecordByProp("tickets", "title", "cum"))
}
