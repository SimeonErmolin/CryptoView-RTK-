import { AboutCoin } from "./AboutCoin/AboutCoin"
import { Graph } from "./Graph/Graph"
import style from "./ReviewCoin.module.scss"

export function ReviewCoin() {
  return (
    <div className={style.ReviewCoin}>
      <AboutCoin></AboutCoin>
      <Graph></Graph>
    </div>
  )
}