import React from "react"
import { useSelector } from "react-redux"

const Home = () => {
  const user = useSelector((state) => state)

  return (
    <div className="home-container">
      <h1>Bienvenue sur notre site</h1>
      <p>
        Bonjour, {user.prenom} {user.nom}!
      </p>
      <p>Ceci est la page d'accueil. Vous pouvez naviguer vers d'autres sections en utilisant le menu.</p>
    </div>
  )
}

export default Home