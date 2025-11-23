// //src/hoc/WindowWraper.tsx

// import { useLayoutEffect, useRef, type ComponentType } from "react";
// import useWindowStore from "../store/window";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";

// // Register the Draggable plugin
// gsap.registerPlugin(Draggable);

// const WindowWrapper = <P extends Record<string, unknown>>(
//   Component: ComponentType<P>,
//   windowKey: string
// ) => {
//   const Wrapped = (props: P) => {
//     const { focusWindow, windows } = useWindowStore();
//     const windowState = windows[windowKey];
//     const { isOpen, zIndex } = windowState || { isOpen: false, zIndex: 0 };
//     const ref = useRef<HTMLDivElement>(null);
//     const draggableRef = useRef<Draggable[] | null>(null);

//     useGSAP(() => {
//       const el = ref.current;
//       if (!el || !isOpen) return;
//       el.style.display = "block";
//       gsap.fromTo(
//         el,
//         { scale: 0.8, opacity: 0, y: 40 },
//         { scale: 1, opacity: 1, duration: 0.6, y: 0, ease: "power3.out" }
//       );
//     }, [isOpen]);

//     useGSAP(() => {
//       const el = ref.current;
//       if (!el) return;

//       // Kill previous draggable instance if it exists
//       if (draggableRef.current) {
//         draggableRef.current[0].kill();
//       }

//       draggableRef.current = Draggable.create(
//         el
//         //   {
//         //   type: "x,y",
//         //   edgeResistance: 0.65,
//         //   bounds: "body", // Optional: keeps window within viewport
//         //   onPress: () => focusWindow(windowKey),
//         //   cursor: "grab",
//         //   activeCursor: "grabbing"
//         // }
//       );

//       return () => {
//         // Cleanup on unmount
//         if (draggableRef.current) {
//           draggableRef.current[0].kill();
//         }
//       };
//     }, []);

//     useLayoutEffect(() => {
//       const el = ref.current;
//       if (!el) return;
//       el.style.display = isOpen ? "block" : "none";
//     }, [isOpen]);

//     if (!isOpen) return null;

//     const handleClick = () => {
//       focusWindow(windowKey);
//     };

//     return (
//       <div
//         id={windowKey}
//         ref={ref}
//         style={{ zIndex }}
//         className="absolute"
//         onClick={handleClick}
//       >
//         <Component {...(props as P)} />
//       </div>
//     );
//   };

//   Wrapped.displayName = `WindowWrapper(${
//     Component.displayName || Component.name || "Component"
//   })`;

//   return Wrapped;
// };

// export default WindowWrapper;








//? working code 

//src/hoc/WindowWraper.tsx

import { useLayoutEffect, useRef, type ComponentType } from "react";
import useWindowStore from "../store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Register the Draggable plugin
gsap.registerPlugin(Draggable);

const WindowWrapper = <P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  windowKey: string
) => {
  const Wrapped = (props: P) => {
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows[windowKey];
    const { isOpen, zIndex } = windowState || { isOpen: false, zIndex: 0 };
    const ref = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<Draggable[] | null>(null);

    // Initialize draggable when window opens
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      
      el.style.display = "block";
      gsap.fromTo(
        el, 
        { scale: 0.8, opacity: 0, y: 40 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          y: 0, 
          ease: "power3.out",
          onComplete: () => {
            // Create draggable AFTER animation completes
            if (draggableRef.current) {
              draggableRef.current[0].kill();
            }
            
            draggableRef.current = Draggable.create(el, {
              type: "x,y",
              edgeResistance: 0.65,
              onPress: () => focusWindow(windowKey),
            });
          }
        }
      );
      
      return () => {
        if (draggableRef.current) {
          draggableRef.current[0].kill();
          draggableRef.current = null;
        }
      };
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClick = () => {
      focusWindow(windowKey);
    };

    return (
      <div
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute cursor-move"
        onClick={handleClick}
      >
        <Component {...(props as P)} />
      </div>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;