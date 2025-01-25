import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
const ChangeColor = () => {
  const user = useSelector((state) => state)
  const [newColor, setNewColor] = useState(user.couleur || "#ffffff")
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!user.id) {
      setError("Erreur: ID utilisateur non trouvé")
      return
    }

    try {
      const response = await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}`, {
        couleur: newColor,
      })

      if (response.data) {
        dispatch({ type: "CHANGE_COLOR", payload:newColor }) 
        alert("Couleur mise à jour avec succès!")
      }
    } catch (error) {
      // Correction du message d'erreur pour éviter le problème de template literal
      setError("Erreur lors de la mise à jour de la couleur: " + (error.message || "Une erreur est survenue"))
      console.error("Erreur détaillée:", error)
    }
  }

  return (
    <div className="change-color-container">
      <h2>Modifier la Couleur</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="colorPicker">Choisir une nouvelle couleur:</label>
          <input id="colorPicker" type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
        </div>
        <button type="submit">Valider</button>
      </form>
      <p>Couleur actuelle: {user.couleur || "#ffffff"}</p>
      {error && <p style={{ color: "black    " }}>{error}</p>}
      
      </div>
  )
}

export default ChangeColor