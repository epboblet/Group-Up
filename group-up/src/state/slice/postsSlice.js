import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    lastUpdate: Date.now(),
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.value = action.payload;
            state.lastUpdate = Date.now();
        },
    }
});

export const {setPosts} = postsSlice.actions;
export default postsSlice.reducer;