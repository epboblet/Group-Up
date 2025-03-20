import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const {setPosts} = postsSlice.actions;
export default postsSlice.reducer;