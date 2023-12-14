import { createSlice } from "@reduxjs/toolkit";

const globalReducersSlice = createSlice({
    name: "global",
    initialState: {
        characters: [], 
        url: '',
        comics: {},
    },
    reducers: {
        reduceSmth: (state, { type, payload }) => {
            state[payload.key] = payload.value;
        },
        reduceCharacter: (state, { type, payload }) => {
            state.characters.push(payload.characterData);
            state.comics[payload.characterData.id] = {};
        },
        reduceComics: (state, { type, payload }) => {
            state.comics[payload.heroKey][payload.comicsKey] = payload.value;
        }
    }
});

export const { reduceSmth, reduceComics, reduceCharacter } = globalReducersSlice.actions;
export default globalReducersSlice.reducer;