import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            console.log("used login")
            state.value = true;
        },
        logout: (state) => {
            console.log("used logout")
            state.value = false;
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;