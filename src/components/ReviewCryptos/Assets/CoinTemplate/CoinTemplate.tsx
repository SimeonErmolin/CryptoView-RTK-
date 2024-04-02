import style from "./CoinTemplate.module.scss"
import { store } from "../../../../app/store"
import { changeCoinInFavorites, getCoinData } from "../../../../app/Slices/coinDataSlice"

interface IPropsCoinTemplate {
  name: string,
  price: string,
  percents: string,
  fullName: string,
}

export function CoinTemplate({ name, price, percents, fullName }: IPropsCoinTemplate) {
  return (
    <span className={style.Coin} onClick={() => {
      store.dispatch(getCoinData(fullName))
      store.dispatch(changeCoinInFavorites(true))
    }}>
      <p>{name}</p>
      <p>{price}</p>
      <p>{percents}</p>
    </span>
  )
}