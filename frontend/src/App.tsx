import Ticket from "./comps/Ticket";
import Window from "./comps/Window";
import template from "./tickets/merge_request.json"
import subscription_template from "./tickets/support_request.json"
import "./app.css"

function App() {
  return (
    <Window title_bar_text="Charlie's Ticketing System" width="100%">
      <div className="flex g1">
        <Ticket template={template}/>
        <Ticket template={subscription_template} />
      </div>
    </Window> 
  );
}

export default App;
