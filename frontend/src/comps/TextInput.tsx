import type { ITicketOpt } from "./CreateTicket"

interface IProps {
    opt: ITicketOpt
}

function TextInput({opt}: IProps) {
    console.log(opt.validation?.pattern?.replaceAll("&BS", "\\"))
    return <div className={`flex col mb-2 ${opt.options?.includes("short") ? "whalf": "wfull"}`}>
        <label htmlFor={opt.title}>{opt.title}</label>
        <label htmlFor={opt.title} className="error_msg">{opt.validation?.error_msg}</label>
        <input 
            id={opt.title} 
            type="text" 
            name={opt.title} 
            defaultValue={opt.value} 
            required={opt.validation?.optional?false:true}
            maxLength={opt.validation?.maxLength}
            minLength={opt.validation?.minLength}
            pattern={opt.validation?.pattern?.replaceAll("&BS", "\\")}
            />
    </div>
}

export default TextInput