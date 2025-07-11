import { useEffect, useState } from "react";
import Window from "./Window";
import Options from "./Options";
import type { ITicketTemplate } from "../main_pages/ManageTickets";

export interface ITicketOpt {
    type: string
    title: string
    options?: string[]
    value?: string
}

interface IProps {
    template: ITicketTemplate
    closeHandler?: () => void
    addTicket: (newTicket: any) => void
}

function CreateTicket({template, closeHandler, addTicket}: IProps) {
    function onSubmit(formData: FormData) {
        let form = Object.fromEntries(formData.entries())
        let newTicketStruct = {...template}
        for (let opt of newTicketStruct.opts) {
            if (Object.hasOwn(form, opt.title)) {
                opt.value = form[opt.title].toString()
            }
        }
        console.log(newTicketStruct)
        addTicket(newTicketStruct)
    }

    return <Window title_bar_text={`Create Ticket - ${template.title}`} width="31.5%" maximize close close_careful={{header:"Close Ticket?", msg: "Are you sure ?"}} close_override={closeHandler}>
        <h3>{template.title}</h3>
        {
            template.description
            ? <p>{template.description}</p>
            : <></>
        }
        <form action={onSubmit}>
            <Options opts={template.opts} />
            <input type="submit" />
            <input type="reset" />
        </form>
        
    </Window>
}

export default CreateTicket