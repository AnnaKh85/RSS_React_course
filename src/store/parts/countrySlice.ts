import {createSlice} from "@reduxjs/toolkit";

type CountryRow = {
    key: string,
    value: string
}


const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        list: [
            {key: "AQ", value: "Antarctica"},
            {key: "US", value: "United States"},
            {key: "SO", value: "Somalia"},
            {key: "JM", value: "Jamaica"}
        ] as CountryRow[]
    },
    reducers: {}
});

export default countriesSlice.reducer;

