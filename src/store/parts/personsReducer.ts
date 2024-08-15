import {createSlice} from "@reduxjs/toolkit";
import {Person} from "../../types/main_types";




const personsSlice = createSlice({
    name: "persons",
    initialState: {
        list: [] as Person[]
    },
    reducers: {
        insertPerson: (state, action) => {
            const p: Person = action.payload;
            const newList: Person[] = [...state.list, p];
            return {list: newList};
        }
    }
});

export default personsSlice.reducer;
export const {insertPerson} = personsSlice.actions;

