import Ticket from "../comps/Ticket";
import Window from "../comps/Window";
import template from "../tickets/merge_request.json"
import subscription_template from "../tickets/subscription_request.json"

function ManageTickets() {
    return <Window title_bar_text="Manage Tickets" width="100%" maximize>
        <button>New Ticket</button>
        <div className="flex g1">
            <Ticket template={template}/>
            <Ticket template={subscription_template} />
        </div>
    </Window>
}

export default ManageTickets