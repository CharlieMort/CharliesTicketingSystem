package main

type Task struct {
	Name     string `json:"name"`
	Action   string `json:"action"`
	Progress string `json:"progress"`
	Data     string `json:"data"`
}

type Ticket struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Desc  string `json:"description"`
	Tasks []Task `json:"tasks"`
}
