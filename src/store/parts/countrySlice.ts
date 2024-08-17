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
            {key: "JM", value: "Jamaica"},
            {key: "BS", value: "Bahamas"},
            {key: "BB", value: "Barbados"},
            {key: "CV", value: "Cape Verde"},
            {key: "LS", value: "Lesotho"},
            {key: "MT", value: "Malta"},
            {key: "SD", value: "Sudan"},
            {key: "UG", value: "Uganda"},
            {key: "SJ", value: "Svalbard and Jan Mayen"},
            {key: "EC", value: "Ecuador"},
            {key: "MZ", value: "Mozambique"}
        ] as CountryRow[]
    },
    reducers: {}
});

export default countriesSlice.reducer;

