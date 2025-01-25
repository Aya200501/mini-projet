import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const UserDetails = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}')
        setUser(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Erreur lors du chargement:", err)
        setError("Erreur lors du chargement des détails de l'utilisateur")
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <div className="text-center p-4">Chargement...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>
  if (!user) return <div className="text-center p-4">Utilisateur non trouvé</div>

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Détails de l'Utilisateur</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Nom:</p>
            <p className="font-semibold">{user.nom}</p>
          </div>

          <div>
            <p className="text-gray-600">Prénom:</p>
            <p className="font-semibold">{user.prenom}</p>
          </div>

          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-600">Âge:</p>
            <p className="font-semibold">{user.age}</p>
          </div>

          <div>
            <p className="text-gray-600">Pays:</p>
            <p className="font-semibold">{user.Pays}</p>
          </div>

          <div>
            <p className="text-gray-600">Type d'utilisateur:</p>
            <p className="font-semibold">{user.admin ? "Administrateur" : "Utilisateur standard"}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate('/edit-user/${id}')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Modifier
          </button>
          <button
            onClick={() => navigate("/users")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails