import { useState } from "react";
import type { ITicketOpt } from "./CreateTicket";
import { uuid } from "uuidv4";

interface IProps {
    opt: ITicketOpt
}

function CheckBox({opt}: IProps) {
    const [id, _] = useState(uuid())
    
    return <div>
        <input type="checkbox" id={id} name={opt.title} defaultChecked={opt.value ?
            opt.value=="on"
            ?true
            :false
            :false}/>
        <label htmlFor={id}>{opt.title}</label>
    </div>
}

export default CheckBox;