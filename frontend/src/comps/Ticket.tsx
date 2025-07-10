import { useState } from "react";
import MultiSelect from "./MultiSelect";
import Window from "./Window";
import TextInput from "./TextInput";

export type TicketOptType = {
    type: string
    value: any
}

interface ITicketTemplate {
    title: string
    description?: string
    opts: TicketOptType[]
}

interface IProps {
    template: ITicketTemplate
}

function Ticket({template}: IProps) {
    const [maxi, setMaxi] = useState(true)

    return <Window title_bar_text={`Create Ticket - ${template.title}`} width="33%" maximize close>
        <h3>{template.title}</h3>
        {
            template.description
            ? <p>{template.description}</p>
            : <></>
        }
        <div className="mb">
            {
                template.opts.map((opt) => {
                    switch(opt.type) {
                        case "input":
                            return <TextInput opt={opt} />
                        case "multi_select":
                            return <MultiSelect opt={opt} />
                    }
                })
            }
        </div>
        <button onClick={() => console.log("click")}>Submit</button>
        <input type="reset" />
    </Window>
}

export default Ticket