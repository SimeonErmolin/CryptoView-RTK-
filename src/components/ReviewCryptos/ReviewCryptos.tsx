import style from './ReviewCryptos.module.scss'
import { Assets } from "./Assets/Assets"
import { ReviewCoin } from "./ReviewCoin/RewiewCoin"

export function ReviewCryptos() {
  return (
    <div className={style.ReviewCryptos}>
      <ReviewCoin></ReviewCoin>
      <Assets></Assets>
    </div>
  )
}