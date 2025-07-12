import { useState } from "react";
import type { ITicketOpt } from "./CreateTicket";

interface IProps {
    opt: ITicketOpt
}

function CheckBox({opt}: IProps) {
    const [id, _] = useState(self.crypto.randomUUID())
    
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