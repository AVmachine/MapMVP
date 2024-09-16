import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../../store";

//https://redux.js.org/tutorials/essentials/part-2-app-structure

// Define the TS type for the counter slice's state
export interface TabState {
    currentTab: string
}


// Define the initial value for the slice state
const initialState: TabState = {
    currentTab: ""
}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const tabSlice = createSlice({
    name: 'currentTab',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCurrentTabHome: state => {
            state.currentTab = "Home"
        },
        setCurrentTabLists: state => {
            state.currentTab = "Lists"
        },
        setCurrentPageEmpty: state => {
            state.currentTab = ""
        }
    }
})


// Selector functions allows us to select a value from the Redux root state.
// Selectors can also be defined inline in the `useSelector` call
// in a component, or inside the `createSlice.selectors` field.
export const selectCurrentTab = (state: RootState) => state.tab.currentTab;

export const {setCurrentTabHome, setCurrentTabLists, setCurrentPageEmpty} = tabSlice.actions;
export default tabSlice.reducer;