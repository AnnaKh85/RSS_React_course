import {configureStore} from "@reduxjs/toolkit";
import gendersReducer from "./parts/genderReducer";
import countriesReducer from "./parts/countryReducer";
import personsSlice from "./parts/personsReducer";

export const store = configureStore({
    reducer: {
        genders: gendersReducer,
        countries: countriesReducer,
        persons: personsSlice
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

