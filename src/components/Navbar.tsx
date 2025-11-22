// const navLinks: { id: number; name: string; type: string }[] =  [
//   {
//     id: 1,
//     name: "Projects",
//     type: "finder",
//   },
//   {
//     id: 3,
//     name: "Contact",
//     type: "contact",
//   },
//   {
//     id: 4,
//     name: "Resume",
//     type: "resume",
//   },
// ];

import { navIcons, navLinks } from "../constants";
import dayjs from "dayjs";
const Navbar= () => {
    return (
        <nav>
            <div>
                <img src="public\images\logo.svg" alt="apple-logo" />
                <p className='font-bold'>Hasibul's Portfolio</p>
                <ul>
                    {navLinks.map((item:{id:number,name:string})  => (
                        <li key={item.id}><p>{item.name}</p></li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map((icon)=>(<li key={icon.id}><img className="icon-hover" src={icon.img} alt="icons" /></li>))}
                </ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
       
        </nav>
    );
};

export default Navbar;