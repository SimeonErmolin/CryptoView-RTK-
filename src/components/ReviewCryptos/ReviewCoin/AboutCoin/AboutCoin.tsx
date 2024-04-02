import style from './AboutCoin.module.scss'
import { addToStorageFavoritesList, removeFromStorageFavoritesList } from "../../../../LocalStorage/LocalStorage"
import { addToFavoritesList, removeFromFavoritesList } from "../../../../app/Slices/favoritesListSlice"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { changeCoinInFavorites, getStateCoinData } from "../../../../app/Slices/coinDataSlice"

export function AboutCoin() {
  const dispatch = useAppDispatch();
  const coinData = useAppSelector(getStateCoinData);

  function addToFavorites() {
    const fullName = coinData.fullName;

    if (!coinData.coinInFavorites) {
      dispatch(addToFavoritesList(coinData))

      addToStorageFavoritesList(fullName)
    } else {
      dispatch(removeFromFavoritesList(fullName))

      removeFromStorageFavoritesList(fullName)
    }

    dispatch(changeCoinInFavorites(!coinData.coinInFavorites))
  }

  return (
    <div className={`${style.AboutCoin} ${style.block}`}>
      <div className={style.header}>
        <h2 className={style.title}>About Coin</h2>
        <span
          className={style.favorites}
          onClick={addToFavorites}
        >
          {coinData.coinInFavorites ? 'Remove from favorites' : 'Add to favorites'}
        </span>
      </div>

      <div>
        <span className={style.Info}>
          <p>Coin name</p>
          <p>{coinData.isFetching ? 'Loading...' : coinData.name}</p>
        </span>
        <span className={style.Info}>
          <p>Price</p>
          <p>{coinData.isFetching ? 'Loading...' : coinData.price}</p>
        </span>
        <span className={style.Info}>
          <p>Change percents</p>
          <p>{coinData.isFetching ? 'Loading...' : coinData.percents}</p>
        </span>
      </div>
    </div>
  )
}