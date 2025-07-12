import Window from "./Window";

export interface ITicketOpt {
    type: string
    title: string
    options?: string[]
    value?: string
}

interface ITicketTemplate {
    title: string
    description?: string
    opts: ITicketOpt[]
}

interface IProps {
    ticket: ITicketTemplate
    closeHandler?: () => void
    editHandler?: () => void
}

function Ticket({ticket, closeHandler, editHandler}: IProps) {
    return <Window title_bar_text={`${ticket.title}`} width="100%" maximize close close_careful={{header:"Close Ticket?", msg: "Are you sure ?"}} close_override={closeHandler}>
        <h3>{ticket.title}</h3>
        {
            ticket.description
            ? <p>{ticket.description}</p>
            : <></>
        }
        {
            ticket.opts.map((opt) => {
                return <div className={`flex col mb-2`}>
                    <div><b>{opt.title}</b></div>
                    <div>{opt.value}</div>
                </div>
            })
        }
        <button onClick={editHandler}>Edit</button>
    </Window>
}

export default Ticket