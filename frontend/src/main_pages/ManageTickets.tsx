import { useEffect, useState } from "react";
import CreateTicket, { type ITicketOpt } from "../comps/CreateTicket";
import Ticket from "../comps/Ticket";
import Window from "../comps/Window";
import {v4 as uuidv4} from "uuid"
import { ENDPOINT } from "../App";
import CreateTemplate from "../comps/CreateTemplate";

export interface ITicketTemplate {
    title: string
    description?: string
    id?: string
    opts: ITicketOpt[]
    submitted?: string
}

function ManageTickets() {
    const [selectedTicketType, setSelectedTicketType] = useState("merge_request")
    const [templates, setTemplates] = useState<ITicketTemplate[]>([])
    const [tickets, setTickets] = useState<ITicketTemplate[]>([])

    const [createTemplate, setCreateTemplate] = useState(false)

    function RefreshTickets() {
        fetch(`${ENDPOINT}/api/tickets/templates`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then((data) => {
            data.json().then((jason) => {
                // console.log(jason)
                setTemplates([...jason])
            })
        });
        
        fetch(`${ENDPOINT}/api/tickets/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then((data) => {
            data.json().then((jason) => {
                console.log(jason)
                let newTickets = jason.map((ticket: ITicketTemplate) => {
                    ticket.submitted = "submitted"
                    return ticket
                })
                console.log(newTickets)
                setTickets(newTickets)
            })
        });
    }

    useEffect(() => {
        RefreshTickets()
    }, [])

    function DeleteTicket(ticketID: string) {
        fetch(`${ENDPOINT}/api/tickets/delete/${ticketID}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }).then((data) => {
            data.json().then((jason) => {
                console.log(jason)
            })
          });
        
        let newTickets : ITicketTemplate[] = []
        tickets.map((tick) => {
            if (tick.id !== ticketID) {
                newTickets.push(tick)
            }
        })
        console.log(newTickets)
        setTickets(newTickets)
    }

    function UpdateTicket(newTicket: ITicketTemplate) {
        if (newTicket.title === "Template") {
            fetch(`${ENDPOINT}/api/tickets/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTicket)
              }).then((data) => {
                data.json().then((jason) => {
                    console.log(jason)
                })
              });
        }
        if (newTicket.submitted == "editing") {
            fetch(`${ENDPOINT}/api/tickets/update/${newTicket.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTicket)
              }).then((data) => {
                data.json().then((jason) => {
                    console.log(jason)
                })
              });
        } else {
            fetch(`${ENDPOINT}/api/tickets/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTicket)
              }).then((data) => {
                data.json().then((jason) => {
                    console.log(jason)
                })
              });
        }

        let newTickets = [...tickets]
        for (let i = 0; i<newTickets.length; i++) {
            if (newTickets[i].id === newTicket.id) {
                newTickets[i] = {...newTicket}
                newTickets[i].submitted = "submitted"
            }
        }
        
        setTickets(newTickets)
    }

    function EditTicket(ticketID: string) {
        let newTickets = [...tickets]
        for (let i = 0; i<newTickets.length; i++) {
            if (newTickets[i].id === ticketID) {
                newTickets[i].submitted = "editing"
            }
        }
        setTickets(newTickets)
    }

    function NewTicket() {
        let template;
        templates.map((x) => {
            if (x.title == selectedTicketType) {
                template = x
            }
        })

        let newTicket = JSON.parse(JSON.stringify(template))
        newTicket.id = uuidv4()
        newTicket.submitted = false
        setTickets([...tickets, newTicket])
    }

    function PostTemplate(template: ITicketTemplate, title: string) {
        template.title = title
        fetch(`${ENDPOINT}/api/tickets/templates/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(template)
          }).then((data) => {
            data.json().then((jason) => {
                console.log(jason)
            })
          });
          setCreateTemplate(false)
          RefreshTickets()
    }

    return <Window title_bar_text="Manage Tickets" width="100%" maximize>
        <select onChange={(e) => setSelectedTicketType(e.target.value)} value={selectedTicketType}>
            {
                templates.map((template) => {
                    return <option value={template.title}>{template.title}</option>
                })
            }
        </select>
        <button onClick={NewTicket}>New Ticket</button>
        <button onClick={() => RefreshTickets()}>Refresh</button>
        <button onClick={() => setCreateTemplate(true)}>New Template</button>
        <div className="grid col-3 g1s">
            {
                createTemplate
                ? <CreateTemplate PostTemplate={PostTemplate} closeHandler={() => setCreateTemplate(false)}/>
                : <></>
            }
            {
                tickets.map((tick) => {
                    if (tick.submitted == "submitted") {
                        return <Ticket key={tick.id} ticket={tick} closeHandler={() => DeleteTicket(tick.id?tick.id:"")} editHandler={() => EditTicket(tick.id?tick.id:"")}/>
                    } else {
                        return <CreateTicket key={tick.id} addTicket={UpdateTicket} template={tick} closeHandler={() => DeleteTicket(tick.id?tick.id:"")}/>
                    }
                })
            }
        </div>
    </Window>
}

export default ManageTickets