import { useState } from "react";
import CreateTicket, { type ITicketOpt } from "../comps/CreateTicket";
import Ticket from "../comps/Ticket";
import Window from "../comps/Window";
import merge_request from "../tickets/merge_request.json"
import subscription_request from "../tickets/subscription_request.json"
const TEMPLATES : any[string] = {
    "merge_request": merge_request,
    "subscription_request": subscription_request
}

export interface ITicketTemplate {
    title: string
    description?: string
    id?: string
    opts: ITicketOpt[]
    submitted?: boolean
}

function ManageTickets() {
    const [selectedTicketType, setSelectedTicketType] = useState("merge_request")
    
    const [tickets, setTickets] = useState<ITicketTemplate[]>([])

    function DeleteTicket(ticketID: string) {
        console.log(ticketID)
        
        let newTickets : ITicketTemplate[] = []
        tickets.map((tick) => {
            if (tick.id !== ticketID) {
                newTickets.push(tick)
            }
        })

        setTickets(newTickets)
    }

    function UpdateTicket(newTicket: ITicketTemplate) {
        let newTickets = [...tickets]
        for (let i = 0; i<newTickets.length; i++) {
            if (newTickets[i].id === newTicket.id) {
                newTickets[i] = {...newTicket}
                newTickets[i].submitted = true
            }
        }
        setTickets(newTickets)
    }

    function EditTicket(ticketID: string) {
        let newTickets = [...tickets]
        for (let i = 0; i<newTickets.length; i++) {
            if (newTickets[i].id === ticketID) {
                newTickets[i].submitted = false
            }
        }
        setTickets(newTickets)
    }

    function NewTicket() {
        let newTicket = JSON.parse(JSON.stringify(TEMPLATES[selectedTicketType]))
        newTicket.id = self.crypto.randomUUID()
        newTicket.submitted =
        setTickets([...tickets, newTicket])
    }

    return <Window title_bar_text="Manage Tickets" width="100%" maximize>
        <select onChange={(e) => setSelectedTicketType(e.target.value)} value={selectedTicketType}>
            <option value="subscription_request">New Subscription</option>
            <option value="merge_request">Merge Request</option>
        </select>
        <button onClick={NewTicket}>New Ticket</button>
        <div className="grid col-3 g1s">
            {
                tickets.map((tick) => {
                    if (tick.submitted) {
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