import { useEffect, useState } from "react";
import Window from "./Window";
import Options from "./Options";
import type { ITicketTemplate } from "../main_pages/ManageTickets";

interface IValidation {
    maxLength?: number
    minLength?: number
    pattern?: string
    optional?: boolean
    errorMsg: string
}
export interface ITicketOpt {
    type: string
    title: string
    options?: string[]
    validation?: IValidation
    value?: string
    default?: string
}

interface IProps {
    template: ITicketTemplate
    closeHandler?: () => void
    addTicket: (newTicket: any) => void
}

function CreateTicket({template, closeHandler, addTicket}: IProps) {
    function onSubmit(formData: FormData) {
        let form = Object.fromEntries(formData.entries())
        console.log(form)
        let newTicketStruct = JSON.parse(JSON.stringify(template))
        for (let opt of newTicketStruct.opts) {
            if (Object.hasOwn(form, opt.title)) {
                opt.value = form[opt.title].toString()
            } else {
                opt.value = opt.default
            }
        }
        console.log(newTicketStruct)
        addTicket(newTicketStruct)
    }

    return <Window title_bar_text={`Create Ticket - ${template.title}`} width="100%" maximize close close_careful={{header:"Close Ticket?", msg: "Are you sure ?"}} close_override={closeHandler}>
        <h3>{template.title}</h3>
        {
            template.description
            ? <p>{template.description}</p>
            : <></>
        }
        <form action={onSubmit}>
            <Options opts={template.opts} />
            <hr></hr>
            <input type="submit" />
            <input type="reset" />
        </form>
        
    </Window>
}

export default CreateTicket