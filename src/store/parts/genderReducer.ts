import {createSlice} from "@reduxjs/toolkit";
import {Gender} from "../../types/main_types";

type GenderRow = {
    key: Gender,
    value: string
}


const genderReducer = createSlice({
    name: "gender",
    initialState: {
        list: [
            {key: Gender.F, value: "Female"},
            {key: Gender.M, value: "Male"}
        ] as GenderRow[]
    },
    reducers: {}
});

export default genderReducer.reducer;

