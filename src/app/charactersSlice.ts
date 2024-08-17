import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CharacterState {
  selectedCharacterId: number | null;
  selectedItems: number[];
}

const initialState: CharacterState = {
  selectedCharacterId: null,
  selectedItems: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSelectedCharacterId(state, action: PayloadAction<number | null>) {
      state.selectedCharacterId = action.payload;
    },
    addSelectedItem(state, action: PayloadAction<number>) {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload);
      }
    },
    removeSelectedItem(state, action: PayloadAction<number>) {
      state.selectedItems = state.selectedItems.filter((id) => id !== action.payload);
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { setSelectedCharacterId, addSelectedItem, removeSelectedItem, clearSelectedItems } =
  charactersSlice.actions;
export default charactersSlice.reducer;
