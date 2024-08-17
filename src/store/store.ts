import {configureStore} from "@reduxjs/toolkit";
import gendersReducer from "./parts/genderSlice";
import countriesReducer from "./parts/countrySlice";
import personsSlice from "./parts/personsSlice";
import personsSeqSlice from "./parts/personsSeqSlice";

export const store = configureStore({
    reducer: {
        genders: gendersReducer,
        countries: countriesReducer,
        persons: personsSlice,
        personSeq: personsSeqSlice
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ["payload.picture.rawFile",],
                ignoredPaths: [/picture.rawFile/gm,],
            }
        });
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

