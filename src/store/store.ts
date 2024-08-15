import {configureStore} from "@reduxjs/toolkit";
import genderReducer from "./parts/genderReducer";
import countryReducer from "./parts/countryReducer";

export const store = configureStore({
    reducer: {
        genders: genderReducer,
        countries: countryReducer
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

