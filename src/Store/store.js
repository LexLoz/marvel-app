import { configureStore } from "@reduxjs/toolkit";
import globalReducers from "./reducers/global-reducers";

const store = configureStore({
    reducer: {
        global: globalReducers
    },
});

export default store;