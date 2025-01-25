import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const NavigationBar = () => {
  const admin = useSelector((state) => state.admin)

  return (
    <nav style={{ display: "flex", justifyContent: "space-around", padding: "1rem", backgroundColor: "#f0f0f0"}}>
      <Link to="/">Accueil</Link>
      <Link to="/profile">Voir Mon Profile</Link>
      <Link to="/change-color">Modifier Couleur</Link>
      {admin && (
        <>
          <Link to="/users">Liste Utilisateurs</Link>
          <Link to="/add-user">Ajouter Utilisateur</Link>
          <Link to="/admin-requests">Gérer les Demandes</Link>
        </>
      )}
      {!admin && <Link to="/requests">Mes Demandes</Link>}
    </nav>
  )
}

export default NavigationBar