

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { dockApps } from "../constants";
// import { Tooltip } from "react-tooltip";
// import { useGSAP } from "@gsap/react";

// interface DockApp {
//   id: string;
//   name: string;
//   icon: string;
//   canOpen: boolean;
// }

// const Dock = () => {
//   const dockRef = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     const dock = dockRef.current;
//     if (!dock) return () => {};
//     const icons = dock.querySelectorAll(".dock-icon");
//     const animateIcons = (mouseX) => {
//       const { left } = dock.getBoundingClientRect();
//       icons.forEach((icon) => {
//         const { left: iconLeft, width } = icon.getBoundingClientRect();
//         const center = iconLeft - left + width / 2;
//         const distance = Math.abs(mouseX - center);
//         const intencity = Math.exp(-(distance ** 2.5) / 10000);
//         gsap.to(icon, {
//           scale: 1 + 0.25 * intencity,
//           y: -15 * intencity,
//           duration: 0.2,
//           ease: "power1.out",
//         });
//       });
//     };
//     const handleMouseMove = (e: MouseEvent) => {
//       const { left } = dock.getBoundingClientRect();
//       animageIcons(e.clientX - left);
//     };
//     const resetIcons = () =>
//       icons.forEach((icon) =>
//         gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" })
//       );
//       dock.addEventListener("mousemove", handleMouseMove);
//       dock.addEventListener("mouseleave", resetIcons);
//       return () => {
//         dock.removeEventListener("mousemove", handleMouseMove);
//         dock.removeEventListener("mouseleave", resetIcons);
//       };

//   }, []);

//   const toggleApp = (app: { id: string; canOpen: boolean }) => {
//     // Your app toggle logic here
//   };

//   return (
//     <section id="dock">
//       <div ref={dockRef} className="dock-container">
//         {dockApps.map((app: DockApp) => (
//           <div key={app.id} className="dock-item relative flex justify-center">
//             <button
//               type="button"
//               className="dock-icon"
//               aria-label={app.name}
//               data-tooltip-id="dock-tooltip"
//               data-tooltip-content={app.name}
//               data-tooltip-delay-show={150}
//               disabled={!app.canOpen}
//               onClick={() => toggleApp({ id: app.id, canOpen: app.canOpen })}
//             >
//               <img
//                 src={`/images/${app.icon}`}
//                 loading="lazy"
//                 className={app.canOpen ? "" : "opacity-60"}
//                 alt={app.name}
//               />
//             </button>
//           </div>
//         ))}
//         <Tooltip id="dock-tooltip" place="top" className="tooltip" />
//       </div>
//     </section>
//   );
// };

// export default Dock;



import { useRef } from "react";
import { gsap } from "gsap";
import { dockApps } from "../constants";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";

interface DockApp {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
}

const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;
    
    const icons = dock.querySelectorAll<HTMLElement>(".dock-icon");
    
    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 10000);
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };
    
    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" })
      );
      
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app: { id: string; canOpen: boolean }) => {
    // Your app toggle logic here
    
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app: DockApp) => (
          <div key={app.id} className="dock-item relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp({ id: app.id, canOpen: app.canOpen })}
            >
              <img
                src={`/images/${app.icon}`}
                loading="lazy"
                className={app.canOpen ? "" : "opacity-60"}
                alt={app.name}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;