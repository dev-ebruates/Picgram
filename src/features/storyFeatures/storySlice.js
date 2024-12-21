import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stories: [],
    loading: false,
    error: null,
};

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setStories: (state, action) => {
            state.stories = action.payload;
        },
        addStory: (state, action) => {
            state.stories.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setStories, addStory, setLoading, setError } = storySlice.actions;
export default storySlice.reducer;
