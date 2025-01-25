import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import HeaderSection from "./HeaderSection"
import NavigationBar from "./NavigationBar"
import Index from "./Index"
import Footer from "./Footer"

const Layout = () => {
  const user = useSelector((state) => state)

  useEffect(() => {
    console.log("État utilisateur dans Layout:", user)
  }, [user])

  return (
    <div style={{ backgroundColor: user.couleur, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HeaderSection />
      {user.admin ? <NavigationBar /> : <Index />}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout