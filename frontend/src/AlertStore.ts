import create from 'zustand';

interface AlertState {
  alert: { message: string; variant: string } | null;
  showAlert: (message: string, variant: string) => void;
  hideAlert: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
  alert: null,
  showAlert: (message: string, variant: string) => set({ alert: { message, variant } }),
  hideAlert: () => set({ alert: null }),
}));

export default useAlertStore;
