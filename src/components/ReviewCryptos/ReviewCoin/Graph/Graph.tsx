import style from './Graph.module.scss'

export function Graph() {
  return (
    <div className={`${style.Graph} ${style.block}`}>
      <h2 className={style.title}>Graph</h2>
      <div className={style.Chart}>Graph here</div>
    </div>
  )
}