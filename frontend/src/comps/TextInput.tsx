import type { TicketOptType } from "./Ticket"

interface IProps {
    opt: TicketOptType
}

function TextInput({opt}: IProps) {
    return <div className="flex col mb-2">
        <label htmlFor={opt.value}>{opt.value}</label>
        <input id={opt.value} type="text"></input>
    </div>
}

export default TextInput