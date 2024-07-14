import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CharactersState {
  selectedCharacterId: number | null;
}

const initialState: CharactersState = {
  selectedCharacterId: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSelectedCharacterId(state, action: PayloadAction<number | null>) {
      state.selectedCharacterId = action.payload;
    },
  },
});

export const { setSelectedCharacterId } = charactersSlice.actions;
export default charactersSlice.reducer;
