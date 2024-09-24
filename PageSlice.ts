import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getData, storeData } from './Services/AsyncStorageService';

// Define the TS type for the page slice's state
export interface PageState {
    currentPage: string;
}

// Define the thunks where the pages are hardcoded
export const saveHomePage = createAsyncThunk(
    'page/saveHomePage',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const hardcodedPage = 'Home'; // Hardcoded page
            await storeData('CurrentPage', hardcodedPage);

            // Dispatch an existing reducer to set the current page in the state
            dispatch(setCurrentPageHome());

            return hardcodedPage;
        } catch (error) {
            return rejectWithValue('Failed to save the home page');
        }
    }
);

export const saveRegisterPage = createAsyncThunk(
    'page/saveRegisterPage',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const hardcodedPage = 'Register'; // Hardcoded page
            await storeData('CurrentPage', hardcodedPage);

            // Dispatch an existing reducer to set the current page in the state
            dispatch(setCurrentPageRegister());

            return hardcodedPage;
        } catch (error) {
            return rejectWithValue('Failed to save the register page');
        }
    }
);

export const saveRootPage = createAsyncThunk(
    'page/saveRootPage',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const hardcodedPage = 'Root'; // Hardcoded page
            await storeData('CurrentPage', hardcodedPage);

            // Dispatch an existing reducer to set the current page in the state
            dispatch(setCurrentPageRoot());

            return hardcodedPage;
        } catch (error) {
            return rejectWithValue('Failed to save the root page');
        }
    }
);

// Define the initial value for the slice state
const initialState: PageState = {
    currentPage: 'Login', // default page
};

// Slice containing reducers and async thunks
export const pageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setCurrentPageLogin: (state) => {
            state.currentPage = 'Login';
        },
        setCurrentPageHome: (state) => {
            state.currentPage = 'Home';
        },
        setCurrentPageRoot: (state) => {
            state.currentPage = 'Root';
        },
        setCurrentPageRegister: (state) => {
            state.currentPage = 'Register';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveHomePage.fulfilled, (state, action) => {
            state.currentPage = action.payload;
        });
        builder.addCase(saveRegisterPage.fulfilled, (state, action) => {
            state.currentPage = action.payload;
        });
        builder.addCase(saveRootPage.fulfilled, (state, action) => {
            state.currentPage = action.payload;
        });
    },
});

export const selectCurrentPage = (state: RootState) => state.page.currentPage;

export const {
    setCurrentPageLogin,
    setCurrentPageRegister,
    setCurrentPageHome,
    setCurrentPageRoot,
} = pageSlice.actions;

export default pageSlice.reducer;
