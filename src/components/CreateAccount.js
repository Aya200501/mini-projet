import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./CreateAccount.css"

const CreateAccount = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nom: "Funk",
    prenom: "Rose",
    age: "4",
    pseudo: "Kaci_Reilly73",
    email: "Wade34@yahoo.com",
    MotDePasse: "e2EpziAy5RIpJgP",
    admin: false,
    couleur: "#ffffff",
    Devise: "kr",
    Pays: "Spain",
    avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/831.jpg",
    photo: "https://loremflickr.com/640/480/people",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])

  const validatePassword = (password) => {
    const errors = []
    if (password.length < 8) {
      errors.push("Le mot de passe doit contenir au moins 8 caractères")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins une majuscule")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins une minuscule")
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins un chiffre")
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)")
    }
    return errors
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    // Validation des champs obligatoires
    const requiredFields = ["nom", "prenom", "age", "pseudo", "email", "MotDePasse"]
    const emptyFields = requiredFields.filter((field) => !formData[field])
    if (emptyFields.length > 0) {
      setErrors(["Tous les champs sont obligatoires"])
      return
    }

    // Validation du mot de passe
    const passwordErrors = validatePassword(formData.MotDePasse)
    if (passwordErrors.length > 0) {
      setErrors(passwordErrors)
      return
    }

    // Vérification de la confirmation du mot de passe
    if (formData.MotDePasse !== confirmPassword) {
      setErrors(["Les mots de passe ne correspondent pas"])
      return
    }

    try {
      // Envoi des données à l'API
      await axios.post("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire", formData)
      alert("Compte créé avec succès! Notez bien votre pseudo et mot de passe pour vous connecter.")
      navigate("/login")
    } catch (error) {
      setErrors(["Une erreur est survenue lors de la création du compte"])
      console.error("Erreur:", error)
    }
  }

  return (
    <div className="create-account-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit} className="create-account-form">
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="age">Âge:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="pseudo">Pseudo (nom d'utilisateur):</label>
          <input type="text" id="pseudo" name="pseudo" value={formData.pseudo} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="MotDePasse">Mot de passe:</label>
          <input
            type="password"
            id="MotDePasse"
            name="MotDePasse"
            value={formData.MotDePasse}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="admin">
            <input type="checkbox" id="admin" name="admin" checked={formData.admin} onChange={handleChange} />
            Admin
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="couleur">Couleur préférée:</label>
          <input type="color" id="couleur" name="couleur" value={formData.couleur} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="Devise">Devise:</label>
          <input type="text" id="Devise" name="Devise" value={formData.Devise} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="Pays">Pays:</label>
          <input type="text" id="Pays" name="Pays" value={formData.Pays} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="avatar">URL de l'avatar:</label>
          <input type="text" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="photo">URL de la photo:</label>
          <input type="text" id="photo" name="photo" value={formData.photo} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-button">
          Créer le compte
        </button>
      </form>

      {errors.length > 0 && (
        <div className="error-container">
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="error-message">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CreateAccount