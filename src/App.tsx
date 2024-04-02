import "./App.scss"
import {Input} from "./components/Input/Input"
import {ReviewCryptos} from "./components/ReviewCryptos/ReviewCryptos"
import "./LocalStorage/LocalStorage"
import { updateAppData } from "./LocalStorage/LocalStorage"
import { useEffect } from "react"
import { Header } from "./components/Header/Header"

updateAppData()

export function App() {
  useEffect(() => {
    setInterval(updateAppData, 30000)
  }, [])

  return (
    <div className="App container">
      <Header></Header>
      <Input></Input>
      <ReviewCryptos></ReviewCryptos>
    </div>
  )
}