import {v4 as uuidv4} from "uuid"
import type { ITicketOpt } from "./CreateTicket"

interface IProps {
    opt: ITicketOpt
}

function MultiSelect({opt}: IProps) {
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
    if (!opt.options) return <></>

    return <fieldset>
        <legend>{`Select ${opt.title}`}</legend>
        {
            opt.options.map((x: string) => {
                let uid = uuidv4()
                return <div className="field-row">
                    <input id={uid} type="radio" name={opt.title} value={x} defaultChecked={opt.value==x} required/>
                    <label htmlFor={uid}>{x}</label>
                </div>
            })
        }
    </fieldset>
}

export default MultiSelect