// import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";

// export const useWindowStore = create(immer((set)=>{
// {
//     windows: WINDOW_CONFIG,
//     nextZIndex:INITIAL_Z_INDEX+1,
//     openWindow: (windowKey,data=null)=>set((state)=>{
//         const win = state.windows[windowKey];
//         win.isOpen = true;
//         win.zIndex = state.nextZIndex;
//         win.data = data ?? win.data;

//         state.nextZIndex++;
//     }),
//     closeWindow: (windowKey)=>set((state)=>{
//           const win = state.windows[windowKey];
//         win.isOpen = false;
//         win.zIndex = INITIAL_Z_INDEX;
//         win.data = null;

//         state.nextZIndex++;
//     }),
//     focusWindow: (windowKey)=>set((state)=>{
//         const win = state.windows[windowKey];
//         win.zIndex = state.nextZIndex++;
//     })

// }    
// }));
// export default useWindowStore;







// import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";

// export const useWindowStore = create(
//   immer((set) => ({
//     windows: WINDOW_CONFIG,
//     nextZIndex: INITIAL_Z_INDEX + 1,
//     openWindow: (windowKey, data = null) =>
//       set((state) => {
//         const win = state.windows[windowKey];
//         if (win) {
//           win.isOpen = true;
//           win.zIndex = state.nextZIndex;
//           win.data = data ?? win.data;
//           state.nextZIndex++;
//         }
//       }),
//     closeWindow: (windowKey) =>
//       set((state) => {
//         const win = state.windows[windowKey];
//         if (win) {
//           win.isOpen = false;
//           win.zIndex = INITIAL_Z_INDEX;
//           win.data = null;
//         }
//       }),
//     focusWindow: (windowKey) =>
//       set((state) => {
//         const win = state.windows[windowKey];
//         if (win) {
//           win.zIndex = state.nextZIndex++;
//         }
//       }),
//   }))
// );

// export default useWindowStore;



import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: unknown;
  [key: string]: unknown;
}

export interface WindowStore {
  windows: Record<string, WindowState>;
  nextZIndex: number;
  openWindow: (windowKey: string, data?: unknown) => void;
  closeWindow: (windowKey: string) => void;
  focusWindow: (windowKey: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey: string, data: unknown = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.isOpen = true;
          win.zIndex = state.nextZIndex;
          win.data = data ?? win.data;
          state.nextZIndex++;
        }
      }),
    closeWindow: (windowKey: string) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.isOpen = false;
          win.zIndex = INITIAL_Z_INDEX;
          win.data = null;
        }
      }),
    focusWindow: (windowKey: string) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.zIndex = state.nextZIndex++;
        }
      }),
  }))
);

export default useWindowStore;