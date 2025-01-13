import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"

export default function App() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto text-3xl font-bold underline">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}