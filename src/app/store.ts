import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { coinDataSlice } from "./Slices/coinDataSlice"
import { favoritesListSlice } from "./Slices/favoritesListSlice"

const rootReducer = combineSlices(coinDataSlice, favoritesListSlice)

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;