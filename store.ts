import {configureStore} from "@reduxjs/toolkit";
import type {Action, ThunkAction} from "@reduxjs/toolkit";
import pageReducer from './PageSlice';
import tabReducer from './Routes/Roots/TabSlice'

export const store = configureStore({
    reducer: {
        page: pageReducer,
        tab: tabReducer
    },
})


// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>

export default store;