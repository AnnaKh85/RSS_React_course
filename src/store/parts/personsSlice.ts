import {createSlice} from "@reduxjs/toolkit";
import {Person} from "../../types/main_types";
import {RootState} from "../store";




const personsSlice = createSlice({
    name: "persons",
    initialState: {
        list: [] as Person[]
    },
    reducers: {
        insertPerson: (state, action) => {
            const p: Person = action.payload;
            state.list = [...state.list, p];
        }
    }
});

export default personsSlice.reducer;
export const {insertPerson} = personsSlice.actions;
export const selectPersons = (state: RootState) => state.persons.list;

