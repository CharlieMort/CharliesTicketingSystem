import Window from "./comps/Window";
import "./App.css"
import ManageTickets from "./main_pages/ManageTickets";

export const ENDPOINT = import.meta.env.VITE_ENDPOINT
console.log(import.meta.env.VITE_ENDPOINT)
function App() {
  return (
    <Window title_bar_text="Charlie's Ticketing System" width="100%">
      <ManageTickets />
    </Window> 
  );
}

export default App;
