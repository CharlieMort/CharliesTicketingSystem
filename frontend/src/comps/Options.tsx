import MultiSelect from "./MultiSelect"
import TextInput from "./TextInput"
import type { ITicketOpt } from "./CreateTicket"
import CheckBox from "./Checkbox"

interface IProps {
    opts: ITicketOpt[]
    classNames?: string
}

function Options({opts, classNames}: IProps) {    
    return <div className={`wfull flex fw sb ${classNames}`}>
        {
            opts.map((opt, idx) => {
                switch(opt.type) {
                    case "input":
                        return <TextInput opt={opt} />
                    case "multi_select":
                        return <MultiSelect opt={opt} key={idx} />
                    case "checkbox":
                        return <CheckBox opt={opt} />
                }
            })
        }
    </div>
}

export default Options