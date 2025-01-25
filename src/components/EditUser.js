import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const EditUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
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
        setError("Erreur lors du chargement des données de l'utilisateur")
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await axios.put('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}, user')
      navigate("/users")
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err)
      setError("Erreur lors de la sauvegarde des modifications")
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center p-4">Chargement...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>
  if (!user) return <div className="text-center p-4">Utilisateur non trouvé</div>

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Modifier l'Utilisateur</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="nom"
                value={user.nom}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Prénom</label>
              <input
                type="text"
                name="prenom"
                value={user.prenom}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Âge</label>
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Pays</label>
              <input
                type="text"
                name="Pays"
                value={user.Pays}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" name="admin" checked={user.admin} onChange={handleChange} className="mr-2" />
              <label className="text-gray-700">Administrateur</label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser