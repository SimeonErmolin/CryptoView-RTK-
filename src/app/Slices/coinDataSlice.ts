import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { setStorageCurrentCoin } from "../../LocalStorage/LocalStorage"
import { createAppSlice } from "../createAppSlice"

export const getCoinData = createAsyncThunk(
  'coinData/getCoinData',
  async (coin: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets?ids=${coin}`)

      if (response.data.data.length === 0) {
        return rejectWithValue(`Ты че долбаёб? ${coin.toUpperCase()} у нас не найдено!`);
      }

      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
)

interface IinitialState {
  isFetching: boolean,
  name: string,
  fullName: string,
  price: string,
  percents: string,
  coinInFavorites: boolean,
}

const initialState: IinitialState = {
  isFetching: false,
  name: '',
  fullName: '',
  price: '',
  percents: '',
  coinInFavorites: false,
}

export const coinDataSlice = createAppSlice({
  name: 'coinData',
  initialState,
  reducers: {
    changeCoinInFavorites(state, action) {
      state.coinInFavorites = action.payload;
    }
  },
  selectors: {
    getStateCoinData: state => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        const data = action.payload[0];

        state.name = data.symbol
        state.fullName = data.id
        state.price = parseFloat(data.priceUsd).toFixed(2)
        state.percents = `${parseFloat(data.changePercent24Hr).toFixed(2)}%`

        setStorageCurrentCoin(state.fullName, state.coinInFavorites);

        state.isFetching = false;
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.isFetching = false;
        alert(action.payload)
      })
  }
})

export const { changeCoinInFavorites } = coinDataSlice.actions;
export const { getStateCoinData } = coinDataSlice.selectors;
