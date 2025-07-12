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
        <div className="field-row">{`Select ${opt.title}:`}</div>
        {
            opt.options.map((x: string) => {
                let uuid = self.crypto.randomUUID()
                return <div className="field-row">
                    <input id={uuid} type="radio" name={opt.title} value={x} defaultChecked={opt.value==x} required/>
                    <label htmlFor={uuid}>{x}</label>
                </div>
            })
        }
    </fieldset>
}

export default MultiSelect