import { createSlice } from "@reduxjs/toolkit";

const globalReducersSlice = createSlice({
    name: "global",
    initialState: {
        characters: [], 
        url: '',
        comics: [],
    },
    reducers: {
        reduceSmth: (state, action) => {
            state[action.payload.key] = action.payload.value;
        }
    }
});

export const { reduceSmth } = globalReducersSlice.actions;
export default globalReducersSlice.reducer;