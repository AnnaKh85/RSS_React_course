import {createSlice} from "@reduxjs/toolkit";


const personsSeqSlice = createSlice({
    name: "personSeq",
    initialState: {
        value: 0
    },
    reducers: {
        nextSeq: (state) => {
            state.value += 1;
        }
    }
});

export default personsSeqSlice.reducer;
export const {nextSeq} = personsSeqSlice.actions;

