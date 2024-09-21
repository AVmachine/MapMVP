import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {getData} from "./Services/AsyncStorageService";
//https://redux.js.org/tutorials/essentials/part-2-app-structure
// Define the TS type for the counter slice's state
export interface PageState {
    currentPage: string
}

// Define the initial value for the slice state
const initialState = () => {
    let currentPageAsyncStorage = getData("CurrentPage");
    console.log("currntpage: " + currentPageAsyncStorage);
    return {
        currentPage: currentPageAsyncStorage ? currentPageAsyncStorage : "Login"
    };
}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const pageSlice = createSlice({
    name: 'currentPage',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCurrentPageLogin: state => {
            state.currentPage = "Login"
        },
        setCurrentPageHomePage: state => {
            state.currentPage = "Root"
        },
        setCurrentPageCreateNewAccount: state => {
            state.currentPage = "CreateNewAccount"
        }
    }
})

export const selectCurrentTab = (state: RootState) => state.page.currentPage;

export const {setCurrentPageLogin, setCurrentPageCreateNewAccount, setCurrentPageHomePage} = pageSlice.actions;
export default pageSlice.reducer;