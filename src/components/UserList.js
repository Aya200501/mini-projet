import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire")
      setUsers(response.data)
      setLoading(false)
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs")
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}')
        fetchUsers() // Recharger la liste après suppression
      } catch (err) {
        alert("Erreur lors de la suppression")
      }
    }
  }

  if (loading) return <div className="text-center p-4">Chargement...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Prénom</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-pink-50" : "bg-white"}>
                <td className="px-6 py-4">{user.nom}</td>
                <td className="px-6 py-4">{user.prenom}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 flex gap-2">
                  <Link to={'/user/${user.id}'} className="text-blue-600 hover:text-blue-800">
                    Détails
                  </Link>
                  <Link to={'/edit-user/${user.id}'} className="text-green-600 hover:text-green-800">
                    Modifier
                  </Link>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList