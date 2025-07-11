import { useState } from "react";
import Window from "./Window";
import Options from "./Options";

export interface ITicketOpt {
    type: string
    value: any
}

interface ITicketTemplate {
    title: string
    description?: string
    opts: ITicketOpt[]
}

interface IProps {
    template: ITicketTemplate
}

function Ticket({template, compress}: IProps) {
    return <Window title_bar_text={`Create Ticket - ${template.title}`} width="33%" maximize close close_careful={{header:"Close Ticket?", msg: "Are you sure ?"}}>
        <h3>{template.title}</h3>
        {
            template.description
            ? <p>{template.description}</p>
            : <></>
        }
        <Options opts={template.opts} />
        <button onClick={() => console.log("click")}>Submit</button>
        <input type="reset" />
        
    </Window>
}

export default Ticket