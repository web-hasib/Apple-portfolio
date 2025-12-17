// import { Search } from "lucide-react";
// import WindowControls from "../components/WindowControls";
// import WindowWrapper from "../hoc/WindowWraper";
// import { locations } from "../constants";
// import useLocationStore from "../store/location";
// import clsx from "clsx";
// import useWindowStore from "../store/window";

// const Finder = () => {
//     const {openWindow} = useWindowStore();
//     const { activeLocation, setActiveLocation } = useLocationStore() as {
//     activeLocation: { id: number; name: string; icon: string };
//     setActiveLocation: (location: {
//       id: number;
//       name: string;
//       icon: string;
//     }) => void;
//   };
//   const openItem = (item) =>{
//     if(item.fileType === "pdf") return openWindow("resume");
//     if(item.kind === "folder") return setActiveLocation(item);
//     if(["fig","url"].includes(item.fileType) && item.href) return window.open(item.href, "_blank");
//     openWindow(`${item.fileType} ${item.kind}`, item)
//   };

//   const renderList = (items: { id: number; name: string; icon: string }[]) =>
//     items.map((item: { id: number; name: string; icon: string }) => (
//       <li
//         className={`flex gap-2 px-2 py-1 hover:bg-gray-100 rounded ml-2 ${clsx(
//           item.id === activeLocation.id ? "active" : "not-active"
//         )}`}
//         key={item.id}
//         onClick={() => setActiveLocation(item)}
//       >
//         <img src={item.icon} alt={item.name} className="w-4" />
//         <p className="text-sm font-medium truncate">{item.name}</p>
//       </li>
//     ));

//   return (
//     <>
//       <div id="window-header">
//         <WindowControls target="finder" />
//         <Search className="icon" />
//       </div>
//       <div className="bg-white flex h-auto w-auto">
//         <div className="sidebar">
//           <div>
//             <h3 className="text-xs text-gray-400 ">Favourites</h3>
//             <ul>{renderList(Object.values(locations))}</ul>
//           </div>
//           <div>
//             <h3 className="text-xs text-gray-400 ">Work</h3>
//             <ul>{renderList(locations.work.children)}</ul>
//           </div>
//         </div>
//       <ul className="content">
//     {activeLocation?.children.map((item)=>(<li key={item.id} className={`${item.position} cursor-pointer`} onClick={()=> openItem(item)}>
//         <img src={item.icon} alt={item.name} />
//         <p>{item.name}</p>
//     </li>))}
      
//       </ul>
//       </div>
//     </>
//   );
// };
// const FinderWindow = WindowWrapper(Finder, "finder");

// export default FinderWindow;


import { Search } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWraper";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";
import useWindowStore from "../store/window";

interface Location {
  id: number;
  name: string;
  icon: string;
  children?: Item[];
}

interface Item {
  id: number;
  name: string;
  icon: string;
  fileType?: string;
  kind?: string;
  href?: string;
  position?: string;
}

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore() as {
    activeLocation: Location;
    setActiveLocation: (location: Location) => void;
  };

  const openItem = (item: Item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item as Location);
    if (
      item.fileType &&
      ["fig", "url"].includes(item.fileType) &&
      item.href
    )
      return window.open(item.href, "_blank");
    openWindow(`${item.fileType} ${item.kind}`, item);
  };

  const renderList = (items: Location[]) =>
    items.map((item: Location) => (
      <li
        className={`flex gap-2 px-2 py-1 hover:bg-gray-100 rounded ml-2 ${clsx(
          item.id === activeLocation.id ? "active" : "not-active"
        )}`}
        key={item.id}
        onClick={() => setActiveLocation(item)}
      >
        <img src={item.icon} alt={item.name} className="w-4" />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
      <div className="bg-white flex h-auto w-auto">
        <div className="sidebar">
          <div>
            <h3 className="text-xs text-gray-400 ">Favourites</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>
          <div>
            <h3 className="text-xs text-gray-400 ">Work</h3>
            <ul>{renderList(locations.work.children)}</ul>
          </div>
        </div>
        <ul className="content">
          {activeLocation?.children?.map((item: Item) => (
            <li
              key={item.id}
              className={`${item.position} cursor-pointer`}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;