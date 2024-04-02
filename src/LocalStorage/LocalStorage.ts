import { store } from "../app/store"
import { changeCoinInFavorites, getCoinData } from "../app/Slices/coinDataSlice"
import { getAssetsData } from "../app/Slices/favoritesListSlice"

export function updateAppData() {
  updateCoinData()
  updateFavoritesList()
}

export function updateCoinData() {
  if (localStorage.currentCoin) {
    const coinFromStorage = JSON.parse(localStorage.currentCoin)
    store.dispatch(getCoinData(coinFromStorage.fullName))
    store.dispatch(changeCoinInFavorites(coinFromStorage.coinInFavorites))
  } else {
    store.dispatch(getCoinData('bitcoin'))
    store.dispatch(changeCoinInFavorites(false))
  }
}

export function updateFavoritesList() {
  if (localStorage.favoritesList) {
    const favoritesListFromStorage = JSON.parse(localStorage.favoritesList)

    if (favoritesListFromStorage.length !== 0) {
      store.dispatch(getAssetsData(favoritesListFromStorage))
    }
  }
}

export function setStorageCurrentCoin(name: string, inFavorites: boolean) {
  localStorage.currentCoin = JSON.stringify({
    fullName: name,
    coinInFavorites: inFavorites,
  });
}

export function addToStorageFavoritesList(name: string) {
  if (localStorage.favoritesList) {
    const favoritesList = JSON.parse(localStorage.favoritesList);
    favoritesList.push(name);

    localStorage.favoritesList = JSON.stringify(favoritesList);
  } else {
    localStorage.favoritesList = JSON.stringify([name]);
  }

  setStorageCurrentCoin(name, true)
}

export function removeFromStorageFavoritesList(name: string) {
  if (!localStorage.favoritesList) return;

  const favoritesList = JSON.parse(localStorage.favoritesList);

  localStorage.favoritesList = JSON.stringify(favoritesList.filter((item: any) => {
    return item !== name;
  }));

  setStorageCurrentCoin(name, false)
}
