import MultiSelect from "./MultiSelect"
import TextInput from "./TextInput"
import type { ITicketOpt } from "./Ticket"

interface IProps {
    opts: ITicketOpt[]
    classNames?: string
}

function Options({opts, classNames}: IProps) {
    return <div className={`wfull ${classNames}`}>
        {
            opts.map((opt) => {
                switch(opt.type) {
                    case "input":
                        return <TextInput opt={opt} />
                    case "multi_select":
                        return <MultiSelect opt={opt} />
                    case "row_opts":
                        return <Options opts={opt.value} classNames="flex sa" />
                }
            })
        }
    </div>
}

export default Options