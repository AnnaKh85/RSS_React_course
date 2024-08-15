import {createSlice} from "@reduxjs/toolkit";

type CountryRow = {
    key: string,
    value: string
}


const countryReducer = createSlice({
    name: "country",
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

export default countryReducer.reducer;

