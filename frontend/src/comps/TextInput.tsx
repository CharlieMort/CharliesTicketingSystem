import type { ITicketOpt } from "./CreateTicket"

interface ITicketTextOpt extends ITicketOpt {
    short?: boolean
}

interface IProps {
    opt: ITicketTextOpt
}

function TextInput({opt}: IProps) {
    return <div className={`flex col mb-2 ${opt.short ? "whalf shrunk": ""}`}>
        <label htmlFor={opt.title}>{opt.title}</label>
        <input id={opt.title} type="text" name={opt.title} value={opt.value}></input>
    </div>
}

export default TextInput