import React, { useState } from "react"
import TextInput from "./TextInput"
import MultiChoice, { IChoice } from "./MultiChoice"

type ticket_text_type = {
    type: "text"
    placeholder: string
    font_size?: number
    text_color?: string
    text: string | undefined
}

type ticket_multichoice_type = {
    type: "multi_choice"
    choices: IChoice[]
    choice_title: string
    choice: string | undefined
}

interface ITicket {
    [key: string]: ticket_text_type | ticket_multichoice_type
}

function IndexToKey(idx: number, ticket: ITicket): string {
    Object.keys(ticket).map((a, i) => {
        if (i === idx) return a
    })
    return ""
}

function KeyToIndex(key: string, ticket: ITicket): number {
    let keys = Object.keys(ticket)
    for (let i = 0; i<keys.length; i++) {
        if (keys[i] === key) return i;
    }
    return -1
}

function IsTypeFilled(key: string, ticket: ITicket): boolean {
    switch(ticket[key].type) {
        case "text":
            return (ticket[key] as ticket_text_type).text !== undefined
        case "multi_choice":
            return (ticket[key] as ticket_multichoice_type).choice !== undefined
    }
}

function IsValid(key: string): boolean {
    let keySplit = key.split("/")
    let pathSplit = ticketPath.split("/")
    if (keySplit.length >= pathSplit.length) return key.startsWith(ticketPath)
    let base = keySplit.slice(0,-1).join("/")
    return ticketPath.startsWith(base)
}

function GetNextValidType(ticket: ITicket): string {
    for (let key in ticket) {
        if (IsValid(key)) {
            let f = IsTypeFilled(key, ticket)
            if (!f) return key
        }
    }
    return ""
}

let currentType = 0
let ticketPath = ""

const CreateTicket = () => {
    const [ticket, setTicket] = useState<ITicket>({
        "title": {
            type: "text",
            placeholder: "Ticket Title",
            font_size: 2,
            text: undefined
        },
        "description": {
            type: "text",
            placeholder: "Ticket Description",
            text: undefined
        },
        "ticket_type": {
            type: "multi_choice",
            choice_title: "Type Of Ticket",
            choices: [
                {
                    text: "Approval",
                    result: "approval"
                },
                {
                    text: "Support",
                    result: "support"
                }
            ],
            choice: undefined
        },
        "/approval/mr_link": {
            type: "text",
            placeholder: "Enter link to Merge Request",
            text: undefined
        },
        "/support/contact": {
            type: "text",
            placeholder: "Enter person to contact",
            text: undefined
        },
        "/approval/team": {
            type: "multi_choice",
            choice_title: "Approval Person",
            choices: [
                {
                    text: "Charlie",
                    result: "charlie"
                },
                {
                    text: "Oliver",
                    result: "oliver"
                },
                {
                    text: "Cam",
                    result: "cam"
                }
            ],
            choice: undefined
        },
    })

    const Update_Type_Value = (key: string, newVal: string | undefined): ITicket => {
        console.log(`KEY: ${key}  NEW_VAL: ${newVal}`)
        let newTicket = {...ticket}
        switch(newTicket[key].type) {
            case "text":
                (newTicket[key] as ticket_text_type).text = newVal
                break;
            case "multi_choice":
                (newTicket[key] as ticket_multichoice_type).choice = newVal
                ticketPath += `${ticketPath}/${newVal}`
                break;
        }
        return {...newTicket}
    }

    const handle_ticket_update = (key: string, newVal: string) => {
        if (newVal == "") return
        let newTicket = Update_Type_Value(key, newVal)
        let next = GetNextValidType(ticket)
        currentType = KeyToIndex(next, ticket)
        setTicket({...newTicket})
    }

    const GoBack = (key: string) => {
        console.log(key)
        let newTicket = Update_Type_Value(key, undefined)
        let set = key.split("/").slice(0,-1).join("/")
        currentType = KeyToIndex(key, ticket)
        ticketPath = set
        setTicket({...newTicket})
    }

    return(
        <div className="ticket_wrapper">
            {
                Object.keys(ticket).map((key, idx, keys) => {
                    if (idx > currentType && currentType != -1) return <></>
                    if (!IsValid(key)) return <></>
                    switch(ticket[key].type) {
                        case "text":
                            var text: ticket_text_type = ticket[key] as ticket_text_type
                            return <TextInput 
                            placeholder={text.placeholder} 
                            font_size={text.font_size} 
                            text_color={text.text_color} 
                            iden={key}
                            key={key}
                            val={text.text}
                            submitHandler={handle_ticket_update} />
                        case "multi_choice":
                            var mchoice: ticket_multichoice_type = ticket[key] as ticket_multichoice_type
                            if (mchoice.choice === undefined) {
                                return <MultiChoice
                                choice_title={mchoice.choice_title}
                                choices={mchoice.choices} 
                                iden={key}
                                key={key}
                                submitHandler={handle_ticket_update} />
                            } else {
                                return <div className="choice_finish_wrapper">
                                    <p>{mchoice.choice_title}: {mchoice.choice}</p>
                                    <input type="button" value="Change" onClick={(e) => GoBack(key)}/>
                                </div>
                            }
                    }
                })
            }
        </div>
    )
}

export default CreateTicket