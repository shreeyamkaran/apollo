import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
    value: string
}

const initialState: LanguageState = {
    value: window.localStorage.getItem("language") || "en-US"
}

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
            window.localStorage.setItem("language", state.value);
        }
    }
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;