import create from 'zustand';
import { Note } from './Hooks/useRead';

interface DataState {
  data: Note[] ;
  setData: (data:Note[]) => void;

}

const useDataStore = create<DataState>((set) => ({
  data: [],
  setData: (data:Note[]) => set({ data }),
  
}));

export default useDataStore;
