import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { createAppSlice } from "../createAppSlice"

export const getAssetsData = createAsyncThunk(
  'favoritesList/getAssetsData',
  async (coins: string) => {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets?ids=${coins}`);
      return response.data.data;
    } catch (err) {
      alert(err)
    }
  }
)

interface IInitialState {
  isFetching: boolean,
  favoritesList: object[]
}

const initialState: IInitialState = {
  isFetching: false,
  favoritesList: []
}

export const favoritesListSlice = createAppSlice({
  name: 'favoritesList',
  initialState,
  reducers: {
    addToFavoritesList(state, action) {
      state.favoritesList.push(action.payload);
    },
    removeFromFavoritesList(state, action) {
      state.favoritesList = state.favoritesList.filter((obj: any) => {
        return obj.fullName !== action.payload
      })
    },
  },
  selectors: {
    getStateFavoritesList: state => state.favoritesList
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssetsData.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getAssetsData.fulfilled, (state, action) => {
        state.favoritesList = []

        action.payload.forEach((asset: any) => {
          const name = asset.symbol
          const fullName = asset.id
          const price = parseFloat(asset.priceUsd).toFixed(2)
          const percents = `${parseFloat(asset.changePercent24Hr).toFixed(2)}%`

          state.favoritesList.push({ name, fullName, price, percents });
        })
        state.isFetching = false;
      })
      .addCase(getAssetsData.rejected, (state, action) => {
        state.isFetching = false;
      })
  }
})

export const {
  addToFavoritesList,
  removeFromFavoritesList
} = favoritesListSlice.actions;
export const { getStateFavoritesList } = favoritesListSlice.selectors;
