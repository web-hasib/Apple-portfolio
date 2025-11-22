// //src/hoc/WindowWraper.tsx

// import { useRef } from "react";
// import useWindowStore from "../store/window";

// const WindowWraper = (Component, windowKey) => {
//   const Wrapped = (props) => {
//     const { focusWindow, windows } = useWindowStore();
//     const { isOpen, zIndex } = windows[windowKey];
//     const ref = useRef(null);
//     return (
//       <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
//        <Component {...props} />
//       </section>
//     );
//   };
//   Wrapped.displayName = `Wrapped(${Component.displayName || Component.name || "Component"})`;
//   return Wrapped;
// };

// export default WindowWraper;










//src/hoc/WindowWraper.tsx

import { useRef, type ComponentType } from "react";
import useWindowStore from "../store/window";

const WindowWrapper = <P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  windowKey: string
) => {
  const Wrapped = (props: P) => {
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows[windowKey];
    const { isOpen, zIndex } = windowState || { isOpen: false, zIndex: 0 };
    const ref = useRef<HTMLElement>(null);

    if (!isOpen) return null;

    const handleClick = () => {
      focusWindow(windowKey);
    };

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onClick={handleClick}
      >
        <Component {...(props as P)} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;