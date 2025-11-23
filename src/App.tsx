import Dock from "./components/Dock";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";

import { Draggable } from "gsap/Draggable";
import TerminalWindow from './windows/Terminal';
import gsap from "gsap";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
   <main>
    <Navbar/>
    <Welcome/>
    <Dock/>

    <TerminalWindow/>
   </main>
  );
};

export default App;   