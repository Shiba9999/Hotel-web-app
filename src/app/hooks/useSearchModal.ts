import { create } from "zustand";

interface useSearchModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


const useSearchModal = create<useSearchModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useSearchModal; 