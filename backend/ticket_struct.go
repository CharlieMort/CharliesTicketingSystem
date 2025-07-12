package main

type Validation struct {
	MaxLength int16  `json:"maxLength,omitempty"`
	MinLength int16  `json:"minLength,omitempty"`
	Pattern   string `json:"pattern,omitempty"`
	Optional  bool   `json:"optional,omitempty"`
	ErrorMsg  string `json:"errorMsg"`
}

type Option struct {
	Type       string      `json:"type"`
	Title      string      `json:"title"`
	Options    []string    `json:"options,omitempty"`
	Validation *Validation `json:"validation,omitempty"`
	Value      string      `json:"value"`
	Default    string      `json:"default,omitempty"`
}

type Ticket struct {
	ID            string   `json:"id"`
	Title         string   `json:"title"`
	Descscription string   `json:"description"`
	Opts          []Option `json:"opts"`
}
