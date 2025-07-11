package main

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

const ENV string = "local"

var db_name string
var db_uri string

func main() {
	fmt.Println("Hello Ticket_API")
	// err := godotenv.Load(fmt.Sprintf(".env.%s", ENV))
	// if err != nil {
	// 	log.Fatal("Could Not Load .env file for env:", ENV)
	// }
	// db_name = os.Getenv("DATABASE_NAME")
	// db_uri = os.Getenv("MONGODB_URI")
	// if db_uri == "" {
	// 	log.Fatal("MONGODB_URI not set")
	// }
	// if db_name == "" {
	// 	log.Fatal("DATABASE_NAME not set")
	// }

	// fmt.Println(GetRecordByProp("tickets", "title", "cum"))
	m := gomail.NewMessage()
	m.SetHeader("From", "charlie.mortimer.18@gmail.com")
	m.SetHeader("To", "charlie_mort@outlook.com", "charlie_mort@gmail.com")
	m.SetHeader("Subject", "Hello!")
	m.SetBody("text/html", "Hello <b>Bob</b> and <i>Cora</i>!")

	d := gomail.NewDialer("smtp.gmail.com", 587, "charlie.mortimer.18@gmail.com", "udka lsjk xyxm czgj")

	// Send the email to Bob, Cora and Dan.
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}
}
