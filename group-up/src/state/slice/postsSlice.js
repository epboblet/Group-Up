import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPosts: (state) => {
            console.log("used login")
            state.value = [];
        },
    }
});

export const {getPosts} = postsSlice.actions;
export default postsSlice.reducer;