import { useState } from "react"
import type { ITicketOpt } from "./CreateTicket"

interface IProps {
    opt: ITicketOpt
}

function MultiSelect({opt}: IProps) {
    const [selected, setSelected] = useState("")

    // return <div className="mb">
    //     <p style={{textAlign: "center"}}><b>{opt.title}</b></p>
    //     <div className="flex sa fw">
    //         {
    //             opt.options?.map((x: string) => {
    //                 return <button className={selected==x?"active":""} onClick={(e) => {
    //                     e.preventDefault()
    //                     setSelected(x)
    //                 }}>{x}</button>
    //             })
    //         }
    //     </div>
    // </div>
    return <fieldset>
        <div className="field-row">{`Select ${opt.title}:`}</div>
        {
            opt.options?.map((x: string) => {
                return <div className="field-row">
                    <input id={x} type="radio" name={opt.title} value={x} defaultChecked={opt.value==x} />
                    <label htmlFor={x}>{x}</label>
                </div>
            })
        }
    </fieldset>
}

export default MultiSelect