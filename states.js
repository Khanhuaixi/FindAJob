import create from "zustand";

const useStore = create((set) => ({
  StateUserId: 0,
  removeStateUserId: () => set({ StateUserId: 0 }),
}));

const useCartStore = create((set) => ({
  StateCart: 0,
  removeStateCart: () => set({ StateCart: 0 }),
  increaseCart: () => set((state) => ({ StateCart: state.StateCart + 1 })),
  setCart: (input) => set((state) => ({ StateCart: input })),
}));

export { useStore, useCartStore };

//const userId = useStore.getState().StateUserId
