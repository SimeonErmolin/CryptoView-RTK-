import style from './Assets.module.scss'
import { CoinTemplate } from "./CoinTemplate/CoinTemplate"
import { useAppSelector } from "../../../app/hooks"
import { getStateFavoritesList } from "../../../app/Slices/favoritesListSlice"

export function Assets() {
  const coinsList = useAppSelector(getStateFavoritesList);

  const list = coinsList.map((item: any, index: number) => {
    return <CoinTemplate
      key={index}
      name={item.name}
      price={item.price}
      percents={item.percents}
      fullName={item.fullName}
    />
  })

  return (
    <div className={`${style.Assets} ${style.block}`}>
      <div>
        <h2 className={`${style.title} ${style.AssetsTitle}`}>Assets</h2>
      </div>
      <div className={style.FavoritesList}>{list}</div>
    </div>
  )
}