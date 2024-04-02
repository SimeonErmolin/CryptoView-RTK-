import { useState } from "react"
import styles from "./Input.module.scss"
import { store } from "../../app/store"
import { changeCoinInFavorites, getCoinData } from "../../app/Slices/coinDataSlice"

export function Input() {
  const [currentCoin, setCurrentCoin] = useState('');

  function onSubmitValue(e: any) {
    e.preventDefault();

    if (currentCoin === '') return;

    let isFavorite = false

    store.getState().favoritesList.favoritesList.forEach((item: any) => {
      if (item.fullName === currentCoin) {
        isFavorite = true;
      }
    });

    store.dispatch(getCoinData(currentCoin));
    store.dispatch(changeCoinInFavorites(isFavorite));

    setCurrentCoin('');
  }

  return (
    <form
      className={`${styles.Input} ${styles.block}`}
      onSubmit={onSubmitValue}
    >
      <input
        type="text"
        className={styles.input}
        placeholder={'Search'}
        value={currentCoin}
        onChange={(e) => setCurrentCoin(e.target.value.toLowerCase())}/>
    </form>
  )
}