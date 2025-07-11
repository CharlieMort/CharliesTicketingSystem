import type { ITicketOpt } from "./Ticket"

interface ITicketTextOpt extends ITicketOpt {
    short?: boolean
}

interface IProps {
    opt: ITicketTextOpt
}

function TextInput({opt}: IProps) {
    return <div className={`flex col mb-2 ${opt.short ? "whalf shrunk": ""}`}>
        <label htmlFor={opt.value}>{opt.value}</label>
        <input id={opt.value} type="text"></input>
    </div>
}

export default TextInput