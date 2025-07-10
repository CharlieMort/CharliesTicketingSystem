import { useState } from "react"
import type { TicketOptType } from "./Ticket"

interface IProps {
    opt: TicketOptType
}

function MultiSelect({opt}: IProps) {
    const [selected, setSelected] = useState("")

    return <div className="mb">
        <p style={{textAlign: "center"}}><b>{opt.value.title}</b></p>
        <div className="flex sa fw">
            {
                opt.value.values.map((x: string) => {
                    return <button className={selected==x?"active":""} onClick={() => setSelected(x)}>{x}</button>
                })
            }
        </div>
    </div>
}

export default MultiSelect