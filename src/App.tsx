import Dock from "./components/Dock";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import ReusmeWindow from "./windows/Resume";
import SafariWindow from "./windows/Safari";
import TerminalWindow from './windows/Terminal';
gsap.registerPlugin(Draggable);

const App = () => {
  return (
   <main>
    <Navbar/>
    <Welcome/>
    <Dock/>

    <TerminalWindow/>
    <SafariWindow/>
    <ReusmeWindow/>
   </main>
  );
};

export default App;   