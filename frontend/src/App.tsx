import Window from "./comps/Window";
import "src/app.css"
import ManageTickets from "./main_pages/ManageTickets";

function App() {
  return (
    <Window title_bar_text="Charlie's Ticketing System" width="100%">
      <ManageTickets />
    </Window> 
  );
}

export default App;
