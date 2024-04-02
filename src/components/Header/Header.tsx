import style from "./Header.module.scss"

export function Header() {
  return (
    <div className={`${style.Header} ${style.block}`}>
      <h1 className={style.pageTitle}>CRYPTO VIEW</h1>
      <div className={style.User}>
        <p className={style.UserName}>Random User</p>
        <img src="https://avatar.iran.liara.run/public/boy" alt="" className={style.Avatar} />
      </div>
    </div>
  )
}